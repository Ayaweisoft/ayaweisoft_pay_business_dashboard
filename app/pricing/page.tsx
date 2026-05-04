"use client";

import AppNavbar from "@/components/AppNavbar";

import { motion } from "framer-motion";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    desc: "For early-stage startups testing and building",
    price: "Pay as you go",
    features: [
      "Virtual Accounts",
      "Wallet API",
      "Basic dashboard",
      "Email support",
    ],
  },
  {
    name: "Growth",
    desc: "For scaling fintechs and businesses",
    price: "Custom pricing",
    highlight: true,
    features: [
      "Everything in Starter",
      "Payout API (NIP transfers)",
      "Webhook events",
      "Priority support",
      "Advanced analytics",
    ],
  },
  {
    name: "Enterprise",
    desc: "For high-volume and regulated businesses",
    price: "Contact us",
    features: [
      "Dedicated infrastructure",
      "Custom settlement",
      "Multi-user access",
      "SLA guarantees",
      "Dedicated account manager",
    ],
  },
];

const fees = [
  {
    title: "Collections (Virtual Accounts)",
    value: "₦10 – ₦25 per transaction",
  },
  {
    title: "Payouts (Bank Transfers)",
    value: "₦10 per transfer",
  },
  {
    title: "Airtime & Bills",
    value: "2.5% – 3%",
  },
  {
    title: "Account Setup",
    value: "Free",
  },
];

export default function PricingPage() {
  return (
    <main className="bg-[#0B1220] text-white min-h-screen">

      <AppNavbar />

      {/* HERO */}
      <section className="text-center py-24 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-bold"
        >
          Simple, scalable pricing
        </motion.h1>

        <p className="text-white/50 mt-6 max-w-xl mx-auto">
          Transparent pricing designed for African fintechs and digital businesses.
        </p>
      </section>

      {/* PLANS */}
      <section className="px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-6 pb-20">
        {plans.map((plan) => (
          <motion.div
            key={plan.name}
            whileHover={{ scale: 1.03 }}
            className={`p-6 rounded-xl border ${
              plan.highlight
                ? "border-blue-500 bg-[#111827]"
                : "border-[#1F2937] bg-[#111827]"
            }`}
          >
            <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
            <p className="text-white/50 text-sm mb-4">{plan.desc}</p>

            <p className="text-2xl font-bold mb-6">{plan.price}</p>

            <ul className="space-y-2 text-sm text-white/60 mb-6">
              {plan.features.map((f) => (
                <li key={f}>✔ {f}</li>
              ))}
            </ul>

            <Link
              href="/register"
              className={`block text-center px-8 py-4 rounded-xl text-lg font-semibold ${
                plan.highlight
                  ? "bg-linear-to-r from-blue-500 to-indigo-500"
                  : "bg-white/5"
              }`}
            >
              Get Started
            </Link>
          </motion.div>
        ))}
      </section>

      {/* FEES BREAKDOWN */}
      <section className="bg-[#111827] py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">
            Transaction Fees
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {fees.map((fee) => (
              <div
                key={fee.title}
                className="p-6 rounded-xl border border-[#1F2937]"
              >
                <h4 className="text-white font-semibold mb-2">
                  {fee.title}
                </h4>
                <p className="text-white/50 text-sm">{fee.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENTERPRISE CTA */}
      <section className="text-center py-24 px-6">
        <h2 className="text-4xl font-bold mb-6">
          Need custom pricing?
        </h2>

        <p className="text-white/50 mb-8">
          We support high-volume businesses with tailored pricing and infrastructure.
        </p>

        <Link
          href="/contact"
          className="px-8 py-4 bg-linear-to-r from-blue-500 to-indigo-500 rounded-xl text-lg font-semibold"
        >
          Contact Sales
        </Link>
      </section>

      {/* TRUST */}
      <section className="px-6 py-16 border-t border-white/5 text-center text-sm text-white/50">
        Ayaweisoft Pay is a financial technology platform.  
        Banking services are provided by Mbawula Microfinance Bank, licensed by the Central Bank of Nigeria.
      </section>


    </main>
  );
}