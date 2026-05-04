"use client";
"use client";
import { useState } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";
import { LucideBarChart2, LucidePieChart } from "lucide-react";

const revenueData = [
  { date: "Mon", revenue: 50000 },
  { date: "Tue", revenue: 70000 },
  { date: "Wed", revenue: 60000 },
  { date: "Thu", revenue: 90000 },
  { date: "Fri", revenue: 80000 },
  { date: "Sat", revenue: 110000 },
  { date: "Sun", revenue: 55000 },
];

const breakdownData = [
  { name: "Credit", value: 320000 },
  { name: "Debit", value: 180000 },
  { name: "Fees", value: 20000 },
];
const COLORS = ["#22C55E", "#4282EA", "#F59E0B"];

const topUsers = [
  { name: "John Doe", amount: 120000 },
  { name: "Jane Smith", amount: 95000 },
  { name: "Mike Lee", amount: 80000 },
];

export default function AnalyticsPage() {
  const [days, setDays] = useState(7);
  const filteredRevenue = revenueData.slice(-days);

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Analytics</h1>
          <p className="text-white/60 text-sm">Visualize revenue and transaction breakdowns.</p>
        </div>
        <div className="flex gap-2">
          {[7, 30, 90].map((d) => (
            <button
              key={d}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition border border-border ${
                days === d ? "bg-primary text-white" : "bg-bg-card text-white/70 hover:bg-primary/10"
              }`}
              onClick={() => setDays(d)}
            >
              {d} days
            </button>
          ))}
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="glass-card p-6 flex flex-col gap-4">
        <div className="flex items-center gap-2 mb-2">
          <LucideBarChart2 className="text-primary" size={20} />
          <span className="text-base font-bold text-white">Revenue</span>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filteredRevenue} margin={{ top: 16, right: 24, left: 0, bottom: 0 }}>
              <XAxis dataKey="date" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{ background: "#111827", border: "1px solid #1F2937", color: "#fff" }}
                labelStyle={{ color: "#fff" }}
              />
              <Bar dataKey="revenue" fill="#4282EA" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Transaction Breakdown Pie Chart */}
      <div className="glass-card p-6 flex flex-col gap-4 max-w-xl">
        <div className="flex items-center gap-2 mb-2">
          <LucidePieChart className="text-success" size={20} />
          <span className="text-base font-bold text-white">Transaction Breakdown</span>
        </div>
        <div className="h-64 w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={breakdownData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {breakdownData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Users / Accounts */}
      <div className="glass-card p-6 flex flex-col gap-4 max-w-xl">
        <div className="text-base font-bold text-white mb-2">Top Users / Accounts</div>
        <div className="flex flex-col gap-2">
          {topUsers.map((user, idx) => (
            <div key={idx} className="flex items-center justify-between text-white/90">
              <span className="font-medium">{user.name}</span>
              <span className="font-bold text-primary">₦{user.amount.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
