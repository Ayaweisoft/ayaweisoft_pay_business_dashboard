"use client";
"use client";
import { useState } from "react";
import { LucideKey, LucideCopy, LucideRefreshCw, LucideGlobe, LucideCheckCircle } from "lucide-react";
import { FormInput } from "../../components/FormInput";
import { StatusBadge } from "../../components/StatusBadge";

const apiKey = "***REMOVED****************";
const webhookEvents = [
  { name: "Payment Success", enabled: true },
  { name: "Transfer Failed", enabled: false },
];
const logs = [
  { event: "VA Credit", status: 200, time: "2026-05-03 10:12", message: "OK" },
  { event: "Transfer", status: 500, time: "2026-05-03 09:45", message: "Error" },
];

export default function ApiPage() {
  const [showKey, setShowKey] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState("https://yourapp.com/webhook");
  const [events, setEvents] = useState(webhookEvents);
  const [copy, setCopy] = useState(false);

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">API & Webhooks</h1>
          <p className="text-white/60 text-sm">Manage API keys, webhooks, and event logs.</p>
        </div>
      </div>

      {/* API Key Card */}
      <div className="glass-card p-6 flex flex-col gap-3 max-w-xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="p-2 rounded-lg bg-primary/10 text-primary"><LucideKey size={20} /></span>
          <span className="text-base font-bold text-white">Live Key:</span>
          <span className="font-mono text-white/80 text-sm select-all">{showKey ? "***REMOVED***1234567890abcdef" : apiKey}</span>
          <button className="ml-2 p-1 rounded hover:bg-bg-card" onClick={() => {navigator.clipboard.writeText("***REMOVED***1234567890abcdef");setCopy(true);setTimeout(()=>setCopy(false),1200);}} title="Copy">
            <LucideCopy size={16} className={copy ? "text-success" : "text-white/60"} />
          </button>
          <button className="ml-1 p-1 rounded hover:bg-bg-card" onClick={() => setShowKey(v => !v)} title="Show/Hide">
            {showKey ? "Hide" : "Show"}
          </button>
          <button className="ml-1 p-1 rounded hover:bg-bg-card" title="Regenerate">
            <LucideRefreshCw size={16} className="text-warning" />
          </button>
        </div>
      </div>

      {/* Webhook Config */}
      <div className="glass-card p-6 flex flex-col gap-4 max-w-xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="p-2 rounded-lg bg-primary/10 text-primary"><LucideGlobe size={20} /></span>
          <span className="text-base font-bold text-white">Webhook URL:</span>
        </div>
        <FormInput value={webhookUrl} onChange={e => setWebhookUrl(e.target.value)} className="w-full" />
        <div className="flex flex-col gap-2">
          <span className="text-white/80 text-sm mb-1">Events:</span>
          {events.map((ev, idx) => (
            <label key={ev.name} className="flex items-center gap-2 text-white/70 text-sm">
              <input
                type="checkbox"
                checked={ev.enabled}
                onChange={() => setEvents(events => events.map((e, i) => i === idx ? { ...e, enabled: !e.enabled } : e))}
                className="accent-primary w-4 h-4"
              />
              {ev.name}
            </label>
          ))}
        </div>
        <button className="mt-2 px-4 py-2 rounded-lg bg-primary text-white font-semibold hover:opacity-90 transition w-max">Save</button>
      </div>

      {/* Logs Table */}
      <div className="glass-card p-6 mt-4 max-w-2xl">
        <div className="flex items-center justify-between mb-3">
          <span className="text-base font-bold text-white">Logs</span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-bg-dark/80">
              <tr>
                <th className="px-4 py-2 text-left text-white/70">Event</th>
                <th className="px-4 py-2 text-left text-white/70">Status</th>
                <th className="px-4 py-2 text-left text-white/70">Time</th>
                <th className="px-4 py-2 text-left text-white/70">Message</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, idx) => (
                <tr key={idx} className="border-t border-border hover:bg-bg-dark/40 transition">
                  <td className="px-4 py-2 text-white/90">{log.event}</td>
                  <td className="px-4 py-2 text-white/90">
                    {log.status === 200 ? (
                      <span className="flex items-center gap-1 text-success font-semibold"><LucideCheckCircle size={14} /> 200</span>
                    ) : (
                      <span className="flex items-center gap-1 text-error font-semibold">{log.status}</span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-white/90">{log.time}</td>
                  <td className="px-4 py-2 text-white/90">{log.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
