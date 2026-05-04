"use client";

import AppNavbar from "@/components/AppNavbar";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CompanyPage() {
  return (
    <main className="bg-[#0B1220] text-white min-h-screen">

      <AppNavbar />

      {/* HERO */}
      <section className="text-center py-24 px-6 max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-bold"
        >
          Building the financial infrastructure powering modern Africa
        </motion.h1>

        <p className="text-white/60 mt-6 text-lg max-w-2xl mx-auto">
          Ayaweisoft is a fintech infrastructure company enabling businesses to
          move money, create financial products, and scale with secure APIs,
          banking partnerships, and intelligent automation systems.
        </p>

        <div className="mt-10 flex justify-center gap-4 flex-wrap">
          <Link
            href="/developers"
            className="px-6 py-3 bg-blue-600 rounded-xl font-semibold"
          >
            Explore APIs
          </Link>

          <Link
            href="/contact"
            className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl"
          >
            Talk to Us
          </Link>
        </div>
      </section>

      {/* MISSION / VISION */}
      <section className="grid md:grid-cols-3 gap-6 px-6 max-w-6xl mx-auto py-16">

        <div className="p-6 bg-[#111827] border border-white/10 rounded-xl">
          <h3 className="text-lg font-semibold mb-2">Our Mission</h3>
          <p className="text-white/60 text-sm">
            To simplify financial infrastructure for African businesses by
            providing secure, scalable, and developer-friendly APIs.
          </p>
        </div>

        <div className="p-6 bg-[#111827] border border-white/10 rounded-xl">
          <h3 className="text-lg font-semibold mb-2">Our Vision</h3>
          <p className="text-white/60 text-sm">
            To become the backbone of digital financial systems across Africa,
            powering payments, banking, and embedded finance.
          </p>
        </div>

        <div className="p-6 bg-[#111827] border border-white/10 rounded-xl">
          <h3 className="text-lg font-semibold mb-2">Our Approach</h3>
          <p className="text-white/60 text-sm">
            API-first, security-driven, and built for scale from startups to
            enterprise financial systems.
          </p>
        </div>

      </section>

      {/* STORY / TIMELINE */}
      <section className="px-6 max-w-5xl mx-auto py-20">

        <h2 className="text-3xl font-bold mb-10 text-center">Our Journey</h2>

        <div className="space-y-8">

          {[
            {
              year: "2020",
              title: "Foundation",
              desc: "Ayaweisoft was founded as a software engineering company building fintech solutions for local businesses."
            },
            {
              year: "2022",
              title: "Fintech Expansion",
              desc: "We began building payment systems, POS infrastructure, and digital financial tools for enterprises."
            },
            {
              year: "2024",
              title: "API Infrastructure Launch",
              desc: "We launched Ayaweisoft Pay — a unified API for payments, virtual accounts, and payouts."
            },
            {
              year: "2026",
              title: "Scaling Across Africa",
              desc: "Expanding into enterprise banking infrastructure and cross-border payment systems."
            }
          ].map((item, i) => (
            <div
              key={i}
              className="flex gap-6 p-6 bg-[#111827] border border-white/10 rounded-xl"
            >
              <div className="text-blue-400 font-bold w-20">
                {item.year}
              </div>

              <div>
                <h4 className="font-semibold">{item.title}</h4>
                <p className="text-white/60 text-sm mt-1">{item.desc}</p>
              </div>
            </div>
          ))}

        </div>

      </section>

      {/* WHAT WE BUILD */}
      <section className="px-6 max-w-6xl mx-auto py-20">

        <h2 className="text-3xl font-bold mb-10 text-center">
          What We Build
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {[
            "Payment Infrastructure APIs",
            "Virtual Account Systems",
            "Payout & Settlement Engines",
            "POS & Agency Banking Systems",
            "Fintech SaaS Platforms",
            "Enterprise Financial Tools"
          ].map((item) => (
            <div
              key={item}
              className="p-6 bg-[#111827] border border-white/10 rounded-xl"
            >
              <p className="font-semibold">{item}</p>
            </div>
          ))}

        </div>

      </section>

      {/* TRUST / COMPLIANCE */}
      <section className="bg-[#0F172A] py-20 px-6 text-center">

        <h2 className="text-3xl font-bold mb-6">Security & Trust</h2>

        <p className="text-white/60 max-w-2xl mx-auto">
          We operate with enterprise-grade security standards, encrypted
          transactions, fraud detection systems, and regulated banking partners
          to ensure reliability at scale.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-white/60">
          <span>🔐 End-to-end encryption</span>
          <span>🛡 Fraud monitoring</span>
          <span>⚡ 99.9% uptime</span>
          <span>🏦 Licensed partners</span>
        </div>

      </section>

      {/* LEADERSHIP */}
      <section className="px-6 max-w-5xl mx-auto py-20 text-center">

        <h2 className="text-3xl font-bold mb-6">Leadership</h2>

        <p className="text-white/60 max-w-2xl mx-auto">
          Ayaweisoft is led by engineers and fintech architects building
          infrastructure for real-world financial systems across Africa.
        </p>
      </section>

      {/* CTA */}
      <section className="text-center py-24 px-6">

        <h2 className="text-4xl font-bold">
          Let’s build the future of finance together
        </h2>

        <p className="text-white/60 mt-4">
          Whether you're a startup, bank, or enterprise — we can power your system.
        </p>

        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <Link
            href="/developers"
            className="px-6 py-3 bg-blue-600 rounded-xl"
          >
            Start Building
          </Link>

          <Link
            href="/contact"
            className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl"
          >
            Contact Sales
          </Link>
        </div>

      </section>



    </main>
  );
}