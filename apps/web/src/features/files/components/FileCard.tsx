import { FileArchive, FileSpreadsheet, FileText, Image, Trash2 } from "lucide-react";
import type { UploadedFile } from "../../../types/workbench";

type FileCardProps = {
  file: UploadedFile;
  onDelete: (fileId: string) => void;
};

const icons = {
  pdf: FileArchive,
  word: FileText,
  image: Image,
  sheet: FileSpreadsheet
};

const statusText = {
  uploading: "上传中",
  parsing: "解析中",
  ready: "完成",
  error: "失败"
};

export function FileCard({ file, onDelete }: FileCardProps) {
  const Icon = icons[file.type];

  return (
    <article className="file-card">
      <div className="file-icon">
        <Icon size={18} />
      </div>
      <div className="file-meta">
        <strong>{file.name}</strong>
        <span>
          {file.size} · {statusText[file.status]}
        </span>
        {file.status !== "ready" ? (
          <div className="progress-track">
            <span style={{ width: `${file.progress}%` }} />
          </div>
        ) : null}
      </div>
      <button className="icon-button subtle" type="button" onClick={() => onDelete(file.id)} aria-label="Delete file">
        <Trash2 size={16} />
      </button>
    </article>
  );
}
