import { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title?: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
      {icon && <div className="text-4xl text-primary">{icon}</div>}
      {title && <div className="text-lg font-bold text-white/90">{title}</div>}
      {description && <div className="text-sm text-white/60">{description}</div>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
