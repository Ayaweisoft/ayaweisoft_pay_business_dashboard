"use client";
"use client";
import { useState } from "react";
import { LucideUpload, LucideSend, LucideFileText, LucideCheckCircle, LucideXCircle } from "lucide-react";
import { Modal } from "../../components/Modal";
import { FormInput } from "../../components/FormInput";
import { StatusBadge } from "../../components/StatusBadge";

const payoutHistory = [
  {
    name: "John Doe",
    bank: "GTB",
    amount: 10000,
    status: "pending",
    ref: "PAYOUT1234",
  },
  {
    name: "Jane Smith",
    bank: "Access Bank",
    amount: 25000,
    status: "success",
    ref: "PAYOUT1235",
  },
  {
    name: "Mike Lee",
    bank: "UBA",
    amount: 5000,
    status: "failed",
    ref: "PAYOUT1236",
  },
];

export default function PayoutsPage() {
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [showSingleModal, setShowSingleModal] = useState(false);

  return (
    <div className="flex flex-col gap-8">
      {/* Header and Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Payouts</h1>
          <p className="text-white/60 text-sm">Send single or bulk payouts to any bank account.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-card border border-border text-white text-sm font-semibold hover:bg-primary/10 transition" onClick={() => setShowSingleModal(true)}>
            <LucideSend size={16} /> Single Transfer
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold shadow hover:opacity-90 transition" onClick={() => setShowBulkModal(true)}>
            <LucideUpload size={16} /> Bulk Transfer
          </button>
        </div>
      </div>

      {/* Bulk Upload UI */}
      <div className="glass-card p-6 flex flex-col gap-4">
        <div className="flex items-center gap-2 mb-2">
          <LucideFileText className="text-primary" size={20} />
          <span className="text-base font-bold text-white">Upload CSV</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1 text-white/80 text-sm">File: <span className="font-mono">payments.csv</span></div>
          <div className="flex gap-4">
            <div className="text-success font-bold">Total: ₦1,200,000</div>
            <div className="text-white/70">Recipients: 120</div>
            <div className="text-warning font-bold">Fee: ₦12,000</div>
          </div>
        </div>
        <button className="mt-2 px-4 py-2 rounded-lg bg-primary text-white font-semibold hover:opacity-90 transition w-max">Process Payments</button>
      </div>

      {/* Payout History Table */}
      <div className="glass-card p-6 mt-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-base font-bold text-white">Payout History</span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-bg-dark/80">
              <tr>
                <th className="px-4 py-2 text-left text-white/70">Name</th>
                <th className="px-4 py-2 text-left text-white/70">Bank</th>
                <th className="px-4 py-2 text-left text-white/70">Amount</th>
                <th className="px-4 py-2 text-left text-white/70">Status</th>
                <th className="px-4 py-2 text-left text-white/70">Ref</th>
              </tr>
            </thead>
            <tbody>
              {payoutHistory.map((row, idx) => (
                <tr key={idx} className="border-t border-border hover:bg-bg-dark/40 transition">
                  <td className="px-4 py-2 text-white/90">{row.name}</td>
                  <td className="px-4 py-2 text-white/90">{row.bank}</td>
                  <td className="px-4 py-2 text-white/90">₦{row.amount.toLocaleString()}</td>
                  <td className="px-4 py-2 text-white/90"><StatusBadge status={row.status as any} /></td>
                  <td className="px-4 py-2 text-white/90">{row.ref}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Single Transfer Modal */}
      <Modal open={showSingleModal} onClose={() => setShowSingleModal(false)} title="Single Transfer">
        <form className="flex flex-col gap-4">
          <FormInput label="Recipient Name" placeholder="Enter name" required />
          <FormInput label="Bank" placeholder="Enter bank name" required />
          <FormInput label="Account Number" placeholder="Enter account number" required />
          <FormInput label="Amount" placeholder="Enter amount" type="number" required />
          <button type="submit" className="mt-2 px-4 py-2 rounded-lg bg-primary text-white font-semibold hover:opacity-90 transition">Send Payout</button>
        </form>
      </Modal>

      {/* Bulk Transfer Modal */}
      <Modal open={showBulkModal} onClose={() => setShowBulkModal(false)} title="Bulk Transfer (CSV Upload)">
        <form className="flex flex-col gap-4">
          <div className="text-white/80 text-sm">Upload a CSV file with recipient details.</div>
          <input type="file" accept=".csv" className="bg-bg-card border border-border rounded-lg px-3 py-2 text-sm text-white" />
          <button type="submit" className="mt-2 px-4 py-2 rounded-lg bg-primary text-white font-semibold hover:opacity-90 transition">Process Bulk Payout</button>
        </form>
      </Modal>
    </div>
  );
}
