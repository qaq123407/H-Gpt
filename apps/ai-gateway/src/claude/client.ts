export async function createClaudeMessage(prompt: string) {
  return {
    provider: "claude",
    prompt
  };
}
