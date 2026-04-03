# --- Stage 1: Base ---
FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

# --- Stage 2: Dependencies ---
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --ignore-scripts

# --- Stage 3: Builder ---
FROM base AS builder
# Receive NEXT_PUBLIC_ variables as build arguments
ARG API_URL
ENV API_URL=$API_URL

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# --- Stage 4: Runner ---
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy essential files from the standalone output
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000

# Server.js is produced by next build when using standalone output
CMD ["node", "server.js"]
