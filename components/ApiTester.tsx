"use client";

import { useEffect, useState } from "react";

export default function ApiTester() {
  const [endpoint, setEndpoint] = useState("/v1/virtual-accounts");
  const [method, setMethod] = useState("POST");
  const [payload, setPayload] = useState(`{
  "name": "John Doe",
  "email": "john@email.com"
}`);
  const [apiKey, setApiKey] = useState("");
  const [response, setResponse] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const baseUrl = "https://api.ayaweisoft.com";

  // Load API key
  useEffect(() => {
    const saved = localStorage.getItem("apiKey");
    if (saved) setApiKey(saved);
  }, []);

  useEffect(() => {
    if (apiKey) localStorage.setItem("apiKey", apiKey);
  }, [apiKey]);

  const formatJson = (data: any) => {
    try {
      return JSON.stringify(data, null, 2);
    } catch {
      return String(data);
    }
  };

  const sendRequest = async () => {
    setLoading(true);
    setResponse("");
    setStatus(null);

    const url = `${baseUrl}${endpoint}`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: method !== "GET" ? payload : undefined,
      });

      setStatus(`${res.status}`);

      let data;
      try {
        data = await res.json();
      } catch {
        data = await res.text();
      }

      const formatted = typeof data === "string" ? data : formatJson(data);

      setResponse(formatted);

      setHistory(prev => [`${method} ${endpoint}`, ...prev.slice(0, 4)]);
    } catch (err) {
      setStatus("ERROR");
      setResponse("Unable to reach API. Check network or endpoint.");
    } finally {
      setLoading(false);
    }
  };

  const copyResponse = () => {
    navigator.clipboard.writeText(response);
  };

  return (
    <div className="bg-[#0F172A] border border-white/10 rounded-2xl overflow-hidden">

      {/* HEADER */}
      <div className="p-5 border-b border-white/10 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">API Tester</h3>
          <p className="text-xs text-white/40">
            Base URL: {baseUrl}
          </p>
        </div>

        {status && (
          <span
            className={`px-3 py-1 text-xs rounded-full font-semibold ${
              status.startsWith("2")
                ? "bg-green-500/10 text-green-400"
                : status === "ERROR"
                ? "bg-red-500/10 text-red-400"
                : "bg-yellow-500/10 text-yellow-300"
            }`}
          >
            {status}
          </span>
        )}
      </div>

      <div className="grid md:grid-cols-2">

        {/* LEFT - REQUEST */}
        <div className="p-5 space-y-4 border-r border-white/10">

          {/* METHOD + ENDPOINT */}
          <div className="flex gap-2">
            <select
              value={method}
              onChange={e => setMethod(e.target.value)}
              className="bg-black px-3 py-2 rounded text-sm"
            >
              <option>POST</option>
              <option>GET</option>
              <option>PUT</option>
              <option>DELETE</option>
            </select>

            <select
              value={endpoint}
              onChange={e => setEndpoint(e.target.value)}
              className="bg-black px-3 py-2 rounded text-sm w-full"
            >
              <option value="/v1/virtual-accounts">/v1/virtual-accounts</option>
              <option value="/v1/payouts">/v1/payouts</option>
              <option value="/v1/payments">/v1/payments</option>
              <option value="/v1/wallets">/v1/wallets</option>
            </select>
          </div>

          {/* API KEY */}
          <input
            placeholder="Enter API Key"
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            className="w-full bg-black px-3 py-2 rounded text-sm"
          />

          {/* BODY */}
          {method !== "GET" && (
            <textarea
              value={payload}
              onChange={e => setPayload(e.target.value)}
              className="w-full bg-black p-3 rounded text-sm font-mono h-40"
            />
          )}

          {/* BUTTON */}
          <button
            onClick={sendRequest}
            disabled={loading}
            className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded font-semibold"
          >
            {loading ? "Sending Request..." : "Send Request"}
          </button>

          {/* HISTORY */}
          {history.length > 0 && (
            <div className="text-xs text-white/40 space-y-1">
              <p className="font-semibold text-white/60">Recent Requests</p>
              {history.map((h, i) => (
                <p key={i}>• {h}</p>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT - RESPONSE */}
        <div className="p-5 space-y-3">

          <div className="flex justify-between items-center">
            <p className="text-sm text-white/60">Response</p>

            {response && (
              <button
                onClick={copyResponse}
                className="text-xs px-2 py-1 bg-white/5 rounded"
              >
                Copy
              </button>
            )}
          </div>

          <pre className="bg-black p-4 rounded text-green-400 text-sm overflow-auto h-96">
            {response || "No response yet..."}
          </pre>

        </div>

      </div>
    </div>
  );
}