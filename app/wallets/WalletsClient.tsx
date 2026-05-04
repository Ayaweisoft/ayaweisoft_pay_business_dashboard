"use client";

import { useState } from "react";
import { LucideCreditCard, LucidePlus, LucideEye, LucideEyeOff, LucideCopy, LucideArrowUpRight, LucideCheck } from "lucide-react";
import { Modal } from "../../components/Modal";
import { FormInput } from "../../components/FormInput";
import { StatusBadge } from "../../components/StatusBadge";

const WALLETS = [
  {
    id: 1,
    name: "Main Business Wallet",
    balance: 5200000,
    currency: "NGN",
    status: "success",
    accountNumber: "1234567890",
    bank: "Providus Bank",
  },
  {
    id: 2,
    name: "Reserve Fund",
    balance: 12000,
    currency: "USD",
    status: "success",
    accountNumber: "9876543210",
    bank: "Wema Bank",
  },
];

export default function WalletsClient() {
  const [showModal, setShowModal] = useState(false);
  const [showBalances, setShowBalances] = useState(true);
  const [copyId, setCopyId] = useState<number | null>(null);

  const handleCopy = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopyId(id);
    setTimeout(() => setCopyId(null), 2000);
  };

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      {/* Header and Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Wallets</h1>
          <p className="text-white/60 text-sm">Control your liquidity and track multi-currency balances.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowBalances(!showBalances)}
            className="p-2.5 rounded-xl bg-white/5 border border-border text-white/60 hover:text-white transition"
          >
            {showBalances ? <LucideEyeOff size={20} /> : <LucideEye size={20} />}
          </button>
          <button
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition active:scale-95"
            onClick={() => setShowModal(true)}
          >
            <LucidePlus size={18} /> New Wallet
          </button>
        </div>
      </div>

      {/* Wallets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {WALLETS.map((wallet) => (
          <div key={wallet.id} className="glass-card relative overflow-hidden group border border-border">
            {/* Background Decorative Element */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
            
            <div className="relative p-6 flex flex-col gap-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-white/5 text-primary">
                    <LucideCreditCard size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">{wallet.name}</h3>
                    <StatusBadge status={wallet.status as any} />
                  </div>
                </div>
                <span className="px-3 py-1 rounded-lg bg-white/5 border border-border text-xs font-bold text-white/40 uppercase tracking-widest">
                  {wallet.currency}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-xs text-white/40 font-medium uppercase tracking-tighter">Available Balance</p>
                <h2 className="text-3xl font-bold text-white tracking-tight">
                  {wallet.currency === "NGN" ? "₦" : "$"}
                  {showBalances ? wallet.balance.toLocaleString() : "••••••"}
                </h2>
              </div>

              <div className="mt-2 p-4 rounded-xl bg-bg-dark/50 border border-border/50 flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                  <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">{wallet.bank}</p>
                  <p className="text-sm font-mono text-white/80 tracking-widest">{wallet.accountNumber}</p>
                </div>
                <button 
                  onClick={() => handleCopy(wallet.accountNumber, wallet.id)}
                  className="flex items-center gap-2 text-xs font-bold text-primary hover:text-white transition group/btn"
                >
                  {copyId === wallet.id ? (
                    <>Copied <LucideCheck size={14} /></>
                  ) : (
                    <>Copy <LucideCopy size={14} className="group-hover/btn:scale-110 transition" /></>
                  )}
                </button>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 py-2.5 rounded-lg bg-white/5 border border-border text-white text-sm font-bold hover:bg-white/10 transition flex items-center justify-center gap-2">
                  Withdraw
                </button>
                <button className="flex-1 py-2.5 rounded-lg bg-primary/10 text-primary text-sm font-bold hover:bg-primary hover:text-white transition flex items-center justify-center gap-2">
                  Fund Wallet <LucideArrowUpRight size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Wallet Modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)} title="Create New Business Wallet">
        <form className="flex flex-col gap-5 pt-2" onSubmit={e => e.preventDefault()}>
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 mb-2">
            <p className="text-xs text-white/60 leading-relaxed">
              Create separate wallets for specific business departments or currency types. Each wallet comes with its own settlement ledger.
            </p>
          </div>
          <FormInput label="Wallet Name" placeholder="e.g. Marketing Fund" required />
          <div className="space-y-1">
            <label className="text-xs font-bold text-white/40 ml-1 uppercase">Currency</label>
            <select className="w-full bg-bg-dark border border-border rounded-lg px-4 py-3 text-sm text-white focus:ring-1 focus:ring-primary outline-none appearance-none cursor-pointer">
              <option value="NGN">Nigerian Naira (NGN)</option>
              <option value="USD" disabled>US Dollar (USD) - Pro Only</option>
            </select>
          </div>
          <button type="submit" className="mt-4 w-full py-3 rounded-xl bg-primary text-white font-bold hover:opacity-90 transition shadow-lg shadow-primary/20 active:scale-[0.98]">
            Provision Wallet
          </button>
        </form>
      </Modal>
    </div>
  );
}