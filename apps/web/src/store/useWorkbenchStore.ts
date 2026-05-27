import { create } from "zustand";
import { conversations, messages, modelOptions, uploadedFiles } from "../mock/workbench";
import type { ChatMessage, Conversation, ModelOption, SidebarPanelTab, UploadedFile } from "../types/workbench";

type WorkbenchState = {
  isAuthenticated: boolean;
  sidebarCollapsed: boolean;
  mobileSidebarOpen: boolean;
  activeConversationId: string;
  activeModelId: string;
  sidebarPanelTab: SidebarPanelTab;
  isStreaming: boolean;
  conversations: Conversation[];
  messages: ChatMessage[];
  files: UploadedFile[];
  models: ModelOption[];
  login: () => void;
  logout: () => void;
  toggleSidebar: () => void;
  setMobileSidebarOpen: (open: boolean) => void;
  setActiveConversation: (conversationId: string) => void;
  setActiveModel: (modelId: string) => void;
  setSidebarPanelTab: (tab: SidebarPanelTab) => void;
  newChat: () => void;
  clearChat: () => void;
  sendMessage: (content: string) => void;
  finishStreaming: () => void;
  stopStreaming: () => void;
  addFile: (file: UploadedFile) => void;
  removeFile: (fileId: string) => void;
  renameConversation: (conversationId: string, title: string) => void;
  deleteConversation: (conversationId: string) => void;
};

const now = () => new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" });

export const useWorkbenchStore = create<WorkbenchState>((set, get) => ({
  isAuthenticated: false,
  sidebarCollapsed: false,
  mobileSidebarOpen: false,
  activeConversationId: conversations[0].id,
  activeModelId: modelOptions[0].id,
  sidebarPanelTab: "knowledge",
  isStreaming: false,
  conversations,
  messages,
  files: uploadedFiles,
  models: modelOptions,
  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setMobileSidebarOpen: (open) => set({ mobileSidebarOpen: open }),
  setActiveConversation: (conversationId) => set({ activeConversationId: conversationId, mobileSidebarOpen: false }),
  setActiveModel: (modelId) => set({ activeModelId: modelId }),
  setSidebarPanelTab: (tab) => set({ sidebarPanelTab: tab }),
  newChat: () => {
    const id = `c-${Date.now()}`;
    const conversation: Conversation = {
      id,
      title: "新的对话",
      group: "today",
      updatedAt: now()
    };
    set((state) => ({
      conversations: [conversation, ...state.conversations],
      activeConversationId: id,
      messages: []
    }));
  },
  clearChat: () => set({ messages: [] }),
  sendMessage: (content) => {
    const userMessage: ChatMessage = {
      id: `m-user-${Date.now()}`,
      role: "user",
      content,
      createdAt: now()
    };
    const assistantMessage: ChatMessage = {
      id: `m-ai-${Date.now()}`,
      role: "assistant",
      model: get().activeModelId,
      content:
        "我正在基于当前模型和已绑定知识库生成回复。\n\n- 已接收你的输入\n- 已读取上传文件状态\n- 已准备输出结构化结果\n\n```ts\nconst response = await agent.run(input);\n```",
      createdAt: now()
    };
    set((state) => ({
      isStreaming: true,
      messages: [...state.messages, userMessage, assistantMessage]
    }));
  },
  finishStreaming: () => set({ isStreaming: false }),
  stopStreaming: () => set({ isStreaming: false }),
  addFile: (file) => set((state) => ({ files: [file, ...state.files] })),
  removeFile: (fileId) => set((state) => ({ files: state.files.filter((file) => file.id !== fileId) })),
  renameConversation: (conversationId, title) =>
    set((state) => ({
      conversations: state.conversations.map((item) => (item.id === conversationId ? { ...item, title } : item))
    })),
  deleteConversation: (conversationId) =>
    set((state) => {
      const nextConversations = state.conversations.filter((item) => item.id !== conversationId);
      return {
        conversations: nextConversations,
        activeConversationId: nextConversations[0]?.id ?? "",
        messages: nextConversations.length ? state.messages : []
      };
    })
}));
