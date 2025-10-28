# 🐳 Docker Setup & Run Guide for Noodle Project

## 📦 1. Introduction
**Dockerization** is the process of packaging your application and its runtime environment (Node.js, dependencies, configs, etc.) into a **container**.  
This ensures your app runs the same way on any machine — no manual setup needed.

---

## ⚙️ 2. Prerequisites

Before starting, make sure you have:

- **Docker** installed  
  → [Download Docker Desktop](https://www.docker.com/products/docker-desktop/)
- **Git** installed  
  → [Download Git](https://git-scm.com/downloads)

Check if they’re installed:
```bash
docker -v
git --version
```

---

## 📂 3. Clone Project Repositories

The project consists of **two separate repositories**:

```
noodle-ui/    → Frontend (Next.js)
noodle-api/   → Backend (ElysiaJS or Fastify)
```

### Clone both repositories:
```bash
# Clone frontend (UI)
git clone https://github.com/bit-country/noodle-ui.git
cd noodle-ui
npm install
npm run dev

# Clone backend (API)
cd noodle-api
git clone https://github.com/bit-country/noodle-api.git
bun install
bun run dev
```

---

## 🧱 4. Dockerfile.dev (inside `noodle-ui/`)

```Dockerfile
FROM public.ecr.aws/docker/library/node:20-bullseye-slim AS base

#------------------------------------------------
FROM base AS deps
WORKDIR /app

RUN apt-get update && apt-get install -y libc6
RUN npm install -g npm@11.3.0

COPY package.json ./

RUN npm install

#------------------------------------------------
FROM base AS builder

WORKDIR /app

COPY . .
COPY --from=deps /app/node_modules ./node_modules

RUN npm run build

#------------------------------------------------
FROM base AS runner

WORKDIR /app

COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

---

## 🧱 5. Dockerfile.local (inside `noodle-api/`)

```Dockerfile
FROM oven/bun AS build

ARG ENV
ENV ENV=$ENV
ENV NODE_ENV=$ENV

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .

RUN bun run build

#------------------------------------------------
FROM oven/bun AS local

ARG ENV
ENV ENV=$ENV
ENV NODE_ENV=$ENV

WORKDIR /app

COPY --from=build /app/bin/app app
COPY --from=build /app/bin/cluster cluster
COPY package.json bun.lock ./
COPY --from=build /app/node_modules ./node_modules
COPY .env .env.test ./

EXPOSE 3000

CMD ["./cluster"]
```

---

## 🧩 6. docker-compose.yml (inside `noodle-ui/`)

```yaml
services:
  noodle-api:
    container_name: noodle-api
    platform: linux/arm64
    build:
      context: ../noodle-api
      dockerfile: Dockerfile.local
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=${NODE_ENV:-development}
      - PORT=3000
      - MONGO_URI=mongodb://data_warehouse_user:3r7od24m5Wx426edHghpB0gNB@207.148.122.148:27017/?authSource=BitCountry-Warehouse
    networks:
      - noodle-network
    restart: unless-stopped

  noodle-ui:
    container_name: noodle-ui
    platform: linux/arm64
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3001:3000"
    depends_on:
      - noodle-api
    environment:
      - NODE_ENV=development
      - TAILWIND_MODE=build
      - NEXT_DISABLE_LIGHTNINGCSS=1
      - NEXT_WEBPACK_USE_TURBOPACK=0
      - NEXT_TELEMETRY_DISABLED=1
      - NEXT_PUBLIC_API_URL=http://noodle-api:3000
    networks:
      - noodle-network
    restart: unless-stopped

networks:
  noodle-network:
    driver: bridge
```

---

## 🚀 7. How to Run the App (Step-by-Step)

### Step 1️⃣ — Build images
```bash
docker compose build --no-cache
```

### Step 2️⃣ — Run containers
```bash
docker compose up
```

### Step 3️⃣ — Stop containers
```bash
docker compose down
```

### Step 4️⃣ — List running containers
```bash
docker ps -a
```

### Step 5️⃣ — List images
```bash
docker images
```

### Step 6️⃣ — Clean up unused containers, images, and cache
```bash
docker system prune -a
```

---

## 🌐 8. Access the Application

Once containers are running, open:
```
http://localhost:3001
```

For testers on the same LAN:
```
http://<your-local-ip>:3001
```

To find your local IP:
```bash
ipconfig   # on Windows
ifconfig   # on macOS/Linux
```

---

## 🧰 9. Common Errors & Fixes

| Issue | Cause | Solution |
|--------|--------|----------|
| `pull access denied for noodle-ui-noodle-ui` | Docker cannot find the image | Remove the `image:` line and use `build:` instead |
| `node_modules` overwritten | Volume `.:/app` overwrote it | Add `- /app/node_modules` to volumes |
| `lightningcss` build error | Missing `libc6` | Add `RUN apt-get update && apt-get install -y libc6` |
| UI not loading | Incorrect port mapping | Verify `ports: "3001:3000"` and open the correct URL |

> Local code changes are automatically reflected thanks to **bind mounts (`.:/app`)**.

---
