# ============================================================================ #
#                        OctalWeb: Links | Staging Node                        #
# ============================================================================ #
# Multi-stage Dockerfile for a production-like staging environment.            #
# Produces a fully static Astro build served via 'astro preview'.              #
# ============================================================================ #

FROM node:22-alpine AS base

RUN apk add --no-cache libc6-compat

WORKDIR /app

# ============================================================================ #
#                       Stage: Dependencies Installation                       #
# ============================================================================ #
FROM base AS deps

COPY package*.json ./

RUN npm ci

# ============================================================================ #
#                         Stage: Static Build                                  #
# ============================================================================ #
FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production

RUN npm run build

# ============================================================================ #
#                         Stage: Staging Runtime                               #
# ============================================================================ #
FROM node:22-alpine AS staging

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY --from=deps    /app/node_modules  ./node_modules
COPY --from=builder /app/dist          ./dist
COPY --chown=node:node package*.json   ./
COPY --chown=node:node astro.config.*  ./

ENV NODE_ENV=production
ENV LINKS_WEB_PORT=5174

USER node

EXPOSE ${LINKS_WEB_PORT}

CMD ["sh", "-c", "npm run preview -- --port ${LINKS_WEB_PORT}"]
