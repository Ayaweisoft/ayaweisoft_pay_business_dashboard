import { ReactNode, useState } from "react";

interface ChartTab {
  label: string;
  key: string;
}

interface ChartCardProps {
  title: string;
  children: ReactNode | ((activeTab: string) => ReactNode);
  action?: ReactNode;
  tabs?: ChartTab[];
  defaultTab?: string;
  subtitle?: string;
  stat?: { label: string; value: string; trend?: number };
}

export function ChartCard({ title, children, action, tabs, defaultTab, subtitle, stat }: ChartCardProps) {
  const [activeTab, setActiveTab] = useState(defaultTab ?? tabs?.[0]?.key ?? "");

  return (
    <div className="panel">
      <div className="panel-header" style={{ flexWrap: "wrap", gap: 10 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <span className="panel-title">{title}</span>
          {subtitle && (
            <span style={{ fontSize: "0.73rem", color: "var(--foreground-muted)" }}>
              {subtitle}
            </span>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: "auto" }}>
          {/* Tab switcher */}
          {tabs && tabs.length > 0 && (
            <div style={{ display: "flex", gap: 4 }}>
              {tabs.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  style={{
                    padding: "4px 12px",
                    borderRadius: "var(--radius-sm)",
                    fontSize: "0.73rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    border: "1px solid",
                    transition: "all 150ms ease",
                    background: activeTab === tab.key ? "rgba(46,91,255,0.15)" : "none",
                    borderColor: activeTab === tab.key ? "rgba(46,91,255,0.3)" : "transparent",
                    color: activeTab === tab.key ? "var(--primary)" : "var(--foreground-muted)",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}

          {/* Optional external action */}
          {action && <div>{action}</div>}
        </div>
      </div>

      {/* Stat hero (optional) */}
      {stat && (
        <div style={{
          padding: "14px 20px 0",
          display: "flex", alignItems: "baseline", gap: 10,
        }}>
          <span style={{
            fontSize: "1.6rem", fontWeight: 800, letterSpacing: "-0.03em",
            fontVariantNumeric: "tabular-nums", color: "var(--foreground)", lineHeight: 1,
          }}>
            {stat.value}
          </span>
          {stat.trend !== undefined && (
            <span className={`trend-badge ${stat.trend >= 0 ? "trend-badge--up" : "trend-badge--down"}`}>
              {stat.trend >= 0 ? "▲" : "▼"} {Math.abs(stat.trend)}%
            </span>
          )}
          <span style={{ fontSize: "0.73rem", color: "var(--foreground-muted)" }}>{stat.label}</span>
        </div>
      )}

      {/* Chart body */}
      <div style={{ padding: "16px 8px 12px" }}>
        {typeof children === "function" ? children(activeTab) : children}
      </div>
    </div>
  );
}