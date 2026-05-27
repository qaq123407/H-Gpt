import { useEffect, useState } from "react";
import { FileStrip } from "../../files/components/FileStrip";
import { useWorkbenchStore } from "../../../store/useWorkbenchStore";
import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import { MessageList } from "./MessageList";
import { WelcomeState } from "./WelcomeState";

export function ChatWorkspace() {
  const [draft, setDraft] = useState("");
  const [toast, setToast] = useState("");
  const messages = useWorkbenchStore((state) => state.messages);
  const files = useWorkbenchStore((state) => state.files);
  const sendMessage = useWorkbenchStore((state) => state.sendMessage);
  const removeFile = useWorkbenchStore((state) => state.removeFile);
  const isEmpty = messages.length === 0;

  function showToast(message: string) {
    setToast(message);
  }

  function submit(value: string) {
    sendMessage(value);
    setDraft("");
    showToast("消息已发送");
  }

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timer = window.setTimeout(() => setToast(""), 1800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  return (
    <main className={`chat-workspace ${isEmpty ? "is-empty" : "has-messages"}`}>
      <ChatHeader />
      {isEmpty ? (
        <section className="empty-chat-stage">
          <WelcomeState onPrompt={setDraft} />
          <ChatInput draft={draft} onDraftChange={setDraft} onSubmit={submit} onToast={showToast} />
        </section>
      ) : (
        <>
          <section className="chat-body">
            <MessageList onToast={showToast} />
          </section>
          <FileStrip files={files} onDelete={removeFile} />
          <div className="fixed-composer">
            <ChatInput draft={draft} onDraftChange={setDraft} onSubmit={submit} onToast={showToast} />
          </div>
        </>
      )}
      {toast ? <div className="toast">{toast}</div> : null}
    </main>
  );
}
