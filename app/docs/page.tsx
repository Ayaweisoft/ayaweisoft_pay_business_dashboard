// app/docs/page.tsx
"use client";

import AppNavbar from "@/components/AppNavbar";
import AppFooter from "@/components/AppFooter";
import { motion } from "framer-motion";
import ApiTester from "@/components/ApiTester";
import { useState } from "react";

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

const res = await axios.post(
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
);

console.log(res.data);`,

    php: `<?php

$curl = curl_init();

curl_setopt_array($curl, [
  CURLOPT_URL => "https://api.ayaweisoft.com/v1/virtual-accounts",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_POST => true,
  CURLOPT_POSTFIELDS => json_encode([
    "name" => "John Doe",
    "email" => "john@email.com"
  ]),
  CURLOPT_HTTPHEADER => [
    "Authorization: Bearer YOUR_SECRET_KEY",
    "Content-Type: application/json"
  ],
]);

$response = curl_exec($curl);
curl_close($curl);

echo $response;`,
  };

  return (
    <main className="bg-[#0B1220] text-white min-h-screen">
      <AppNavbar />

      <div className="flex">

        {/* SIDEBAR */}
        <aside className="w-64 hidden md:block border-r border-white/5 p-6 sticky top-20 h-screen">
          <nav className="space-y-4 text-sm text-white/60">
            <p className="text-white font-semibold">Getting Started</p>
            <a href="#intro">Introduction</a>
            <a href="#auth">Authentication</a>

            <p className="text-white font-semibold mt-6">APIs</p>
            <a href="#virtual">Virtual Accounts</a>
            <a href="#payments">Payments</a>
            <a href="#payouts">Payouts</a>
            <a href="#webhooks">Webhooks</a>
          </nav>
        </aside>

        {/* CONTENT */}
        <div className="flex-1 p-6 md:p-12 max-w-5xl mx-auto">

          {/* INTRO */}
          <section id="intro" className="mb-16">
            <h1 className="text-4xl font-bold mb-4">API Documentation</h1>
            <p className="text-white/50">
              Ayaweisoft Pay provides APIs for payments, virtual accounts, and payouts.
            </p>
          </section>

          {/* AUTH */}
          <section id="auth" className="mb-16">
            <h2 className="text-2xl font-semibold mb-4">Authentication</h2>
            <p className="text-white/50 mb-4">
              All API requests require your secret key.
            </p>

            <div className="bg-black p-4 rounded-lg text-green-400 font-mono text-sm">
              Authorization: Bearer YOUR_SECRET_KEY
            </div>
          </section>

          {/* VIRTUAL ACCOUNT */}
          <section id="virtual" className="mb-16">
            <h2 className="text-2xl font-semibold mb-4">
              Create Virtual Account
            </h2>

            <p className="text-white/50 mb-6">
              Generates a dedicated account number for a customer.
            </p>

            {/* Interactive API Tester */}
            <div className="mb-8">
              <ApiTester />
            </div>
          </section>

          {/* PAYOUT */}
          <section id="payouts" className="mb-16">
            <h2 className="text-2xl font-semibold mb-4">Payouts</h2>
            <p className="text-white/50">
              Send funds to any Nigerian bank instantly.
            </p>
          </section>

          {/* WEBHOOK */}
          <section id="webhooks" className="mb-16">
            <h2 className="text-2xl font-semibold mb-4">Webhooks</h2>
            <p className="text-white/50 mb-4">
              Receive real-time updates for transactions.
            </p>

            <div className="bg-black p-4 rounded-lg text-blue-400 font-mono text-sm">
{`{
  "event": "payment.success",
  "amount": 50000
}`}
            </div>
          </section>

        </div>
      </div>

      <AppFooter />
    </main>
  );
}