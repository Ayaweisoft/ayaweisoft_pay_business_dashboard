"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  LucideCreditCard,
  LucideBarChart2,
  LucideTrendingUp,
  LucideShieldCheck,
  LucideServer,
  LucidePlus,
  LucideSend,
  LucideChevronRight,
  LucideBanknote,
  LucideUser,
  LucideArrowUpRight,
  LucideArrowDownLeft,
  LucideRefreshCw,
  LucideActivity,
  LucideZap,
  LucideWifi,
  LucideCheckCircle2,
  LucideDownload,
} from "lucide-react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";

type TxType = "credit" | "debit" | "transfer";
type Health = "operational" | "degraded" | "down";
type ChartMetric = "value" | "volume";

interface Metric {
  title: string;
  value: string;
  icon: React.ReactNode;
  iconBg: string;
  trend?: number;
}

interface Transaction {
  id: string;
  name: string;
  amount: string;
  type: TxType;
  time: string;
  status: "completed" | "pending" | "failed";
}

interface ServiceHealth {
  name: string;
  status: Health;
  latency: string;
  icon: React.ReactNode;
}

interface ChartPoint {
  date: string;
  volume: number;
  value: number;
}

interface ChartTooltipItem {
  dataKey?: string;
  color?: string;
  value?: number | string;
}

const METRICS: Metric[] = [
  {
    title: "Total Balance",
    value: "₦5,200,000",
    icon: <LucideCreditCard size={18} strokeWidth={1.8} />,
    iconBg: "metric-icon--blue",
    trend: 12.5,
  },
  {
    title: "Total Transactions",
    value: "12,450",
    icon: <LucideBarChart2 size={18} strokeWidth={1.8} />,
    iconBg: "metric-icon--neutral",
    trend: 0,
  },
  {
    title: "Daily Revenue",
    value: "₦320,000",
    icon: <LucideTrendingUp size={18} strokeWidth={1.8} />,
    iconBg: "metric-icon--teal",
    trend: 8.2,
  },
  {
    title: "Virtual Accounts",
    value: "1,284",
    icon: <LucideBanknote size={18} strokeWidth={1.8} />,
    iconBg: "metric-icon--purple",
    trend: 3.1,
  },
];

const CHART_DATA: ChartPoint[] = [
  { date: "Mon", volume: 120, value: 50000 },
  { date: "Tue", volume: 180, value: 70000 },
  { date: "Wed", volume: 150, value: 60000 },
  { date: "Thu", volume: 200, value: 90000 },
  { date: "Fri", volume: 170, value: 80000 },
  { date: "Sat", volume: 220, value: 110000 },
  { date: "Sun", volume: 130, value: 55000 },
];

const TRANSACTIONS: Transaction[] = [
  { id: "TXN-8821", name: "Emeka Okafor", amount: "₦45,000", type: "credit", time: "2 min ago", status: "completed" },
  { id: "TXN-8820", name: "Zenith Bank API", amount: "₦120,000", type: "debit", time: "15 min ago", status: "completed" },
  { id: "TXN-8819", name: "Wallet Top-up", amount: "₦8,500", type: "credit", time: "1 hr ago", status: "pending" },
  { id: "TXN-8818", name: "Payout Batch #4", amount: "₦230,000", type: "transfer", time: "2 hr ago", status: "completed" },
  { id: "TXN-8817", name: "Chisom Eze", amount: "₦15,000", type: "debit", time: "3 hr ago", status: "failed" },
];

const SERVICES: ServiceHealth[] = [
  { name: "Payment Gateway", status: "operational", latency: "42ms", icon: <LucideZap size={14} strokeWidth={2} /> },
  { name: "Webhook Engine", status: "operational", latency: "18ms", icon: <LucideWifi size={14} strokeWidth={2} /> },
  { name: "KYC Verification", status: "degraded", latency: "620ms", icon: <LucideShieldCheck size={14} strokeWidth={2} /> },
  { name: "Core Banking API", status: "operational", latency: "95ms", icon: <LucideServer size={14} strokeWidth={2} /> },
  { name: "Notification Svc", status: "operational", latency: "30ms", icon: <LucideActivity size={14} strokeWidth={2} /> },
];

const CHART_METRICS: readonly ChartMetric[] = ["value", "volume"];

function fmt(n: number) {
  return new Intl.NumberFormat("en-NG", { notation: "compact", maximumFractionDigits: 1 }).format(n);
}

function statusLabel(s: Health) {
  return s === "operational" ? "Operational" : s === "degraded" ? "Degraded" : "Down";
}

function txPrefix(t: TxType) {
  return t === "credit" ? "+" : t === "debit" ? "-" : "~";
}

function txIcon(t: TxType) {
  if (t === "credit") return <LucideArrowDownLeft size={14} strokeWidth={2.2} />;
  if (t === "debit") return <LucideArrowUpRight size={14} strokeWidth={2.2} />;
  return <LucideRefreshCw size={14} strokeWidth={2.2} />;
}

function TrendChip({ val }: { val: number }) {
  if (val === 0) return <span className="trend-chip trend-chip--neutral">No change</span>;
  const up = val > 0;
  return (
    <span className={`trend-chip ${up ? "trend-chip--up" : "trend-chip--down"}`}>
      {up ? "▲" : "▼"} {Math.abs(val)}%
    </span>
  );
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: ChartTooltipItem[]; label?: string }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip__label">{label}</p>
      {payload.map((item) => (
        <p key={`${item.dataKey ?? "metric"}-${label ?? ""}`} className="chart-tooltip__row">
          <span className="chart-tooltip__key">{item.dataKey === "value" ? "Revenue" : "Volume"}</span>
          <span className="chart-tooltip__val" style={{ color: item.color }}>
            {item.dataKey === "value" ? `₦${fmt(Number(item.value ?? 0))}` : item.value}
          </span>
        </p>
      ))}
    </div>
  );
}

function Modal({ open, onClose, title, children }: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="db-modal-backdrop" onClick={onClose} role="dialog" aria-modal aria-label={title}>
      <div className="db-modal-panel" onClick={(e) => e.stopPropagation()}>
        <div className="db-modal-header">
          <h2 className="db-modal-title">{title}</h2>
          <button type="button" className="db-modal-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <div className="db-modal-body">{children}</div>
      </div>
    </div>
  );
}

function CreateWalletModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState({ name: "", currency: "NGN", type: "savings" });

  return (
    <Modal open={open} onClose={onClose} title="Create Virtual Wallet">
      <div className="db-modal-form">
        <div className="field">
          <label className="label">Account Name</label>
          <input
            className="input"
            placeholder="e.g. Operations Wallet"
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          />
        </div>
        <div className="field">
          <label className="label">Currency</label>
          <select
            className="input"
            value={form.currency}
            onChange={(e) => setForm((prev) => ({ ...prev, currency: e.target.value }))}
          >
            <option value="NGN">NGN — Nigerian Naira</option>
            <option value="USD">USD — US Dollar</option>
            <option value="GHS">GHS — Ghanaian Cedi</option>
          </select>
        </div>
        <div className="field">
          <label className="label">Wallet Type</label>
          <select
            className="input"
            value={form.type}
            onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value }))}
          >
            <option value="savings">Savings</option>
            <option value="current">Current</option>
            <option value="escrow">Escrow</option>
          </select>
        </div>
        <div className="db-modal-actions">
          <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button type="button" className="btn btn-gradient" onClick={onClose}>Create Wallet</button>
        </div>
      </div>
    </Modal>
  );
}

function SendPayoutModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState({ bank: "", account: "", name: "", amount: "" });

  return (
    <Modal open={open} onClose={onClose} title="Send Payout">
      <div className="db-modal-form">
        <div className="field">
          <label className="label">Bank</label>
          <select
            className="input"
            value={form.bank}
            onChange={(e) => setForm((prev) => ({ ...prev, bank: e.target.value }))}
          >
            <option value="">Select bank...</option>
            <option value="zenith">Zenith Bank</option>
            <option value="gtb">GTBank</option>
            <option value="access">Access Bank</option>
            <option value="uba">UBA</option>
            <option value="fcmb">FCMB</option>
          </select>
        </div>
        <div className="field">
          <label className="label">Account Number</label>
          <input
            className="input"
            placeholder="0123456789"
            maxLength={10}
            value={form.account}
            onChange={(e) => setForm((prev) => ({ ...prev, account: e.target.value }))}
          />
        </div>
        <div className="field">
          <label className="label">Beneficiary Name</label>
          <input
            className="input"
            placeholder="Verified automatically"
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          />
        </div>
        <div className="field">
          <label className="label">Amount (₦)</label>
          <input
            className="input"
            type="number"
            placeholder="0.00"
            value={form.amount}
            onChange={(e) => setForm((prev) => ({ ...prev, amount: e.target.value }))}
          />
        </div>
        <div className="db-modal-actions">
          <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button type="button" className="btn btn-primary" onClick={onClose}>
            <LucideSend size={14} /> Send Payout
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default function DashboardClient() {
  const [walletOpen, setWalletOpen] = useState(false);
  const [payoutOpen, setPayoutOpen] = useState(false);
  const [chartMetric, setChartMetric] = useState<ChartMetric>("value");

  const now = useMemo(
    () =>
      new Date().toLocaleString("en-NG", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    []
  );

  const operationalCount = SERVICES.filter((s) => s.status === "operational").length;

  return (
    <>
      <div className="db-root">
        <div className="db-topbar">
          <div>
            <h1 className="db-greeting">Good morning, Admin 👋</h1>
            <p className="db-time">{now} · All systems {operationalCount}/{SERVICES.length} operational</p>
          </div>
          <div className="db-actions">
            <button type="button" className="btn btn-ghost btn-sm u-gap-6">
              <LucideDownload size={14} /> Export
            </button>
            <button type="button" className="btn btn-subtle btn-sm u-gap-6" onClick={() => setWalletOpen(true)}>
              <LucidePlus size={14} /> New Wallet
            </button>
            <button type="button" className="btn btn-gradient btn-sm u-gap-6" onClick={() => setPayoutOpen(true)}>
              <LucideSend size={14} /> Send Payout
            </button>
          </div>
        </div>

        <div className="db-metrics">
          {METRICS.map((metric) => (
            <div key={metric.title} className="metric-card">
              <div className="metric-card__top">
                <span className="metric-card__label">{metric.title}</span>
                <span className={`metric-icon ${metric.iconBg}`}>{metric.icon}</span>
              </div>
              <div>
                <div className="metric-card__value">{metric.value}</div>
                <div className="metric-card__footer">
                  {(metric.trend ?? 0) !== 0 && <TrendChip val={metric.trend ?? 0} />}
                  <span className="metric-card__sub">
                    {(metric.trend ?? 0) !== 0 ? "vs last month" : "Last updated 2 min ago"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="db-content">
          <div className="db-left">
            <div className="panel">
              <div className="panel-header">
                <span className="panel-title">Transaction Activity</span>
                <div className="chart-tabs">
                  {CHART_METRICS.map((metric) => (
                    <button
                      type="button"
                      key={metric}
                      className={`chart-tab ${chartMetric === metric ? "chart-tab--active" : ""}`}
                      onClick={() => setChartMetric(metric)}
                    >
                      {metric === "value" ? "Revenue" : "Volume"}
                    </button>
                  ))}
                </div>
              </div>
              <div className="chart-wrap">
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={CHART_DATA} margin={{ top: 4, right: 8, bottom: 0, left: -18 }}>
                    <defs>
                      <linearGradient id="grad-value" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2e5bff" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#2e5bff" stopOpacity={0.02} />
                      </linearGradient>
                      <linearGradient id="grad-volume" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00f1fd" stopOpacity={0.25} />
                        <stop offset="100%" stopColor="#00f1fd" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                    <XAxis dataKey="date" tick={{ fill: "rgba(226,225,239,0.35)", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis
                      tick={{ fill: "rgba(226,225,239,0.35)", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v) => (chartMetric === "value" ? `₦${fmt(v)}` : String(v))}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(255,255,255,0.08)", strokeWidth: 1 }} />
                    <Area
                      type="monotone"
                      dataKey={chartMetric}
                      stroke={chartMetric === "value" ? "#2e5bff" : "#00f1fd"}
                      strokeWidth={2}
                      fill={`url(#grad-${chartMetric})`}
                      dot={false}
                      activeDot={{ r: 4, strokeWidth: 0, fill: chartMetric === "value" ? "#2e5bff" : "#00f1fd" }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="panel">
              <div className="panel-header">
                <span className="panel-title">Recent Transactions</span>
                <Link href="/transactions" className="panel-action">
                  View all <LucideChevronRight size={13} />
                </Link>
              </div>
              <div className="tx-list">
                {TRANSACTIONS.map((tx) => (
                  <div key={tx.id} className="tx-row">
                    <span className={`tx-type-icon tx-type-icon--${tx.type}`}>{txIcon(tx.type)}</span>
                    <div className="tx-info">
                      <div className="tx-name">{tx.name}</div>
                      <div className="tx-meta-row">
                        <span className="tx-id">{tx.id}</span>
                        <span className="db-tx-dot-sep">·</span>
                        <span className="tx-time">{tx.time}</span>
                      </div>
                    </div>
                    <div className="tx-right">
                      <span className={`tx-amount tx-amount--${tx.type}`}>{txPrefix(tx.type)}{tx.amount}</span>
                      <span className={`tx-status tx-status--${tx.status}`}>{tx.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="db-right">
            <div className="panel">
              <div className="panel-header">
                <span className="panel-title">Quick Actions</span>
              </div>
              <div className="db-quick-actions-wrap">
                <div className="quick-actions">
                  {[
                    { label: "Create Wallet", icon: <LucidePlus size={16} />, cls: "qa-icon--blue", action: () => setWalletOpen(true) },
                    { label: "Send Payout", icon: <LucideSend size={16} />, cls: "qa-icon--teal", action: () => setPayoutOpen(true) },
                    { label: "Virtual Acct", icon: <LucideBanknote size={16} />, cls: "qa-icon--purple", action: () => {} },
                    { label: "Add User", icon: <LucideUser size={16} />, cls: "qa-icon--green", action: () => {} },
                  ].map(({ label, icon, cls, action }) => (
                    <button type="button" key={label} className="qa-btn" onClick={action}>
                      <span className={`qa-icon ${cls}`}>{icon}</span>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="panel">
              <div className="panel-header">
                <span className="panel-title">System Health</span>
                <Link href="/system-health" className="panel-action" title="Open system health page">
                  Open page <LucideChevronRight size={12} />
                </Link>
              </div>
              <div className="health-summary">
                <LucideCheckCircle2 size={14} color="var(--success)" strokeWidth={2.2} />
                <span className="health-summary__text">
                  <span className="health-summary__count">{operationalCount}/{SERVICES.length}</span> services operational
                </span>
              </div>
              <div className="health-list">
                {SERVICES.map((service) => (
                  <div key={service.name} className="health-row">
                    <span className="health-icon-wrap">{service.icon}</span>
                    <span className="health-name">{service.name}</span>
                    <div className="health-right">
                      <span className="health-latency">{service.latency}</span>
                      <span className={`health-status health-status--${service.status}`}>{statusLabel(service.status)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <CreateWalletModal open={walletOpen} onClose={() => setWalletOpen(false)} />
      <SendPayoutModal open={payoutOpen} onClose={() => setPayoutOpen(false)} />
    </>
  );
}
