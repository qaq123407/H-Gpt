# H-Gpt

H-Gpt is a pnpm monorepo for building an AI agent platform with a React web app, NestJS API server, model gateway, async workers and shared TypeScript packages.

## Structure

- `apps/web`: React + Vite frontend.
- `apps/server`: NestJS backend.
- `apps/ai-gateway`: unified model access layer.
- `apps/worker`: asynchronous RAG, embedding and parser workers.
- `packages/ui`: shared React UI primitives.
- `packages/types`: shared TypeScript domain types.
- `packages/request`: shared request client.
- `packages/utils`: shared utilities.
- `packages/prompt-engine`: prompt templates and prompt builder.
- `packages/workflow-core`: workflow schema and executor core.

## Getting Started

```bash
pnpm install
pnpm dev
```

Useful commands:

```bash
pnpm dev:web
pnpm dev:server
pnpm build
pnpm typecheck
```
