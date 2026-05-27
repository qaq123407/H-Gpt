import { FileCard } from "./FileCard";
import type { UploadedFile } from "../../../types/workbench";

type FileStripProps = {
  files: UploadedFile[];
  onDelete: (fileId: string) => void;
};

export function FileStrip({ files, onDelete }: FileStripProps) {
  if (!files.length) {
    return null;
  }

  return (
    <div className="file-strip">
      {files.map((file) => (
        <FileCard key={file.id} file={file} onDelete={onDelete} />
      ))}
    </div>
  );
}
