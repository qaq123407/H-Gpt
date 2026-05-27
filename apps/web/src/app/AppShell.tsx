import { LoginPage } from "../features/auth/components/LoginPage";
import { ChatWorkspace } from "../features/chat/components/ChatWorkspace";
import { ConversationSidebar } from "../features/sidebar/components/ConversationSidebar";
import { useWorkbenchStore } from "../store/useWorkbenchStore";

export function AppShell() {
  const isAuthenticated = useWorkbenchStore((state) => state.isAuthenticated);
  const mobileSidebarOpen = useWorkbenchStore((state) => state.mobileSidebarOpen);
  const setMobileSidebarOpen = useWorkbenchStore((state) => state.setMobileSidebarOpen);

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <div className="workbench-shell">
      <ConversationSidebar />
      {mobileSidebarOpen ? (
        <button className="mobile-scrim" type="button" aria-label="Close sidebar" onClick={() => setMobileSidebarOpen(false)} />
      ) : null}
      <ChatWorkspace />
    </div>
  );
}
