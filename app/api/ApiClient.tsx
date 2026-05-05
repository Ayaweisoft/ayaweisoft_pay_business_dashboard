"use client";

import { useState } from "react";
import { 
  LucideCopy,
  LucideRefreshCw,
  LucideCheckCircle,
  LucideEye,
  LucideEyeOff
} from "lucide-react";

const API_KEY_HIDDEN = process.env.NEXT_PUBLIC_STRIPE_KEY_MASK ?? "sk_live_••••••••••••••••";
interface EnvWindow extends Window {
  ENV?: {
    STRIPE_API_KEY?: string;
  };
}
const API_KEY_REAL = typeof window !== 'undefined' && (window as EnvWindow).ENV?.STRIPE_API_KEY
  ? (window as EnvWindow).ENV?.STRIPE_API_KEY || ""
  : "";

const INITIAL_LOGS = [
  { event: "virtual_account.credited", status: 200, time: "2026-05-03 10:12", message: "Success" },
  { event: "payout.failed", status: 500, time: "2026-05-03 09:45", message: "Provider Timeout" },
  { event: "transfer.success", status: 201, time: "2026-05-03 08:30", message: "Created" },
];

export default function ApiClient() {
  const [showKey, setShowKey] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState("https://api.yourdomain.com/webhooks/ayaweisoft");

  const handleCopy = () => {
    if (API_KEY_REAL) {
      navigator.clipboard.writeText(API_KEY_REAL);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  return (
    <div className="page-root">
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="page-header">
        <div>
          <h1 className="page-title">API &amp; Webhooks</h1>
          <p className="page-sub">Securely manage your integration and monitor server-to-server events.</p>
        </div>
      </div>

      {/* ── Summary Cards (API Key, Webhook) ───────────────────────────── */}
      <div className="sum-grid api-grid">
        <section className="sum-card api-card" aria-label="API key card">
          <span className="sum-label">API Key</span>
          <span className="sum-value mono api-secret">
            {showKey ? (API_KEY_REAL || "Set STRIPE_API_KEY in .env") : API_KEY_HIDDEN}
          </span>
          <span className="sum-sub">Live Secret Key</span>

          <div className="api-actions">
            <button
              onClick={() => setShowKey(!showKey)}
              className="btn btn-ghost btn-sm"
              title={showKey ? "Hide key" : "Show key"}
            >
              {showKey ? <LucideEyeOff size={16} /> : <LucideEye size={16} />}
            </button>
            <button
              onClick={handleCopy}
              className="btn btn-ghost btn-sm"
            >
              {copySuccess ? <LucideCheckCircle size={16} className="text-success" /> : <LucideCopy size={16} />}
            </button>
            <button className="btn btn-primary btn-sm">
              <LucideRefreshCw size={13} /> Roll Key
            </button>
          </div>

          <span className="field-hint api-note">
            Keep this key secret. If compromised, rotate it immediately.
          </span>
        </section>

        <section className="sum-card api-card" aria-label="Webhook card">
          <span className="sum-label">Webhook</span>
          <span className="sum-sub">Endpoint URL</span>

          <div className="field api-webhook-field">
            <input
              type="url"
              value={webhookUrl}
              onChange={e => setWebhookUrl(e.target.value)}
              className="input input-lg"
              placeholder="Webhook endpoint URL"
            />
          </div>

          <div className="api-switch-row">
            <div>
              <p className="webhook-prod-title">Production Mode</p>
              <p className="webhook-prod-desc">Events will be sent to your live URL.</p>
            </div>
            <div className="webhook-prod-switch api-switch-on" aria-hidden="true">
              <div className="webhook-prod-dot" />
            </div>
          </div>

          <button className="btn btn-primary btn-lg">
            Save Webhook
          </button>
        </section>
      </div>

      {/* ── Logs Panel ──────────────────────────────────────────────── */}
      <div className="panel">
        <div className="panel-header">
          <span className="panel-title">Recent API/Webhook Events</span>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Event</th>
                <th>Status</th>
                <th>Time</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {INITIAL_LOGS.map((log) => (
                <tr key={`${log.event}-${log.time}`}>
                  <td>
                    <span className="mono api-event">{log.event}</span>
                  </td>
                  <td>
                    <span className={`badge ${log.status >= 400 ? 'badge--error' : 'badge--success'}`}>{log.status}</span>
                  </td>
                  <td>
                    <span className="api-time">{log.time}</span>
                  </td>
                  <td>
                    <span className="api-message">{log.message}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="panel-header api-panel-footer">
          <button className="btn btn-ghost btn-xs">View All Logs</button>
        </div>
      </div>
    </div>
  );
}