"use client";

import { useState, useMemo } from "react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell, Legend, CartesianGrid, LineChart, Line, Area, AreaChart,
} from "recharts";
import {
  LucideTrendingUp, LucideUsers, LucideArrowUpRight, LucideArrowDownRight,
  LucidePieChart, LucideActivity, LucideCalendar, LucideDownload,
} from "lucide-react";

// ─── Data ───────────────────────────────────────────────────────────
const REVENUE_7 = [
  { date: "Mon", revenue: 50000, prev: 42000 },
  { date: "Tue", revenue: 70000, prev: 65000 },
  { date: "Wed", revenue: 60000, prev: 58000 },
  { date: "Thu", revenue: 90000, prev: 72000 },
  { date: "Fri", revenue: 80000, prev: 76000 },
  { date: "Sat", revenue: 110000, prev: 88000 },
  { date: "Sun", revenue: 55000, prev: 50000 },
];

const REVENUE_30 = Array.from({ length: 30 }, (_, i) => ({
  date: `${i + 1}`,
  revenue: 40000 + Math.floor(Math.random() * 80000),
  prev: 35000 + Math.floor(Math.random() * 60000),
}));

const BREAKDOWN_DATA = [
  { name: "Credit",  value: 320000 },
  { name: "Debit",   value: 180000 },
  { name: "Fees",    value:  20000 },
];

const PIE_COLORS  = ["#2e5bff", "#34d399", "#f97316"];
const BAR_COLOR   = "#2e5bff";
const PREV_COLOR  = "rgba(255,255,255,0.12)";

const TOP_USERS = [
  { name: "John Doe",    amount: 120000, transactions: 45, change: 12.4  },
  { name: "Jane Smith",  amount:  95000, transactions: 32, change:  8.1  },
  { name: "Mike Lee",    amount:  80000, transactions: 28, change: -2.3  },
  { name: "Amara Obi",   amount:  63000, transactions: 21, change: 19.7  },
  { name: "Tunde Bello", amount:  47500, transactions: 17, change:  5.0  },
];

const KPI_DATA = [
  { label: "Total Revenue",    value: "₦515,000", sub: "+14.2% vs last period", up: true,  icon: LucideTrendingUp  },
  { label: "Transactions",     value: "143",       sub: "+6 vs last period",     up: true,  icon: LucideActivity    },
  { label: "Avg. Order Value", value: "₦3,601",    sub: "-1.8% vs last period",  up: false, icon: LucidePieChart    },
  { label: "Active Users",     value: "38",        sub: "+5 new this period",    up: true,  icon: LucideUsers       },
];

// ─── Custom Tooltip ──────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="an-tooltip">
      <p className="an-tooltip-label">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color }} className="an-tooltip-row">
          {p.name === "prev" ? "Prev" : "Rev"}: ₦{Number(p.value).toLocaleString()}
        </p>
      ))}
    </div>
  );
};

const PieTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="an-tooltip">
      <p className="an-tooltip-label">{payload[0].name}</p>
      <p style={{ color: payload[0].payload.fill }} className="an-tooltip-row">
        ₦{Number(payload[0].value).toLocaleString()}
      </p>
    </div>
  );
};

// ─── Component ───────────────────────────────────────────────────────
export default function AnalyticsClient() {
  const [days, setDays] = useState(7);
  const revenueData = useMemo(() => days === 7 ? REVENUE_7 : REVENUE_30, [days]);
  const totalRevenue = useMemo(() => revenueData.reduce((s, d) => s + d.revenue, 0), [revenueData]);

  return (
    <>
      <style>{styles}</style>
      <div className="an-root">

        {/* ── Page Header ── */}
        <div className="an-page-header">
          <div>
            <h1 className="an-page-title">Analytics</h1>
            <p className="an-page-sub">Revenue & transaction insights for your account.</p>
          </div>
          <div className="an-header-actions">
            <div className="an-period-selector">
              <LucideCalendar size={13} />
              <select
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="an-select"
              >
                <option value={7}>Last 7 Days</option>
                <option value={30}>Last 30 Days</option>
              </select>
            </div>
            <button className="an-export-btn">
              <LucideDownload size={13} />
              Export
            </button>
          </div>
        </div>

        {/* ── KPI Cards ── */}
        <div className="an-kpi-grid">
          {KPI_DATA.map((kpi, i) => (
            <div key={i} className="an-kpi-card" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="an-kpi-top">
                <span className="an-kpi-label">{kpi.label}</span>
                <span className={`an-kpi-icon-wrap ${kpi.up ? "an-kpi-icon-wrap--up" : "an-kpi-icon-wrap--down"}`}>
                  <kpi.icon size={13} />
                </span>
              </div>
              <p className="an-kpi-value">{kpi.value}</p>
              <div className={`an-kpi-sub ${kpi.up ? "an-kpi-sub--up" : "an-kpi-sub--down"}`}>
                {kpi.up
                  ? <LucideArrowUpRight size={11} />
                  : <LucideArrowDownRight size={11} />}
                {kpi.sub}
              </div>
            </div>
          ))}
        </div>

        {/* ── Charts Row ── */}
        <div className="an-charts-grid">

          {/* Revenue Area/Bar Chart */}
          <div className="an-card an-card--wide">
            <div className="an-card-header">
              <div className="an-card-title-group">
                <span className="an-card-icon-wrap" style={{ background: "rgba(46,91,255,0.15)" }}>
                  <LucideTrendingUp size={14} color="#2e5bff" />
                </span>
                <div>
                  <h2 className="an-card-title">Revenue Trend</h2>
                  <p className="an-card-subtitle">₦{totalRevenue.toLocaleString()} total</p>
                </div>
              </div>
              <div className="an-legend-row">
                <span className="an-legend-dot" style={{ background: BAR_COLOR }} />
                <span className="an-legend-text">This period</span>
                <span className="an-legend-dot" style={{ background: PREV_COLOR, border: "1px solid rgba(255,255,255,0.2)" }} />
                <span className="an-legend-text">Previous</span>
              </div>
            </div>
            <div className="an-chart-area">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData} barGap={3} barCategoryGap="30%">
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }}
                    tickFormatter={(v) => `₦${(v / 1000).toFixed(0)}k`} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                  <Bar dataKey="prev" fill={PREV_COLOR} radius={[3, 3, 0, 0]} name="prev" />
                  <Bar dataKey="revenue" fill={BAR_COLOR} radius={[4, 4, 0, 0]} name="revenue">
                    {revenueData.map((_, idx) => (
                      <Cell
                        key={idx}
                        fill={idx === revenueData.reduce((mi, d, i, a) => d.revenue > a[mi].revenue ? i : mi, 0)
                          ? "#34d399" : BAR_COLOR}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Breakdown Pie */}
          <div className="an-card">
            <div className="an-card-header">
              <div className="an-card-title-group">
                <span className="an-card-icon-wrap" style={{ background: "rgba(52,211,153,0.15)" }}>
                  <LucidePieChart size={14} color="#34d399" />
                </span>
                <div>
                  <h2 className="an-card-title">Breakdown</h2>
                  <p className="an-card-subtitle">By payment type</p>
                </div>
              </div>
            </div>
            <div className="an-chart-area">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={BREAKDOWN_DATA}
                    innerRadius="48%"
                    outerRadius="68%"
                    paddingAngle={4}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {BREAKDOWN_DATA.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<PieTooltip />} />
                  <Legend
                    iconType="circle"
                    iconSize={7}
                    formatter={(value) => (
                      <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>{value}</span>
                    )}
                    wrapperStyle={{ paddingTop: 12 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Centre total */}
            <div className="an-pie-center" aria-hidden="true">
              <p className="an-pie-center-value">₦520k</p>
              <p className="an-pie-center-label">Total</p>
            </div>
          </div>
        </div>

        {/* ── Top Users Table ── */}
        <div className="an-card">
          <div className="an-card-header">
            <div className="an-card-title-group">
              <span className="an-card-icon-wrap" style={{ background: "rgba(249,115,22,0.15)" }}>
                <LucideUsers size={14} color="#f97316" />
              </span>
              <div>
                <h2 className="an-card-title">Top Performing Users</h2>
                <p className="an-card-subtitle">Ranked by volume this period</p>
              </div>
            </div>
          </div>
          <div className="an-table-wrap">
            <table className="an-table">
              <thead>
                <tr className="an-table-head-row">
                  <th className="an-th">Rank</th>
                  <th className="an-th">User</th>
                  <th className="an-th">Volume</th>
                  <th className="an-th">Txns</th>
                  <th className="an-th an-th--right">Change</th>
                </tr>
              </thead>
              <tbody>
                {TOP_USERS.map((user, idx) => (
                  <tr key={idx} className="an-table-row">
                    <td className="an-td">
                      <span className={`an-rank ${idx === 0 ? "an-rank--gold" : idx === 1 ? "an-rank--silver" : idx === 2 ? "an-rank--bronze" : ""}`}>
                        #{idx + 1}
                      </span>
                    </td>
                    <td className="an-td">
                      <div className="an-user-cell">
                        <div className="an-user-avatar" style={{ background: `hsl(${idx * 60 + 210},70%,55%)` }}>
                          {user.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <span className="an-user-name">{user.name}</span>
                      </div>
                    </td>
                    <td className="an-td an-td--bright">₦{user.amount.toLocaleString()}</td>
                    <td className="an-td an-td--muted">{user.transactions}</td>
                    <td className="an-td an-td--right">
                      <span className={`an-change-badge ${user.change >= 0 ? "an-change-badge--up" : "an-change-badge--down"}`}>
                        {user.change >= 0 ? <LucideArrowUpRight size={10} /> : <LucideArrowDownRight size={10} />}
                        {Math.abs(user.change)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────
const styles = `
  :root {
    --an-bg: #0d0f14;
    --an-card-bg: rgba(255,255,255,0.04);
    --an-card-border: rgba(255,255,255,0.07);
    --an-card-hover: rgba(255,255,255,0.06);
    --an-text-bright: #f0f2ff;
    --an-text-muted: rgba(240,242,255,0.45);
    --an-text-faint: rgba(240,242,255,0.25);
    --an-primary: #2e5bff;
    --an-success: #34d399;
    --an-warning: #f97316;
    --an-danger: #f87171;
    --an-radius: 14px;
    --an-radius-sm: 8px;
    --an-t: 0.2s cubic-bezier(0.4,0,0.2,1);
  }

  .an-root {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 24px 20px;
    min-height: 100vh;
    background: var(--an-bg);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }

  /* ── Page header ── */
  .an-page-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
  }
  .an-page-title {
    font-size: 22px;
    font-weight: 800;
    color: var(--an-text-bright);
    letter-spacing: -0.02em;
    margin: 0 0 2px;
  }
  .an-page-sub {
    font-size: 13px;
    color: var(--an-text-muted);
    margin: 0;
  }
  .an-header-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }
  .an-period-selector {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 7px 12px;
    border-radius: var(--an-radius-sm);
    background: var(--an-card-bg);
    border: 1px solid var(--an-card-border);
    color: var(--an-text-muted);
    font-size: 12px;
  }
  .an-select {
    background: transparent;
    border: none;
    color: var(--an-text-bright);
    font-size: 12px;
    outline: none;
    cursor: pointer;
  }
  .an-export-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 7px 14px;
    border-radius: var(--an-radius-sm);
    background: rgba(46,91,255,0.15);
    border: 1px solid rgba(46,91,255,0.3);
    color: var(--an-primary);
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: background var(--an-t), box-shadow var(--an-t);
  }
  .an-export-btn:hover {
    background: rgba(46,91,255,0.25);
    box-shadow: 0 4px 16px rgba(46,91,255,0.2);
  }

  /* ── KPI Grid ── */
  .an-kpi-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
  }
  .an-kpi-card {
    padding: 16px;
    border-radius: var(--an-radius);
    background: var(--an-card-bg);
    border: 1px solid var(--an-card-border);
    animation: an-fade-up 0.35s ease both;
    transition: border-color var(--an-t), box-shadow var(--an-t);
  }
  .an-kpi-card:hover {
    border-color: rgba(255,255,255,0.13);
    box-shadow: 0 8px 32px rgba(0,0,0,0.25);
  }
  @keyframes an-fade-up {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .an-kpi-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .an-kpi-label {
    font-size: 11px;
    font-weight: 600;
    color: var(--an-text-faint);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  .an-kpi-icon-wrap {
    width: 26px;
    height: 26px;
    border-radius: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .an-kpi-icon-wrap--up   { background: rgba(52,211,153,0.15); color: var(--an-success); }
  .an-kpi-icon-wrap--down { background: rgba(248,113,113,0.15); color: var(--an-danger);  }
  .an-kpi-value {
    font-size: 22px;
    font-weight: 800;
    color: var(--an-text-bright);
    letter-spacing: -0.03em;
    margin: 0 0 6px;
  }
  .an-kpi-sub {
    display: flex;
    align-items: center;
    gap: 3px;
    font-size: 11px;
    font-weight: 500;
  }
  .an-kpi-sub--up   { color: var(--an-success); }
  .an-kpi-sub--down { color: var(--an-danger);  }

  /* ── Charts Grid ── */
  .an-charts-grid {
    display: grid;
    grid-template-columns: 1fr 360px;
    gap: 12px;
  }

  /* ── Card ── */
  .an-card {
    padding: 20px;
    border-radius: var(--an-radius);
    background: var(--an-card-bg);
    border: 1px solid var(--an-card-border);
    position: relative;
    transition: border-color var(--an-t);
  }
  .an-card:hover { border-color: rgba(255,255,255,0.11); }
  .an-card--wide { /* occupies first column by default */ }

  .an-card-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 18px;
  }
  .an-card-title-group {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .an-card-icon-wrap {
    width: 32px;
    height: 32px;
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .an-card-title {
    font-size: 14px;
    font-weight: 700;
    color: var(--an-text-bright);
    margin: 0 0 2px;
  }
  .an-card-subtitle {
    font-size: 11px;
    color: var(--an-text-faint);
    margin: 0;
  }

  .an-legend-row {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
  }
  .an-legend-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .an-legend-text {
    font-size: 10px;
    color: var(--an-text-faint);
    margin-right: 8px;
  }

  .an-chart-area {
    height: 220px;
    width: 100%;
  }

  /* Pie centre label (absolutely positioned) */
  .an-pie-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -18%);
    text-align: center;
    pointer-events: none;
  }
  .an-pie-center-value {
    font-size: 16px;
    font-weight: 800;
    color: var(--an-text-bright);
    margin: 0;
  }
  .an-pie-center-label {
    font-size: 10px;
    color: var(--an-text-faint);
    margin: 0;
  }

  /* ── Tooltip ── */
  .an-tooltip {
    background: #1a1d27;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 9px;
    padding: 10px 14px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.5);
  }
  .an-tooltip-label {
    font-size: 11px;
    font-weight: 700;
    color: var(--an-text-faint);
    margin: 0 0 4px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  .an-tooltip-row {
    font-size: 13px;
    font-weight: 600;
    margin: 2px 0 0;
  }

  /* ── Table ── */
  .an-table-wrap { overflow-x: auto; }
  .an-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
  }
  .an-table-head-row { border-bottom: 1px solid rgba(255,255,255,0.07); }
  .an-th {
    padding: 0 12px 10px;
    font-size: 10px;
    font-weight: 700;
    color: var(--an-text-faint);
    text-transform: uppercase;
    letter-spacing: 0.09em;
    text-align: left;
    white-space: nowrap;
  }
  .an-th--right { text-align: right; }
  .an-table-row {
    border-bottom: 1px solid rgba(255,255,255,0.04);
    transition: background var(--an-t);
  }
  .an-table-row:last-child { border-bottom: none; }
  .an-table-row:hover { background: rgba(255,255,255,0.03); }
  .an-td {
    padding: 12px;
    color: var(--an-text-muted);
    white-space: nowrap;
  }
  .an-td--bright { color: var(--an-text-bright); font-weight: 600; }
  .an-td--muted  { color: var(--an-text-faint); }
  .an-td--right  { text-align: right; }

  .an-rank {
    font-size: 11px;
    font-weight: 700;
    color: var(--an-text-faint);
    letter-spacing: 0.02em;
  }
  .an-rank--gold   { color: #fbbf24; }
  .an-rank--silver { color: #94a3b8; }
  .an-rank--bronze { color: #c2713a; }

  .an-user-cell {
    display: flex;
    align-items: center;
    gap: 9px;
  }
  .an-user-avatar {
    width: 28px;
    height: 28px;
    border-radius: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: 800;
    color: #fff;
    flex-shrink: 0;
  }
  .an-user-name {
    font-weight: 600;
    color: var(--an-text-bright);
  }

  .an-change-badge {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    padding: 3px 8px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 700;
  }
  .an-change-badge--up   { background: rgba(52,211,153,0.12); color: var(--an-success); }
  .an-change-badge--down { background: rgba(248,113,113,0.12); color: var(--an-danger);  }

  /* ── Responsive ── */
  @media (max-width: 1100px) {
    .an-charts-grid {
      grid-template-columns: 1fr;
    }
    .an-pie-center { top: 46%; }
  }

  @media (max-width: 900px) {
    .an-kpi-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 640px) {
    .an-root { padding: 16px 14px; gap: 14px; }
    .an-page-title { font-size: 18px; }
    .an-kpi-grid { grid-template-columns: repeat(2, 1fr); gap: 8px; }
    .an-kpi-value { font-size: 18px; }
    .an-kpi-card { padding: 12px; }
    .an-card { padding: 14px; }
    .an-chart-area { height: 180px; }
    .an-header-actions { width: 100%; }
    .an-period-selector, .an-export-btn { flex: 1; justify-content: center; }
  }

  @media (max-width: 400px) {
    .an-kpi-grid { grid-template-columns: 1fr 1fr; }
    .an-th:nth-child(4), .an-td:nth-child(4) { display: none; }
  }
`;