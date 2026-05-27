export async function runRagJob(documentId: string) {
  return {
    type: "rag",
    documentId,
    status: "queued"
  };
}
