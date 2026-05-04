"use client";

import { useState } from "react";
import { LucidePlus, LucideX } from "lucide-react";

export function AddItemModal({ open, onClose, onAdd }: { open: boolean; onClose: () => void; onAdd: (value: string) => void }) {
  const [value, setValue] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-bg-card rounded-2xl shadow-xl p-8 w-full max-w-sm relative">
        <button
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-white/10 text-white/60"
          onClick={onClose}
          aria-label="Close"
        >
          <LucideX size={20} />
        </button>
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <LucidePlus size={20} /> Add Item
        </h2>
        <input
          className="w-full px-4 py-2 rounded-lg bg-bg-dark border border-border text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary mb-4"
          placeholder="Enter item name..."
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <button
          className="w-full py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition disabled:opacity-50"
          onClick={() => { if (value.trim()) { onAdd(value); setValue(""); onClose(); } }}
          disabled={!value.trim()}
        >
          Add
        </button>
      </div>
    </div>
  );
}
