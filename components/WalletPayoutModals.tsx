"use client";

import { useState } from "react";
import { LucideSend, LucideCreditCard, LucideCheckCircle2, LucideShieldCheck } from "lucide-react";
import { Modal } from "./Modal";
import { FormInput } from "./FormInput";
import { FormSelect } from "./FormInput";

const BANKS = [
  "Access Bank", "FCMB", "Fidelity Bank", "First Bank", "GTBank",
  "Keystone Bank", "Opay", "Providus Bank", "Stanbic IBTC",
  "UBA", "Union Bank", "Wema Bank", "Zenith Bank",
];

// ─── Create Virtual Wallet Modal ──────────────────────────────────────────────

interface CreateWalletProps {
  open: boolean;
  onClose: () => void;
  onCreate: (data: { name: string; currency: string; type: string }) => void;
}

export function CreateVirtualWalletModal({ open, onClose, onCreate }: CreateWalletProps) {
  const [form, setForm] = useState({ name: "", currency: "NGN", type: "operations" });
  const [done, setDone] = useState(false);

  const handleClose = () => { setDone(false); setForm({ name: "", currency: "NGN", type: "operations" }); onClose(); };

  if (done) return (
    <Modal open={open} onClose={handleClose} title="Wallet Created" eyebrow="Wallets">
      <div className="modal-done">
        <span className="done-ring"><LucideCheckCircle2 size={30} strokeWidth={1.8} color="var(--success)" /></span>
        <h3 className="done-title">Wallet Provisioned!</h3>
        <p className="done-sub">{form.name} · {form.currency} — ready to use</p>
        <button className="btn btn-primary" style={{ marginTop: 10 }} onClick={handleClose}>Done</button>
      </div>
    </Modal>
  );

  return (
    <Modal open={open} onClose={handleClose} title="Create Virtual Wallet" eyebrow="Wallets">
      <form
        style={{ display: "flex", flexDirection: "column", gap: 14 }}
        onSubmit={e => { e.preventDefault(); if (form.name.trim()) { onCreate(form); setDone(true); } }}
      >
        {/* Info callout */}
        <div className="info-box">
          <LucideShieldCheck size={14} color="var(--primary)" strokeWidth={1.8} style={{ flexShrink: 0, marginTop: 1 }} />
          <p>Each wallet gets its own virtual account number and dedicated settlement ledger.</p>
        </div>

        <FormInput
          label="Wallet Name"
          placeholder="e.g. Payroll, Operations, Escrow"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          required
          autoFocus
        />

        <div className="form-row-2">
          <FormSelect
            label="Currency"
            value={form.currency}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setForm(f => ({ ...f, currency: e.target.value }))}
            options={[
              { value: "NGN", label: "NGN — Naira" },
              { value: "USD", label: "USD (Pro)", disabled: true },
              { value: "GHS", label: "GHS (Pro)", disabled: true },
            ]}
          />
          <FormSelect
            label="Type"
            value={form.type}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setForm(f => ({ ...f, type: e.target.value }))}
            options={[
              { value: "operations", label: "Operations" },
              { value: "savings",    label: "Savings"    },
              { value: "escrow",     label: "Escrow"     },
              { value: "payroll",    label: "Payroll"    },
            ]}
          />
        </div>

        <div style={{ display: "flex", gap: 10, paddingTop: 4 }}>
          <button type="button" className="btn btn-ghost" style={{ flex: 1, justifyContent: "center" }} onClick={handleClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-gradient" style={{ flex: 2, justifyContent: "center" }} disabled={!form.name.trim()}>
            <LucideCreditCard size={14} /> Provision Wallet
          </button>
        </div>
      </form>
    </Modal>
  );
}


// ─── Send Payout Modal ────────────────────────────────────────────────────────

interface SendPayoutProps {
  open: boolean;
  onClose: () => void;
  onSend: (data: { bank: string; account: string; name: string; amount: string; note: string }) => void;
}

export function SendPayoutModal({ open, onClose, onSend }: SendPayoutProps) {
  const [form, setForm] = useState({ bank: "", account: "", name: "", amount: "", note: "" });
  const [step, setStep] = useState<"form" | "confirm" | "done">("form");

  const handleClose = () => { setStep("form"); setForm({ bank: "", account: "", name: "", amount: "", note: "" }); onClose(); };

  const fee = 25;
  const total = Number(form.amount || 0) + fee;

  if (step === "done") return (
    <Modal open={open} onClose={handleClose} title="Payout Sent" eyebrow="Payouts">
      <div className="modal-done">
        <span className="done-ring"><LucideCheckCircle2 size={30} strokeWidth={1.8} color="var(--success)" /></span>
        <h3 className="done-title">Payout Sent!</h3>
        <p className="done-sub">₦{Number(form.amount).toLocaleString()} → {form.name || form.account} · {form.bank}</p>
        <p className="done-ref">Ref: PAYOUT{Math.floor(Math.random() * 9000 + 1000)}</p>
        <button className="btn btn-primary" style={{ marginTop: 10 }} onClick={handleClose}>Done</button>
      </div>
    </Modal>
  );

  if (step === "confirm") return (
    <Modal open={open} onClose={() => setStep("form")} title="Confirm Payout" eyebrow="Payouts">
      <div className="confirm-panel">
        <div className="confirm-row"><span>Recipient</span><strong>{form.name || "—"}</strong></div>
        <div className="confirm-row"><span>Bank</span><strong>{form.bank}</strong></div>
        <div className="confirm-row"><span>Account</span><strong className="mono">{form.account}</strong></div>
        <div className="confirm-row"><span>Amount</span><strong style={{ color: "var(--success)" }}>₦{Number(form.amount).toLocaleString()}</strong></div>
        <div className="confirm-row"><span>Service Fee</span><strong style={{ color: "var(--warning)" }}>₦{fee}</strong></div>
        {form.note && <div className="confirm-row"><span>Note</span><strong>{form.note}</strong></div>}
        <div className="confirm-total">
          <span>Total deducted</span>
          <strong>₦{total.toLocaleString()}</strong>
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
        <button className="btn btn-ghost" style={{ flex: 1, justifyContent: "center" }} onClick={() => setStep("form")}>
          Edit
        </button>
        <button className="btn btn-gradient" style={{ flex: 2, justifyContent: "center" }} onClick={() => { onSend(form); setStep("done"); }}>
          <LucideSend size={14} /> Confirm &amp; Send
        </button>
      </div>
    </Modal>
  );

  return (
    <Modal open={open} onClose={handleClose} title="Send Payout" eyebrow="Payouts">
      <form
        style={{ display: "flex", flexDirection: "column", gap: 14 }}
        onSubmit={e => { e.preventDefault(); setStep("confirm"); }}
      >
        <FormInput
          label="Recipient Name"
          placeholder="e.g. John Doe"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          autoFocus
        />
        <div className="form-row-2">
          <FormSelect
            label="Bank"
            value={form.bank}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setForm(f => ({ ...f, bank: e.target.value }))}
            options={BANKS.map(b => ({ value: b, label: b }))}
            placeholder="Select bank…"
            required
          />
          <FormInput
            label="Account Number"
            placeholder="0123456789"
            maxLength={10}
            value={form.account}
            onChange={e => setForm(f => ({ ...f, account: e.target.value }))}
            required
          />
        </div>
        <FormInput
          label="Amount (₦)"
          type="number"
          min="1"
          placeholder="0.00"
          prefix="₦"
          value={form.amount}
          onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
          hint={form.amount ? `Fee: ₦${fee} · Total: ₦${total.toLocaleString()}` : undefined}
          required
        />
        <FormInput
          label="Narration"
          placeholder="e.g. Salary payment (optional)"
          value={form.note}
          onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
        />
        <div style={{ display: "flex", gap: 10, paddingTop: 4 }}>
          <button type="button" className="btn btn-ghost" style={{ flex: 1, justifyContent: "center" }} onClick={handleClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-gradient" style={{ flex: 2, justifyContent: "center" }} disabled={!form.bank || !form.account || !form.amount}>
            Review Transfer
          </button>
        </div>
      </form>
    </Modal>
  );
}