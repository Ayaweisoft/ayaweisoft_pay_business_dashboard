"use client";
import { useState } from "react";
import { LucideCreditCard, LucidePlus, LucideEye, LucideCopy } from "lucide-react";
import { Modal } from "../../components/Modal";
import { FormInput } from "../../components/FormInput";
import { StatusBadge } from "../../components/StatusBadge";

const wallets = [
  {
    id: 1,
    name: "Main Wallet",
    balance: 5200000,
    currency: "NGN",
    status: "success",
    accountNumber: "1234567890",
    bank: "Mbawulu",
  },
  {
    id: 2,
    name: "USD Wallet",
    balance: 12000,
    currency: "USD",
    status: "success",
    accountNumber: "9876543210",
    bank: "Wema Bank",
  },
];

export default function WalletsPage() {
  const [showModal, setShowModal] = useState(false);
  const [copyId, setCopyId] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-8">
      {/* Header and Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Wallets</h1>
          <p className="text-white/60 text-sm">Manage your business wallets and balances.</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold shadow hover:opacity-90 transition"
          onClick={() => setShowModal(true)}
        >
          <LucidePlus size={16} /> Create Wallet
        </button>
      </div>

      {/* Wallets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {wallets.map((wallet) => (
          <div key={wallet.id} className="glass-card p-6 flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 rounded-lg bg-primary/10 text-primary"><LucideCreditCard size={20} /></span>
              <span className="text-lg font-bold text-white">{wallet.name}</span>
              <StatusBadge status={wallet.status as any} />
            </div>
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <span className="font-semibold">{wallet.bank}</span>
              <span className="mx-2">•</span>
              <span className="font-mono tracking-wider">{wallet.accountNumber}</span>
              <button
                className="ml-2 p-1 rounded hover:bg-bg-card"
                onClick={() => {
                  navigator.clipboard.writeText(wallet.accountNumber);
                  setCopyId(wallet.id);
                  setTimeout(() => setCopyId(null), 1200);
                }}
                title="Copy Account Number"
              >
                <LucideCopy size={16} className={copyId === wallet.id ? "text-success" : "text-white/60"} />
              </button>
              <button className="ml-1 p-1 rounded hover:bg-bg-card" title="View Details">
                <LucideEye size={16} className="text-white/60" />
              </button>
            </div>
            <div className="text-xs text-white/50">Currency: {wallet.currency}</div>
            <div className="text-sm text-success font-bold mt-2">
              {wallet.currency === "NGN" ? "₦" : "$"}
              {wallet.balance.toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {/* Create Wallet Modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)} title="Create Wallet">
        <form className="flex flex-col gap-4">
          <FormInput label="Wallet Name" placeholder="Enter wallet name" required />
          <FormInput label="Currency" placeholder="e.g. NGN, USD" required />
          <FormInput label="Bank" placeholder="Enter bank name" required />
          <FormInput label="Account Number" placeholder="Enter account number" required />
          <button type="submit" className="mt-2 px-4 py-2 rounded-lg bg-primary text-white font-semibold hover:opacity-90 transition">Create Wallet</button>
        </form>
      </Modal>
    </div>
  );
}
