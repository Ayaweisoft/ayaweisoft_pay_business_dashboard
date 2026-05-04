"use client";

import { MetricCard } from "../../components/MetricCard";
import { ChartCard } from "../../components/ChartCard";
import { StatusBadge } from "../../components/StatusBadge";
import { LucideCreditCard, LucideBarChart2, LucideTrendingUp, LucideShieldCheck, LucideServer, LucidePlus, LucideSend, LucideChevronRight, LucideBanknote, LucideUser } from "lucide-react";
import React, { useMemo, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const metrics = [
  {
    title: "Total Balance",
    value: "₦5,200,000",
    icon: <LucideCreditCard size={22} />, // icon only, color via bg
    change: "+12.5% from last month",
    variant: "success" as const,
    iconBg: "bg-primary/10 text-primary",
  },
  {
    title: "Total Transactions",
    value: "12,450",
    icon: <LucideBarChart2 size={22} />, // icon only, color via bg
    change: "Last updated 2 mins ago",
    variant: "default" as const,
    iconBg: "bg-white/10 text-white",
  },
  {
    title: "Daily Revenue",
    value: "₦320,000",
    icon: <LucideTrendingUp size={22} />, // icon only, color via bg
    change: "+8.2% vs yesterday",
    variant: "success" as const,
    iconBg: "bg-success/10 text-success",
  },
];

const chartData = [
  { date: "Mon", volume: 120, value: 50000 },
  { date: "Tue", volume: 180, value: 70000 },
  { date: "Wed", volume: 150, value: 60000 },
  { date: "Thu", volume: 200, value: 90000 },
  { date: "Fri", volume: 170, value: 80000 },
  { date: "Sat", volume: 220, value: 110000 },
  { date: "Sun", volume: 140, value: 55000 },
];

const recentActivity = [
  {
    type: "VA Funding",
    icon: <LucideBanknote size={18} />,
    amount: "+₦50,000",
    status: "success" as const,
    ref: "Terminal ID: 89291",
    time: "2 mins ago",
  },
  {
    type: "Payout",
    icon: <LucideSend size={18} />,
    amount: "-₦120,000",
    status: "pending" as const,
    ref: "Ref: BNK-001229",
    time: "1 hour ago",
  },
  {
    type: "VA Funding",
    icon: <LucideBanknote size={18} />,
    amount: "+₦25,500",
    status: "success" as const,
    ref: "Terminal ID: 88210",
    time: "3 hours ago",
  },
  {
    type: "New Virtual Account",
    icon: <LucideUser size={18} />,
    amount: "",
    status: "success" as const,
    ref: "Wema Bank • Created",
    time: "5 hours ago",
  },
];

const columns = [
  {
    header: "Date",
    accessorKey: "date",
    cell: (info: any) => new Date(info.getValue()).toLocaleDateString(),
  },
  {
    header: "Type",
    accessorKey: "type",
  },
  {
    header: "Amount",
    accessorKey: "amount",
    cell: (info: any) => `₦${info.getValue().toLocaleString()}`,
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (info: any) => <StatusBadge status={info.getValue()} />,
  },
  {
    header: "Ref ID",
    accessorKey: "ref",
  },
  {
    header: "Fee",
    accessorKey: "fee",
    cell: (info: any) => `₦${info.getValue()}`,
  },
];

export default function DashboardPage() {
  const [days, setDays] = useState(7);
  const filteredChartData = useMemo(() => chartData.slice(-days), [days]);

  return (
    <div className="flex flex-col gap-8">
      {/* Header and Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Overview</h1>
          <p className="text-white/60 text-sm">Welcome back, here's what's happening today.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl glass-card text-white font-semibold text-sm hover:bg-white/10 transition-all active:scale-95">
            <LucidePlus size={16} /> Create Virtual Account
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl primary-gradient text-on-primary-container font-bold text-sm shadow-lg shadow-blue-500/20 active:scale-95 transition-all">
            <LucideSend size={16} /> Send Payout
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left/Main Content */}
        <div className="xl:col-span-2 flex flex-col gap-8">
          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {metrics.map((metric) => (
              <div key={metric.title} className="glass-card p-6 flex flex-col gap-2 min-w-50">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`p-2 rounded-lg ${metric.iconBg}`}>{metric.icon}</span>
                  <span className="text-sm text-white/70 font-medium">{metric.title}</span>
                </div>
                <div className="text-2xl font-bold text-white tracking-tight">{metric.value}</div>
                {metric.change && (
                  <div className={`text-xs font-semibold ${metric.variant === "success" ? "text-success" : "text-white/60"}`}>{metric.change}</div>
                )}
              </div>
            ))}
          </div>

          {/* Chart Section */}
          <div className="glass-card p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="text-base text-white font-semibold">Transactions ({days} days)</span>
                <div className="text-xs text-white/50">VOLUME ANALYSIS</div>
              </div>
              <div className="flex gap-2">
                {[7, 30].map((d) => (
                  <button
                    key={d}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition border border-border ${
                      days === d ? "primary-gradient text-on-primary-container font-bold" : "bg-bg-card text-white/70 hover:bg-primary/10"
                    }`}
                    onClick={() => setDays(d)}
                  >
                    {d === 7 ? "Week" : "Month"}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filteredChartData} margin={{ top: 16, right: 24, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke="#1F2937" strokeDasharray="3 3" />
                  <XAxis dataKey="date" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip
                    contentStyle={{ background: "#111827", border: "1px solid #1F2937", color: "#fff" }}
                    labelStyle={{ color: "#fff" }}
                  />
                  <Line type="monotone" dataKey="value" stroke="#4282EA" strokeWidth={2} dot={false} name="Value" />
                  <Line type="monotone" dataKey="volume" stroke="#22C55E" strokeWidth={2} dot={false} name="Volume" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Health Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-5 flex items-center gap-4">
              <span className="p-2 rounded-lg bg-primary/10 text-primary"><LucideServer size={20} /></span>
              <div>
                <div className="text-sm text-white font-semibold">API Health</div>
                <div className="text-xs text-white/60">Operational • 99.9% Uptime</div>
              </div>
            </div>
            <div className="glass-card p-5 flex items-center gap-4">
              <span className="p-2 rounded-lg bg-success/10 text-success"><LucideShieldCheck size={20} /></span>
              <div>
                <div className="text-sm text-white font-semibold">Security Status</div>
                <div className="text-xs text-white/60">Level 3 Audit Passed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right/Sidebar: Recent Activity */}
        <div className="flex flex-col gap-6">
          <div className="glass-card p-6 flex flex-col gap-4 min-w-[320px]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-base font-bold text-white">Recent Activity</span>
              <button className="text-white/60 hover:text-primary transition"><LucideChevronRight size={18} /></button>
            </div>
            <div className="flex flex-col gap-4">
              {recentActivity.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className={`p-2 rounded-lg bg-white/10 text-white`}>{item.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-white font-medium">{item.type}</span>
                      {item.amount && (
                        <span className={`text-xs font-bold ${item.amount.startsWith("+") ? "text-success" : item.amount.startsWith("-") ? "text-error" : "text-white/70"}`}>{item.amount}</span>
                      )}
                      <StatusBadge status={item.status} />
                    </div>
                    <div className="text-xs text-white/60 flex items-center gap-2">
                      <span>{item.ref}</span>
                      <span>• {item.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full py-3 rounded-xl border border-white/10 text-slate-400 text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-all">VIEW FULL AUDIT LOG</button>
          </div>
        </div>
      </div>
    </div>
  );
}
