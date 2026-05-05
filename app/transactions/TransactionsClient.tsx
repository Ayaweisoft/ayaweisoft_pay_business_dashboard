"use client";

import React, { useMemo, useState } from "react";
import {
  LucideSearch,
  LucideEye,
  LucideDownload,
  LucideCheckCircle2,
  LucideX,
  LucideArrowDownLeft,
  LucideArrowUpRight,
  LucideChevronLeft,
  LucideChevronRight,
  LucideAlertCircle,
  LucideClock,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type TxStatus = "success" | "pending" | "failed";
type TxType   = "Credit" | "Debit";

interface Transaction {
  id: string;
  date: string;
  type: TxType;
  amount: number;
  status: TxStatus;
  ref: string;
  fees: number;
  source: string;
  description: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const TRANSACTIONS: Transaction[] = [
  { id: "1", date: "2026-05-03 14:20", type: "Credit",  amount: 50000,  status: "success", ref: "TXN12345678", fees: 50,  source: "Virtual Account", description: "VA Funding" },
  { id: "2", date: "2026-05-03 12:05", type: "Debit",   amount: 120000, status: "pending", ref: "TXN12345679", fees: 100, source: "Payout",          description: "Bulk Payout" },
  { id: "3", date: "2026-05-02 09:15", type: "Credit",  amount: 75000,  status: "failed",  ref: "TXN12345680", fees: 50,  source: "Virtual Account", description: "VA Funding Attempt" },
  { id: "4", date: "2026-05-02 08:00", type: "Debit",   amount: 34000,  status: "success", ref: "TXN12345681", fees: 50,  source: "Payout",          description: "Vendor Payment" },
  { id: "5", date: "2026-05-01 17:44", type: "Credit",  amount: 200000, status: "success", ref: "TXN12345682", fees: 150, source: "Virtual Account", description: "Settlement Credit" },
  { id: "6", date: "2026-05-01 11:30", type: "Debit",   amount: 8500,   status: "pending", ref: "TXN12345683", fees: 25,  source: "Payout",          description: "Commission Transfer" },
  { id: "7", date: "2026-04-30 15:10", type: "Credit",  amount: 62000,  status: "success", ref: "TXN12345684", fees: 50,  source: "Virtual Account", description: "VA Funding" },
];

const FILTER_OPTIONS = [
  { label: "All",     value: "all"     },
  { label: "Success", value: "success" },
  { label: "Pending", value: "pending" },
  { label: "Failed",  value: "failed"  },
] as const;

const PER_PAGE = 5;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function statusMeta(s: TxStatus) {
  return {
    success: { icon: <LucideCheckCircle2 size={11} strokeWidth={2.5} />, label: "Success",  mod: "badge--success" },
    pending: { icon: <LucideClock        size={11} strokeWidth={2.5} />, label: "Pending",  mod: "badge--pending" },
    failed:  { icon: <LucideX            size={11} strokeWidth={2.5} />, label: "Failed",   mod: "badge--failed"  },
  }[s];
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function TransactionsClient() {
  const [search,       setSearch]       = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | TxStatus>("all");
  const [selectedTxn,  setSelectedTxn]  = useState<Transaction | null>(null);
  const [page,         setPage]         = useState(1);

  const filtered = useMemo(() => TRANSACTIONS.filter(tx => {
    const matchSearch =
      tx.ref.toLowerCase().includes(search.toLowerCase()) ||
      tx.description.toLowerCase().includes(search.toLowerCase()) ||
      tx.source.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || tx.status === statusFilter;
    return matchSearch && matchStatus;
  }), [search, statusFilter]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const totalCredit  = filtered.filter(t => t.type === "Credit").reduce((s, t) => s + t.amount, 0);
  const totalDebit   = filtered.filter(t => t.type === "Debit").reduce((s, t) => s + t.amount, 0);

  const handleSearch = (v: string) => { setSearch(v); setPage(1); };
  const handleFilter = (v: string) => { setStatusFilter(v as any); setPage(1); };

  return (
    <div className="page-root">

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Transactions</h1>
          <p className="page-sub">Audit and track every movement in your business wallet.</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-ghost btn-sm tx-btn-icon">
            <LucideDownload size={14} /> Export CSV
          </button>
        </div>
      </div>

      {/* ── Summary cards ───────────────────────────────────────────────── */}
      <div className="sum-grid">
        <div className="sum-card">
          <span className="sum-label">Total Transactions</span>
          <span className="sum-value tx-value-primary">
            {filtered.length}
          </span>
          <span className="sum-sub">{statusFilter === "all" ? "All statuses" : statusFilter}</span>
        </div>
        <div className="sum-card">
          <span className="sum-label">Total Inflow</span>
          <span className="sum-value tx-value-success">
            ₦{totalCredit.toLocaleString()}
          </span>
          <span className="sum-sub">{filtered.filter(t => t.type === "Credit").length} credit transactions</span>
        </div>
        <div className="sum-card">
          <span className="sum-label">Total Outflow</span>
          <span className="sum-value tx-value-error">
            ₦{totalDebit.toLocaleString()}
          </span>
          <span className="sum-sub">{filtered.filter(t => t.type === "Debit").length} debit transactions</span>
        </div>
      </div>

      {/* ── History panel ────────────────────────────────────────────────── */}
      <div className="panel">

        {/* Controls */}
        <div className="panel-header tx-header-controls">
          <span className="panel-title tx-panel-title">Transaction History</span>

          <div className="search-wrap">
            <span className="search-icon"><LucideSearch size={14} strokeWidth={2} /></span>
            <input
              className="search-input"
              placeholder="Search by reference, description, source…"
              value={search}
              onChange={e => handleSearch(e.target.value)}
            />
          </div>

          <div className="filter-tabs">
            {FILTER_OPTIONS.map(opt => (
              <button
                key={opt.value}
                className={`filter-tab ${statusFilter === opt.value ? "filter-tab--active" : ""}`}
                onClick={() => handleFilter(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="table-wrap">
          {paginated.length === 0 ? (
            <div className="empty-state">
              <span className="empty-state__icon">
                <LucideAlertCircle size={20} strokeWidth={1.5} color="rgba(226,225,239,.3)" />
              </span>
              <p>No transactions match your filter.</p>
            </div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date &amp; Time</th>
                  <th>Reference</th>
                  <th>Source</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map(tx => {
                  const sm = statusMeta(tx.status);
                  const isCredit = tx.type === "Credit";
                  return (
                    <tr key={tx.id}>

                      {/* Date */}
                      <td>
                        <span className="tx-date-cell">
                          {tx.date}
                        </span>
                      </td>

                      {/* Reference */}
                      <td>
                        <div className="tx-ref-wrap">
                          <span className="mono tx-ref-code">
                            {tx.ref}
                          </span>
                          <span className="tx-ref-desc">
                            {tx.description}
                          </span>
                        </div>
                      </td>

                      {/* Source */}
                      <td>
                        <span className="tx-source-cell">
                          {tx.source}
                        </span>
                      </td>

                      {/* Amount */}
                      <td>
                        <div className="tx-amount-wrap">
                          <span className={`tx-amount-icon ${isCredit ? "tx-amount-icon--credit" : "tx-amount-icon--debit"}`}>
                            {isCredit
                              ? <LucideArrowDownLeft size={11} strokeWidth={2.5} />
                              : <LucideArrowUpRight  size={11} strokeWidth={2.5} />
                            }
                          </span>
                          <span className={`tabular tx-amount-value ${isCredit ? "tx-amount-value--credit" : "tx-amount-value--debit"}`}>
                            {isCredit ? "+" : "−"}₦{tx.amount.toLocaleString()}
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td>
                        <span className={`badge ${sm.mod}`}>
                          {sm.icon} {sm.label}
                        </span>
                      </td>

                      {/* Action */}
                      <td>
                        <button
                          onClick={() => setSelectedTxn(tx)}
                          className="btn btn-ghost btn-sm tx-action-btn"
                          title="View details"
                        >
                          <LucideEye size={14} />
                        </button>
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
              Showing {Math.min((page - 1) * PER_PAGE + 1, filtered.length)}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length}
            </span>
            <div className="pagination__btns">
              <button className="page-btn" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
                <LucideChevronLeft size={14} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button
                  key={n}
                  className={`page-btn ${page === n ? "page-btn--active" : ""}`}
                  onClick={() => setPage(n)}
                >
                  {n}
                </button>
              ))}
              <button className="page-btn" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>
                <LucideChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Transaction Detail Modal ─────────────────────────────────────── */}
      {selectedTxn && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedTxn(null)}
          role="dialog" aria-modal aria-label="Transaction Details"
        >
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div className="modal-drag" />
            <div className="modal-inner">
              <div className="modal-head">
                <div>
                  <p className="modal-eyebrow">Transactions</p>
                  <h2 className="modal-title">Transaction Details</h2>
                </div>
                <button className="modal-close" onClick={() => setSelectedTxn(null)} aria-label="Close">
                  <LucideX size={15} />
                </button>
              </div>

              {/* Amount hero */}
              <div className="tx-modal-hero">
                <span className="sum-label">Total Impact</span>
                <span className={`tabular tx-modal-total ${selectedTxn.type === "Credit" ? "tx-modal-total--credit" : "tx-modal-total--debit"}`}>
                  ₦{(selectedTxn.amount + selectedTxn.fees).toLocaleString()}
                </span>
                <span className={`badge ${statusMeta(selectedTxn.status).mod} tx-modal-status`}>
                  {statusMeta(selectedTxn.status).icon} {statusMeta(selectedTxn.status).label}
                </span>
              </div>

              {/* Detail rows */}
              <div className="confirm-panel">
                <div className="confirm-row">
                  <span>Type</span>
                  <strong>{selectedTxn.type} · {selectedTxn.source}</strong>
                </div>
                <div className="confirm-row">
                  <span>Date &amp; Time</span>
                  <strong className="mono tx-detail-mono">{selectedTxn.date}</strong>
                </div>
                <div className="confirm-row">
                  <span>Base Amount</span>
                  <strong>₦{selectedTxn.amount.toLocaleString()}</strong>
                </div>
                <div className="confirm-row">
                  <span>Service Fee</span>
                  <strong className="tx-fee-value">₦{selectedTxn.fees.toLocaleString()}</strong>
                </div>
                <div className="confirm-row tx-confirm-row-last">
                  <span>Description</span>
                  <strong>{selectedTxn.description}</strong>
                </div>
              </div>

              {/* Reference */}
              <div className="tx-ref-card">
                <p className="sum-label tx-ref-card-label">Internal Reference</p>
                <p className="mono tx-ref-card-value">
                  {selectedTxn.ref}
                </p>
              </div>

              <button
                className="btn btn-ghost btn-full tx-close-record-btn"
                onClick={() => setSelectedTxn(null)}
              >
                Close Record
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}