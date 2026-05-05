import { ReactNode } from "react";
import { LucideTrendingUp, LucideTrendingDown } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  iconVariant?: "blue" | "teal" | "purple" | "green" | "orange" | "neutral";
  change?: string | number;
  changeSub?: string;
  variant?: "default" | "success" | "warning" | "error" | "info";
}

const variantColorMap: Record<string, string> = {
  default: "var(--foreground)",
  success: "var(--success)",
  warning: "var(--warning)",
  error:   "var(--error)",
  info:    "var(--primary)",
};

export function MetricCard({
  title,
  value,
  icon,
  iconVariant = "blue",
  change,
  changeSub = "vs last month",
  variant = "default",
}: MetricCardProps) {
  const changeNum = typeof change === "number" ? change : parseFloat(String(change ?? "0"));
  const hasChange = change !== undefined && change !== "" && !isNaN(changeNum);
  const up = changeNum > 0;
  const flat = changeNum === 0;

  return (
    <div className="metric-card">
      <div className="metric-card__top">
        <span className="metric-card__label">{title}</span>
        {icon && (
          <span className={`icon-chip icon-chip--${iconVariant}`}>{icon}</span>
        )}
      </div>
      <div>
        <div className="metric-card__value" style={{ color: variantColorMap[variant] }}>
          {value}
        </div>
        {hasChange && (
          <div className="metric-card__footer" style={{ marginTop: 8 }}>
            <span className={`trend-badge ${flat ? "trend-badge--flat" : up ? "trend-badge--up" : "trend-badge--down"}`}>
              {!flat && (up
                ? <LucideTrendingUp  size={10} strokeWidth={2.5} />
                : <LucideTrendingDown size={10} strokeWidth={2.5} />
              )}
              {flat ? "No change" : `${up ? "+" : ""}${changeNum}%`}
            </span>
            <span className="metric-card__sub">{changeSub}</span>
          </div>
        )}
      </div>
    </div>
  );
}