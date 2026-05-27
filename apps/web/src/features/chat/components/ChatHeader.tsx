import { Menu } from "lucide-react";
import { useWorkbenchStore } from "../../../store/useWorkbenchStore";

export function ChatHeader() {
  const setMobileSidebarOpen = useWorkbenchStore((state) => state.setMobileSidebarOpen);

  return (
    <header className="chat-header">
      <button className="icon-button mobile-only" type="button" onClick={() => setMobileSidebarOpen(true)} aria-label="Open sidebar">
        <Menu size={19} />
      </button>
    </header>
  );
}
