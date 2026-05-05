"use client";

import { useEffect, useState } from "react";

type ApiMethod = "GET" | "POST" | "PUT" | "DELETE";

interface EndpointOption {
  value: string;
  label: string;
}

const ENDPOINTS: EndpointOption[] = [
  { value: "/v1/virtual-accounts", label: "/v1/virtual-accounts" },
  { value: "/v1/payouts", label: "/v1/payouts" },
  { value: "/v1/payments", label: "/v1/payments" },
  { value: "/v1/wallets", label: "/v1/wallets" },
];

export default function ApiTester() {
  const [endpoint, setEndpoint] = useState("/v1/virtual-accounts");
  const [method, setMethod] = useState<ApiMethod>("POST");
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
    try {
      const saved = localStorage.getItem("apiKey");
      if (saved) setApiKey(saved);
    } catch {
      // Ignore storage access issues in restricted environments.
    }
  }, []);

  useEffect(() => {
    if (!apiKey) return;

    try {
      localStorage.setItem("apiKey", apiKey);
    } catch {
      // Ignore storage access issues in restricted environments.
    }
  }, [apiKey]);

  const formatJson = (data: unknown) => {
    try {
      return JSON.stringify(data, null, 2);
    } catch {
      return String(data);
    }
  };

  const buildRequestBody = () => {
    if (method === "GET") return undefined;

    try {
      const parsed = JSON.parse(payload);
      return JSON.stringify(parsed);
    } catch {
      throw new Error("Payload must be valid JSON before sending.");
    }
  };

  const sendRequest = async () => {
    setLoading(true);
    setResponse("");
    setStatus(null);

    const url = `${baseUrl}${endpoint}`;

    try {
      const body = buildRequestBody();

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(apiKey.trim() ? { Authorization: `Bearer ${apiKey.trim()}` } : {}),
        },
        body,
      });

      setStatus(`${res.status}`);

      let data: unknown;
      try {
        data = await res.json();
      } catch {
        data = await res.text();
      }

      const formatted = typeof data === "string" ? data : formatJson(data);

      setResponse(formatted);

      setHistory(prev => [`${method} ${endpoint}`, ...prev.slice(0, 4)]);
    } catch (error) {
      setStatus("ERROR");
      if (error instanceof Error) {
        setResponse(error.message);
      } else {
        setResponse("Unable to reach API. Check network, endpoint, and CORS policy.");
      }
    } finally {
      setLoading(false);
    }
  };

  const copyResponse = async () => {
    if (!response) return;

    try {
      await navigator.clipboard.writeText(response);
    } catch {
      setStatus("ERROR");
      setResponse("Could not copy response to clipboard in this browser context.");
    }
  };

  return (
    <div className="api-tester">

      {/* HEADER */}
      <div className="api-tester__header">
        <div>
          <h3 className="text-lg font-semibold">API Tester</h3>
          <p className="api-tester__base-url">
            Base URL: {baseUrl}
          </p>
        </div>

        {status && (
          <span className={`api-tester__status ${
              status.startsWith("2")
                ? "api-tester__status--ok"
                : status === "ERROR"
                ? "api-tester__status--err"
                : "api-tester__status--warn"
            }`}
          >
            {status}
          </span>
        )}
      </div>

      <div className="api-tester__grid">

        {/* LEFT - REQUEST */}
        <div className="api-tester__request">

          {/* METHOD + ENDPOINT */}
          <div className="api-tester__row">
            <select
              value={method}
              onChange={e => setMethod(e.target.value as ApiMethod)}
              className="api-tester__select"
            >
              <option>POST</option>
              <option>GET</option>
              <option>PUT</option>
              <option>DELETE</option>
            </select>

            <select
              value={endpoint}
              onChange={e => setEndpoint(e.target.value)}
              className="api-tester__select api-tester__select--grow"
            >
              {ENDPOINTS.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>
          </div>

          {/* API KEY */}
          <input
            placeholder="Enter API Key"
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            className="api-tester__input"
          />

          {/* BODY */}
          {method !== "GET" && (
            <textarea
              value={payload}
              onChange={e => setPayload(e.target.value)}
              className="api-tester__textarea"
            />
          )}

          {/* BUTTON */}
          <button
            onClick={sendRequest}
            disabled={loading}
            className="api-tester__send-btn"
          >
            {loading ? "Sending Request..." : "Send Request"}
          </button>

          {/* HISTORY */}
          {history.length > 0 && (
            <div className="api-tester__history">
              <p className="api-tester__history-title">Recent Requests</p>
              {history.map((h, i) => (
                <p key={i}>• {h}</p>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT - RESPONSE */}
        <div className="api-tester__response-wrap">

          <div className="api-tester__response-head">
            <p className="api-tester__response-title">Response</p>

            {response && (
              <button
                onClick={copyResponse}
                className="api-tester__copy-btn"
              >
                Copy
              </button>
            )}
          </div>

          <pre className="api-tester__response-box">
            {response || "No response yet..."}
          </pre>

        </div>

      </div>
    </div>
  );
}