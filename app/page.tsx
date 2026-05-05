"use client";

import React from "react";
import AppNavbar from "@/components/AppNavbar";
import AppFooter from "@/components/AppFooter";
import Link from "next/link";
import Image from "next/image";


export default function Home() {
  const [activeTab, setActiveTab] = React.useState("curl");

  const codeSnippets: Record<string, string> = {
    curl: `curl -X POST https://api.ayaweisoft.com/v1/payments
  -H "Authorization: Bearer YOUR_SECRET_KEY"
  -H "Content-Type: application/json"
  -d '{
    "amount": 5000,
    "currency": "NGN",
    "customer": {
      "email": "user@email.com"
    }
  }'`,

    js: `import axios from "axios";

await axios.post("https://api.ayaweisoft.com/v1/payments", {
  amount: 5000,
  currency: "NGN",
  customer: { email: "user@email.com" }
}, {
  headers: {
    Authorization: "Bearer YOUR_SECRET_KEY"
  }
});`,

    php: `$client = new \\GuzzleHttp\\Client();

$response = $client->post("https://api.ayaweisoft.com/v1/payments", [
  "headers" => [
    "Authorization" => "Bearer YOUR_SECRET_KEY"
  ],
  "json" => [
    "amount" => 5000,
    "currency" => "NGN",
    "customer" => [
      "email" => "user@email.com"
    ]
  ]
]);`
  };

  return (
    <main className="mk-root">

      <AppNavbar />

      {/* HERO */}
      <section className="mk-hero mk-shell">
        <div className="flex justify-center mb-8">
          <div className="rounded-2xl border-4 border-white/10 bg-white/5 p-3 shadow-lg flex items-center justify-center" style={{width: 96, height: 96}}>
            <Image
              src="/asp_logo.png"
              alt="Ayaweisoft Pay Logo"
              width={80}
              height={80}
              className="object-contain drop-shadow-lg"
              priority
            />
          </div>
        </div>
        <h1 className="mk-title-xl">
          Powering the next generation of{" "}
          <span className="bg-linear-to-r from-blue-500 to-emerald-400 bg-clip-text text-transparent">
            fintech products
          </span>
        </h1>

        <p className="mk-sub mk-sub--center">
          Ayaweisoft provides enterprise-grade APIs for payments, virtual accounts,
          payouts, and financial automation — built for startups, banks, and global platforms.
        </p>

        <div className="mk-actions">
          <Link
            href="/register"
            className="mk-btn mk-btn--primary"
          >
            Start Building
          </Link>

          <Link
            href="/developers"
            className="mk-btn mk-btn--ghost"
          >
            Explore API Docs
          </Link>
        </div>

        <p className="mk-inline-note">
          Trusted infrastructure • Secure APIs • Built for scale
        </p>
      </section>

      {/* API STATUS + CODE PREVIEW */}
      <section className="mk-section">
        <div className="mk-shell mk-grid-2 items-center">

          {/* STATUS */}
          <div>
            <h2 className="mk-title-lg mb-4">
              Developer-first infrastructure
            </h2>

            <p className="mk-sub">
              Integrate powerful financial APIs in minutes. Monitor system health,
              test endpoints, and deploy with confidence.
            </p>

            <div className="mk-card mt-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold">API Status</h4>

                <span className="mk-pill">
                  <span className="mk-dot-live" />
                  All systems operational
                </span>
              </div>

              <div className="space-y-3 text-sm" style={{ color: "rgba(226,225,239,0.66)" }}>
                <div className="flex justify-between">
                  <span>Payments API</span>
                  <span className="text-green-400">Operational</span>
                </div>
                <div className="flex justify-between">
                  <span>Virtual Accounts</span>
                  <span className="text-green-400">Operational</span>
                </div>
                <div className="flex justify-between">
                  <span>Payouts</span>
                  <span className="text-green-400">Operational</span>
                </div>
                <div className="flex justify-between">
                  <span>Webhooks</span>
                  <span className="text-green-400">Operational</span>
                </div>
              </div>

              <p className="mk-inline-note">
                Last updated: just now
              </p>
            </div>
          </div>

          {/* CODE PREVIEW */}
          <div className="mk-card p-0 overflow-hidden">

            <div className="flex border-b border-white/10">
              {["curl", "js", "php"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 text-sm capitalize ${
                    activeTab === tab
                      ? "bg-black/20 text-white"
                      : "text-white/50 hover:text-white/70"
                  }`}
                >
                  {tab === "js" ? "JavaScript" : tab}
                </button>
              ))}
            </div>

            <pre className="mk-code mk-code--green rounded-none border-0">
              <code>{codeSnippets[activeTab]}</code>
            </pre>
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="mk-section">
        <div className="mk-shell mk-grid-3">
        {[
          {
            title: "Payments API",
            desc: "Accept payments via transfers, cards, USSD, and wallet systems with real-time confirmations."
          },
          {
            title: "Virtual Accounts",
            desc: "Create dynamic or static accounts with automated reconciliation."
          },
          {
            title: "Payout Infrastructure",
            desc: "Send bulk or single payouts with retry logic and fraud checks."
          },
          {
            title: "Bill Payments",
            desc: "Integrate airtime, data, electricity, betting, and cable subscriptions."
          },
          {
            title: "Compliance & KYC",
            desc: "Identity verification and transaction monitoring built-in."
          },
          {
            title: "Developer SDKs",
            desc: "Well-documented APIs and sandbox for rapid integration."
          }
        ].map((f) => (
          <div key={f.title} className="mk-card">
            <h3 className="mk-card-title">{f.title}</h3>
            <p className="mk-card-copy">{f.desc}</p>
          </div>
        ))}
        </div>
      </section>

      {/* USE CASES */}
      <section className="mk-section mk-section--muted">
        <div className="mk-shell">
          <h2 className="mk-title-lg mb-10 text-center">
            Built for multiple fintech use cases
          </h2>

          <div className="mk-grid-3">
            {[
              "Fintech Startups",
              "Agency Banking",
              "Marketplaces",
              "Betting & Gaming",
              "E-commerce",
              "Enterprise Platforms"
            ].map((u) => (
              <div
                key={u}
                className="mk-card"
              >
                <h4 className="mk-card-title">{u}</h4>
                <p className="mk-card-copy">
                  Build and scale financial solutions efficiently.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <section className="mk-section mk-section--muted text-center">
        <div className="mk-shell">
        <h2 className="mk-title-lg mb-4">Security & Reliability</h2>

        <p className="mk-sub mk-sub--center">
          Enterprise-grade encryption, fraud detection, and uptime reliability.
        </p>

        <div className="mk-actions" style={{ marginTop: 20 }}>
          <span className="mk-pill">End-to-end encryption</span>
          <span className="mk-pill">99.9% uptime</span>
          <span className="mk-pill">Fraud monitoring</span>
          <span className="mk-pill">Real-time reporting</span>
        </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mk-section text-center">
        <div className="mk-shell">
        <h2 className="mk-title-lg">
          Start building your fintech product today
        </h2>

        <p className="mk-sub mk-sub--center">
          Get access to APIs, documentation, and sandbox.
        </p>

        <div className="mk-actions">
          <Link
            href="/register"
            className="mk-btn mk-btn--primary"
          >
            Create Account
          </Link>

          <Link
            href="/contact"
            className="mk-btn mk-btn--ghost"
          >
            Talk to Sales
          </Link>
        </div>
        </div>
      </section>

      <AppFooter />

    </main>
  );
}