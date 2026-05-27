export async function createQwenEmbedding(text: string) {
  return {
    provider: "qwen",
    dimensions: 1024,
    text
  };
}
