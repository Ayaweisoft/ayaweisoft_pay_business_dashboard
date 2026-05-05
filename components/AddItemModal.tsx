"use client";

import { useState } from "react";
import { LucidePlus } from "lucide-react";
import { Modal } from "./Modal";
import { FormInput } from "./FormInput";

interface AddItemModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (value: string) => void;
  title?: string;
  placeholder?: string;
  label?: string;
  submitLabel?: string;
}

export function AddItemModal({
  open,
  onClose,
  onAdd,
  title = "Add Item",
  placeholder = "Enter item name…",
  label = "Name",
  submitLabel = "Add",
}: AddItemModalProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    onAdd(value.trim());
    setValue("");
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={title} eyebrow="Action">
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <FormInput
          label={label}
          placeholder={placeholder}
          value={value}
          onChange={e => setValue(e.target.value)}
          autoFocus
        />
        <div style={{ display: "flex", gap: 10, paddingTop: 4 }}>
          <button
            type="button"
            className="btn btn-ghost"
            style={{ flex: 1, justifyContent: "center" }}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-gradient"
            style={{ flex: 2, justifyContent: "center" }}
            disabled={!value.trim()}
          >
            <LucidePlus size={14} /> {submitLabel}
          </button>
        </div>
      </form>
    </Modal>
  );
}