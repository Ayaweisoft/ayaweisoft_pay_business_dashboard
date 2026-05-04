"use client";

import React, { useState } from "react";
import { 
  LucideCreditCard, LucideBarChart2, LucideTrendingUp, 
  LucidePlus, LucideSend, LucideChevronRight, 
  LucideBanknote, LucideShieldCheck, LucideServer 
} from "lucide-react";
import { 
  LineChart, Line, XAxis, YAxis, Tooltip, 
  ResponsiveContainer, CartesianGrid 
} from "recharts";

// Shared Components
import { MetricCard } from "../../components/MetricCard";
import { ChartCard } from "../../components/ChartCard";
import { StatusBadge } from "../../components/StatusBadge";
import { CreateVirtualWalletModal, SendPayoutModal } from "../../components/WalletPayoutModals";

const METRICS = [
  {
    title: "Total Balance",
    value: "₦5,200,000",
    icon: <LucideCreditCard size={22} />,
    change: "+12.5% from last month",
    variant: "success" as const,
    iconBg: "bg-primary/10 text-primary",
  },
  {
    title: "Total Transactions",
    value: "12,450",
    icon: <LucideBarChart2 size={22} />,
    change: "Last updated 2 mins ago",
    variant: "default" as const,
    iconBg: "bg-white/10 text-white",
  },
  {
    title: "Daily Revenue",
    value: "₦320,000",
    icon: <LucideTrendingUp size={22} />,
    change: "+8.2% vs yesterday",
    variant: "success" as const,
    iconBg: "bg-success/10 text-success",
  },
];

const CHART_DATA = [
  { date: "Mon", volume: 120, value: 50000 },
  { date: "Tue", volume: 180, value: 70000 },
  { date: "Wed", volume: 150, value: 60000 },
  { date: "Thu", volume: 200, value: 90000 },
  { date: "Fri", volume: 170, value: 80000 },
  { date: "Sat", volume: 220, value: 110000 },
  { date: "Sun", volume: 130, value: 55000 },
];

export default function DashboardClient() {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);

  // Modal Handlers
  const handleCreateWallet = (data: { name: string; currency: string }) => {
    console.log("Wallet Data:", data);
    setIsWalletModalOpen(false);
  };

  const handleSendPayout = (data: { to: string; amount: string; note: string }) => {
    console.log("Payout Data:", data);
    setIsPayoutModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-white/60 text-sm">Welcome back to your Ayaweisoft Pay hub.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsPayoutModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-card border border-border text-white text-sm hover:bg-white/5 transition"
          >
            <LucideSend size={16} /> Send Payout
          </button>
          <button 
            onClick={() => setIsWalletModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:opacity-90 transition"
          >
            <LucidePlus size={16} /> Create Wallet
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {METRICS.map((metric, idx) => (
          <MetricCard key={idx} {...metric} />
        ))}
      </div>

      {/* Chart & Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartCard title="Transaction Volume">
            {/* Optimized Tailwind class: h-[300px] -> h-75 */}
            <div className="h-75 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={CHART_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#ffffff60', fontSize: 12 }} 
                  />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3b82f6" 
                    strokeWidth={3} 
                    dot={{ r: 4, fill: '#3b82f6' }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        {/* System Health / Quick Stats */}
        <div className="flex flex-col gap-6">
          <div className="glass-card p-6">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <LucideShieldCheck size={18} className="text-success" /> System Health
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-sm">API Gateway</span>
                <StatusBadge status="success" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-sm">Payout Engine</span>
                <StatusBadge status="success" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-sm">Webhook Delivery</span>
                <StatusBadge status="pending" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals - Corrected Props */}
      <CreateVirtualWalletModal 
        open={isWalletModalOpen} 
        onClose={() => setIsWalletModalOpen(false)} 
        onCreate={handleCreateWallet}
      />
      <SendPayoutModal 
        open={isPayoutModalOpen} 
        onClose={() => setIsPayoutModalOpen(false)} 
        onSend={handleSendPayout}
      />
    </div>
  );
}