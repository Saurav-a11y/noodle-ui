FROM public.ecr.aws/docker/library/node:20-alpine AS base
#------------------------------------------------
FROM base AS deps
WORKDIR /app
#RUN apk add --no-cache libc6-compat
#package.json and yarn.lock need to be synchronized.
COPY package.json yarn.lock* ./
RUN yarn install --frozen-lockfile
#------------------------------------------------
FROM base AS builder

WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build
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