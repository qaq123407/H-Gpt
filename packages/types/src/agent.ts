export type AgentStatus = "draft" | "published" | "archived";

export type Agent = {
  id: string;
  name: string;
  description?: string;
  prompt: string;
  status: AgentStatus;
  createdAt: string;
  updatedAt: string;
};
