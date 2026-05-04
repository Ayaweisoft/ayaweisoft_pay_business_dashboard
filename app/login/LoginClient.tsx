"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LucideLock, LucideLoader2, LucideAlertCircle } from "lucide-react";

export default function LoginClient() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Demo credentials
  const DEMO_EMAIL = "demo@ayaweisoft.com";
  const DEMO_PASSWORD = "demopass";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      if (form.email === DEMO_EMAIL && form.password === DEMO_PASSWORD) {
        router.push("/dashboard");
      } else {
        setError("Invalid credentials. Please use the demo account.");
      }
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg p-4">
      <div className="glass-card p-8 w-full max-w-md flex flex-col gap-8 border border-border">
        {/* Header */}
        <div className="flex flex-col items-center gap-3">
          <div className="p-3 rounded-xl bg-primary/10 text-primary">
            <LucideLock size={32} />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white tracking-tight">Sign in to Ayaweisoft Pay</h1>
            <p className="text-white/60 text-sm mt-1">Access your business dashboard</p>
          </div>
        </div>

        {/* Demo Alert */}
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-center">
          <p className="text-xs text-white/40 mb-1 font-medium uppercase tracking-widest">Demo Credentials</p>
          <code className="text-primary font-bold text-sm">demo@ayaweisoft.com / demopass</code>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {error && (
            <div className="p-3 rounded-lg bg-error/10 border border-error/20 flex items-center gap-2 text-error text-xs font-bold animate-shake">
              <LucideAlertCircle size={14} />
              {error}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest ml-1">Email Address</label>
            <input
              type="email"
              placeholder="name@company.com"
              className="w-full bg-bg-card border border-border rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center px-1">
              <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Password</label>
              <Link href="#" className="text-[10px] font-bold text-primary hover:underline uppercase tracking-widest">Forgot?</Link>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-bg-card border border-border rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="mt-2 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary text-white font-bold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg shadow-primary/20 active:scale-[0.98]"
          >
            {loading ? <LucideLoader2 size={18} className="animate-spin" /> : "Secure Login"}
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-sm text-white/40">
            Don't have a business account?{" "}
            <Link href="/register" className="text-primary font-bold hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}