export async function runEmbeddingJob(sourceId: string) {
  return {
    type: "embedding",
    sourceId,
    status: "queued"
  };
}
