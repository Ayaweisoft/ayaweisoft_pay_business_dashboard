import { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-bg-card rounded-xl shadow-xl p-6 min-w-[320px] max-w-lg w-full relative">
        <button
          className="absolute top-3 right-3 text-white/60 hover:text-white"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        {title && <div className="text-lg font-bold mb-4 text-white">{title}</div>}
        {children}
      </div>
    </div>
  );
}
