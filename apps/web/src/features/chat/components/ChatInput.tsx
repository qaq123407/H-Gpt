import { AudioLines, Mic, Paperclip, Send, Square } from "lucide-react";
import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import { useWorkbenchStore } from "../../../store/useWorkbenchStore";
import type { UploadedFile } from "../../../types/workbench";

type ChatInputProps = {
  draft: string;
  onDraftChange: (value: string) => void;
  onSubmit: (value: string) => void;
  onToast: (message: string) => void;
};

function createMockFile(file: File): UploadedFile {
  const extension = file.name.split(".").pop()?.toLowerCase();
  const type = extension === "pdf" ? "pdf" : extension === "doc" || extension === "docx" ? "word" : extension === "xls" || extension === "xlsx" ? "sheet" : "image";

  return {
    id: `file-${Date.now()}`,
    name: file.name,
    type,
    size: `${Math.max(file.size / 1024 / 1024, 0.1).toFixed(1)} MB`,
    progress: 42,
    status: "uploading"
  };
}

export function ChatInput({ draft, onDraftChange, onSubmit, onToast }: ChatInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragging, setDragging] = useState(false);
  const isStreaming = useWorkbenchStore((state) => state.isStreaming);
  const stopStreaming = useWorkbenchStore((state) => state.stopStreaming);
  const addFile = useWorkbenchStore((state) => state.addFile);
  const models = useWorkbenchStore((state) => state.models);
  const activeModelId = useWorkbenchStore((state) => state.activeModelId);
  const setActiveModel = useWorkbenchStore((state) => state.setActiveModel);

  function submit() {
    const value = draft.trim();
    if (!value) {
      return;
    }
    onSubmit(value);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submit();
    }
  }

  function handleFiles(fileList: FileList | null) {
    if (!fileList?.length) {
      return;
    }

    Array.from(fileList).forEach((file) => addFile(createMockFile(file)));
    onToast("文件已加入上传队列");
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    handleFiles(event.target.files);
    event.target.value = "";
  }

  return (
    <footer
      className={`chat-input-panel ${dragging ? "is-dragging" : ""}`}
      onDragEnter={(event) => {
        event.preventDefault();
        setDragging(true);
      }}
      onDragOver={(event) => event.preventDefault()}
      onDragLeave={() => setDragging(false)}
      onDrop={(event) => {
        event.preventDefault();
        setDragging(false);
        handleFiles(event.dataTransfer.files);
      }}
    >
      <div className="composer-shell">
        <button className="composer-icon" type="button" title="支持 PDF、Word、图片和表格拖拽上传" onClick={() => inputRef.current?.click()} aria-label="Upload file">
          <Paperclip size={22} />
        </button>
        <textarea value={draft} rows={1} placeholder="有问题，尽管问" onChange={(event) => onDraftChange(event.target.value)} onKeyDown={handleKeyDown} />
        <select value={activeModelId} onChange={(event) => setActiveModel(event.target.value)} aria-label="Model">
          {models.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name}
            </option>
          ))}
        </select>
        <button className="composer-icon" type="button" aria-label="Voice input">
          <Mic size={21} />
        </button>
        {isStreaming ? (
          <button className="composer-submit" type="button" onClick={stopStreaming} aria-label="Stop">
            <Square size={17} />
          </button>
        ) : (
          <button className="composer-submit" type="button" onClick={submit} aria-label="Send">
            {draft.trim() ? <Send size={18} /> : <AudioLines size={22} />}
          </button>
        )}
      </div>
      <input ref={inputRef} className="visually-hidden" type="file" multiple accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.xls,.xlsx" onChange={handleInputChange} />
    </footer>
  );
}
