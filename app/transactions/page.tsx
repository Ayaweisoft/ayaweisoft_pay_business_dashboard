"use client";
"use client";
import { useState } from "react";
import { LucideSearch, LucideFilter, LucideEye } from "lucide-react";
import { Modal } from "../../components/Modal";
import { StatusBadge } from "../../components/StatusBadge";

const transactions = [
  {
    date: "2026-05-03",
    type: "Credit",
    amount: 50000,
    status: "success",
    ref: "TXN12345678",
    fees: 50,
    source: "Virtual Account",
    description: "VA Funding",
  },
  {
    date: "2026-05-03",
    type: "Debit",
    amount: 120000,
    status: "pending",
    ref: "TXN12345679",
    fees: 100,
    source: "Payout",
    description: "Bulk Payout",
  },
  {
    date: "2026-05-02",
    type: "Credit",
    amount: 75000,
    status: "failed",
    ref: "TXN12345680",
    fees: 50,
    source: "Virtual Account",
    description: "VA Funding",
  },
];

const filters = {
  type: ["All", "Credit", "Debit"],
  status: ["All", "Success", "Pending", "Failed"],
};

export default function TransactionsPage() {
  const [selected, setSelected] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [status, setStatus] = useState("All");

  const filtered = transactions.filter((tx) => {
    const matchesType = type === "All" || tx.type === type;
    const matchesStatus = status === "All" || tx.status.toLowerCase() === status.toLowerCase();
    const matchesSearch =
      search === "" ||
      tx.ref.toLowerCase().includes(search.toLowerCase()) ||
      tx.description.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Transactions</h1>
          <p className="text-white/60 text-sm">View and filter all business transactions.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2">
        <div className="flex gap-2">
          <select value={type} onChange={e => setType(e.target.value)} className="bg-bg-card border border-border text-white/80 rounded-lg px-3 py-2 text-sm">
            {filters.type.map((t) => <option key={t}>{t}</option>)}
          </select>
          <select value={status} onChange={e => setStatus(e.target.value)} className="bg-bg-card border border-border text-white/80 rounded-lg px-3 py-2 text-sm">
            {filters.status.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="flex-1 flex items-center gap-2">
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              placeholder="Search by ref or description..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-bg-card border border-border rounded-lg px-4 py-2 pl-10 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
            <LucideSearch className="absolute left-3 top-2.5 text-white/50" size={18} />
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="glass-card p-6 mt-4">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-bg-dark/80">
              <tr>
                <th className="px-4 py-2 text-left text-white/70">Date</th>
                <th className="px-4 py-2 text-left text-white/70">Type</th>
                <th className="px-4 py-2 text-left text-white/70">Amount</th>
                <th className="px-4 py-2 text-left text-white/70">Status</th>
                <th className="px-4 py-2 text-left text-white/70">Ref</th>
                <th className="px-4 py-2 text-left text-white/70">Fees</th>
                <th className="px-4 py-2 text-left text-white/70">Source</th>
                <th className="px-4 py-2 text-left text-white/70">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((tx, idx) => (
                <tr key={idx} className="border-t border-border hover:bg-bg-dark/40 transition">
                  <td className="px-4 py-2 text-white/90">{new Date(tx.date).toLocaleDateString()}</td>
                  <td className="px-4 py-2 text-white/90">{tx.type}</td>
                  <td className={`px-4 py-2 font-bold ${tx.type === "Credit" ? "text-success" : "text-error"}`}>₦{tx.amount.toLocaleString()}</td>
                  <td className="px-4 py-2 text-white/90"><StatusBadge status={tx.status as any} /></td>
                  <td className="px-4 py-2 text-white/90">{tx.ref}</td>
                  <td className="px-4 py-2 text-white/90">₦{tx.fees}</td>
                  <td className="px-4 py-2 text-white/90">{tx.source}</td>
                  <td className="px-4 py-2 text-white/90">
                    <button className="p-1 rounded hover:bg-bg-card" onClick={() => setSelected(tx)} title="View Details">
                      <LucideEye size={16} className="text-white/60" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Details Modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title="Transaction Details">
        {selected && (
          <div className="flex flex-col gap-2 text-white">
            <div className="flex items-center gap-2">
              <span className="font-bold">Amount:</span>
              <span className={`font-bold ${selected.type === "Credit" ? "text-success" : "text-error"}`}>₦{selected.amount.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">Type:</span>
              <span>{selected.type}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">Status:</span>
              <StatusBadge status={selected.status as any} />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">Reference:</span>
              <span>{selected.ref}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">Fees:</span>
              <span>₦{selected.fees}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">Source:</span>
              <span>{selected.source}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">Description:</span>
              <span>{selected.description}</span>
            </div>
            <div className="text-xs text-white/50 mt-2">Date: {new Date(selected.date).toLocaleString()}</div>
          </div>
        )}
      </Modal>
    </div>
  );
}
