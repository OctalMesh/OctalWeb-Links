FROM node:22-alpine

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ENV LINKS_WEB_PORT=5174
EXPOSE ${LINKS_WEB_PORT}

# Команда запуска
CMD ["sh", "-c", "npm run dev -- --host 0.0.0.0 --port ${LINKS_WEB_PORT}"]
