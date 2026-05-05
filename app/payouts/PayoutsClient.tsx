"use client";

import { useState, useRef, useCallback } from "react";
import {
  LucideUpload,
  LucideSend,
  LucideFileText,
  LucideDownload,
  LucideSearch,
  LucideFilter,
  LucideChevronDown,
  LucideCheckCircle2,
  LucideXCircle,
  LucideClock,
  LucideArrowUpRight,
  LucideX,
  LucideAlertCircle,
  LucideUsers,
  LucideBanknote,
  LucideRefreshCw,
  LucideMoreHorizontal,
  LucideChevronRight,
  LucideChevronLeft,
  LucideClipboard,
  LucideCheck,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type PayoutStatus = "success" | "pending" | "failed" | "processing";
type ModalType    = "single" | "bulk" | null;

interface PayoutRow {
  id: string;
  name: string;
  bank: string;
  accountNo: string;
  amount: number;
  status: PayoutStatus;
  ref: string;
  date: string;
  avatar: string;
}

interface BatchStat {
  label: string;
  value: string;
  sub?: string;
  accent: "blue" | "teal" | "orange" | "green";
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PAYOUT_HISTORY: PayoutRow[] = [
  { id: "1", name: "John Doe",       bank: "GTBank",      accountNo: "••4521", amount: 10000,  status: "pending",    ref: "PAYOUT1234", date: "Today, 10:32 AM",  avatar: "JD" },
  { id: "2", name: "Jane Smith",     bank: "Access Bank", accountNo: "••0032", amount: 25000,  status: "success",    ref: "PAYOUT1235", date: "Today, 09:14 AM",  avatar: "JS" },
  { id: "3", name: "Mike Lee",       bank: "UBA",         accountNo: "••7713", amount: 5000,   status: "failed",     ref: "PAYOUT1236", date: "Yesterday, 4:50 PM",avatar: "ML" },
  { id: "4", name: "Amaka Obi",      bank: "Zenith Bank", accountNo: "••3301", amount: 80000,  status: "success",    ref: "PAYOUT1237", date: "Yesterday, 2:11 PM",avatar: "AO" },
  { id: "5", name: "Chidi Nwosu",    bank: "Fidelity",    accountNo: "••8840", amount: 15000,  status: "processing", ref: "PAYOUT1238", date: "Yesterday, 11:00 AM",avatar: "CN" },
  { id: "6", name: "Ngozi Eze",      bank: "FCMB",        accountNo: "••2298", amount: 42000,  status: "success",    ref: "PAYOUT1239", date: "Mon, 8:30 AM",     avatar: "NE" },
];

const BATCH_STATS: BatchStat[] = [
  { label: "Total Amount",  value: "₦1,200,000", sub: "Ready to disburse", accent: "blue"   },
  { label: "Recipients",    value: "120",         sub: "Verified accounts", accent: "teal"   },
  { label: "Service Fee",   value: "₦12,000",     sub: "1% of total",       accent: "orange" },
  { label: "Success Rate",  value: "98.2%",       sub: "Last batch",        accent: "green"  },
];

const BANKS = [
  "Access Bank","Citibank","Ecobank","FCMB","Fidelity Bank",
  "First Bank","GTBank","Heritage Bank","Jaiz Bank","Keystone Bank",
  "Opay","Polaris Bank","Providus Bank","Stanbic IBTC","Standard Chartered",
  "Sterling Bank","Suntrust Bank","UBA","Union Bank","Unity Bank",
  "VFD Microfinance","Wema Bank","Zenith Bank",
];

const STATUS_FILTER_OPTIONS: { label: string; value: PayoutStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Success",    value: "success"    },
  { label: "Pending",    value: "pending"    },
  { label: "Processing", value: "processing" },
  { label: "Failed",     value: "failed"     },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function statusMeta(s: PayoutStatus) {
  const map = {
    success:    { icon: <LucideCheckCircle2 size={12} strokeWidth={2.5} />, label: "Success",    cls: "status--success"    },
    pending:    { icon: <LucideClock        size={12} strokeWidth={2.5} />, label: "Pending",    cls: "status--pending"    },
    failed:     { icon: <LucideXCircle      size={12} strokeWidth={2.5} />, label: "Failed",     cls: "status--failed"     },
    processing: { icon: <LucideRefreshCw   size={12} strokeWidth={2.5} />, label: "Processing", cls: "status--processing" },
  };
  return map[s];
}

function accentVars(a: BatchStat["accent"]) {
  return {
    blue:   { bg: "rgba(46,91,255,0.1)",   border: "rgba(46,91,255,0.22)",   color: "var(--primary)",            glow: "rgba(46,91,255,0.2)"   },
    teal:   { bg: "rgba(0,241,253,0.07)",  border: "rgba(0,241,253,0.18)",   color: "var(--secondary-container)", glow: "rgba(0,241,253,0.15)"  },
    orange: { bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.2)",   color: "var(--warning)",             glow: "rgba(245,158,11,0.15)" },
    green:  { bg: "rgba(34,197,94,0.08)",  border: "rgba(34,197,94,0.18)",   color: "var(--success)",             glow: "rgba(34,197,94,0.15)"  },
  }[a];
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Avatar({ initials, size = 32 }: { initials: string; size?: number }) {
  return (
    <span style={{
      width: size, height: size, borderRadius: "50%",
      background: "linear-gradient(135deg,rgba(46,91,255,0.4),rgba(0,241,253,0.3))",
      border: "1px solid rgba(46,91,255,0.3)",
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.34, fontWeight: 700, color: "var(--primary-light)",
      flexShrink: 0, letterSpacing: "-0.01em",
    }}>
      {initials}
    </span>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  return (
    <button onClick={copy} className="copy-btn" aria-label="Copy reference">
      {copied ? <LucideCheck size={11} strokeWidth={2.5} /> : <LucideClipboard size={11} strokeWidth={2} />}
    </button>
  );
}

// Modal shell
function Modal({ open, onClose, title, children }: {
  open: boolean; onClose: () => void; title: string; children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal aria-label={title}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <div className="modal-drag-handle" />
        <div className="modal-inner">
          <div className="modal-head">
            <div>
              <p className="modal-eyebrow">Payouts</p>
              <h2 className="modal-title">{title}</h2>
            </div>
            <button className="modal-x" onClick={onClose} aria-label="Close"><LucideX size={16} /></button>
          </div>
          <div className="modal-content">{children}</div>
        </div>
      </div>
    </div>
  );
}

// Single transfer form
function SingleModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: "", bank: "", account: "", amount: "", note: "" });
  const [step, setStep] = useState<"form" | "confirm" | "done">("form");

  if (step === "done") return (
    <div className="modal-done">
      <span className="done-ring">
        <LucideCheckCircle2 size={32} strokeWidth={1.8} color="var(--success)" />
      </span>
      <h3 className="done-title">Payout Sent!</h3>
      <p className="done-sub">₦{Number(form.amount||0).toLocaleString()} → {form.name} · {form.bank}</p>
      <p className="done-ref">Ref: PAYOUT{Math.floor(Math.random()*9000+1000)}</p>
      <button className="btn btn-primary u-mt-8" onClick={onClose}>Done</button>
    </div>
  );

  if (step === "confirm") return (
    <div className="confirm-panel">
      <div className="confirm-row"><span>Recipient</span><strong>{form.name}</strong></div>
      <div className="confirm-row"><span>Bank</span><strong>{form.bank}</strong></div>
      <div className="confirm-row"><span>Account</span><strong>{form.account}</strong></div>
      <div className="confirm-row"><span>Amount</span><strong className="u-text-success">₦{Number(form.amount).toLocaleString()}</strong></div>
      <div className="confirm-row"><span>Fee</span><strong className="u-text-warning">₦25</strong></div>
      {form.note && <div className="confirm-row"><span>Note</span><strong>{form.note}</strong></div>}
      <div className="confirm-total">
        <span>Total deducted</span>
        <strong>₦{(Number(form.amount)+25).toLocaleString()}</strong>
      </div>
      <div className="u-flex u-gap-10 u-mt-16">
        <button className="btn btn-ghost u-flex-1" onClick={()=>setStep("form")}>Edit</button>
        <button className="btn btn-gradient u-flex-2" onClick={()=>setStep("done")}>
          <LucideSend size={14}/> Confirm & Send
        </button>
      </div>
    </div>
  );

  return (
    <form className="modal-form" onSubmit={e=>{e.preventDefault();setStep("confirm");}}>
      <div className="field">
        <label className="label">Recipient Name</label>
        <input className="input" placeholder="e.g. John Doe" required value={form.name}
          onChange={e=>setForm(f=>({...f,name:e.target.value}))} />
      </div>
      <div className="form-row-2">
        <div className="field">
          <label className="label">Bank</label>
          <select className="input" required value={form.bank}
            onChange={e=>setForm(f=>({...f,bank:e.target.value}))}>
            <option value="">Select bank…</option>
            {BANKS.map(b=><option key={b} value={b}>{b}</option>)}
          </select>
        </div>
        <div className="field">
          <label className="label">Account Number</label>
          <input className="input" placeholder="0123456789" maxLength={10} required value={form.account}
            onChange={e=>setForm(f=>({...f,account:e.target.value}))} />
        </div>
      </div>
      <div className="field">
        <label className="label">Amount (₦)</label>
        <div className="input-prefix-wrap">
          <span className="input-prefix">₦</span>
          <input className="input input--prefixed" type="number" min="1" placeholder="0.00" required value={form.amount}
            onChange={e=>setForm(f=>({...f,amount:e.target.value}))} />
        </div>
        {form.amount && <p className="field-hint">Fee: ₦25 · Total: ₦{(Number(form.amount)+25).toLocaleString()}</p>}
      </div>
      <div className="field">
        <label className="label">Narration <span className="u-optional-text">(optional)</span></label>
        <input className="input" placeholder="e.g. Salary payment" value={form.note}
          onChange={e=>setForm(f=>({...f,note:e.target.value}))} />
      </div>
      <button type="submit" className="btn btn-gradient btn-full u-mt-4">
        Review Transfer <LucideArrowUpRight size={14}/>
      </button>
    </form>
  );
}

// Bulk transfer form
function BulkModal({ onClose }: { onClose: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f?.name.endsWith(".csv")) setFile(f);
  }, []);

  if (done) return (
    <div className="modal-done">
      <span className="done-ring"><LucideCheckCircle2 size={32} strokeWidth={1.8} color="var(--success)"/></span>
      <h3 className="done-title">Batch Queued!</h3>
      <p className="done-sub">{file?.name} · Processing in background</p>
      <p className="done-ref">Batch ID: BATCH{Math.floor(Math.random()*90000+10000)}</p>
      <button className="btn btn-primary u-mt-8" onClick={onClose}>Done</button>
    </div>
  );

  return (
    <form className="modal-form" onSubmit={e=>{e.preventDefault();if(file)setDone(true);}}>
      <div
        className={`drop-zone ${dragging?"drop-zone--active":""} ${file?"drop-zone--filled":""}`}
        onDragOver={e=>{e.preventDefault();setDragging(true);}}
        onDragLeave={()=>setDragging(false)}
        onDrop={handleDrop}
        onClick={()=>ref.current?.click()}
      >
        <input ref={ref} type="file" accept=".csv" className="sr-only"
          onChange={e=>setFile(e.target.files?.[0]||null)} />
        {file ? (
          <div className="drop-filled">
            <LucideFileText size={28} color="var(--primary)" strokeWidth={1.5}/>
            <div>
              <p className="drop-filename">{file.name}</p>
              <p className="drop-filesize">{(file.size/1024).toFixed(1)} KB · CSV</p>
            </div>
            <button type="button" className="drop-remove" onClick={e=>{e.stopPropagation();setFile(null);}}>
              <LucideX size={14}/>
            </button>
          </div>
        ) : (
          <>
            <span className="drop-icon"><LucideUpload size={22} strokeWidth={1.6}/></span>
            <p className="drop-label">Drop your CSV here or <span>click to browse</span></p>
            <p className="drop-hint">Accepted: .csv · Max 10 MB</p>
          </>
        )}
      </div>

      <div className="csv-template">
        <LucideFileText size={14} color="var(--primary)" strokeWidth={1.8}/>
        <span>Need a template?</span>
        <button type="button" className="link-btn">
          <LucideDownload size={12}/> Download sample CSV
        </button>
      </div>

      <div className="csv-columns">
        {["name","bank","account_number","amount","narration"].map(col => (
          <code key={col} className="csv-col">{col}</code>
        ))}
      </div>

      <button type="submit" disabled={!file} className="btn btn-gradient btn-full u-mt-4">
        <LucideUpload size={14}/> Process Bulk Payout
      </button>
    </form>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function PayoutsClient() {
  const [modal,        setModal]        = useState<ModalType>(null);
  const [search,       setSearch]       = useState("");
  const [statusFilter, setStatusFilter] = useState<PayoutStatus | "all">("all");
  const [page,         setPage]         = useState(1);
  const [copied,       setCopied]       = useState<string | null>(null);

  const PER_PAGE = 5;

  const filtered = PAYOUT_HISTORY.filter(r => {
    const matchSearch = search === "" ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.ref.toLowerCase().includes(search.toLowerCase()) ||
      r.bank.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <>
      {/* ── Scoped styles ─────────────────────────────────────────────────── */}
      <style>{`
        /* ── Layout ─────────────────────────────────────── */
        .po-root {
          display: flex; flex-direction: column; gap: 24px;
          padding: 28px 32px; max-width: 1280px; width: 100%; margin: 0 auto;
        }
        @media (max-width:768px) { .po-root { padding: 16px 14px; gap: 18px; } }

        /* ── Page header ─────────────────────────────────── */
        .po-header {
          display: flex; align-items: flex-start; justify-content: space-between;
          flex-wrap: wrap; gap: 14px;
        }
        .po-title { font-size: 1.35rem; font-weight: 700; color: var(--foreground); letter-spacing: -0.02em; }
        .po-sub   { font-size: 0.8rem; color: rgba(226,225,239,0.4); margin-top: 4px; }
        .po-actions { display: flex; gap: 8px; flex-wrap: wrap; }

        /* ── Batch stat cards ────────────────────────────── */
        .batch-grid {
          display: grid;
          grid-template-columns: repeat(4,1fr);
          gap: 12px;
        }
        @media (max-width:900px)  { .batch-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width:480px)  { .batch-grid { grid-template-columns: 1fr; } }

        .batch-stat {
          background: var(--card-bg);
          border-radius: 14px;
          border: 1px solid var(--border-subtle);
          padding: 18px 20px;
          display: flex; flex-direction: column; gap: 10px;
          position: relative; overflow: hidden;
          transition: border-color 180ms ease, transform 180ms ease;
        }
        .batch-stat::before {
          content: ""; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent);
        }
        .batch-stat:hover { transform: translateY(-1px); border-color: var(--border-mid); }
        .batch-stat__glow {
          position: absolute; right: -20px; top: -20px;
          width: 80px; height: 80px; border-radius: 50%; filter: blur(28px); opacity: .5;
          pointer-events: none;
        }
        .batch-stat__label {
          font-size: 0.7rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: .1em; color: rgba(226,225,239,0.38);
        }
        .batch-stat__value {
          font-size: 1.6rem; font-weight: 700; letter-spacing: -0.03em;
          font-variant-numeric: tabular-nums; line-height: 1;
        }
        .batch-stat__sub {
          font-size: 0.72rem; color: rgba(226,225,239,0.35);
        }

        /* ── Active batch panel ──────────────────────────── */
        .batch-panel {
          background: var(--card-bg);
          border: 1px solid var(--border-subtle);
          border-radius: 16px;
          overflow: hidden;
        }
        .batch-panel__head {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 22px;
          border-bottom: 1px solid var(--border-subtle);
        }
        .batch-panel__badge {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 3px 10px; border-radius: 100px;
          background: rgba(245,158,11,.1); border: 1px solid rgba(245,158,11,.2);
          font-size: .68rem; font-weight: 700; color: var(--warning);
        }
        .batch-panel__body {
          padding: 20px 22px; display: flex;
          align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 16px;
        }
        .batch-progress {
          display: flex; flex-direction: column; gap: 8px; flex: 1; min-width: 220px;
        }
        .batch-progress__label {
          display: flex; justify-content: space-between;
          font-size: 0.78rem; color: rgba(226,225,239,0.45);
        }
        .batch-progress__bar {
          height: 5px; border-radius: 100px;
          background: var(--surface-variant); overflow: hidden;
        }
        .batch-progress__fill {
          height: 100%; border-radius: 100px;
          background: linear-gradient(90deg, #2e5bff, #00f1fd);
          width: 72%;
        }
        .batch-info {
          display: flex; gap: 20px; flex-wrap: wrap;
        }
        .batch-info-item { display: flex; flex-direction: column; gap: 3px; }
        .batch-info-item__label { font-size: .68rem; text-transform: uppercase; letter-spacing: .08em; color: rgba(226,225,239,.35); }
        .batch-info-item__val   { font-size: .92rem; font-weight: 700; color: var(--foreground); font-variant-numeric: tabular-nums; }

        /* ── Payout history panel ────────────────────────── */
        .history-panel {
          background: var(--card-bg);
          border: 1px solid var(--border-subtle);
          border-radius: 16px;
          overflow: hidden;
        }
        .history-head {
          display: flex; align-items: center; gap: 12px;
          padding: 16px 20px; border-bottom: 1px solid var(--border-subtle);
          flex-wrap: wrap;
        }
        .history-search {
          position: relative; flex: 1; min-width: 160px;
        }
        .history-search__icon {
          position: absolute; left: 11px; top: 50%; transform: translateY(-50%);
          color: rgba(226,225,239,.35); pointer-events: none;
        }
        .history-search input {
          width: 100%; background: var(--surface-container);
          border: 1px solid var(--border-subtle); border-radius: 8px;
          padding: 7px 12px 7px 34px;
          font-size: .82rem; color: var(--foreground);
          font-family: var(--font-sans); outline: none;
          transition: border-color 150ms ease;
        }
        .history-search input::placeholder { color: rgba(226,225,239,.28); }
        .history-search input:focus { border-color: rgba(46,91,255,.45); }

        .filter-tabs { display: flex; gap: 4px; flex-wrap: wrap; }
        .filter-tab {
          padding: 5px 12px; border-radius: 7px; font-size: .73rem;
          font-weight: 600; cursor: pointer; border: 1px solid transparent;
          transition: all 140ms ease; white-space: nowrap;
          background: none; color: rgba(226,225,239,.45); font-family: var(--font-sans);
        }
        .filter-tab:hover { background: var(--surface-variant); color: var(--foreground); }
        .filter-tab--active {
          background: rgba(46,91,255,.15); border-color: rgba(46,91,255,.3);
          color: var(--primary);
        }

        /* Table */
        .history-table-wrap { overflow-x: auto; }
        table.po-table {
          width: 100%; border-collapse: collapse; min-width: 560px;
        }
        .po-table thead tr {
          background: rgba(255,255,255,0.025);
          border-bottom: 1px solid var(--border-subtle);
        }
        .po-table th {
          padding: 10px 18px; font-size: .68rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: .1em;
          color: rgba(226,225,239,.35); white-space: nowrap; text-align: left;
        }
        .po-table th:last-child { text-align: right; }
        .po-table tbody tr {
          border-bottom: 1px solid var(--border-subtle);
          transition: background 140ms ease;
        }
        .po-table tbody tr:last-child { border-bottom: none; }
        .po-table tbody tr:hover { background: rgba(255,255,255,0.022); }
        .po-table td {
          padding: 13px 18px; font-size: .84rem; color: var(--foreground); vertical-align: middle;
        }
        .po-table td:last-child { text-align: right; }

        /* Recipient cell */
        .recipient-cell { display: flex; align-items: center; gap: 10px; }
        .recipient-info { display: flex; flex-direction: column; }
        .recipient-name { font-weight: 600; font-size: .84rem; color: var(--foreground); }
        .recipient-bank { font-size: .7rem; color: rgba(226,225,239,.4); margin-top: 1px; }
        .recipient-acct { font-size: .7rem; color: rgba(226,225,239,.3); font-family: var(--font-mono); }

        /* Amount cell */
        .amount-cell {
          font-variant-numeric: tabular-nums; font-weight: 700; font-family: var(--font-mono);
          font-size: .88rem; color: var(--foreground);
        }

        /* Status badge */
        .status-badge {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 4px 9px; border-radius: 100px;
          font-size: .68rem; font-weight: 700; white-space: nowrap; border: 1px solid;
        }
        .status--success    { background: rgba(34,197,94,.1);    border-color: rgba(34,197,94,.2);    color: #4ade80; }
        .status--pending    { background: rgba(245,158,11,.1);   border-color: rgba(245,158,11,.2);   color: #fcd34d; }
        .status--failed     { background: rgba(255,180,171,.1);  border-color: rgba(255,180,171,.2);  color: var(--error); }
        .status--processing { background: rgba(46,91,255,.1);    border-color: rgba(46,91,255,.2);    color: var(--primary); }
        .status--processing svg { animation: spin 1.2s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Ref cell */
        .ref-cell { display: flex; align-items: center; gap: 5px; justify-content: flex-end; }
        .ref-code { font-family: var(--font-mono); font-size: .72rem; color: rgba(226,225,239,.35); }

        /* Copy button */
        .copy-btn {
          padding: 3px 5px; border-radius: 4px;
          background: rgba(255,255,255,0.05); border: 1px solid var(--border-subtle);
          color: rgba(226,225,239,.35); cursor: pointer; display: inline-flex;
          transition: all 140ms ease;
        }
        .copy-btn:hover { background: rgba(46,91,255,.15); color: var(--primary); border-color: rgba(46,91,255,.3); }

        /* Empty state */
        .empty-state {
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; gap: 10px; padding: 48px 20px;
          color: rgba(226,225,239,.3);
        }
        .empty-state__icon {
          width: 48px; height: 48px; border-radius: 14px;
          background: rgba(255,255,255,.04); border: 1px solid var(--border-subtle);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 4px;
        }
        .empty-state p { font-size: .82rem; }

        /* Pagination */
        .pagination {
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 20px; border-top: 1px solid var(--border-subtle);
          flex-wrap: wrap; gap: 8px;
        }
        .pagination__info { font-size: .75rem; color: rgba(226,225,239,.35); }
        .pagination__btns { display: flex; gap: 4px; align-items: center; }
        .page-btn {
          width: 30px; height: 30px; border-radius: 7px; display: flex;
          align-items: center; justify-content: center; font-size: .78rem;
          font-weight: 600; cursor: pointer; border: 1px solid var(--border-subtle);
          background: none; color: rgba(226,225,239,.5); font-family: var(--font-sans);
          transition: all 140ms ease;
        }
        .page-btn:hover:not(:disabled) { background: var(--surface-variant); color: var(--foreground); }
        .page-btn:disabled { opacity: .3; cursor: not-allowed; }
        .page-btn--active { background: rgba(46,91,255,.15); border-color: rgba(46,91,255,.3); color: var(--primary); }

        /* ── Modal ───────────────────────────────────────── */
        .modal-backdrop {
          position: fixed; inset: 0; z-index: 100;
          background: rgba(0,0,0,.7); backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          display: flex; align-items: flex-end; justify-content: center;
          padding: 0;
        }
        @media (min-width:600px) {
          .modal-backdrop { align-items: center; padding: 20px; }
        }
        .modal-sheet {
          background: var(--surface-container-low);
          border: 1px solid var(--border-mid);
          border-radius: 20px 20px 0 0;
          width: 100%; max-width: 500px;
          box-shadow: var(--shadow-lg);
          animation: sheet-up .28s var(--ease-spring) both;
          max-height: 92vh; overflow-y: auto;
        }
        @media (min-width:600px) {
          .modal-sheet { border-radius: 20px; animation-name: fade-up; max-height: 90vh; }
        }
        @keyframes sheet-up {
          from { transform: translateY(100%); opacity:.8; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        .modal-drag-handle {
          width: 36px; height: 4px; border-radius: 100px;
          background: rgba(255,255,255,.12); margin: 10px auto 0;
        }
        @media (min-width:600px) { .modal-drag-handle { display: none; } }
        .modal-inner { padding: 0 22px 24px; }
        .modal-head {
          display: flex; align-items: flex-start; justify-content: space-between;
          padding: 16px 0 14px; border-bottom: 1px solid var(--border-subtle); margin-bottom: 20px;
        }
        .modal-eyebrow { font-size: .68rem; font-weight: 700; text-transform: uppercase; letter-spacing: .12em; color: rgba(226,225,239,.3); margin-bottom: 3px; }
        .modal-title   { font-size: 1rem; font-weight: 700; color: var(--foreground); letter-spacing: -.01em; }
        .modal-x {
          width: 28px; height: 28px; border-radius: 7px; display: flex;
          align-items: center; justify-content: center;
          color: rgba(226,225,239,.4); background: rgba(255,255,255,.04);
          border: 1px solid var(--border-subtle); cursor: pointer;
          transition: all 150ms ease; flex-shrink: 0;
        }
        .modal-x:hover { background: var(--surface-variant); color: var(--foreground); }
        .modal-content {}
        .modal-form { display: flex; flex-direction: column; gap: 14px; }
        .form-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        @media (max-width:420px) { .form-row-2 { grid-template-columns: 1fr; } }

        /* Input prefix */
        .input-prefix-wrap { position: relative; }
        .input-prefix {
          position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
          font-weight: 700; color: rgba(226,225,239,.45); font-size: .9rem; pointer-events: none;
        }
        .input--prefixed { padding-left: 28px; }

        /* Confirm panel */
        .confirm-panel { display: flex; flex-direction: column; gap: 0; }
        .confirm-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 0; border-bottom: 1px solid var(--border-subtle);
          font-size: .84rem;
        }
        .confirm-row span { color: rgba(226,225,239,.45); }
        .confirm-row strong { color: var(--foreground); font-weight: 600; }
        .confirm-total {
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 14px; margin-top: 10px;
          background: rgba(46,91,255,.08); border: 1px solid rgba(46,91,255,.2);
          border-radius: 10px; font-size: .84rem;
        }
        .confirm-total span   { color: rgba(226,225,239,.55); font-weight: 500; }
        .confirm-total strong { color: var(--foreground); font-size: 1rem; font-weight: 700; }

        /* Done state */
        .modal-done {
          display: flex; flex-direction: column; align-items: center;
          gap: 8px; padding: 16px 0 8px; text-align: center;
        }
        .done-ring {
          width: 64px; height: 64px; border-radius: 50%;
          background: rgba(34,197,94,.1); border: 1px solid rgba(34,197,94,.2);
          display: flex; align-items: center; justify-content: center; margin-bottom: 6px;
        }
        .done-title { font-size: 1.1rem; font-weight: 700; color: var(--foreground); }
        .done-sub   { font-size: .84rem; color: rgba(226,225,239,.5); }
        .done-ref   { font-size: .72rem; font-family: var(--font-mono); color: rgba(226,225,239,.3); margin-top: 2px; }

        /* Drop zone */
        .drop-zone {
          border: 1.5px dashed var(--border-mid); border-radius: 14px;
          background: var(--surface-container); padding: 28px 20px;
          display: flex; flex-direction: column; align-items: center;
          gap: 8px; cursor: pointer; transition: all 180ms ease; text-align: center;
        }
        .drop-zone:hover, .drop-zone--active {
          border-color: var(--primary-container);
          background: rgba(46,91,255,.06);
        }
        .drop-zone--filled { border-style: solid; border-color: rgba(46,91,255,.35); background: rgba(46,91,255,.05); }
        .drop-icon {
          width: 44px; height: 44px; border-radius: 12px;
          background: rgba(255,255,255,.05); border: 1px solid var(--border-subtle);
          display: flex; align-items: center; justify-content: center;
          color: rgba(226,225,239,.4); margin-bottom: 4px;
        }
        .drop-label { font-size: .84rem; color: rgba(226,225,239,.6); }
        .drop-label span { color: var(--primary); text-decoration: underline; }
        .drop-hint { font-size: .72rem; color: rgba(226,225,239,.3); }
        .drop-filled {
          display: flex; align-items: center; gap: 12px; width: 100%; text-align: left;
        }
        .drop-filename { font-size: .84rem; font-weight: 600; color: var(--foreground); }
        .drop-filesize { font-size: .72rem; color: rgba(226,225,239,.4); margin-top: 2px; }
        .drop-remove {
          margin-left: auto; padding: 4px; border-radius: 6px;
          background: rgba(255,180,171,.1); border: 1px solid rgba(255,180,171,.2);
          color: var(--error); cursor: pointer; display: flex;
          transition: all 140ms ease;
        }
        .drop-remove:hover { background: rgba(255,180,171,.2); }

        .csv-template {
          display: flex; align-items: center; gap: 7px;
          font-size: .78rem; color: rgba(226,225,239,.4);
        }
        .link-btn {
          display: inline-flex; align-items: center; gap: 4px;
          color: var(--primary); font-size: .78rem; cursor: pointer;
          background: none; border: none; font-family: var(--font-sans); padding: 0;
          text-decoration: underline;
        }
        .csv-columns { display: flex; gap: 6px; flex-wrap: wrap; }
        .csv-col {
          padding: 3px 8px; border-radius: 5px;
          background: rgba(255,255,255,.05); border: 1px solid var(--border-subtle);
          font-size: .7rem; color: rgba(226,225,239,.5); font-family: var(--font-mono);
        }
        .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; }
      `}</style>

      <div className="po-root">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="po-header">
          <div>
            <h1 className="po-title">Payouts</h1>
            <p className="po-sub">Send single or bulk payouts to any Nigerian bank account.</p>
          </div>
          <div className="po-actions">
            <button className="btn btn-ghost btn-sm u-gap-6" onClick={() => setModal("single")}>
              <LucideSend size={14} /> Single Transfer
            </button>
            <button className="btn btn-gradient btn-sm u-gap-6" onClick={() => setModal("bulk")}>
              <LucideUpload size={14} /> Bulk Transfer
            </button>
          </div>
        </div>

        {/* ── Stat cards ──────────────────────────────────────────────────── */}
        <div className="batch-grid">
          {BATCH_STATS.map(stat => {
            const a = accentVars(stat.accent);
            return (
              <div key={stat.label} className="batch-stat">
                <span className="batch-stat__glow" style={{ background: a.glow }} />
                <span className="batch-stat__label">{stat.label}</span>
                <span className="batch-stat__value" style={{ color: a.color }}>{stat.value}</span>
                {stat.sub && <span className="batch-stat__sub">{stat.sub}</span>}
              </div>
            );
          })}
        </div>

        {/* ── Active batch panel ──────────────────────────────────────────── */}
        <div className="batch-panel">
          <div className="batch-panel__head">
            <div className="u-flex u-items-center u-gap-10">
              <LucideFileText size={16} color="var(--primary)" strokeWidth={1.8} />
              <span className="u-title-compact">
                Active Batch
              </span>
            </div>
            <span className="batch-panel__badge">
              <LucideClock size={11} strokeWidth={2.5} /> Awaiting confirmation
            </span>
          </div>
          <div className="batch-panel__body">
            <div className="batch-progress">
              <div className="batch-progress__label">
                <span>Validation progress</span>
                <span className="u-text-primary u-fw-700">72%</span>
              </div>
              <div className="batch-progress__bar">
                <div className="batch-progress__fill" />
              </div>
            </div>
            <div className="batch-info">
              {[
                { label: "Recipients", val: "120" },
                { label: "Total Amount", val: "₦1,200,000" },
                { label: "Service Fee", val: "₦12,000" },
              ].map(({ label, val }) => (
                <div key={label} className="batch-info-item">
                  <span className="batch-info-item__label">{label}</span>
                  <span className="batch-info-item__val">{val}</span>
                </div>
              ))}
            </div>
            <button className="btn btn-primary btn-sm u-gap-6 u-no-shrink">
              <LucideCheckCircle2 size={14} /> Confirm &amp; Process
            </button>
          </div>
        </div>

        {/* ── History panel ────────────────────────────────────────────────── */}
        <div className="history-panel">
          {/* Controls */}
          <div className="history-head">
            <span className="u-title-compact u-no-shrink">
              Payout History
            </span>
            <div className="history-search">
              <span className="history-search__icon"><LucideSearch size={14} strokeWidth={2} /></span>
              <input
                placeholder="Search name, ref, bank…"
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
              />
            </div>
            <div className="filter-tabs">
              {STATUS_FILTER_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  className={`filter-tab ${statusFilter === opt.value ? "filter-tab--active" : ""}`}
                  onClick={() => { setStatusFilter(opt.value as any); setPage(1); }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="history-table-wrap">
            {paginated.length === 0 ? (
              <div className="empty-state">
                <span className="empty-state__icon">
                  <LucideAlertCircle size={20} strokeWidth={1.5} color="rgba(226,225,239,.3)" />
                </span>
                <p>No payouts match your filter.</p>
              </div>
            ) : (
              <table className="po-table">
                <thead>
                  <tr>
                    <th>Recipient</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Reference</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map(row => {
                    const sm = statusMeta(row.status);
                    return (
                      <tr key={row.id}>
                        <td>
                          <div className="recipient-cell">
                            <Avatar initials={row.avatar} size={32} />
                            <div className="recipient-info">
                              <span className="recipient-name">{row.name}</span>
                              <span className="recipient-bank">
                                {row.bank} · <span className="recipient-acct">{row.accountNo}</span>
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="amount-cell">₦{row.amount.toLocaleString()}</span>
                        </td>
                        <td>
                          <span className={`status-badge ${sm.cls}`}>
                            {sm.icon} {sm.label}
                          </span>
                        </td>
                        <td className="u-table-date-muted">
                          {row.date}
                        </td>
                        <td>
                          <div className="ref-cell">
                            <span className="ref-code">{row.ref}</span>
                            <CopyButton text={row.ref} />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {filtered.length > PER_PAGE && (
            <div className="pagination">
              <span className="pagination__info">
                Showing {Math.min((page-1)*PER_PAGE+1, filtered.length)}–{Math.min(page*PER_PAGE, filtered.length)} of {filtered.length}
              </span>
              <div className="pagination__btns">
                <button className="page-btn" disabled={page===1} onClick={()=>setPage(p=>p-1)}>
                  <LucideChevronLeft size={14} />
                </button>
                {Array.from({length:totalPages},(_,i)=>i+1).map(n=>(
                  <button key={n} className={`page-btn ${page===n?"page-btn--active":""}`} onClick={()=>setPage(n)}>{n}</button>
                ))}
                <button className="page-btn" disabled={page===totalPages} onClick={()=>setPage(p=>p+1)}>
                  <LucideChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Modals ──────────────────────────────────────────────────────────── */}
      <Modal
        open={modal === "single"}
        onClose={() => setModal(null)}
        title="Single Transfer"
      >
        <SingleModal onClose={() => setModal(null)} />
      </Modal>

      <Modal
        open={modal === "bulk"}
        onClose={() => setModal(null)}
        title="Bulk Transfer"
      >
        <BulkModal onClose={() => setModal(null)} />
      </Modal>
    </>
  );
}