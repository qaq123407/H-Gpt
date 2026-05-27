FROM node:20-alpine AS base
WORKDIR /app
RUN corepack enable

COPY package.json pnpm-workspace.yaml turbo.json tsconfig.base.json ./
COPY apps/server ./apps/server
COPY packages ./packages

RUN pnpm install --filter server... --frozen-lockfile=false
RUN pnpm --filter server build

EXPOSE 3000
CMD ["node", "apps/server/dist/main.js"]
