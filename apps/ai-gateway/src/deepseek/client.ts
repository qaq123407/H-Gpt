export async function createDeepSeekCompletion(prompt: string) {
  return {
    provider: "deepseek",
    prompt
  };
}
