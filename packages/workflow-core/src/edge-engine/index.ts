import type { WorkflowEdge } from "@h-gpt/types";

export function findOutgoingEdges(edges: WorkflowEdge[], nodeId: string) {
  return edges.filter((edge) => edge.source === nodeId);
}
