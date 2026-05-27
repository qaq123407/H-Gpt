import { Code2, Database, FileText, Sparkles } from "lucide-react";
import type { ChatMessage, Conversation, KnowledgeBase, ModelOption, QuickAction, UploadedFile } from "../types/workbench";

export const modelOptions: ModelOption[] = [
  { id: "model-router:auto", name: "Auto Router", provider: "model-router", description: "自动根据任务选择最佳模型" },
  { id: "openai:gpt-4.1", name: "GPT-4.1", provider: "openai", description: "复杂推理、代码和通用对话" },
  { id: "openai:gpt-4o", name: "GPT-4o", provider: "openai", description: "多模态和实时交互" },
  { id: "claude:claude-3.7-sonnet", name: "Claude 3.7 Sonnet", provider: "claude", description: "长文本写作和严谨分析" },
  { id: "deepseek:deepseek-reasoner", name: "DeepSeek Reasoner", provider: "deepseek", description: "推理链路和数学分析" },
  { id: "qwen:qwen-max", name: "Qwen Max", provider: "qwen", description: "中文理解、知识问答和工具调用" }
];

export const conversations: Conversation[] = [
  { id: "c-1", title: "Agent 平台初始化方案", group: "today", updatedAt: "09:20" },
  { id: "c-2", title: "生成 NestJS 权限模块", group: "today", updatedAt: "08:45" },
  { id: "c-3", title: "知识库检索召回测试", group: "yesterday", updatedAt: "昨天" },
  { id: "c-4", title: "工作流节点设计", group: "last7days", updatedAt: "周一" },
  { id: "c-5", title: "SQL 优化建议", group: "last7days", updatedAt: "上周" }
];

export const messages: ChatMessage[] = [];

export const uploadedFiles: UploadedFile[] = [];

export const knowledgeBases: KnowledgeBase[] = [
  { id: "kb-1", name: "产品文档库", fileCount: 18, chunkCount: 1240, status: "ready" },
  { id: "kb-2", name: "研发规范库", fileCount: 7, chunkCount: 420, status: "indexing" },
  { id: "kb-3", name: "客户案例库", fileCount: 12, chunkCount: 830, status: "ready" }
];

export const quickActions: QuickAction[] = [
  { id: "qa-1", label: "写代码", prompt: "帮我生成一个可维护的 React 组件结构。", icon: Code2 },
  { id: "qa-2", label: "生成 SQL", prompt: "根据用户、会话、消息关系生成 Prisma schema。", icon: Database },
  { id: "qa-3", label: "总结文档", prompt: "总结上传文档中的关键需求和风险点。", icon: FileText },
  { id: "qa-4", label: "设计 Agent", prompt: "设计一个支持工具调用和知识库召回的 Agent。", icon: Sparkles }
];

export const suggestions = [
  "如何把 OpenAI、Claude、DeepSeek、Qwen 统一到 model-router？",
  "帮我设计一个 RAG 文档解析队列。",
  "生成一套 Agent Prompt 模板。",
  "如何实现聊天消息的流式输出？"
];
