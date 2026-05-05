"use client";

import { useState, useCallback } from "react";
import {
  LucideCreditCard,
  LucidePlus,
  LucideEye,
  LucideEyeOff,
  LucideCopy,
  LucideArrowUpRight,
  LucideCheck,
  LucideArrowDownLeft,
  LucideX,
  LucideRefreshCw,
  LucideShieldCheck,
  LucideBanknote,
  LucideMoreHorizontal,
  LucideChevronRight,
  LucideTrendingUp,
  LucideTrendingDown,
  LucideCircleDollarSign,
  LucideLock,
  LucideUnlock,
  LucideAlertCircle,
  LucideCheckCircle2,
  LucideSend,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type WalletStatus = "active" | "frozen" | "pending";
type TxType = "credit" | "debit";
type ModalType = "create" | "fund" | "withdraw" | "detail" | null;

interface Wallet {
  id: number;
  name: string;
  balance: number;
  currency: "NGN" | "USD" | "GHS" | "KES";
  status: WalletStatus;
  accountNumber: string;
  bank: string;
  tag: string;
  trend: number; // % change
  txCount: number;
  lastActivity: string;
  accent: "blue" | "teal" | "orange" | "purple";
}

interface MiniTx {
  id: string;
  label: string;
  amount: number;
  type: TxType;
  date: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const WALLETS: Wallet[] = [
  {
    id: 1,
    name: "Main Business Wallet",
    balance: 5200000,
    currency: "NGN",
    status: "active",
    accountNumber: "1234567890",
    bank: "Mbawula MFB",
    tag: "PRIMARY",
    trend: 12.5,
    txCount: 1240,
    lastActivity: "2 min ago",
    accent: "blue",
  },
  {
    id: 2,
    name: "Reserve Fund",
    balance: 12000,
    currency: "USD",
    status: "active",
    accountNumber: "9876543210",
    bank: "Wema Bank",
    tag: "RESERVE",
    trend: 3.2,
    txCount: 87,
    lastActivity: "1 hr ago",
    accent: "teal",
  },
  {
    id: 3,
    name: "Marketing Budget",
    balance: 850000,
    currency: "NGN",
    status: "active",
    accountNumber: "5544332211",
    bank: "Mbawula MFB",
    tag: "OPEX",
    trend: -4.1,
    txCount: 310,
    lastActivity: "Yesterday",
    accent: "orange",
  },
  {
    id: 4,
    name: "Escrow Wallet",
    balance: 2300000,
    currency: "NGN",
    status: "frozen",
    accountNumber: "1122334455",
    bank: "Mbawula MFB",
    tag: "ESCROW",
    trend: 0,
    txCount: 42,
    lastActivity: "3 days ago",
    accent: "purple",
  },
];

const RECENT_TX: MiniTx[] = [
  { id: "TX001", label: "Payout to GTBank",     amount: 45000,  type: "debit",  date: "Today 10:32" },
  { id: "TX002", label: "Transfer received",    amount: 120000, type: "credit", date: "Today 09:10" },
  { id: "TX003", label: "Webhook fee",          amount: 500,    type: "debit",  date: "Yesterday"   },
  { id: "TX004", label: "Settlement credit",    amount: 310000, type: "credit", date: "Mon 4:20 PM" },
  { id: "TX005", label: "Bulk payout batch",    amount: 230000, type: "debit",  date: "Mon 2:00 PM" },
];

const CURRENCY_SYMBOLS: Record<string, string> = { NGN: "₦", USD: "$", GHS: "₵", KES: "KSh" };

const ACCENT_MAP = {
  blue:   { border: "rgba(46,91,255,0.25)",    glow: "rgba(46,91,255,0.18)",   tag: "rgba(46,91,255,0.15)",   tagText: "var(--primary)",            track: "#2e5bff" },
  teal:   { border: "rgba(0,241,253,0.2)",     glow: "rgba(0,241,253,0.12)",   tag: "rgba(0,241,253,0.1)",    tagText: "var(--secondary-container)", track: "#00f1fd" },
  orange: { border: "rgba(245,158,11,0.22)",   glow: "rgba(245,158,11,0.12)",  tag: "rgba(245,158,11,0.12)",  tagText: "var(--warning)",             track: "#f59e0b" },
  purple: { border: "rgba(139,92,246,0.22)",   glow: "rgba(139,92,246,0.12)",  tag: "rgba(139,92,246,0.12)",  tagText: "#a78bfa",                    track: "#8b5cf6" },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + "M";
  if (n >= 1_000)     return (n / 1_000).toFixed(1) + "K";
  return n.toLocaleString();
}

function statusMeta(s: WalletStatus) {
  return {
    active:  { icon: <LucideCheckCircle2 size={11} strokeWidth={2.5}/>, label: "Active",  cls: "ws--active"  },
    frozen:  { icon: <LucideLock         size={11} strokeWidth={2.5}/>, label: "Frozen",  cls: "ws--frozen"  },
    pending: { icon: <LucideAlertCircle  size={11} strokeWidth={2.5}/>, label: "Pending", cls: "ws--pending" },
  }[s];
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Modal({ open, onClose, title, eyebrow, children }: {
  open: boolean; onClose: () => void; title: string; eyebrow?: string; children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="wlt-modal-backdrop" onClick={onClose} role="dialog" aria-modal aria-label={title}>
      <div className="wlt-modal-sheet" onClick={e => e.stopPropagation()}>
        <div className="wlt-modal-drag" />
        <div className="wlt-modal-inner">
          <div className="wlt-modal-head">
            <div>
              {eyebrow && <p className="wlt-modal-eyebrow">{eyebrow}</p>}
              <h2 className="wlt-modal-title">{title}</h2>
            </div>
            <button className="wlt-modal-x" onClick={onClose} aria-label="Close"><LucideX size={15}/></button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

function CopyBtn({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(text).catch(()=>{});
    setDone(true); setTimeout(()=>setDone(false), 1800);
  };
  return (
    <button className="wlt-copy-btn" onClick={copy} aria-label="Copy">
      {done ? <LucideCheck size={12} strokeWidth={2.5}/> : <LucideCopy size={12} strokeWidth={2}/>}
    </button>
  );
}

function TrendBadge({ val }: { val: number }) {
  if (val === 0) return <span className="wlt-trend wlt-trend--flat">— Flat</span>;
  const up = val > 0;
  return (
    <span className={`wlt-trend ${up ? "wlt-trend--up" : "wlt-trend--down"}`}>
      {up ? <LucideTrendingUp size={11} strokeWidth={2.5}/> : <LucideTrendingDown size={11} strokeWidth={2.5}/>}
      {Math.abs(val)}%
    </span>
  );
}

// ─── Create Wallet Modal ──────────────────────────────────────────────────────

function CreateWalletModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: "", currency: "NGN", type: "operations", pin: "" });
  const [done, setDone] = useState(false);

  if (done) return (
    <div className="wlt-done">
      <span className="wlt-done-ring"><LucideCheckCircle2 size={30} strokeWidth={1.8} color="var(--success)"/></span>
      <h3 className="wlt-done-title">Wallet Created!</h3>
      <p className="wlt-done-sub">{form.name} · {form.currency} — provisioned successfully</p>
      <button className="btn btn-primary u-mt-8" onClick={onClose}>Done</button>
    </div>
  );

  return (
    <form className="wlt-form" onSubmit={e=>{e.preventDefault();setDone(true);}}>
      <div className="wlt-info-box">
        <LucideShieldCheck size={14} color="var(--primary)" strokeWidth={1.8}/>
        <p>Each wallet has its own settlement ledger and dedicated virtual account number.</p>
      </div>
      <div className="field">
        <label className="label">Wallet Name</label>
        <input className="input" placeholder="e.g. Marketing Fund" required value={form.name}
          onChange={e=>setForm(f=>({...f,name:e.target.value}))}/>
      </div>
      <div className="wlt-form-row">
        <div className="field">
          <label className="label">Currency</label>
          <select className="input" value={form.currency} onChange={e=>setForm(f=>({...f,currency:e.target.value}))}>
            <option value="NGN">NGN — Naira</option>
            <option value="USD" disabled>USD — (Pro Only)</option>
            <option value="GHS" disabled>GHS — (Pro Only)</option>
          </select>
        </div>
        <div className="field">
          <label className="label">Type</label>
          <select className="input" value={form.type} onChange={e=>setForm(f=>({...f,type:e.target.value}))}>
            <option value="operations">Operations</option>
            <option value="savings">Savings</option>
            <option value="escrow">Escrow</option>
            <option value="payroll">Payroll</option>
          </select>
        </div>
      </div>
      <div className="field">
        <label className="label">Transaction PIN</label>
        <input className="input" type="password" maxLength={4} placeholder="4-digit PIN" required value={form.pin}
          onChange={e=>setForm(f=>({...f,pin:e.target.value}))}/>
        <p className="field-hint">Used to authorize withdrawals from this wallet.</p>
      </div>
      <button type="submit" className="btn btn-gradient btn-full u-mt-4">
        <LucidePlus size={15}/> Provision Wallet
      </button>
    </form>
  );
}

// Fund / Withdraw modal
function FundModal({ wallet, mode, onClose }: { wallet: Wallet; mode: "fund"|"withdraw"; onClose: ()=>void }) {
  const [amount, setAmount] = useState("");
  const [done, setDone] = useState(false);
  const sym = CURRENCY_SYMBOLS[wallet.currency];
  const isFund = mode === "fund";

  if (done) return (
    <div className="wlt-done">
      <span className="wlt-done-ring"><LucideCheckCircle2 size={30} strokeWidth={1.8} color="var(--success)"/></span>
      <h3 className="wlt-done-title">{isFund ? "Funded!" : "Withdrawn!"}</h3>
      <p className="wlt-done-sub">{sym}{Number(amount).toLocaleString()} {isFund?"added to":"deducted from"} {wallet.name}</p>
      <button className="btn btn-primary u-mt-8" onClick={onClose}>Done</button>
    </div>
  );

  return (
    <form className="wlt-form" onSubmit={e=>{e.preventDefault();if(amount)setDone(true);}}>
      <div className="wlt-fund-card">
        <span className="wlt-fund-card__label">Current Balance</span>
        <span className="wlt-fund-card__val">{sym}{wallet.balance.toLocaleString()}</span>
        <span className="wlt-fund-card__bank">{wallet.bank} · {wallet.accountNumber}</span>
      </div>
      <div className="field">
        <label className="label">Amount ({wallet.currency})</label>
        <div className="input-prefix-wrap">
          <span className="input-prefix">{sym}</span>
          <input className="input input--prefixed" type="number" min="1" placeholder="0.00" required
            value={amount} onChange={e=>setAmount(e.target.value)}/>
        </div>
        {amount && (
          <p className="field-hint">
            New balance: {sym}{(wallet.balance + (isFund ? 1 : -1) * Number(amount)).toLocaleString()}
          </p>
        )}
      </div>
      <div className="field">
        <label className="label">Narration <span className="u-optional-text">(optional)</span></label>
        <input className="input" placeholder={isFund ? "e.g. Monthly top-up" : "e.g. Vendor settlement"}/>
      </div>
      <button type="submit" className={`btn ${isFund?"btn-gradient":"btn-primary"} btn-full u-mt-4`}>
        {isFund ? <><LucideArrowDownLeft size={15}/> Fund Wallet</> : <><LucideArrowUpRight size={15}/> Withdraw</>}
      </button>
    </form>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function WalletsClient() {
  const [showBalances, setShowBalances] = useState(true);
  const [modal,        setModal]        = useState<ModalType>(null);
  const [activeWallet, setActiveWallet] = useState<Wallet | null>(null);
  const [fundMode,     setFundMode]     = useState<"fund"|"withdraw">("fund");
  const [menuId,       setMenuId]       = useState<number | null>(null);

  const openFund = (w: Wallet, mode: "fund"|"withdraw") => {
    setActiveWallet(w); setFundMode(mode); setModal("fund"); setMenuId(null);
  };

  const totalNGN = WALLETS.filter(w=>w.currency==="NGN").reduce((s,w)=>s+w.balance,0);
  const totalUSD = WALLETS.filter(w=>w.currency==="USD").reduce((s,w)=>s+w.balance,0);

  return (
    <>
      {/* ── Scoped styles ─────────────────────────────────────────────────── */}
      <style>{`
        /* Layout */
        .wlt-root {
          display: flex; flex-direction: column; gap: 24px;
          padding: 28px 32px; max-width: 1280px; width: 100%; margin: 0 auto;
        }
        @media (max-width:768px) { .wlt-root { padding: 16px 14px; gap: 18px; } }

        /* ── Header ──────────────────────────────────── */
        .wlt-header {
          display: flex; align-items: flex-start; justify-content: space-between;
          flex-wrap: wrap; gap: 14px;
        }
        .wlt-title { font-size: 1.35rem; font-weight: 700; color: var(--foreground); letter-spacing: -.02em; }
        .wlt-sub   { font-size: .8rem; color: rgba(226,225,239,.4); margin-top: 4px; }
        .wlt-hactions { display: flex; align-items: center; gap: 8px; }

        /* ── Summary bar ─────────────────────────────── */
        .wlt-summary {
          display: grid; grid-template-columns: repeat(3,1fr); gap: 12px;
        }
        @media (max-width:640px) { .wlt-summary { grid-template-columns: 1fr; } }
        .wlt-sum-card {
          background: var(--card-bg); border: 1px solid var(--border-subtle);
          border-radius: 14px; padding: 16px 20px;
          display: flex; flex-direction: column; gap: 4px;
          position: relative; overflow: hidden;
        }
        .wlt-sum-card::before {
          content: ""; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg,transparent,rgba(255,255,255,.07),transparent);
        }
        .wlt-sum-label { font-size: .68rem; font-weight: 700; text-transform: uppercase; letter-spacing: .1em; color: rgba(226,225,239,.35); }
        .wlt-sum-value { font-size: 1.45rem; font-weight: 700; letter-spacing: -.025em; font-variant-numeric: tabular-nums; color: var(--foreground); line-height: 1.1; }
        .wlt-sum-sub   { font-size: .72rem; color: rgba(226,225,239,.35); margin-top: 2px; }

        /* ── Wallet grid ─────────────────────────────── */
        .wlt-grid {
          display: grid; grid-template-columns: repeat(2,1fr); gap: 16px;
        }
        @media (max-width:900px)  { .wlt-grid { grid-template-columns: 1fr; } }

        /* Wallet card */
        .wlt-card {
          background: var(--card-bg);
          border-radius: 20px;
          border: 1px solid var(--border-subtle);
          position: relative; overflow: hidden;
          display: flex; flex-direction: column;
          transition: border-color 200ms ease, transform 200ms ease, box-shadow 200ms ease;
        }
        .wlt-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 40px rgba(0,0,0,.35);
        }
        .wlt-card--frozen { opacity: .72; }
        .wlt-card__glow {
          position: absolute; pointer-events: none;
          width: 180px; height: 180px; border-radius: 50%;
          right: -40px; top: -40px; filter: blur(60px); opacity: .22;
        }
        .wlt-card__grid-bg {
          position: absolute; inset: 0; pointer-events: none; opacity: .025;
          background-image:
            linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px);
          background-size: 24px 24px;
        }

        /* Card header */
        .wlt-card__head {
          position: relative; display: flex; align-items: flex-start; justify-content: space-between;
          padding: 20px 20px 0;
        }
        .wlt-card__icon {
          width: 42px; height: 42px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid; flex-shrink: 0;
        }
        .wlt-card__name-row { display: flex; flex-direction: column; gap: 5px; flex: 1; margin: 0 12px; }
        .wlt-card__name { font-size: .9rem; font-weight: 700; color: var(--foreground); letter-spacing: -.01em; }
        .wlt-card__tag {
          display: inline-flex; align-items: center;
          padding: 2px 8px; border-radius: 100px;
          font-size: .62rem; font-weight: 800; letter-spacing: .12em;
          border: 1px solid rgba(255,255,255,.06); width: fit-content;
        }
        .wlt-card__menu-btn {
          padding: 6px; border-radius: 8px; color: rgba(226,225,239,.35);
          background: none; border: none; cursor: pointer; position: relative;
          transition: background 140ms, color 140ms;
        }
        .wlt-card__menu-btn:hover { background: rgba(255,255,255,.06); color: var(--foreground); }

        /* Dropdown menu */
        .wlt-menu {
          position: absolute; top: calc(100% + 6px); right: 0;
          background: var(--surface-container-high);
          border: 1px solid var(--border-mid); border-radius: 12px;
          padding: 6px; min-width: 160px; z-index: 20;
          box-shadow: var(--shadow-lg);
          animation: fade-down .18s var(--ease-out) both;
        }
        .wlt-menu-item {
          display: flex; align-items: center; gap: 8px;
          padding: 8px 10px; border-radius: 8px; font-size: .82rem;
          font-weight: 500; color: rgba(226,225,239,.7); cursor: pointer;
          background: none; border: none; width: 100%; font-family: var(--font-sans);
          transition: background 130ms, color 130ms;
        }
        .wlt-menu-item:hover { background: rgba(255,255,255,.06); color: var(--foreground); }
        .wlt-menu-item--danger { color: var(--error); }
        .wlt-menu-item--danger:hover { background: rgba(255,180,171,.08); }
        .wlt-menu-divider { height: 1px; background: var(--border-subtle); margin: 4px 0; }

        /* Balance section */
        .wlt-card__balance-area {
          position: relative; padding: 20px 20px 16px;
        }
        .wlt-card__bal-label {
          font-size: .65rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: .1em; color: rgba(226,225,239,.3); margin-bottom: 6px;
        }
        .wlt-card__bal-value {
          font-size: 2rem; font-weight: 800; letter-spacing: -.04em;
          font-variant-numeric: tabular-nums; color: var(--foreground); line-height: 1;
        }
        .wlt-card__bal-sub {
          display: flex; align-items: center; gap: 8px; margin-top: 8px;
        }

        /* Status badge */
        .wlt-status {
          display: inline-flex; align-items: center; gap: 4px;
          padding: 3px 8px; border-radius: 100px; font-size: .67rem;
          font-weight: 700; border: 1px solid;
        }
        .ws--active  { background: rgba(34,197,94,.1);   border-color: rgba(34,197,94,.2);   color: #4ade80; }
        .ws--frozen  { background: rgba(139,92,246,.1);  border-color: rgba(139,92,246,.2);  color: #a78bfa; }
        .ws--pending { background: rgba(245,158,11,.1);  border-color: rgba(245,158,11,.2);  color: var(--warning); }

        /* Trend badge */
        .wlt-trend {
          display: inline-flex; align-items: center; gap: 3px;
          font-size: .68rem; font-weight: 700; padding: 2px 7px; border-radius: 100px;
        }
        .wlt-trend--up   { background: rgba(34,197,94,.1);   color: #4ade80; }
        .wlt-trend--down { background: rgba(255,180,171,.1); color: var(--error); }
        .wlt-trend--flat { background: rgba(255,255,255,.05); color: rgba(226,225,239,.35); font-size: .65rem; }

        /* Account chip */
        .wlt-card__account {
          position: relative;
          margin: 0 20px 16px;
          padding: 12px 14px;
          border-radius: 12px;
          background: rgba(0,0,0,.25);
          border: 1px solid rgba(255,255,255,.06);
          display: flex; align-items: center; justify-content: space-between;
        }
        .wlt-card__acct-left { display: flex; flex-direction: column; gap: 2px; }
        .wlt-card__acct-bank { font-size: .67rem; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: rgba(226,225,239,.3); }
        .wlt-card__acct-num  { font-family: var(--font-mono); font-size: .88rem; color: rgba(226,225,239,.75); letter-spacing: .08em; }

        .wlt-copy-btn {
          padding: 5px 7px; border-radius: 7px;
          background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.08);
          color: rgba(226,225,239,.4); cursor: pointer; display: inline-flex;
          transition: all 140ms ease;
        }
        .wlt-copy-btn:hover { background: rgba(46,91,255,.15); color: var(--primary); border-color: rgba(46,91,255,.3); }

        /* Action buttons */
        .wlt-card__actions {
          position: relative; display: grid; grid-template-columns: 1fr 1fr;
          gap: 10px; padding: 0 20px 20px;
        }
        .wlt-act-btn {
          display: flex; align-items: center; justify-content: center; gap: 6px;
          padding: 10px 0; border-radius: 10px; font-size: .8rem; font-weight: 700;
          cursor: pointer; border: 1px solid; font-family: var(--font-sans);
          transition: all 160ms ease;
        }
        .wlt-act-btn:active { transform: scale(.97); }
        .wlt-act-btn--withdraw {
          background: rgba(255,255,255,.04); border-color: rgba(255,255,255,.09);
          color: rgba(226,225,239,.65);
        }
        .wlt-act-btn--withdraw:hover { background: rgba(255,255,255,.08); color: var(--foreground); }
        .wlt-act-btn--fund {
          background: rgba(46,91,255,.12); border-color: rgba(46,91,255,.25);
          color: var(--primary);
        }
        .wlt-act-btn--fund:hover { background: var(--primary-container); color: #fff; border-color: var(--primary-container); }
        .wlt-act-btn:disabled { opacity: .38; cursor: not-allowed; pointer-events: none; }

        /* ── Activity panel ───────────────────────────── */
        .wlt-activity {
          background: var(--card-bg); border: 1px solid var(--border-subtle);
          border-radius: 16px; overflow: hidden;
        }
        .wlt-activity__head {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 20px; border-bottom: 1px solid var(--border-subtle);
        }
        .wlt-activity__title { font-size: .9rem; font-weight: 700; color: var(--foreground); }
        .wlt-activity__link {
          display: flex; align-items: center; gap: 4px; font-size: .75rem;
          font-weight: 600; color: var(--primary); padding: 4px 8px; border-radius: 6px;
          transition: background 140ms;
        }
        .wlt-activity__link:hover { background: rgba(184,195,255,.1); }
        .wlt-tx-list { display: flex; flex-direction: column; }
        .wlt-tx {
          display: flex; align-items: center; gap: 12px;
          padding: 12px 20px; border-bottom: 1px solid var(--border-subtle);
          transition: background 140ms;
        }
        .wlt-tx:last-child { border-bottom: none; }
        .wlt-tx:hover { background: rgba(255,255,255,.018); }
        .wlt-tx__icon {
          width: 34px; height: 34px; border-radius: 10px; display: flex;
          align-items: center; justify-content: center; flex-shrink: 0; border: 1px solid;
        }
        .wlt-tx__icon--credit { background: rgba(34,197,94,.1);   border-color: rgba(34,197,94,.2);   color: var(--success); }
        .wlt-tx__icon--debit  { background: rgba(255,180,171,.1); border-color: rgba(255,180,171,.2); color: var(--error);   }
        .wlt-tx__info  { flex: 1; min-width: 0; }
        .wlt-tx__label { font-size: .84rem; font-weight: 600; color: var(--foreground); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .wlt-tx__id    { font-size: .7rem; color: rgba(226,225,239,.3); font-family: var(--font-mono); margin-top: 2px; }
        .wlt-tx__right { display: flex; flex-direction: column; align-items: flex-end; gap: 3px; }
        .wlt-tx__amount { font-size: .88rem; font-weight: 700; font-variant-numeric: tabular-nums; }
        .wlt-tx__date   { font-size: .68rem; color: rgba(226,225,239,.3); }

        /* ── Modal ───────────────────────────────────── */
        .wlt-modal-backdrop {
          position: fixed; inset: 0; z-index: 100;
          background: rgba(0,0,0,.72); backdrop-filter: blur(6px);
          display: flex; align-items: flex-end; justify-content: center; padding: 0;
        }
        @media (min-width:600px) { .wlt-modal-backdrop { align-items: center; padding: 20px; } }
        .wlt-modal-sheet {
          background: var(--surface-container-low);
          border: 1px solid var(--border-mid); border-radius: 20px 20px 0 0;
          width: 100%; max-width: 460px; box-shadow: var(--shadow-lg);
          max-height: 92vh; overflow-y: auto;
          animation: sheet-up .27s var(--ease-spring) both;
        }
        @media (min-width:600px) { .wlt-modal-sheet { border-radius: 20px; animation-name: fade-up; max-height: 88vh; } }
        @keyframes sheet-up { from { transform: translateY(100%); opacity:.85; } to { transform: none; opacity:1; } }
        .wlt-modal-drag {
          width: 36px; height: 4px; border-radius: 100px;
          background: rgba(255,255,255,.1); margin: 10px auto 0;
        }
        @media (min-width:600px) { .wlt-modal-drag { display: none; } }
        .wlt-modal-inner { padding: 0 22px 24px; }
        .wlt-modal-head {
          display: flex; align-items: flex-start; justify-content: space-between;
          padding: 16px 0 14px; border-bottom: 1px solid var(--border-subtle); margin-bottom: 20px;
        }
        .wlt-modal-eyebrow { font-size: .67rem; font-weight: 700; text-transform: uppercase; letter-spacing: .12em; color: rgba(226,225,239,.3); margin-bottom: 3px; }
        .wlt-modal-title   { font-size: 1rem; font-weight: 700; color: var(--foreground); letter-spacing: -.01em; }
        .wlt-modal-x {
          width: 28px; height: 28px; border-radius: 7px; display: flex;
          align-items: center; justify-content: center; color: rgba(226,225,239,.4);
          background: rgba(255,255,255,.04); border: 1px solid var(--border-subtle);
          cursor: pointer; transition: all 150ms; flex-shrink: 0;
        }
        .wlt-modal-x:hover { background: var(--surface-variant); color: var(--foreground); }

        .wlt-form { display: flex; flex-direction: column; gap: 14px; }
        .wlt-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        @media (max-width:420px) { .wlt-form-row { grid-template-columns: 1fr; } }

        .wlt-info-box {
          display: flex; align-items: flex-start; gap: 8px;
          padding: 12px 14px; border-radius: 10px;
          background: rgba(46,91,255,.07); border: 1px solid rgba(46,91,255,.18);
          font-size: .78rem; color: rgba(226,225,239,.55); line-height: 1.5;
        }

        .wlt-fund-card {
          padding: 16px 18px; border-radius: 12px;
          background: rgba(0,0,0,.2); border: 1px solid var(--border-subtle);
          display: flex; flex-direction: column; gap: 4px;
        }
        .wlt-fund-card__label { font-size: .68rem; font-weight: 700; text-transform: uppercase; letter-spacing: .1em; color: rgba(226,225,239,.35); }
        .wlt-fund-card__val   { font-size: 1.5rem; font-weight: 800; letter-spacing: -.03em; color: var(--foreground); font-variant-numeric: tabular-nums; }
        .wlt-fund-card__bank  { font-size: .72rem; color: rgba(226,225,239,.35); }

        .input-prefix-wrap { position: relative; }
        .input-prefix { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-weight: 700; color: rgba(226,225,239,.4); pointer-events: none; }
        .input--prefixed { padding-left: 28px; }

        .wlt-done {
          display: flex; flex-direction: column; align-items: center;
          gap: 8px; padding: 16px 0 8px; text-align: center;
        }
        .wlt-done-ring {
          width: 64px; height: 64px; border-radius: 50%;
          background: rgba(34,197,94,.1); border: 1px solid rgba(34,197,94,.2);
          display: flex; align-items: center; justify-content: center; margin-bottom: 6px;
        }
        .wlt-done-title { font-size: 1.1rem; font-weight: 700; color: var(--foreground); }
        .wlt-done-sub   { font-size: .84rem; color: rgba(226,225,239,.5); }
      `}</style>

      <div className="wlt-root">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="wlt-header">
          <div>
            <h1 className="wlt-title">Wallets</h1>
            <p className="wlt-sub">Control your liquidity and track multi-currency balances.</p>
          </div>
          <div className="wlt-hactions">
            <button
              className="btn btn-ghost btn-sm u-gap-6"
              onClick={() => setShowBalances(v => !v)}
              aria-label={showBalances ? "Hide balances" : "Show balances"}
              title={showBalances ? "Hide balances" : "Show balances"}
            >
              {showBalances ? <LucideEyeOff size={15}/> : <LucideEye size={15}/>}
              {showBalances ? "Hide" : "Show"}
            </button>
            <button
              className="btn btn-gradient btn-sm u-gap-6"
              onClick={() => setModal("create")}
            >
              <LucidePlus size={15}/> New Wallet
            </button>
          </div>
        </div>

        {/* ── Summary bar ─────────────────────────────────────────────────── */}
        <div className="wlt-summary">
          <div className="wlt-sum-card">
            <span className="wlt-sum-label">Total NGN Balance</span>
            <span className="wlt-sum-value u-text-primary">
              {showBalances ? `₦${totalNGN.toLocaleString()}` : "₦••••••"}
            </span>
            <span className="wlt-sum-sub">{WALLETS.filter(w=>w.currency==="NGN").length} active wallets</span>
          </div>
          <div className="wlt-sum-card">
            <span className="wlt-sum-label">Total USD Balance</span>
            <span className="wlt-sum-value u-text-secondary">
              {showBalances ? `$${totalUSD.toLocaleString()}` : "$••••••"}
            </span>
            <span className="wlt-sum-sub">{WALLETS.filter(w=>w.currency==="USD").length} active wallet</span>
          </div>
          <div className="wlt-sum-card">
            <span className="wlt-sum-label">Total Wallets</span>
            <span className="wlt-sum-value">{WALLETS.length}</span>
            <span className="wlt-sum-sub">{WALLETS.filter(w=>w.status==="active").length} active · {WALLETS.filter(w=>w.status==="frozen").length} frozen</span>
          </div>
        </div>

        {/* ── Wallet cards grid ────────────────────────────────────────────── */}
        <div className="wlt-grid">
          {WALLETS.map(wallet => {
            const ac = ACCENT_MAP[wallet.accent];
            const sm = statusMeta(wallet.status);
            const sym = CURRENCY_SYMBOLS[wallet.currency];
            const isFrozen = wallet.status === "frozen";

            return (
              <div
                key={wallet.id}
                className={`wlt-card ${isFrozen ? "wlt-card--frozen" : ""}`}
                style={{ borderColor: ac.border }}
              >
                {/* Glow + grid texture */}
                <span className="wlt-card__glow" style={{ background: ac.glow }} />
                <div className="wlt-card__grid-bg" />

                {/* Header row */}
                <div className="wlt-card__head">
                  <div className="wlt-card__icon"
                    style={{ background: ac.tag, borderColor: ac.border, color: ac.tagText }}>
                    <LucideCreditCard size={18} strokeWidth={1.8}/>
                  </div>
                  <div className="wlt-card__name-row">
                    <span className="wlt-card__name">{wallet.name}</span>
                    <span className="wlt-card__tag"
                      style={{ background: ac.tag, color: ac.tagText, borderColor: ac.border }}>
                      {wallet.tag}
                    </span>
                  </div>
                  {/* Context menu */}
                  <div style={{ position: "relative" }}>
                    <button
                      className="wlt-card__menu-btn"
                      onClick={() => setMenuId(menuId === wallet.id ? null : wallet.id)}
                      aria-label="Wallet options"
                    >
                      <LucideMoreHorizontal size={16}/>
                    </button>
                    {menuId === wallet.id && (
                      <div className="wlt-menu">
                        <button className="wlt-menu-item" onClick={()=>openFund(wallet,"fund")}>
                          <LucideArrowDownLeft size={13}/> Fund Wallet
                        </button>
                        <button className="wlt-menu-item" onClick={()=>openFund(wallet,"withdraw")}>
                          <LucideArrowUpRight size={13}/> Withdraw
                        </button>
                        <div className="wlt-menu-divider"/>
                        <button className="wlt-menu-item">
                          {isFrozen ? <LucideUnlock size={13}/> : <LucideLock size={13}/>}
                          {isFrozen ? "Unfreeze" : "Freeze"} Wallet
                        </button>
                        <button className="wlt-menu-item">
                          <LucideRefreshCw size={13}/> View Transactions
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Balance */}
                <div className="wlt-card__balance-area">
                  <p className="wlt-card__bal-label">Available Balance</p>
                  <p className="wlt-card__bal-value">
                    {sym}{showBalances ? wallet.balance.toLocaleString() : "••••••"}
                  </p>
                  <div className="wlt-card__bal-sub">
                    <span className={`wlt-status ${sm.cls}`}>{sm.icon} {sm.label}</span>
                    <TrendBadge val={wallet.trend}/>
                    <span className="wlt-card__last-activity">
                      {wallet.lastActivity}
                    </span>
                  </div>
                </div>

                {/* Account number chip */}
                <div className="wlt-card__account">
                  <div className="wlt-card__acct-left">
                    <span className="wlt-card__acct-bank">{wallet.bank}</span>
                    <span className="wlt-card__acct-num">{wallet.accountNumber}</span>
                  </div>
                  <CopyBtn text={wallet.accountNumber}/>
                </div>

                {/* Actions */}
                <div className="wlt-card__actions">
                  <button
                    className="wlt-act-btn wlt-act-btn--withdraw"
                    disabled={isFrozen}
                    onClick={() => openFund(wallet, "withdraw")}
                  >
                    <LucideArrowUpRight size={14}/> Withdraw
                  </button>
                  <button
                    className="wlt-act-btn wlt-act-btn--fund"
                    disabled={isFrozen}
                    onClick={() => openFund(wallet, "fund")}
                  >
                    <LucideArrowDownLeft size={14}/> Fund
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Recent activity ───────────────────────────────────────────────── */}
        <div className="wlt-activity">
          <div className="wlt-activity__head">
            <span className="wlt-activity__title">Recent Wallet Activity</span>
            <a href="/transactions" className="wlt-activity__link">
              View all <LucideChevronRight size={13}/>
            </a>
          </div>
          <div className="wlt-tx-list">
            {RECENT_TX.map(tx => (
              <div key={tx.id} className="wlt-tx">
                <span className={`wlt-tx__icon wlt-tx__icon--${tx.type}`}>
                  {tx.type === "credit"
                    ? <LucideArrowDownLeft  size={14} strokeWidth={2.2}/>
                    : <LucideArrowUpRight   size={14} strokeWidth={2.2}/>
                  }
                </span>
                <div className="wlt-tx__info">
                  <div className="wlt-tx__label">{tx.label}</div>
                  <div className="wlt-tx__id">{tx.id}</div>
                </div>
                <div className="wlt-tx__right">
                  <span className={`wlt-tx__amount ${tx.type === "credit" ? "wlt-tx__amount--credit" : "wlt-tx__amount--debit"}`}>
                    {tx.type === "credit" ? "+" : "−"}₦{tx.amount.toLocaleString()}
                  </span>
                  <span className="wlt-tx__date">{tx.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Modals ──────────────────────────────────────────────────────────── */}
      <Modal
        open={modal === "create"}
        onClose={() => setModal(null)}
        title="Create New Wallet"
        eyebrow="Wallets"
      >
        <CreateWalletModal onClose={() => setModal(null)}/>
      </Modal>

      <Modal
        open={modal === "fund" && activeWallet !== null}
        onClose={() => { setModal(null); setActiveWallet(null); }}
        title={fundMode === "fund" ? "Fund Wallet" : "Withdraw Funds"}
        eyebrow={activeWallet?.name}
      >
        {activeWallet && (
          <FundModal
            wallet={activeWallet}
            mode={fundMode}
            onClose={() => { setModal(null); setActiveWallet(null); }}
          />
        )}
      </Modal>

      {/* Click-outside to close menu */}
      {menuId !== null && (
        <div className="wlt-menu-overlay" onClick={() => setMenuId(null)}/>
      )}
    </>
  );
}