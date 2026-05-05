"use client";

import AppNavbar from "@/components/AppNavbar";
import AppFooter from "@/components/AppFooter";

import { useState } from "react";
import ApiTester from "@/components/ApiTester";

const TABS = ["curl", "javascript", "php"];

export default function DocsPage() {
  const [activeTab, setActiveTab] = useState("curl");

  const codeSamples: Record<string, string> = {
    curl: `curl -X POST https://api.ayaweisoft.com/v1/virtual-accounts \\
-H "Authorization: Bearer YOUR_SECRET_KEY" \\
-H "Content-Type: application/json" \\
-d '{
  "name": "John Doe",
  "email": "john@email.com"
}'`,

    javascript: `import axios from "axios";

await axios.post(
  "https://api.ayaweisoft.com/v1/virtual-accounts",
  {
    name: "John Doe",
    email: "john@email.com",
  },
  {
    headers: {
      Authorization: "Bearer YOUR_SECRET_KEY",
    },
  }
);`,

    php: `<?php

$client = new \\GuzzleHttp\\Client();

$response = $client->post("https://api.ayaweisoft.com/v1/virtual-accounts", [
  "headers" => [
    "Authorization" => "Bearer YOUR_SECRET_KEY"
  ],
  "json" => [
    "name" => "John Doe",
    "email" => "john@email.com"
  ]
]);

echo $response->getBody();`,
  };

  return (
    <main className="mk-root">
      <AppNavbar />

      <div className="mk-shell mk-section mk-section--compact">
        <div className="mk-docs-wrap">

        {/* SIDEBAR */}
        <aside className="mk-docs-sidebar mk-card hidden md:block">
          <nav className="mk-docs-nav space-y-4">

            <div>
              <p className="mk-docs-nav-title">Getting Started</p>
              <a href="#intro">Introduction</a>
              <a href="#auth">Authentication</a>
              <a href="#errors">Error Handling</a>
            </div>

            <div className="mt-6">
              <p className="mk-docs-nav-title">Core APIs</p>
              <a href="#virtual">Virtual Accounts</a>
              <a href="#payments">Payments</a>
              <a href="#payouts">Payouts</a>
            </div>

            <div className="mt-6">
              <p className="mk-docs-nav-title">Advanced</p>
              <a href="#webhooks">Webhooks</a>
              <a href="#rate">Rate Limits</a>
            </div>

          </nav>
        </aside>

        {/* CONTENT */}
        <div className="space-y-16">

          {/* INTRO */}
          <section id="intro">
            <h1 className="mk-title-lg mb-3">
              Ayaweisoft API Documentation
            </h1>

            <p className="mk-sub" style={{ marginTop: 0 }}>
              Ayaweisoft Pay is a developer-first financial infrastructure API
              enabling payments, virtual accounts, and payout systems across Africa.
            </p>

            <div className="mk-card mt-6 text-sm" style={{ color: "rgba(226,225,239,0.64)" }}>
              Base URL:{" "}
              <span className="text-green-400">
                https://api.ayaweisoft.com/v1
              </span>
            </div>
          </section>

          {/* AUTH */}
          <section id="auth">
            <h2 className="mk-title-lg mb-4">Authentication</h2>

            <p className="mk-sub" style={{ marginTop: 0 }}>
              All API requests require a secret key passed in the Authorization header.
            </p>

            <div className="mk-code mk-code--green">
              Authorization: Bearer YOUR_SECRET_KEY
            </div>
          </section>

          {/* ERROR HANDLING */}
          <section id="errors">
            <h2 className="mk-title-lg mb-4">Error Handling</h2>

            <div className="mk-card text-sm space-y-2">
              <p><span className="text-red-400">400</span> - Bad Request</p>
              <p><span className="text-red-400">401</span> - Unauthorized</p>
              <p><span className="text-red-400">404</span> - Not Found</p>
              <p><span className="text-red-400">500</span> - Server Error</p>
            </div>
          </section>

          {/* VIRTUAL ACCOUNTS */}
          <section id="virtual">
            <h2 className="mk-title-lg mb-4">
              Virtual Accounts API
            </h2>

            <p className="mk-sub" style={{ marginTop: 0 }}>
              Create dedicated virtual accounts for customers to receive payments
              with automatic reconciliation.
            </p>

            {/* CLEAN API TESTER (FIXED USAGE) */}
            <div className="mb-8">
              <ApiTester />
            </div>

            {/* CODE TABS */}
            <div className="mk-card p-0 overflow-hidden">

              <div className="flex border-b border-white/10">
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-3 text-sm capitalize ${
                      activeTab === tab
                        ? "bg-[#0B1220] text-white"
                        : "text-white/50"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <pre className="mk-code mk-code--green rounded-none border-0">
                <code>{codeSamples[activeTab]}</code>
              </pre>

            </div>
          </section>

          {/* PAYMENTS */}
          <section id="payments">
            <h2 className="mk-title-lg mb-4">Payments API</h2>
            <p className="mk-sub" style={{ marginTop: 0 }}>
              Accept bank transfers, cards, and wallet payments with real-time confirmation.
            </p>
          </section>

          {/* PAYOUTS */}
          <section id="payouts">
            <h2 className="mk-title-lg mb-4">Payouts API</h2>
            <p className="mk-sub" style={{ marginTop: 0 }}>
              Send instant or bulk payouts with fraud checks and reconciliation tracking.
            </p>
          </section>

          {/* WEBHOOKS */}
          <section id="webhooks">
            <h2 className="mk-title-lg mb-4">Webhooks</h2>

            <div className="mk-code mk-code--blue">
{`{
  "event": "payment.success",
  "data": {
    "amount": 50000,
    "status": "successful"
  },
  "reference": "TXN_123456"
}`}
            </div>
          </section>

          {/* RATE LIMITS */}
          <section id="rate">
            <h2 className="mk-title-lg mb-4">Rate Limits</h2>

            <div className="mk-card text-sm">
              <p>• 100 requests/min (standard)</p>
              <p>• 1000 requests/min (enterprise)</p>
            </div>
          </section>

        </div>
        </div>
      </div>

      <AppFooter />


    </main>
  );
}