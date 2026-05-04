import { ReactNode } from "react";

interface StatusBadgeProps {
  status: "success" | "pending" | "failed";
  children?: ReactNode;
}

const statusMap = {
  success: { color: "bg-success/20 text-success", label: "Success" },
  pending: { color: "bg-warning/20 text-warning", label: "Pending" },
  failed: { color: "bg-error/20 text-error", label: "Failed" },
};

export function StatusBadge({ status, children }: StatusBadgeProps) {
  const { color, label } = statusMap[status];
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${color}`}>{children || label}</span>
  );
}
