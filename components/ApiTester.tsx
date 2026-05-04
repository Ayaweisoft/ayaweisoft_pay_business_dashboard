"use client";

import { useState, useEffect } from "react";

export default function ApiTester() {
  const [endpoint, setEndpoint] = useState("/v1/virtual-accounts");
  const [method, setMethod] = useState("POST");
  const [payload, setPayload] = useState(`{
  "name": "John Doe",
  "email": "john@email.com"
}`);
  const [apiKey, setApiKey] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  // Save/load API key from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("apiKey");
    if (saved) setApiKey(saved);
  }, []);
  useEffect(() => {
    if (apiKey) localStorage.setItem("apiKey", apiKey);
  }, [apiKey]);

  const sendRequest = async () => {
    setLoading(true);
    setResponse("");
    setStatus(null);
    try {
      const res = await fetch(`https://api.ayaweisoft.com${endpoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: method !== "GET" ? payload : undefined,
      });
      setStatus(res.status + " " + res.statusText);
      let data;
      try {
        data = await res.json();
      } catch {
        data = await res.text();
      }
      setResponse(typeof data === "string" ? data : JSON.stringify(data, null, 2));
    } catch (err) {
      setStatus(null);
      setResponse("Error: Unable to reach API");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">API Tester</h3>
      {/* METHOD + ENDPOINT */}
      <div className="flex gap-2 mb-4">
        <select
          value={method}
          onChange={e => setMethod(e.target.value)}
          className="bg-black px-3 py-2 rounded text-sm"
        >
          <option>POST</option>
          <option>GET</option>
        </select>
        <select
          value={endpoint}
          onChange={e => setEndpoint(e.target.value)}
          className="bg-black px-3 py-2 rounded text-sm"
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
        className="w-full bg-black px-3 py-2 rounded text-sm mb-4"
      />
      {/* PAYLOAD */}
      {method !== "GET" && (
        <textarea
          value={payload}
          onChange={e => setPayload(e.target.value)}
          className="w-full bg-black p-3 rounded text-sm font-mono mb-4"
          rows={6}
        />
      )}
      {/* BUTTON */}
      <button
        onClick={sendRequest}
        disabled={loading}
        className="px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded font-semibold"
      >
        {loading ? "Sending..." : "Send Request"}
      </button>
      {/* STATUS */}
      {status && (
        <p className={`text-xs mt-4 ${status.startsWith("2") ? "text-green-400" : "text-red-400"}`}>{status}</p>
      )}
      {/* RESPONSE */}
      {response && (
        <div className="mt-6">
          <p className="text-sm text-white/60 mb-2">Response</p>
          <pre className="bg-black p-4 rounded text-green-400 text-sm overflow-x-auto">
            {response}
          </pre>
        </div>
      )}
    </div>
  );
}
