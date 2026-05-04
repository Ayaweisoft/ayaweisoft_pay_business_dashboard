"use client";

import { useState } from "react";
import { LucidePlus, LucideX, LucideSend, LucideCreditCard } from "lucide-react";

export function CreateVirtualWalletModal({ open, onClose, onCreate }: { open: boolean; onClose: () => void; onCreate: (data: { name: string; currency: string }) => void }) {
  const [name, setName] = useState("");
  const [currency, setCurrency] = useState("NGN");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-bg-card rounded-2xl shadow-xl p-8 w-full max-w-sm relative">
        <button
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-white/10 text-white/60"
          onClick={onClose}
          aria-label="Close"
        >
          <LucideX size={20} />
        </button>
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <LucideCreditCard size={20} /> Create Virtual Wallet
        </h2>
        <input
          className="w-full px-4 py-2 rounded-lg bg-bg-dark border border-border text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary mb-4"
          placeholder="Wallet name (e.g. Payroll, Operations)"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <select
          className="w-full px-4 py-2 rounded-lg bg-bg-dark border border-border text-white focus:outline-none focus:ring-2 focus:ring-primary mb-6"
          value={currency}
          onChange={e => setCurrency(e.target.value)}
        >
          <option value="NGN">NGN (Mbawula)</option>
          <option value="USD">USD</option>
        </select>
        <button
          className="w-full py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition disabled:opacity-50"
          onClick={() => { if (name.trim()) { onCreate({ name, currency }); setName(""); setCurrency("NGN"); onClose(); } }}
          disabled={!name.trim()}
        >
          Create Wallet
        </button>
      </div>
    </div>
  );
}

export function SendPayoutModal({ open, onClose, onSend }: { open: boolean; onClose: () => void; onSend: (data: { to: string; amount: string; note: string }) => void }) {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-bg-card rounded-2xl shadow-xl p-8 w-full max-w-sm relative">
        <button
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-white/10 text-white/60"
          onClick={onClose}
          aria-label="Close"
        >
          <LucideX size={20} />
        </button>
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <LucideSend size={20} /> Send Payout
        </h2>
        <input
          className="w-full px-4 py-2 rounded-lg bg-bg-dark border border-border text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary mb-4"
          placeholder="Recipient account or email"
          value={to}
          onChange={e => setTo(e.target.value)}
        />
        <input
          className="w-full px-4 py-2 rounded-lg bg-bg-dark border border-border text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary mb-4"
          placeholder="Amount (e.g. 10000)"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          type="number"
          min="1"
        />
        <input
          className="w-full px-4 py-2 rounded-lg bg-bg-dark border border-border text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary mb-6"
          placeholder="Note (optional)"
          value={note}
          onChange={e => setNote(e.target.value)}
        />
        <button
          className="w-full py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition disabled:opacity-50"
          onClick={() => { if (to.trim() && amount.trim()) { onSend({ to, amount, note }); setTo(""); setAmount(""); setNote(""); onClose(); } }}
          disabled={!to.trim() || !amount.trim()}
        >
          Send Payout
        </button>
      </div>
    </div>
  );
}
