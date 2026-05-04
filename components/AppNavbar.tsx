// components/Navbar.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex justify-between items-center px-6 md:px-12 py-5 border-b border-white/5 bg-[#0B1220]/80 backdrop-blur-xl sticky top-0 z-50"
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