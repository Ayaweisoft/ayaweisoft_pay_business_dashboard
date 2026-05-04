"use client";

import { ReactNode, useEffect, useCallback } from "react";
import { LucideX } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Utility for cleaner tailwind classes */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  // Close on Escape key press
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      // Prevent scrolling on the background when modal is open
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  return (
    <div 
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => e.target === e.currentTarget && onClose()} // Close on backdrop click
      aria-modal="true"
      role="dialog"
    >
      <div 
        className={cn(
          "bg-bg-card border border-border rounded-2xl shadow-2xl p-6",
          "min-w-[320px] max-w-lg w-full relative",
          "animate-in zoom-in-95 slide-in-from-bottom-2 duration-300"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          {title ? (
            <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>
          ) : (
            <div /> // Spacer
          )}
          
          <button
            className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-all"
            onClick={onClose}
            aria-label="Close modal"
          >
            <LucideX size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="text-white/90">
          {children}
        </div>
      </div>
    </div>
  );
}