// app/page.tsx
"use client";

import Navbar from "@/components/AppNavbar";
import Footer from "@/components/AppFooter";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-[#0B1220] text-white">

      <Navbar />

      {/* HERO */}
      <section className="text-center py-28 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold"
        >
          Banking infrastructure for{" "}
          <span className="bg-gradient-to-r from-blue-500 to-emerald-400 bg-clip-text text-transparent">
            modern fintech
          </span>
        </motion.h1>

        <p className="text-white/50 mt-6 max-w-xl mx-auto">
          APIs for payments, virtual accounts, payouts, and compliance.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link
            href="/register"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500"
          >
            Start Building
          </Link>
          <Link href="/developers" className="px-6 py-3 bg-white/5 rounded-xl">
            View Docs
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="grid md:grid-cols-3 gap-6 px-6 max-w-6xl mx-auto py-20">
        {["Payments", "Virtual Accounts", "Payouts"].map((f) => (
          <motion.div
            whileHover={{ scale: 1.03 }}
            key={f}
            className="p-6 bg-[#111827] rounded-xl border border-[#1F2937]"
          >
            <h3 className="font-semibold text-lg">{f}</h3>
            <p className="text-white/50 text-sm mt-2">
              Scalable financial infrastructure for your business.
            </p>
          </motion.div>
        ))}
      </section>

      {/* HOW IT WORKS */}
      <section className="text-center py-24 px-6">
        <h2 className="text-3xl font-bold mb-10">How it works</h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
          <div className="p-5 bg-[#111827] rounded-xl">
            <h4>Ayaweisoft</h4>
            <p className="text-white/50 text-sm">
              Provides APIs and dashboards
            </p>
          </div>

          <div className="p-5 bg-[#111827] rounded-xl">
            <h4>Mbawula MFB</h4>
            <p className="text-white/50 text-sm">
              Licensed banking partner
            </p>
          </div>

          <div className="p-5 bg-[#111827] rounded-xl">
            <h4>Your Product</h4>
            <p className="text-white/50 text-sm">
              Build fintech solutions
            </p>
          </div>
        </div>
      </section>
        <Footer />
    </main>
  );
}