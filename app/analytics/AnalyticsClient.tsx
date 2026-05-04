"use client";

import { useState } from "react";
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, 
  PieChart, Pie, Cell, Legend, CartesianGrid 
} from "recharts";
import { LucideBarChart2, LucidePieChart, LucideTrendingUp, LucideUsers } from "lucide-react";

// Data constants
const REVENUE_DATA = [
  { date: "Mon", revenue: 50000 },
  { date: "Tue", revenue: 70000 },
  { date: "Wed", revenue: 60000 },
  { date: "Thu", revenue: 90000 },
  { date: "Fri", revenue: 80000 },
  { date: "Sat", revenue: 110000 },
  { date: "Sun", revenue: 55000 },
];

const BREAKDOWN_DATA = [
  { name: "Credit", value: 320000 },
  { name: "Debit", value: 180000 },
  { name: "Fees", value: 20000 },
];

const COLORS = ["#22C55E", "#4282EA", "#F59E0B"];

const TOP_USERS = [
  { name: "John Doe", amount: 120000, transactions: 45 },
  { name: "Jane Smith", amount: 95000, transactions: 32 },
  { name: "Mike Lee", amount: 80000, transactions: 28 },
];

export default function AnalyticsClient() {
  const [days, setDays] = useState(7);

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      {/* Header & Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Analytics</h1>
          <p className="text-white/60 text-sm">Visualize revenue and transaction breakdowns.</p>
        </div>
        <select 
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="bg-bg-card border border-border text-white text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value={7}>Last 7 Days</option>
          <option value={30}>Last 30 Days</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Bar Chart */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-6 text-white/90">
            <LucideTrendingUp size={20} className="text-primary" />
            <h2 className="font-bold">Revenue Trend</h2>
          </div>
          <div className="h-75 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REVENUE_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#ffffff60', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#ffffff60', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#ffffff05'}}
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                />
                <Bar dataKey="revenue" fill="#4282EA" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Breakdown Pie Chart */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-6 text-white/90">
            <LucidePieChart size={20} className="text-success" />
            <h2 className="font-bold">Transaction Breakdown</h2>
          </div>
          <div className="h-75 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={BREAKDOWN_DATA}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {BREAKDOWN_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Users Table */}
        <div className="glass-card p-6 lg:col-span-2">
          <div className="flex items-center gap-2 mb-6 text-white/90">
            <LucideUsers size={20} className="text-warning" />
            <h2 className="font-bold">Top Performing Users</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-white/40">
                  <th className="pb-3 font-medium">User Name</th>
                  <th className="pb-3 font-medium">Total Volume</th>
                  <th className="pb-3 font-medium">Transactions</th>
                  <th className="pb-3 font-medium text-right">Performance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {TOP_USERS.map((user, idx) => (
                  <tr key={idx} className="group hover:bg-white/5 transition">
                    <td className="py-4 text-white font-medium">{user.name}</td>
                    <td className="py-4 text-white/80">₦{user.amount.toLocaleString()}</td>
                    <td className="py-4 text-white/80">{user.transactions}</td>
                    <td className="py-4 text-right">
                      <span className="text-success text-xs font-bold bg-success/10 px-2 py-1 rounded-full">+12%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}