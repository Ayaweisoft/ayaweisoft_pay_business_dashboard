"use client";

import { useState } from "react";
import { 
  LucideKey, LucideCopy, LucideRefreshCw, 
  LucideGlobe, LucideCheckCircle, LucideEye, LucideEyeOff 
} from "lucide-react";
import { StatusBadge } from "../../components/StatusBadge";

const API_KEY_HIDDEN = process.env.NEXT_PUBLIC_STRIPE_KEY_MASK || "***REMOVED*******************************";
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
    <div className="flex flex-col gap-8 p-4 md:p-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">API & Webhooks</h1>
        <p className="text-white/60 text-sm">Securely manage your integration and monitor server-to-server events.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* API Keys Section */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <section className="glass-card p-6">
            <div className="flex items-center gap-2 mb-6">
              <LucideKey className="text-primary" size={20} />
              <h2 className="text-lg font-bold text-white">API Keys</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2 block">
                  Live Secret Key
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-bg-dark border border-border rounded-lg px-4 py-3 font-mono text-sm text-white/90 overflow-hidden truncate">
                    {showKey ? (API_KEY_REAL || "Set STRIPE_API_KEY in .env") : API_KEY_HIDDEN}
                  </div>
                  <button 
                    onClick={() => setShowKey(!showKey)}
                    className="p-3 rounded-lg bg-white/5 border border-border text-white/60 hover:text-white transition"
                    title={showKey ? "Hide key" : "Show key"}
                  >
                    {showKey ? <LucideEyeOff size={18} /> : <LucideEye size={18} />}
                  </button>
                  <button 
                    onClick={handleCopy}
                    className="p-3 rounded-lg bg-white/5 border border-border text-white/60 hover:text-white transition"
                  >
                    {copySuccess ? <LucideCheckCircle size={18} className="text-success" /> : <LucideCopy size={18} />}
                  </button>
                </div>
                <p className="mt-3 text-xs text-warning/80">
                  Keep this key secret. If compromised, rotate it immediately using the dashboard.
                </p>
              </div>
              <button className="flex items-center gap-2 text-sm text-primary font-medium hover:underline">
                <LucideRefreshCw size={14} /> Roll API Key
              </button>
            </div>
          </section>

          {/* Webhook Configuration */}
          <section className="glass-card p-6">
            <div className="flex items-center gap-2 mb-6">
              <LucideGlobe className="text-success" size={20} />
              <h2 className="text-lg font-bold text-white">Webhook Settings</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2 block">
                  Endpoint URL
                </label>
                <input 
                  type="url"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="w-full bg-bg-dark border border-border rounded-lg px-4 py-3 text-sm text-white focus:ring-1 focus:ring-primary outline-none"
                />
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-border/50">
                <div>
                  <p className="text-sm font-bold text-white">Production Mode</p>
                  <p className="text-xs text-white/40">Events will be sent to your live URL.</p>
                </div>
                <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                </div>
              </div>
              
              <button className="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-lg hover:opacity-90 transition">
                Save Webhook
              </button>
            </div>
          </section>
        </div>

        {/* API Event Logs */}
        <div className="lg:col-span-1">
          <section className="glass-card p-6 h-full flex flex-col">
            <h2 className="text-lg font-bold text-white mb-6">Recent Events</h2>
            <div className="space-y-4 flex-1">
              {INITIAL_LOGS.map((log, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white/5 border border-border hover:bg-white/10 transition cursor-default group">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-mono text-primary group-hover:text-white transition">
                      {log.event}
                    </span>
                    <span className={`text-[10px] font-bold ${log.status >= 400 ? 'text-danger' : 'text-success'}`}>
                      {log.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-white/40">{log.time}</span>
                    <span className="text-white/60">{log.message}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-6 w-full py-2 border border-border rounded-lg text-xs text-white/60 hover:text-white hover:bg-white/5 transition">
              View All Logs
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}