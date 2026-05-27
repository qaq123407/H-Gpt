import type { LucideIcon } from "lucide-react";

export type AuthMode = "login" | "register";

export type ModelProvider = "openai" | "claude" | "deepseek" | "qwen" | "model-router";

export type ModelOption = {
  id: string;
  name: string;
  provider: ModelProvider;
  description: string;
};

export type ConversationGroup = "today" | "yesterday" | "last7days";

export type Conversation = {
  id: string;
  title: string;
  group: ConversationGroup;
  updatedAt: string;
};

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  model?: string;
  createdAt: string;
  liked?: boolean;
  disliked?: boolean;
};

export type UploadedFile = {
  id: string;
  name: string;
  type: "pdf" | "word" | "image" | "sheet";
  size: string;
  progress: number;
  status: "uploading" | "parsing" | "ready" | "error";
};

export type KnowledgeBase = {
  id: string;
  name: string;
  fileCount: number;
  chunkCount: number;
  status: "ready" | "indexing";
};

export type QuickAction = {
  id: string;
  label: string;
  prompt: string;
  icon: LucideIcon;
};

export type SidebarPanelTab = "knowledge" | "agent" | "settings";
