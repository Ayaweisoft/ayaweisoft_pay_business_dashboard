"use client";

import { ReactNode, useEffect, useState } from "react";
import { LucideCheckCircle2, LucideAlertCircle, LucideInfo, LucideX } from "lucide-react";

type ToastType = "success" | "error" | "info" | "warning";

interface ToastProps {
  message: string;
  type?: ToastType;
  action?: ReactNode;
  duration?: number;       // ms — 0 = persist
  onDismiss?: () => void;
}

const toastConfig: Record<ToastType, {
  bg: string; border: string; color: string; icon: ReactNode;
}> = {
  success: {
    bg:     "rgba(34,197,94,0.1)",
    border: "rgba(34,197,94,0.25)",
    color:  "#4ade80",
    icon:   <LucideCheckCircle2 size={15} strokeWidth={2.2} />,
  },
  error: {
    bg:     "rgba(255,180,171,0.1)",
    border: "rgba(255,180,171,0.25)",
    color:  "var(--error)",
    icon:   <LucideAlertCircle size={15} strokeWidth={2.2} />,
  },
  warning: {
    bg:     "rgba(245,158,11,0.1)",
    border: "rgba(245,158,11,0.25)",
    color:  "var(--warning)",
    icon:   <LucideAlertCircle size={15} strokeWidth={2.2} />,
  },
  info: {
    bg:     "rgba(46,91,255,0.1)",
    border: "rgba(46,91,255,0.25)",
    color:  "var(--primary)",
    icon:   <LucideInfo size={15} strokeWidth={2.2} />,
  },
};

export function Toast({ message, type = "info", action, duration = 4000, onDismiss }: ToastProps) {
  const [visible, setVisible] = useState(true);
  const config = toastConfig[type];

  useEffect(() => {
    if (!duration) return;
    const t = setTimeout(() => {
      setVisible(false);
      onDismiss?.();
    }, duration);
    return () => clearTimeout(t);
  }, [duration, onDismiss]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "12px 16px",
        borderRadius: "var(--radius-lg)",
        background: "var(--surface-container-high)",
        border: `1px solid ${config.border}`,
        boxShadow: "var(--shadow-lg)",
        minWidth: 260,
        maxWidth: 400,
        animation: "fade-up 0.25s var(--ease-out) both",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Colored left border accent */}
      <span style={{
        position: "absolute", left: 0, top: 6, bottom: 6,
        width: 3, borderRadius: "0 2px 2px 0",
        background: config.color,
      }} />

      {/* Icon */}
      <span style={{ color: config.color, flexShrink: 0, marginLeft: 4 }}>
        {config.icon}
      </span>

      {/* Message */}
      <span style={{
        flex: 1, fontSize: "0.83rem", fontWeight: 500,
        color: "var(--foreground)", lineHeight: 1.4,
      }}>
        {message}
      </span>

      {/* Optional CTA */}
      {action && <div style={{ flexShrink: 0 }}>{action}</div>}

      {/* Dismiss */}
      <button
        onClick={() => { setVisible(false); onDismiss?.(); }}
        style={{
          padding: "3px", borderRadius: "var(--radius-sm)",
          background: "none", border: "none", cursor: "pointer",
          color: "var(--foreground-muted)", flexShrink: 0,
          transition: "color 140ms, background 140ms",
          display: "flex",
        }}
        onMouseOver={e => (e.currentTarget.style.color = "var(--foreground)")}
        onMouseOut={e  => (e.currentTarget.style.color = "var(--foreground-muted)")}
        aria-label="Dismiss"
      >
        <LucideX size={13} />
      </button>
    </div>
  );
}


// ─── Toast Manager (multiple toasts) ─────────────────────────────────────────

export interface ToastItem {
  id: string;
  message: string;
  type?: ToastType;
  action?: ReactNode;
  duration?: number;
}

export function ToastStack({ toasts, onRemove }: {
  toasts: ToastItem[];
  onRemove: (id: string) => void;
}) {
  return (
    <div style={{
      position: "fixed", bottom: 24, right: 24, zIndex: 200,
      display: "flex", flexDirection: "column-reverse", gap: 10,
    }}>
      {toasts.map(t => (
        <Toast
          key={t.id}
          message={t.message}
          type={t.type}
          action={t.action}
          duration={t.duration}
          onDismiss={() => onRemove(t.id)}
        />
      ))}
    </div>
  );
}