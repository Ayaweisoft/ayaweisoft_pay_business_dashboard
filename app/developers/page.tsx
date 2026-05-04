// app/developers/page.tsx
"use client";

import Navbar from "@/components/AppNavbar";
import Footer from "@/components/AppFooter";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Developers() {
  return (
    <main className="bg-[#0B1220] text-white">

      <Navbar />

      {/* HERO */}
      <section className="text-center py-24 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-bold"
        >
          Build with Ayaweisoft APIs
        </motion.h1>

        <p className="text-white/50 mt-6 max-w-xl mx-auto">
          Integrate payments, virtual accounts, wallets, and payouts with a single API.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link href="/register" className="px-8 py-4 bg-linear-to-r from-blue-500 to-indigo-500 rounded-xl text-lg font-semibold">
            Get API Keys
          </Link>
          <Link href="/docs" className="px-6 py-3 bg-white/5 rounded-xl">
            View Docs
          </Link>
        </div>
      </section>

      {/* QUICK START */}
      <section className="px-6 py-20 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        <div>
          <h2 className="text-3xl font-bold mb-4">Quickstart</h2>
          <p className="text-white/50 mb-6">
            Start accepting payments and generating virtual accounts in minutes.
          </p>

          <ul className="space-y-3 text-sm text-white/60">
            <li>✔ Create account</li>
            <li>✔ Get API keys</li>
            <li>✔ Make your first API call</li>
          </ul>
        </div>

        <div className="bg-black p-6 rounded-xl font-mono text-green-400 text-sm overflow-x-auto">
{`POST /v1/virtual-accounts

{
  "name": "John Doe",
  "email": "john@email.com"
}

→ Returns account instantly`}
        </div>

      </section>

      {/* CORE APIs */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Core APIs</h2>

        <div className="grid md:grid-cols-3 gap-6">

          {[
            "Payments API",
            "Virtual Accounts API",
            "Payout API",
            "Wallet API",
            "Webhook Events",
            "KYC & Verification"
          ].map((api) => (
            <motion.div
              whileHover={{ scale: 1.04 }}
              key={api}
              className="p-6 bg-[#111827] border border-[#1F2937] rounded-xl"
            >
              <h3 className="font-semibold text-lg">{api}</h3>
              <p className="text-white/50 text-sm mt-2">
                Fully documented and scalable.
              </p>
            </motion.div>
          ))}

        </div>
      </section>

      {/* SDKS */}
      <section className="bg-[#111827] py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">SDKs & Libraries</h2>

        <p className="text-white/50 mb-10">
          Integrate faster using official SDKs.
        </p>

        <div className="flex justify-center gap-6 text-sm text-white/60">
          <span>Node.js</span>
          <span>PHP</span>
          <span>Python</span>
          <span>Java</span>
        </div>
      </section>

      {/* WEBHOOKS */}
      <section className="px-6 py-20 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        <div className="bg-black p-6 rounded-xl font-mono text-blue-400 text-sm">
{`POST /webhook

{
  "event": "payment.success",
  "amount": 50000
}`}
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4">Real-time Webhooks</h2>
          <p className="text-white/50">
            Get instant notifications for payments, transfers, and events.
          </p>
        </div>

      </section>

      {/* FINAL CTA */}
      <section className="text-center py-24 px-6">
        <h2 className="text-4xl font-bold mb-6">
          Start building today
        </h2>

        <Link
          href="/register"
          className="px-8 py-4 bg-linear-to-r from-blue-500 to-indigo-500 rounded-xl text-lg font-semibold"
        >
          Create Free Account
        </Link>
      </section>

      <Footer />
    </main>
  );
}