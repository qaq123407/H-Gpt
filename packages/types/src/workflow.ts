export type WorkflowNodeType = "trigger" | "llm" | "tool" | "condition" | "output";

export type WorkflowNode = {
  id: string;
  type: WorkflowNodeType;
  label: string;
  config?: Record<string, unknown>;
};

export type WorkflowEdge = {
  id: string;
  source: string;
  target: string;
};

export type Workflow = {
  id: string;
  name: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
};
