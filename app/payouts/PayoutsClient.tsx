"use client";

import { useState } from "react";
import { 
  LucideUpload, 
  LucideSend, 
  LucideFileText, 
  LucideDownload 
} from "lucide-react";
import { Modal } from "../../components/Modal";
import { FormInput } from "../../components/FormInput";
import { StatusBadge } from "../../components/StatusBadge";

const PAYOUT_HISTORY = [
  { name: "John Doe", bank: "GTB", amount: 10000, status: "pending", ref: "PAYOUT1234" },
  { name: "Jane Smith", bank: "Access Bank", amount: 25000, status: "success", ref: "PAYOUT1235" },
  { name: "Mike Lee", bank: "UBA", amount: 5000, status: "failed", ref: "PAYOUT1236" },
];

export default function PayoutsClient() {
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [showSingleModal, setShowSingleModal] = useState(false);

  return (
    <div className="flex flex-col gap-6 p-2 sm:p-4 md:p-8">
      {/* Header and Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Payouts</h1>
          <p className="text-white/60 text-sm">Send single or bulk payouts to any bank account.</p>
        </div>
        <div className="flex gap-3">
          <button 
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-card border border-border text-white text-sm font-semibold hover:bg-white/5 transition" 
            onClick={() => setShowSingleModal(true)}
          >
            <LucideSend size={16} /> Single Transfer
          </button>
          <button 
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold shadow hover:opacity-90 transition" 
            onClick={() => setShowBulkModal(true)}
          >
            <LucideUpload size={16} /> Bulk Transfer
          </button>
        </div>
      </div>

      {/* Upload Summary Card */}
      <div className="glass-card p-4 sm:p-6 flex flex-col gap-4 border border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LucideFileText className="text-primary" size={20} />
            <span className="text-base font-bold text-white">Active Batch</span>
          </div>
          <button className="text-xs text-primary hover:underline flex items-center gap-1">
            <LucideDownload size={14} /> Download Sample CSV
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 py-2">
          <div className="bg-white/5 p-3 rounded-lg border border-border">
            <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Total Amount</p>
            <p className="text-lg font-bold text-success">₦1,200,000</p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg border border-border">
            <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Recipients</p>
            <p className="text-lg font-bold text-white">120 Users</p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg border border-border">
            <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Service Fee</p>
            <p className="text-lg font-bold text-warning">₦12,000</p>
          </div>
        </div>
        
        <button className="px-6 py-2.5 rounded-lg bg-primary text-white font-bold hover:opacity-90 transition w-full md:w-max">
          Confirm & Process Batch
        </button>
      </div>

      {/* Payout History Table */}
      <div className="glass-card overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-border">
          <h2 className="text-lg font-bold text-white">Payout History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-130 w-full text-sm text-left">
            <thead className="bg-white/5 text-white/40 uppercase text-[10px] tracking-widest">
              <tr>
                <th className="px-3 py-2 sm:px-6 sm:py-4 font-semibold">Recipient</th>
                <th className="px-3 py-2 sm:px-6 sm:py-4 font-semibold">Bank</th>
                <th className="px-3 py-2 sm:px-6 sm:py-4 font-semibold">Amount</th>
                <th className="px-3 py-2 sm:px-6 sm:py-4 font-semibold">Status</th>
                <th className="px-3 py-2 sm:px-6 sm:py-4 font-semibold text-right">Reference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {PAYOUT_HISTORY.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/2 transition-colors">
                  <td className="px-3 py-2 sm:px-6 sm:py-4 text-white font-medium">{row.name}</td>
                  <td className="px-3 py-2 sm:px-6 sm:py-4 text-white/60">{row.bank}</td>
                  <td className="px-3 py-2 sm:px-6 sm:py-4 text-white font-mono">₦{row.amount.toLocaleString()}</td>
                  <td className="px-3 py-2 sm:px-6 sm:py-4">
                    <StatusBadge status={row.status as any} />
                  </td>
                  <td className="px-3 py-2 sm:px-6 sm:py-4 text-right text-white/40 font-mono">{row.ref}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <Modal open={showSingleModal} onClose={() => setShowSingleModal(false)} title="Single Transfer">
        <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
          <FormInput label="Recipient Name" placeholder="e.g. John Doe" required />
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Bank" placeholder="Select Bank" required />
            <FormInput label="Account Number" placeholder="0123456789" required />
          </div>
          <FormInput label="Amount" placeholder="0.00" type="number" required />
          <button type="submit" className="mt-2 py-3 rounded-xl bg-primary text-white font-bold hover:opacity-90 transition shadow-lg shadow-primary/20">
            Send Payout
          </button>
        </form>
      </Modal>

      <Modal open={showBulkModal} onClose={() => setShowBulkModal(false)} title="Bulk Transfer">
        <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
          <div className="p-4 rounded-xl border border-dashed border-border bg-white/5 text-center">
            <p className="text-white/60 text-sm mb-4">Upload your payment CSV file to begin.</p>
            <input 
              type="file" 
              accept=".csv" 
              className="block w-full text-sm text-white/60
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-xs file:font-bold
                file:bg-primary file:text-white
                hover:file:bg-primary/80 transition cursor-pointer" 
            />
          </div>
          <button type="submit" className="py-3 rounded-xl bg-primary text-white font-bold hover:opacity-90 transition">
            Process Bulk Payout
          </button>
        </form>
      </Modal>
    </div>
  );
}