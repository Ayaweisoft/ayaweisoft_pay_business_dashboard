"use client";

import React from "react";
import Navbar from "@/components/AppNavbar";
import Footer from "@/components/AppFooter";
import { motion } from "framer-motion";
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
    <main className="bg-[#0B1220] text-white">

      <Navbar />

      {/* HERO */}
      <section className="text-center py-32 px-6 max-w-6xl mx-auto">
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
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold leading-tight"
        >
          Powering the next generation of{" "}
          <span className="bg-linear-to-r from-blue-500 to-emerald-400 bg-clip-text text-transparent">
            fintech products
          </span>
        </motion.h1>

        <p className="text-white/60 mt-6 max-w-2xl mx-auto text-lg">
          Ayaweisoft provides enterprise-grade APIs for payments, virtual accounts,
          payouts, and financial automation — built for startups, banks, and global platforms.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/register"
            className="px-8 py-4 rounded-xl bg-linear-to-r from-blue-500 to-indigo-500 font-semibold"
          >
            Start Building
          </Link>

          <Link
            href="/developers"
            className="px-8 py-4 bg-white/5 rounded-xl border border-white/10"
          >
            Explore API Docs
          </Link>
        </div>

        <p className="text-xs text-white/40 mt-6">
          Trusted infrastructure • Secure APIs • Built for scale
        </p>
      </section>

      {/* API STATUS + CODE PREVIEW */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* STATUS */}
          <div>
            <h2 className="text-3xl font-bold mb-6">
              Developer-first infrastructure
            </h2>

            <p className="text-white/50 mb-6">
              Integrate powerful financial APIs in minutes. Monitor system health,
              test endpoints, and deploy with confidence.
            </p>

            <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold">API Status</h4>

                <span className="flex items-center gap-2 text-sm text-green-400">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  All systems operational
                </span>
              </div>

              <div className="space-y-3 text-sm text-white/60">
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

              <p className="text-xs text-white/40 mt-4">
                Last updated: just now
              </p>
            </div>
          </div>

          {/* CODE PREVIEW */}
          <div className="bg-[#111827] border border-[#1F2937] rounded-xl overflow-hidden">

            <div className="flex border-b border-[#1F2937]">
              {["curl", "js", "php"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 text-sm capitalize ${
                    activeTab === tab
                      ? "bg-[#0B1220] text-white"
                      : "text-white/50"
                  }`}
                >
                  {tab === "js" ? "JavaScript" : tab}
                </button>
              ))}
            </div>

            <pre className="p-6 text-sm text-green-300 overflow-x-auto">
              <code>{codeSnippets[activeTab]}</code>
            </pre>
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="grid md:grid-cols-3 gap-6 px-6 max-w-6xl mx-auto py-24">
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
          <motion.div
            whileHover={{ scale: 1.03 }}
            key={f.title}
            className="p-6 bg-[#111827] rounded-xl border border-[#1F2937]"
          >
            <h3 className="font-semibold text-lg">{f.title}</h3>
            <p className="text-white/50 text-sm mt-3">{f.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* USE CASES */}
      <section className="py-24 px-6 bg-[#0F172A]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Built for multiple fintech use cases
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
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
                className="p-6 bg-[#111827] rounded-xl border border-[#1F2937]"
              >
                <h4 className="font-semibold">{u}</h4>
                <p className="text-white/50 text-sm mt-3">
                  Build and scale financial solutions efficiently.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <section className="py-24 px-6 bg-[#0F172A] text-center">
        <h2 className="text-3xl font-bold mb-6">Security & Reliability</h2>

        <p className="text-white/50 max-w-2xl mx-auto">
          Enterprise-grade encryption, fraud detection, and uptime reliability.
        </p>

        <div className="flex justify-center gap-6 mt-10 text-sm text-white/60 flex-wrap">
          <span>🔐 End-to-end encryption</span>
          <span>⚡ 99.9% uptime</span>
          <span>🛡 Fraud monitoring</span>
          <span>📊 Real-time reporting</span>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-28 px-6">
        <h2 className="text-4xl font-bold">
          Start building your fintech product today
        </h2>

        <p className="text-white/50 mt-4">
          Get access to APIs, documentation, and sandbox.
        </p>

        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <Link
            href="/register"
            className="px-8 py-4 rounded-xl bg-linear-to-r from-blue-500 to-indigo-500"
          >
            Create Account
          </Link>

          <Link
            href="/contact"
            className="px-8 py-4 bg-white/5 rounded-xl border border-white/10"
          >
            Talk to Sales
          </Link>
        </div>
      </section>

      {/* <Footer /> removed: now only rendered in layout.tsx */}

    </main>
  );
}