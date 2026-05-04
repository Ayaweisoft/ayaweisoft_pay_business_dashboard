// components/Navbar.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex justify-between items-center px-6 md:px-12 py-5 border-b border-white/5 bg-[#0B1220]/80 backdrop-blur-xl sticky top-0 z-50"
    >
      <Link href="/" className="text-white font-bold text-lg">
        Ayaweisoft Pay
      </Link>

      <nav className="hidden md:flex gap-6 text-sm text-white/60">
        <Link href="/developers">Developers</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/company">Company</Link>
      </nav>

      <div className="flex gap-3">
        <Link href="/login" className="text-white/60 hover:text-white">
          Sign in
        </Link>
        <Link
          href="/register"
          className="px-4 py-2 rounded-lg bg-linear-to-r from-blue-500 to-indigo-500 text-white"
        >
          Get Started
        </Link>
      </div>
    </motion.header>
  );
}