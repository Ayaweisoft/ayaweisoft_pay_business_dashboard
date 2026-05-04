"use client";

import AppNavbar from "@/components/AppNavbar";

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
    <main className="bg-[#0B1220] text-white min-h-screen">
      <AppNavbar />

      <div className="flex">

        {/* SIDEBAR */}
        <aside className="w-64 hidden md:block border-r border-white/5 p-6 sticky top-20 h-screen overflow-y-auto">
          <nav className="space-y-3 text-sm text-white/60">

            <div>
              <p className="text-white font-semibold mb-2">Getting Started</p>
              <a href="#intro" className="block hover:text-white">Introduction</a>
              <a href="#auth" className="block hover:text-white">Authentication</a>
              <a href="#errors" className="block hover:text-white">Error Handling</a>
            </div>

            <div className="mt-6">
              <p className="text-white font-semibold mb-2">Core APIs</p>
              <a href="#virtual" className="block hover:text-white">Virtual Accounts</a>
              <a href="#payments" className="block hover:text-white">Payments</a>
              <a href="#payouts" className="block hover:text-white">Payouts</a>
            </div>

            <div className="mt-6">
              <p className="text-white font-semibold mb-2">Advanced</p>
              <a href="#webhooks" className="block hover:text-white">Webhooks</a>
              <a href="#rate" className="block hover:text-white">Rate Limits</a>
            </div>

          </nav>
        </aside>

        {/* CONTENT */}
        <div className="flex-1 p-6 md:p-12 max-w-5xl mx-auto space-y-20">

          {/* INTRO */}
          <section id="intro">
            <h1 className="text-4xl font-bold mb-4">
              Ayaweisoft API Documentation
            </h1>

            <p className="text-white/60 text-lg leading-relaxed">
              Ayaweisoft Pay is a developer-first financial infrastructure API
              enabling payments, virtual accounts, and payout systems across Africa.
            </p>

            <div className="mt-6 bg-[#111827] border border-white/10 p-4 rounded-xl text-sm text-white/60">
              Base URL:{" "}
              <span className="text-green-400">
                https://api.ayaweisoft.com/v1
              </span>
            </div>
          </section>

          {/* AUTH */}
          <section id="auth">
            <h2 className="text-2xl font-semibold mb-4">Authentication</h2>

            <p className="text-white/60 mb-4">
              All API requests require a secret key passed in the Authorization header.
            </p>

            <div className="bg-black p-4 rounded-lg text-green-400 font-mono text-sm">
              Authorization: Bearer YOUR_SECRET_KEY
            </div>
          </section>

          {/* ERROR HANDLING */}
          <section id="errors">
            <h2 className="text-2xl font-semibold mb-4">Error Handling</h2>

            <div className="bg-[#111827] p-4 rounded-xl text-sm space-y-2">
              <p><span className="text-red-400">400</span> - Bad Request</p>
              <p><span className="text-red-400">401</span> - Unauthorized</p>
              <p><span className="text-red-400">404</span> - Not Found</p>
              <p><span className="text-red-400">500</span> - Server Error</p>
            </div>
          </section>

          {/* VIRTUAL ACCOUNTS */}
          <section id="virtual">
            <h2 className="text-2xl font-semibold mb-4">
              Virtual Accounts API
            </h2>

            <p className="text-white/60 mb-6">
              Create dedicated virtual accounts for customers to receive payments
              with automatic reconciliation.
            </p>

            {/* CLEAN API TESTER (FIXED USAGE) */}
            <div className="mb-8">
              <ApiTester />
            </div>

            {/* CODE TABS */}
            <div className="bg-[#111827] border border-white/10 rounded-xl overflow-hidden">

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

              <pre className="p-5 text-green-300 text-sm overflow-x-auto">
                <code>{codeSamples[activeTab]}</code>
              </pre>

            </div>
          </section>

          {/* PAYMENTS */}
          <section id="payments">
            <h2 className="text-2xl font-semibold mb-4">Payments API</h2>
            <p className="text-white/60">
              Accept bank transfers, cards, and wallet payments with real-time confirmation.
            </p>
          </section>

          {/* PAYOUTS */}
          <section id="payouts">
            <h2 className="text-2xl font-semibold mb-4">Payouts API</h2>
            <p className="text-white/60">
              Send instant or bulk payouts with fraud checks and reconciliation tracking.
            </p>
          </section>

          {/* WEBHOOKS */}
          <section id="webhooks">
            <h2 className="text-2xl font-semibold mb-4">Webhooks</h2>

            <div className="bg-black p-4 rounded-lg text-blue-400 font-mono text-sm">
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
            <h2 className="text-2xl font-semibold mb-4">Rate Limits</h2>

            <div className="bg-[#111827] p-4 rounded-xl text-sm">
              <p>• 100 requests/min (standard)</p>
              <p>• 1000 requests/min (enterprise)</p>
            </div>
          </section>

        </div>
      </div>


    </main>
  );
}