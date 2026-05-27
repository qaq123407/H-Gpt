import {
  Bot,
  ChevronRight,
  FolderPlus,
  Image,
  Library,
  LogOut,
  MessageSquarePlus,
  PanelLeftClose,
  Search,
  Sparkles,
  UserRound
} from "lucide-react";
import { useMemo, useState } from "react";
import { useWorkbenchStore } from "../../../store/useWorkbenchStore";

const navItems = [
  { id: "new", label: "新聊天", icon: MessageSquarePlus },
  { id: "search", label: "搜索聊天", icon: Search },
  { id: "projects", label: "项目", icon: FolderPlus },
  { id: "library", label: "库", icon: Library },
  { id: "agent", label: "Agent", icon: Bot },
  { id: "image", label: "智能生图", icon: Image }
];

export function ConversationSidebar() {
  const [activeNav, setActiveNav] = useState("new");
  const conversations = useWorkbenchStore((state) => state.conversations);
  const activeConversationId = useWorkbenchStore((state) => state.activeConversationId);
  const collapsed = useWorkbenchStore((state) => state.sidebarCollapsed);
  const mobileOpen = useWorkbenchStore((state) => state.mobileSidebarOpen);
  const newChat = useWorkbenchStore((state) => state.newChat);
  const toggleSidebar = useWorkbenchStore((state) => state.toggleSidebar);
  const setActiveConversation = useWorkbenchStore((state) => state.setActiveConversation);
  const logout = useWorkbenchStore((state) => state.logout);

  const recentConversations = useMemo(() => conversations.slice(0, 6), [conversations]);

  function handleNavClick(id: string) {
    setActiveNav(id);
    if (id === "new") {
      newChat();
    }
  }

  return (
    <aside className={`conversation-sidebar ${collapsed ? "is-collapsed" : ""} ${mobileOpen ? "is-mobile-open" : ""}`}>
      <div className="sidebar-top">
        {!collapsed ? <h1>H-Gpt</h1> : <span className="mini-brand">HG</span>}
        <button className="icon-button ghost" type="button" onClick={toggleSidebar} aria-label="Collapse sidebar">
          {collapsed ? <ChevronRight size={18} /> : <PanelLeftClose size={18} />}
        </button>
      </div>

      <nav className="sidebar-primary-nav" aria-label="Workspace navigation">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button className={activeNav === item.id ? "active" : ""} key={item.id} type="button" onClick={() => handleNavClick(item.id)}>
              <Icon size={22} strokeWidth={1.9} />
              {!collapsed ? <span>{item.label}</span> : null}
            </button>
          );
        })}
      </nav>

      {!collapsed ? (
        <section className="recent-section">
          <h2>
            最近
            <ChevronRight size={14} />
          </h2>
          <div className="recent-list">
            {recentConversations.map((item) => (
              <button
                className={item.id === activeConversationId ? "active" : ""}
                key={item.id}
                type="button"
                onClick={() => setActiveConversation(item.id)}
              >
                {item.title}
              </button>
            ))}
          </div>
        </section>
      ) : null}

      <div className="sidebar-user">
        <span className="avatar">GU</span>
        {!collapsed ? (
          <>
            <div>
              <strong>南宫问天</strong>
              <span>Plus</span>
            </div>
            <button className="icon-button ghost" type="button" onClick={logout} aria-label="Logout">
              <LogOut size={18} />
            </button>
          </>
        ) : (
          <Sparkles size={18} />
        )}
      </div>
    </aside>
  );
}
