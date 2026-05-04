import { ReactNode } from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  change?: string;
  variant?: "default" | "success" | "warning" | "error";
}

export function MetricCard({ title, value, icon, change, variant = "default" }: MetricCardProps) {
  const colorMap = {
    default: "text-primary",
    success: "text-success",
    warning: "text-warning",
    error: "text-error",
  };
  return (
    <div className="glass-card p-6 flex flex-col gap-2 min-w-50">
      <div className="flex items-center gap-2">
        {icon && <span className="text-xl">{icon}</span>}
        <span className="text-sm text-white/70 font-medium">{title}</span>
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
      {change && (
        <div className={`text-xs font-semibold ${colorMap[variant]}`}>{change}</div>
      )}
    </div>
  );
}
