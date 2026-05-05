import { ReactNode } from "react";
import { LucideCheckCircle2, LucideClock, LucideX, LucideRefreshCw, LucideAlertCircle } from "lucide-react";

type Status = "success" | "pending" | "failed" | "processing" | "active" | "frozen" | "inactive";

interface StatusBadgeProps {
  status: Status;
  children?: ReactNode;
  showIcon?: boolean;
}

const statusConfig: Record<Status, { mod: string; label: string; icon: ReactNode }> = {
  success:    { mod: "badge--success",    label: "Success",    icon: <LucideCheckCircle2 size={11} strokeWidth={2.5} /> },
  pending:    { mod: "badge--pending",    label: "Pending",    icon: <LucideClock        size={11} strokeWidth={2.5} /> },
  failed:     { mod: "badge--failed",     label: "Failed",     icon: <LucideX            size={11} strokeWidth={2.5} /> },
  processing: { mod: "badge--processing", label: "Processing", icon: <LucideRefreshCw    size={11} strokeWidth={2.5} /> },
  active:     { mod: "badge--success",    label: "Active",     icon: <LucideCheckCircle2 size={11} strokeWidth={2.5} /> },
  frozen:     { mod: "badge--frozen",     label: "Frozen",     icon: <LucideAlertCircle  size={11} strokeWidth={2.5} /> },
  inactive:   { mod: "badge--neutral",    label: "Inactive",   icon: <LucideAlertCircle  size={11} strokeWidth={2.5} /> },
};

export function StatusBadge({ status, children, showIcon = true }: StatusBadgeProps) {
  const config = statusConfig[status] ?? statusConfig.inactive;
  return (
    <span className={`badge ${config.mod}`}>
      {showIcon && config.icon}
      {children ?? config.label}
    </span>
  );
}