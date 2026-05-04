"use client";

import { useState, useMemo } from "react";
import { LucideSearch, LucideFilter, LucideEye, LucideDownload } from "lucide-react";
import { Modal } from "../../components/Modal";
import { StatusBadge } from "../../components/StatusBadge";

const TRANSACTIONS = [
  {
    date: "2026-05-03 14:20",
    type: "Credit",
    amount: 50000,
    status: "success",
    ref: "TXN12345678",
    fees: 50,
    source: "Virtual Account",
    description: "VA Funding",
  },
  {
    date: "2026-05-03 12:05",
    type: "Debit",
    amount: 120000,
    status: "pending",
    ref: "TXN12345679",
    fees: 100,
    source: "Payout",
    description: "Bulk Payout",
  },
  {
    date: "2026-05-02 09:15",
    type: "Credit",
    amount: 75000,
    status: "failed",
    ref: "TXN12345680",
    fees: 50,
    source: "Virtual Account",
    description: "VA Funding Attempt",
  },
];

export default function TransactionsClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedTxn, setSelectedTxn] = useState<typeof TRANSACTIONS[0] | null>(null);

  const filteredTransactions = useMemo(() => {
    return TRANSACTIONS.filter((txn) => {
      const matchesSearch = txn.ref.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            txn.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || txn.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Transactions</h1>
          <p className="text-white/60 text-sm">Audit and track every movement in your business wallet.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-border rounded-lg text-white text-sm hover:bg-white/10 transition">
          <LucideDownload size={16} /> Export CSV
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center bg-bg-card p-4 rounded-xl border border-border">
        <div className="relative flex-1 w-full">
          <LucideSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
          <input 
            type="text"
            placeholder="Search by reference or description..."
            className="w-full bg-bg-dark border border-border rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:ring-1 focus:ring-primary outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <LucideFilter size={18} className="text-white/40" />
          <select 
            className="bg-bg-dark border border-border rounded-lg px-3 py-2 text-sm text-white outline-none focus:ring-1 focus:ring-primary"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="success">Success</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-white/40 uppercase text-[10px] tracking-widest font-bold">
              <tr>
                <th className="px-6 py-4">Date & Time</th>
                <th className="px-6 py-4">Reference</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredTransactions.map((txn, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4 text-white/60">{txn.date}</td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-white/90">{txn.ref}</span>
                    <p className="text-[10px] text-white/40">{txn.description}</p>
                  </td>
                  <td className={`px-6 py-4 font-bold ${txn.type === 'Credit' ? 'text-success' : 'text-white'}`}>
                    {txn.type === 'Credit' ? '+' : '-'} ₦{txn.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={txn.status as any} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedTxn(txn)}
                      className="p-2 rounded-lg bg-white/5 text-white/40 hover:text-white hover:bg-primary/20 transition"
                    >
                      <LucideEye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredTransactions.length === 0 && (
            <div className="py-20 text-center text-white/40">
              No transactions found matching your criteria.
            </div>
          )}
        </div>
      </div>

      {/* Transaction Detail Modal */}
      <Modal 
        open={!!selectedTxn} 
        onClose={() => setSelectedTxn(null)} 
        title="Transaction Details"
      >
        {selectedTxn && (
          <div className="space-y-6">
            <div className="flex flex-col items-center py-4 border-b border-border/50">
              <p className="text-white/40 text-sm mb-1 uppercase tracking-tighter">Total Impact</p>
              <h2 className={`text-3xl font-bold ${selectedTxn.type === 'Credit' ? 'text-success' : 'text-white'}`}>
                ₦{(selectedTxn.amount + selectedTxn.fees).toLocaleString()}
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-y-4 text-sm">
              <div>
                <p className="text-white/40">Transaction Type</p>
                <p className="text-white font-medium">{selectedTxn.type} ({selectedTxn.source})</p>
              </div>
              <div className="text-right">
                <p className="text-white/40">Date</p>
                
                <p className="text-white font-medium">{selectedTxn.date}</p>
              </div>
              <div>
                <p className="text-white/40">Base Amount</p>
                <p className="text-white font-medium">₦{selectedTxn.amount.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-white/40">Service Fee</p>
                <p className="text-white font-medium">₦{selectedTxn.fees.toLocaleString()}</p>
              </div>
              <div className="col-span-2 pt-2 border-t border-border/50">
                <p className="text-white/40">Internal Reference</p>
                <p className="text-white font-mono break-all">{selectedTxn.ref}</p>
              </div>
            </div>

            <button 
              className="w-full py-3 rounded-xl bg-white/5 border border-border text-white font-bold hover:bg-white/10 transition"
              onClick={() => setSelectedTxn(null)}
            >
              Close Record
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}