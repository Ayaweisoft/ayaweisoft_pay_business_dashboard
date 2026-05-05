"use client";

import { ReactNode, useEffect, useCallback } from "react";
import { LucideX } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  eyebrow?: string;
  children: ReactNode;
  maxWidth?: string;
}

export function Modal({ open, onClose, title, eyebrow, children, maxWidth = "480px" }: ModalProps) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={e => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="modal-sheet" style={{ maxWidth }}>
        <div className="modal-drag" />
        <div className="modal-inner">
          <div className="modal-head">
            <div>
              {eyebrow && <p className="modal-eyebrow">{eyebrow}</p>}
              {title && <h2 className="modal-title">{title}</h2>}
            </div>
            <button className="modal-close" onClick={onClose} aria-label="Close modal">
              <LucideX size={15} />
            </button>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}