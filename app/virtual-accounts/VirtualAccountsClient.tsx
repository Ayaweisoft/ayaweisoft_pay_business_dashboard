"use client";

import { useState } from "react";
import { LucideBanknote, LucideCopy, LucideEye, LucidePlus, LucideCheckCircle2 } from "lucide-react";
import { Modal } from "../../components/Modal";
import { FormInput } from "../../components/FormInput";
import { StatusBadge } from "../../components/StatusBadge";

const VIRTUAL_ACCOUNTS = [
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

const VA_TRANSACTIONS = [
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

export default function VirtualAccountsClient() {
  const [showModal, setShowModal] = useState(false);
  const [copyId, setCopyId] = useState<number | null>(null);

  const handleCopy = (num: string, id: number) => {
    navigator.clipboard.writeText(num);
    setCopyId(id);
    setTimeout(() => setCopyId(null), 2000);
  };

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      {/* Header and Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Virtual Accounts</h1>
          <p className="text-white/60 text-sm">Issue and manage unique collection accounts for your customers.</p>
        </div>
        <button
          className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition active:scale-95"
          onClick={() => setShowModal(true)}
        >
          <LucidePlus size={18} /> Create Account
        </button>
      </div>

      {/* VA Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {VIRTUAL_ACCOUNTS.map((va) => (
          <div key={va.id} className="glass-card p-6 flex flex-col gap-4 border border-border group hover:border-primary/30 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="p-2.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <LucideBanknote size={22} />
                </span>
                <div>
                  <h3 className="text-base font-bold text-white">{va.user}</h3>
                  <p className="text-[10px] uppercase tracking-widest text-white/40">{va.bank}</p>
                </div>
              </div>
              <button className="text-white/20 hover:text-white transition">
                <LucideEye size={18} />
              </button>
            </div>

            <div className="bg-bg-dark/50 rounded-xl p-4 border border-border/50 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-white/30 uppercase tracking-tighter">Account Number</span>
                {copyId === va.id && (
                  <span className="text-[10px] text-success font-bold flex items-center gap-1">
                    <LucideCheckCircle2 size={12} /> COPIED
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-mono font-bold text-white tracking-widest">
                  {va.accountNumber}
                </span>
                <button
                  onClick={() => handleCopy(va.accountNumber, va.id)}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition"
                >
                  <LucideCopy size={16} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mt-1">
              <div>
                <p className="text-[10px] text-white/40 uppercase">Wallet Balance</p>
                <p className="text-lg font-bold text-success">₦{va.balance.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-white/40 uppercase">Assigned To</p>
                <p className="text-xs text-white/80">{va.assignedUser.split('@')[0]}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* VA Transactions Table */}
      <div className="glass-card flex flex-col overflow-hidden border border-border">
        <div className="p-6 border-b border-border bg-white/[0.02]">
          <h2 className="text-lg font-bold text-white">Recent VA Activity</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/5 text-white/40 uppercase text-[10px] tracking-widest font-bold">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Reference</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {VA_TRANSACTIONS.map((tx, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 text-white/60">
                    {new Date(tx.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 font-medium text-white/90">{tx.type}</td>
                  <td className="px-6 py-4 font-mono text-xs text-white/50">{tx.ref}</td>
                  <td className="px-6 py-4"><StatusBadge status={tx.status as any} /></td>
                  <td className={`px-6 py-4 text-right font-bold ${tx.type === 'Credit' ? 'text-success' : 'text-white'}`}>
                    {tx.type === 'Credit' ? '+' : '-'} ₦{tx.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create VA Modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)} title="Issue New Virtual Account">
        <form className="flex flex-col gap-5 pt-2" onSubmit={e => e.preventDefault()}>
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 mb-2">
            <p className="text-xs text-white/60 leading-relaxed">
              Issuing a virtual account allows you to receive payments via bank transfer directly into your business wallet.
            </p>
          </div>
          <FormInput label="Customer Full Name" placeholder="e.g. Olamilekan Adebayo" required />
          <FormInput label="Customer Email" placeholder="customer@email.com" type="email" required />
          <div className="flex flex-col gap-2 mt-2">
            <button type="submit" className="w-full py-3 rounded-xl bg-primary text-white font-bold hover:opacity-90 transition shadow-lg shadow-primary/20">
              Generate Providus Account
            </button>
            <button 
              type="button"
              onClick={() => setShowModal(false)}
              className="w-full py-3 text-white/40 text-sm hover:text-white transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}