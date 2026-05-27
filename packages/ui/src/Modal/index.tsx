import type { ReactNode } from "react";

export type ModalProps = {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
};

export function Modal({ open, title, children, onClose }: ModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div role="dialog" aria-modal="true" aria-label={title}>
      <header>
        <h2>{title}</h2>
        <button type="button" onClick={onClose} aria-label="Close">
          x
        </button>
      </header>
      {children}
    </div>
  );
}
