# ============================================================================ #
#                      OctalWeb: Links | Development Node                      #
# ============================================================================ #
# Multi-stage Dockerfile optimized for React and Vite development environments #
# within the OctalMesh infrastructure.                                         #
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
#                     Stage: Development Environment Setup                     #
# ============================================================================ #
FROM base AS development

WORKDIR /app

COPY --from=deps --chown=node:node /app/node_modules ./node_modules
COPY --chown=node:node . .

ENV NODE_ENV=development
ENV LINKS_WEB_PORT=5174

USER node

EXPOSE ${LINKS_WEB_PORT}

CMD ["sh", "-c", "npm run dev -- --port ${LINKS_WEB_PORT}"]
