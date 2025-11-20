# Noodles – Installation & Run Guide (Docker + GitLab Source)

## 1. Install Docker Desktop

### Download Docker Desktop
- **Mac:** https://www.docker.com/products/docker-desktop  
- **Windows:** https://www.docker.com/products/docker-desktop  
- **Linux:** Install Docker Engine + Docker Compose

### Verify installation
```bash
docker -v
docker compose version
```

---

## 2. Clone Source Code from GitLab

Clone the repositories if you need to **review the code** or check project structure.

```bash
git clone https://git.mvp.studio/production-modules/noodle-ui.git
git clone https://git.mvp.studio/production-modules/noodle-api.git
```

Note: Cloning is only for reading code. **Docker does not use source code**, it runs using built images from Docker Hub.

---

## 3. Run the Project Using Docker Compose

No need to install Node.js or dependencies — everything is already built into Docker images stored on Docker Hub.

### Step 1: Move into the folder containing `docker-compose.yml`

```bash
cd noodle-ui
```

### Step 2: Start Docker services

```bash
docker compose up -d
```

Docker will automatically:

- Pull images from Docker Hub  
  - `minhhuy2302/noodle-ui`
  - `minhhuy2302/noodle-api`
- Start the containers  
- Expose ports for access

---

## 4. Verify Running Containers

```bash
docker ps
```

You should see something like:

```
noodle-ui     Up   0.0.0.0:3000->3000/tcp
noodle-api    Up   0.0.0.0:5130->5130/tcp
```

---

## 5. Access the Application

- **Frontend (UI):** http://localhost:3000  
- **Backend (API):** http://localhost:5130  

---

## 6. Stop the Application

To stop all containers:

```bash
docker compose down
```

To remove volumes (reset data):

```bash
docker compose down --volumes
```

---

## 7. Update to the Latest Version

Run this when new Docker images are pushed to Docker Hub:

```bash
docker compose pull
docker compose up -d
```

---

## 8. Important Notes

- You are **not using GitLab Registry**, images are pulled directly from Docker Hub.
- GitLab source is only needed for code review, not for running the application.
- Docker Compose only needs:
  - Docker Desktop installed  
  - A valid `docker-compose.yml`  
  - The command `docker compose up -d`
