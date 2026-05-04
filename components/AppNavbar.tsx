// components/Navbar.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex justify-between items-center px-4 md:px-12 py-4 border-b border-white/5 bg-[#0B1220]/80 backdrop-blur-xl sticky top-0 z-50"
    >
      <Link href="/" className="flex items-center gap-3 group">
        <span className="rounded-xl border-2 border-white/10 bg-white/5 p-1 flex items-center justify-center transition group-hover:border-primary" style={{width: 40, height: 40}}>
          <Image
            src="/asp_logo.png"
            alt="Ayaweisoft Pay Logo"
            width={32}
            height={32}
            className="object-contain"
            priority
          />
        </span>
        <span className="text-white font-bold text-lg tracking-tight">Ayaweisoft Pay</span>
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-6 text-sm text-white/60">
        <Link href="/developers">Developers</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/company">Company</Link>
      </nav>

      {/* Desktop Actions */}
      <div className="hidden md:flex gap-3 items-center">
        <Link
          href="/login"
          className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white/80 hover:text-white hover:bg-primary/80 hover:border-primary transition font-semibold shadow-sm"
        >
          Sign in
        </Link>
        <Link
          href="/register"
          className="px-4 py-2 rounded-lg bg-linear-to-r from-blue-500 to-indigo-500 text-white font-semibold shadow-md hover:opacity-90 transition"
        >
          Get Started
        </Link>
      </div>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden flex items-center justify-center p-2 rounded-lg border border-white/10 bg-white/5 text-white/80 hover:text-white hover:bg-primary/80 hover:border-primary transition"
        onClick={() => setMobileOpen((v) => !v)}
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
      >
        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-[#0B1220]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden animate-fade-in">
          <button
            className="absolute top-6 right-6 p-2 rounded-lg border border-white/10 bg-white/5 text-white/80 hover:text-white hover:bg-primary/80 hover:border-primary transition"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
          <nav className="flex flex-col gap-6 text-lg text-white/80">
            <Link href="/developers" onClick={() => setMobileOpen(false)}>
              Developers
            </Link>
            <Link href="/pricing" onClick={() => setMobileOpen(false)}>
              Pricing
            </Link>
            <Link href="/company" onClick={() => setMobileOpen(false)}>
              Company
            </Link>
          </nav>
          <div className="flex flex-col gap-4 w-full px-8">
            <Link
              href="/login"
              className="w-full text-center px-4 py-3 rounded-lg border border-white/10 bg-white/10 text-white/90 hover:text-white hover:bg-primary/80 hover:border-primary transition font-semibold shadow-sm"
              onClick={() => setMobileOpen(false)}
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="w-full text-center px-4 py-3 rounded-lg bg-linear-to-r from-blue-500 to-indigo-500 text-white font-semibold shadow-md hover:opacity-90 transition"
              onClick={() => setMobileOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </motion.header>
  );
}