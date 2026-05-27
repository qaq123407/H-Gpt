import { useCallback, useEffect, useRef } from "react";
import { useWorkbenchStore } from "../../../store/useWorkbenchStore";
import { useStreamingText } from "../hooks/useStreamingText";
import { MessageBubble } from "./MessageBubble";

type MessageListProps = {
  onToast: (message: string) => void;
};

function StreamingMessage({ onToast }: MessageListProps) {
  const messages = useWorkbenchStore((state) => state.messages);
  const isStreaming = useWorkbenchStore((state) => state.isStreaming);
  const finishStreaming = useWorkbenchStore((state) => state.finishStreaming);
  const lastMessage = messages.at(-1);
  const shouldStream = Boolean(isStreaming && lastMessage?.role === "assistant");
  const onDone = useCallback(() => finishStreaming(), [finishStreaming]);
  const displayed = useStreamingText(lastMessage?.content ?? "", shouldStream, onDone);

  if (!lastMessage) {
    return null;
  }

  return <MessageBubble message={lastMessage} content={shouldStream ? displayed : lastMessage.content} onCopy={onToast} />;
}

export function MessageList({ onToast }: MessageListProps) {
  const messages = useWorkbenchStore((state) => state.messages);
  const isStreaming = useWorkbenchStore((state) => state.isStreaming);
  const listRef = useRef<HTMLDivElement | null>(null);
  const visibleMessages = isStreaming ? messages.slice(0, -1) : messages;

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages.length, isStreaming]);

  return (
    <div className="message-list" ref={listRef}>
      {visibleMessages.map((message) => (
        <MessageBubble key={message.id} message={message} content={message.content} onCopy={onToast} />
      ))}
      {isStreaming ? <StreamingMessage onToast={onToast} /> : null}
    </div>
  );
}
