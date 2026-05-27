import type { WorkflowNode } from "@h-gpt/types";

export type NodeExecutionResult = {
  nodeId: string;
  output: unknown;
};

export type NodeExecutor = (node: WorkflowNode, input?: unknown) => Promise<NodeExecutionResult>;
