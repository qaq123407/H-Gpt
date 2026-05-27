export type OpenAIChatInput = {
  model: string;
  messages: Array<{ role: "system" | "user" | "assistant"; content: string }>;
};

export async function createOpenAIChatCompletion(input: OpenAIChatInput) {
  return {
    provider: "openai",
    model: input.model,
    message: input.messages.at(-1)?.content ?? ""
  };
}
