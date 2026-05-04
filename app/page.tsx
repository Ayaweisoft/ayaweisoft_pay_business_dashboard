"use client";

import Link from "next/link";
import Image from "next/image";
import {
  LucideArrowRight,
  LucideShield,
  LucideZap,
  LucideGlobe,
  LucideBarChart2,
  LucideSend,
  LucideCreditCard,
} from "lucide-react";

// ─── Feature pill data ────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: LucideSend,
    label: "Instant Payouts",
    desc: "Settle to any bank in seconds, not days.",
    accent: "blue",
  },
  {
    icon: LucideCreditCard,
    label: "Virtual Accounts",
    desc: "Issue dedicated NGN / USD accounts programmatically.",
    accent: "green",
  },
  {
    icon: LucideBarChart2,
    label: "Live Analytics",
    desc: "Real-time transaction dashboards with drill-down.",
    accent: "orange",
  },
  {
    icon: LucideShield,
    label: "Bank-grade Security",
    desc: "PCI-DSS compliant. AES-256 at rest and in transit.",
    accent: "blue",
  },
  {
    icon: LucideZap,
    label: "Webhook Events",
    desc: "Instant event delivery with retry and replay.",
    accent: "green",
  },
  {
    icon: LucideGlobe,
    label: "Multi-currency",
    desc: "Accept and send across 30+ African currencies.",
    accent: "orange",
  },
] as const;

// ─── Stat strip data ─────────────────────────────────────────────────────────
const STATS = [
  { value: "₦2.4B+", label: "Processed daily" },
  { value: "99.98%", label: "Uptime SLA" },
  { value: "<200ms", label: "API latency" },
  { value: "150+", label: "Enterprise clients" },
];

// ─── Accent class map ─────────────────────────────────────────────────────────
const accentMap = {
  blue:   "text-primary bg-primary/10 border-primary/20",
  green:  "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  orange: "text-amber-400 bg-amber-400/10 border-amber-400/20",
} as const;

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col overflow-hidden bg-bg">

      {/* ── Geometric background grid ──────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        {/* Radial glow — upper left */}
        <div className="absolute -top-40 -left-40 w-175 h-175 rounded-full bg-primary/5 blur-[120px]" />
        {/* Radial glow — lower right */}
        <div className="absolute -bottom-60 -right-40 w-150 h-150 rounded-full bg-emerald-500/5 blur-[100px]" />
        {/* Subtle dot-grid texture */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.035]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="dot" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dot)" />
        </svg>
        {/* Thin horizontal rule accent */}
        <div className="absolute top-130 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      {/* ── Nav ────────────────────────────────────────────────────────────── */}
      <header className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-xl bg-white/5 ring-1 ring-white/10">
            <Image src="/asp_logo.png" alt="Ayaweisoft Pay" width={30} height={30} priority />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-white/40">Ayaweisoft</span>
            <span className="text-[15px] font-semibold text-white tracking-tight">Pay</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1" aria-label="Top navigation">
          {["Product", "Developers", "Pricing", "Company"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="px-4 py-2 text-sm text-white/60 hover:text-white rounded-lg hover:bg-white/5 transition-colors duration-150"
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden sm:block px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors duration-150"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-white hover:bg-primary/90 active:scale-95 transition-all duration-150 shadow-lg shadow-primary/20"
          >
            Get started <LucideArrowRight size={14} strokeWidth={2.5} />
          </Link>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-20 pb-16 md:pt-28 md:pb-24">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 ring-1 ring-primary/20 text-primary text-xs font-semibold tracking-wide mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Now live in 14 African markets
        </div>

        {/* Headline */}
        <h1 className="font-serif text-5xl md:text-7xl lg:text-[80px] leading-[1.05] tracking-tight text-white max-w-3xl mb-6">
          Banking infrastructure{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-emerald-400 to-amber-400">
            for modern fintech
          </span>
        </h1>

        {/* Sub */}
        <p className="text-white/50 text-lg md:text-xl max-w-xl leading-relaxed mb-10">
          One API for payments, virtual accounts, payouts, and compliance.
          Ship your financial product in weeks, not years.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-16">
          <Link
            href="/register"
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-primary text-white font-semibold text-base hover:bg-primary/90 active:scale-95 transition-all duration-150 shadow-xl shadow-primary/25"
          >
            Start building free
            <LucideArrowRight size={16} strokeWidth={2.5} />
          </Link>
          <Link
            href="/login"
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-white/5 ring-1 ring-white/10 text-white/80 font-semibold text-base hover:bg-white/10 hover:text-white active:scale-95 transition-all duration-150"
          >
            Sign in to dashboard
          </Link>
        </div>

        {/* Stat strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden ring-1 ring-white/5 w-full max-w-2xl">
          {STATS.map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center py-5 px-4 bg-bg-card">
              <span className="font-semibold text-xl md:text-2xl text-white tracking-tight">{value}</span>
              <span className="text-xs text-white/40 mt-1 font-medium">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Feature grid ──────────────────────────────────────────────────── */}
      <section className="relative z-10 px-6 md:px-12 pb-20 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map(({ icon: Icon, label, desc, accent }) => (
            <div
              key={label}
              className="group flex flex-col gap-3 p-5 rounded-2xl bg-bg-card ring-1 ring-white/5 hover:ring-white/10 hover:-translate-y-0.5 transition-all duration-200 cursor-default"
            >
              <span className={`self-start p-2.5 rounded-xl border text-sm ${accentMap[accent]}`}>
                <Icon size={18} strokeWidth={1.8} />
              </span>
              <div>
                <p className="font-semibold text-white text-sm mb-1">{label}</p>
                <p className="text-white/45 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA strip ──────────────────────────────────────────────── */}
      <section className="relative z-10 px-6 py-12 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-white/30 text-sm font-medium tracking-wide uppercase mb-2">
            Pay · Transfer · Grow
          </p>
          <p className="text-white/50 text-sm">
            Regulated by the Central Bank of Nigeria.{" "}
            <Link href="/security" className="text-primary hover:underline">
              View compliance docs →
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}