# ============================================================================ #
#                      OctalWeb: Links | Development Node                      #
# ============================================================================ #
# Multi-stage Dockerfile optimized for React and Vite development environments #
# within the OctalMesh infrastructure.                                         #
# ============================================================================ #

FROM node:22-alpine AS base

# Install system dependencies for native module compatibility
RUN apk add --no-cache libc6-compat

WORKDIR /app

# ============================================================================ #
#                       Stage: Dependencies Installation                       #
# ============================================================================ #
FROM base AS deps

COPY package*.json ./

# Use 'npm ci' for deterministic dependency resolution from lockfile
RUN npm ci

# ============================================================================ #
#                     Stage: Development Environment Setup                     #
# ============================================================================ #
FROM base AS development

WORKDIR /app

# Sync node_modules from the 'deps' stage to isolate build artifacts
COPY --from=deps --chown=node:node /app/node_modules ./node_modules

# Copy source manifest
COPY --chown=node:node . .

# Runtime environment configuration
ENV NODE_ENV=development
ENV LINKS_WEB_PORT=5174

# Transition to non-privileged 'node' user
USER node

EXPOSE ${LINKS_WEB_PORT}

# Execute development server
CMD ["sh", "-c", "npm run dev -- --port ${LINKS_WEB_PORT}"]
