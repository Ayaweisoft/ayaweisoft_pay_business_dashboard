"use client";
"use client";
import { useState } from "react";
import { LucideBanknote, LucideCopy, LucideEye, LucidePlus } from "lucide-react";
import { Modal } from "../../components/Modal";
import { FormInput } from "../../components/FormInput";
import { StatusBadge } from "../../components/StatusBadge";

const virtualAccounts = [
  {
    id: 1,
    user: "John Doe",
    bank: "Providus Bank",
    accountNumber: "1234567890",
    assignedUser: "john@ayaweisoft.com",
    balance: 520000,
  },
  {
    id: 2,
    user: "Jane Smith",
    bank: "Wema Bank",
    accountNumber: "0987654321",
    assignedUser: "jane@ayaweisoft.com",
    balance: 150000,
  },
];

const vaTransactions = [
  {
    date: "2026-05-03",
    type: "Credit",
    amount: 50000,
    status: "success",
    ref: "VA12345678",
  },
  {
    date: "2026-05-02",
    type: "Debit",
    amount: 20000,
    status: "pending",
    ref: "VA12345679",
  },
];

export default function VirtualAccountsPage() {
  const [showModal, setShowModal] = useState(false);
  const [copyId, setCopyId] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-8">
      {/* Header and Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Virtual Accounts</h1>
          <p className="text-white/60 text-sm">Manage and create virtual accounts for your business.</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold shadow hover:opacity-90 transition"
          onClick={() => setShowModal(true)}
        >
          <LucidePlus size={16} /> Create Virtual Account
        </button>
      </div>

      {/* VA Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {virtualAccounts.map((va) => (
          <div key={va.id} className="glass-card p-6 flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 rounded-lg bg-primary/10 text-primary"><LucideBanknote size={20} /></span>
              <span className="text-lg font-bold text-white">{va.user}</span>
            </div>
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <span className="font-semibold">{va.bank}</span>
              <span className="mx-2">•</span>
              <span className="font-mono tracking-wider">{va.accountNumber}</span>
              <button
                className="ml-2 p-1 rounded hover:bg-bg-card"
                onClick={() => {
                  navigator.clipboard.writeText(va.accountNumber);
                  setCopyId(va.id);
                  setTimeout(() => setCopyId(null), 1200);
                }}
                title="Copy Account Number"
              >
                <LucideCopy size={16} className={copyId === va.id ? "text-success" : "text-white/60"} />
              </button>
              <button className="ml-1 p-1 rounded hover:bg-bg-card" title="View Details">
                <LucideEye size={16} className="text-white/60" />
              </button>
            </div>
            <div className="text-xs text-white/50">Assigned: {va.assignedUser}</div>
            <div className="text-sm text-success font-bold mt-2">₦{va.balance.toLocaleString()}</div>
          </div>
        ))}
      </div>

      {/* VA Transactions Table */}
      <div className="glass-card p-6 mt-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-base font-bold text-white">VA Transactions</span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-bg-dark/80">
              <tr>
                <th className="px-4 py-2 text-left text-white/70">Date</th>
                <th className="px-4 py-2 text-left text-white/70">Type</th>
                <th className="px-4 py-2 text-left text-white/70">Amount</th>
                <th className="px-4 py-2 text-left text-white/70">Status</th>
                <th className="px-4 py-2 text-left text-white/70">Ref</th>
              </tr>
            </thead>
            <tbody>
              {vaTransactions.map((tx, idx) => (
                <tr key={idx} className="border-t border-border hover:bg-bg-dark/40 transition">
                  <td className="px-4 py-2 text-white/90">{new Date(tx.date).toLocaleDateString()}</td>
                  <td className="px-4 py-2 text-white/90">{tx.type}</td>
                  <td className="px-4 py-2 text-white/90">₦{tx.amount.toLocaleString()}</td>
                  <td className="px-4 py-2 text-white/90"><StatusBadge status={tx.status as any} /></td>
                  <td className="px-4 py-2 text-white/90">{tx.ref}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create VA Modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)} title="Create Virtual Account">
        <form className="flex flex-col gap-4">
          <FormInput label="User Name" placeholder="Enter user name" required />
          <FormInput label="Phone / Email" placeholder="Enter phone or email" required />
          <button type="submit" className="mt-2 px-4 py-2 rounded-lg bg-primary text-white font-semibold hover:opacity-90 transition">Generate Account</button>
        </form>
      </Modal>
    </div>
  );
}
