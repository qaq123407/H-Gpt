# Architecture

H-Gpt uses a pnpm monorepo:

- React web app for console workflows.
- NestJS server for APIs, auth, persistence and orchestration.
- AI gateway for provider routing.
- Worker package for long running RAG, embedding and parser tasks.
- Shared packages for UI, types, requests, utilities, prompts and workflow execution.
