import { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title?: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="empty-state">
      {icon && (
        <span className="empty-state__icon" style={{ color: "var(--foreground-muted)" }}>
          {icon}
        </span>
      )}
      {title && (
        <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--foreground)", marginTop: 4 }}>
          {title}
        </p>
      )}
      {description && <p>{description}</p>}
      {action && <div style={{ marginTop: 8 }}>{action}</div>}
    </div>
  );
}