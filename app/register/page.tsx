"use client";
"use client";
import { useState } from "react";
import Link from "next/link";
import { LucideUserPlus } from "lucide-react";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setError(""); // No error, mock success
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="glass-card p-8 w-full max-w-md flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <span className="p-3 rounded-lg bg-primary/10 text-primary"><LucideUserPlus size={28} /></span>
          <h1 className="text-2xl font-bold text-white">Create your business account</h1>
          <p className="text-white/60 text-sm">Start using Ayaweisoft Pay</p>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Business Name"
            className="bg-bg-card border border-border rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="bg-bg-card border border-border rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-bg-card border border-border rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary"
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            required
          />
          {error && <div className="text-error text-xs font-medium">{error}</div>}
          <button type="submit" className="mt-2 px-4 py-2 rounded-lg bg-primary text-white font-semibold hover:opacity-90 transition w-full" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <div className="text-center text-white/70 text-sm">
          Already have an account? <Link href="/login" className="text-primary font-semibold hover:underline">Sign In</Link>
        </div>
      </div>
    </div>
  );
}
