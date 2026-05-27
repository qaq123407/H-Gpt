import type { WorkflowEdge, WorkflowNode } from "@h-gpt/types";

export type WorkflowDefinition = {
  id: string;
  name: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
};
