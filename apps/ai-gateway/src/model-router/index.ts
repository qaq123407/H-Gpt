export type ModelProvider = "openai" | "deepseek" | "qwen" | "claude";

export type ModelRoute = {
  provider: ModelProvider;
  model: string;
};

const defaultRoutes: Record<string, ModelRoute> = {
  chat: { provider: "openai", model: "gpt-4o-mini" },
  reasoning: { provider: "deepseek", model: "deepseek-reasoner" },
  embedding: { provider: "qwen", model: "text-embedding-v3" }
};

export function resolveModelRoute(capability: string): ModelRoute {
  return defaultRoutes[capability] ?? defaultRoutes.chat;
}
