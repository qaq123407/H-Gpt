import { Check, Clipboard, RotateCcw, ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { MarkdownRenderer } from "../../../lib/markdown";
import type { ChatMessage } from "../../../types/workbench";

type MessageBubbleProps = {
  message: ChatMessage;
  content: string;
  onCopy: (value: string) => void;
};

export function MessageBubble({ message, content, onCopy }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  function copyMessage() {
    void navigator.clipboard?.writeText(content);
    setCopied(true);
    onCopy("内容已复制");
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <article className={`message-row ${isUser ? "from-user" : "from-ai"}`}>
      <div className={`message-avatar ${isUser ? "user-avatar" : "ai-avatar"}`}>
        {isUser ? "U" : <img src="/h-gpt-logo.svg" alt="H-Gpt" />}
      </div>
      <div className="message-content">
        <div className="message-meta">
          <span>{isUser ? "你" : message.model ?? "H-Gpt"}</span>
          <time>{message.createdAt}</time>
        </div>
        <div className="message-bubble">
          {isUser ? <p>{content}</p> : <MarkdownRenderer content={content} onCopy={onCopy} />}
        </div>
        {!isUser ? (
          <div className="message-actions">
            <button className="icon-button subtle" type="button" onClick={copyMessage} aria-label="Copy response">
              {copied ? <Check size={15} /> : <Clipboard size={15} />}
            </button>
            <button className="icon-button subtle" type="button" aria-label="Regenerate">
              <RotateCcw size={15} />
            </button>
            <button className="icon-button subtle" type="button" aria-label="Like">
              <ThumbsUp size={15} />
            </button>
            <button className="icon-button subtle" type="button" aria-label="Dislike">
              <ThumbsDown size={15} />
            </button>
          </div>
        ) : null}
      </div>
    </article>
  );
}
