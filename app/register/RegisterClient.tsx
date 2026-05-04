"use client";

import { useState } from "react";
import Link from "next/link";
import { LucideUserPlus, LucideLoader2 } from "lucide-react";

export default function RegisterClient() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mocking an API call
    setTimeout(() => {
      setLoading(false);
      setError(""); 
      console.log("Registration successful for:", form.name);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg p-4">
      <div className="glass-card p-8 w-full max-w-md flex flex-col gap-6 border border-border">
        <div className="flex flex-col items-center gap-3">
          <div className="p-3 rounded-xl bg-primary/10 text-primary">
            <LucideUserPlus size={32} />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white tracking-tight">Create business account</h1>
            <p className="text-white/60 text-sm mt-1">Start using Ayaweisoft Pay today</p>
          </div>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="text-xs font-medium text-white/40 ml-1">Business Name</label>
            <input
              type="text"
              placeholder="e.g. POS Plus Hub"
              className="w-full bg-bg-card border border-border rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-white/40 ml-1">Work Email</label>
            <input
              type="email"
              placeholder="name@company.com"
              className="w-full bg-bg-card border border-border rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-white/40 ml-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-bg-card border border-border rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="mt-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white font-bold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg shadow-primary/20"
          >
            {loading ? <LucideLoader2 size={18} className="animate-spin" /> : "Register Business"}
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm text-white/40">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-semibold hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}