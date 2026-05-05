"use client";

import { useMemo, useState } from "react";
import {
  LucideActivity,
  LucideServer,
  LucideShieldCheck,
  LucideBellRing,
  LucideRefreshCw,
  LucideZap,
  LucideWifi,
  LucideClock3,
  LucideCheckCircle2,
  LucideTriangleAlert,
  LucideXCircle,
} from "lucide-react";

type Health = "operational" | "degraded" | "down";
type TimeWindow = "30m" | "24h" | "7d";

interface ServiceHealth {
  id: string;
  name: string;
  status: Health;
  latency: string;
  uptime: string;
  icon: React.ReactNode;
}

interface IncidentItem {
  id: string;
  title: string;
  severity: "info" | "warning" | "critical";
  startedAt: string;
  resolvedAt: string;
  impact: string;
}

const SERVICES: ServiceHealth[] = [
  { id: "svc-01", name: "Core Banking API", status: "operational", latency: "95ms", uptime: "99.99%", icon: <LucideServer size={14} strokeWidth={2.1} /> },
  { id: "svc-02", name: "Payment Gateway", status: "operational", latency: "42ms", uptime: "99.98%", icon: <LucideZap size={14} strokeWidth={2.1} /> },
  { id: "svc-03", name: "Webhook Engine", status: "operational", latency: "18ms", uptime: "99.96%", icon: <LucideWifi size={14} strokeWidth={2.1} /> },
  { id: "svc-04", name: "KYC Verification", status: "degraded", latency: "620ms", uptime: "99.72%", icon: <LucideShieldCheck size={14} strokeWidth={2.1} /> },
  { id: "svc-05", name: "Notification Service", status: "operational", latency: "30ms", uptime: "99.94%", icon: <LucideBellRing size={14} strokeWidth={2.1} /> },
];

const INCIDENTS: IncidentItem[] = [
  {
    id: "INC-9021",
    title: "KYC provider latency spike",
    severity: "warning",
    startedAt: "Today, 09:12 AM",
    resolvedAt: "Today, 09:47 AM",
    impact: "Verification checks delayed for 8.3% of new accounts.",
  },
  {
    id: "INC-8994",
    title: "Webhook retries queue backlog",
    severity: "info",
    startedAt: "Yesterday, 11:05 PM",
    resolvedAt: "Yesterday, 11:23 PM",
    impact: "Delivery retries increased for 12 minutes.",
  },
  {
    id: "INC-8920",
    title: "Core API partial outage",
    severity: "critical",
    startedAt: "Apr 30, 06:41 PM",
    resolvedAt: "Apr 30, 07:16 PM",
    impact: "Transfer creation failed for a subset of merchants.",
  },
];

function statusLabel(status: Health) {
  if (status === "operational") return "Operational";
  if (status === "degraded") return "Degraded";
  return "Down";
}

function severityMeta(severity: IncidentItem["severity"]) {
  if (severity === "critical") {
    return {
      chip: "badge badge--error",
      icon: <LucideXCircle size={13} strokeWidth={2.1} />,
      iconWrap: "sh-incident-icon sh-incident-icon--critical",
      label: "Critical",
    };
  }
  if (severity === "warning") {
    return {
      chip: "badge badge--warning",
      icon: <LucideTriangleAlert size={13} strokeWidth={2.1} />,
      iconWrap: "sh-incident-icon sh-incident-icon--warning",
      label: "Warning",
    };
  }
  return {
    chip: "badge badge--info",
    icon: <LucideCheckCircle2 size={13} strokeWidth={2.1} />,
    iconWrap: "sh-incident-icon sh-incident-icon--info",
    label: "Info",
  };
}

export default function SystemHealthClient() {
  const [window, setWindow] = useState<TimeWindow>("24h");

  const totals = useMemo(() => {
    const operational = SERVICES.filter((s) => s.status === "operational").length;
    const degraded = SERVICES.filter((s) => s.status === "degraded").length;
    const down = SERVICES.filter((s) => s.status === "down").length;
    return { operational, degraded, down };
  }, []);

  return (
    <div className="page-root">
      <div className="page-header">
        <div>
          <h1 className="page-title">System Health</h1>
          <p className="page-sub">Live service status, latency trends, and recent incidents across your infrastructure.</p>
        </div>
        <div className="page-actions">
          <div className="filter-tabs" role="tablist" aria-label="Health time range">
            <button type="button" className={`filter-tab ${window === "30m" ? "filter-tab--active" : ""}`} onClick={() => setWindow("30m")}>30m</button>
            <button type="button" className={`filter-tab ${window === "24h" ? "filter-tab--active" : ""}`} onClick={() => setWindow("24h")}>24h</button>
            <button type="button" className={`filter-tab ${window === "7d" ? "filter-tab--active" : ""}`} onClick={() => setWindow("7d")}>7d</button>
          </div>
          <button type="button" className="btn btn-ghost btn-sm u-gap-6">
            <LucideRefreshCw size={14} /> Refresh
          </button>
        </div>
      </div>

      <div className="sum-grid">
        <div className="sum-card">
          <span className="sum-label">Operational</span>
          <span className="sum-value u-text-success">{totals.operational}</span>
          <span className="sum-sub">Healthy services now</span>
        </div>
        <div className="sum-card">
          <span className="sum-label">Degraded</span>
          <span className="sum-value u-text-warning">{totals.degraded}</span>
          <span className="sum-sub">Monitoring required</span>
        </div>
        <div className="sum-card">
          <span className="sum-label">Down</span>
          <span className="sum-value" style={{ color: "var(--error)" }}>{totals.down}</span>
          <span className="sum-sub">Critical outage count</span>
        </div>
      </div>

      <div className="sh-grid">
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">Service Status</span>
            <span className="badge badge--neutral">{window} window</span>
          </div>
          <div className="sh-summary">
            <LucideActivity size={14} strokeWidth={2.2} color="var(--success)" />
            <span className="sh-summary-text">
              <span className="sh-summary-count">{totals.operational}/{SERVICES.length}</span> services operational
            </span>
          </div>
          <div className="sh-list">
            {SERVICES.map((service) => (
              <div key={service.id} className="sh-row">
                <span className="sh-icon-wrap">{service.icon}</span>
                <div className="sh-main">
                  <p className="sh-name">{service.name}</p>
                  <p className="sh-uptime">Uptime: {service.uptime}</p>
                </div>
                <div className="sh-right">
                  <span className="sh-latency">{service.latency}</span>
                  <span className={`sh-status sh-status--${service.status}`}>{statusLabel(service.status)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">Incident Timeline</span>
            <span className="panel-action" style={{ cursor: "default" }}>
              <LucideClock3 size={12} /> Last 7 days
            </span>
          </div>
          <div className="sh-incident-list">
            {INCIDENTS.map((item) => {
              const meta = severityMeta(item.severity);
              return (
                <div key={item.id} className="sh-incident-row">
                  <span className={meta.iconWrap}>{meta.icon}</span>
                  <div className="sh-incident-main">
                    <div className="sh-incident-top">
                      <p className="sh-incident-title">{item.title}</p>
                      <span className={meta.chip}>{meta.label}</span>
                    </div>
                    <p className="sh-incident-impact">{item.impact}</p>
                    <div className="sh-incident-meta">
                      <span className="mono sh-incident-id">{item.id}</span>
                      <span className="sh-dot">•</span>
                      <span>Started: {item.startedAt}</span>
                      <span className="sh-dot">•</span>
                      <span>Resolved: {item.resolvedAt}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
