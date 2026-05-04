
"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LucideLock } from "lucide-react";

export default function LoginPage() {
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
    setTimeout(() => {
      if (form.email === DEMO_EMAIL && form.password === DEMO_PASSWORD) {
        router.push("/dashboard");
      } else {
        setError("Invalid credentials. Try demo@ayaweisoft.com / demopass");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="glass-card p-8 w-full max-w-md flex flex-col gap-7">
        <div className="flex flex-col items-center gap-2">
          <span className="p-3 rounded-lg bg-primary/10 text-primary"><LucideLock size={28} /></span>
          <h1 className="text-2xl font-bold text-white">Sign in to Ayaweisoft Pay</h1>
          <p className="text-white/60 text-sm text-center max-w-xs">
            Access your business dashboard. <br />
            <span className="text-primary font-semibold">Demo: demo@ayaweisoft.com / demopass</span>
          </p>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="bg-bg-card border border-border rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            required
            autoComplete="username"
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-bg-card border border-border rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary"
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            required
            autoComplete="current-password"
          />
          {error && <div className="text-error text-xs font-medium">{error}</div>}
          <button type="submit" className="mt-2 px-4 py-2 rounded-lg bg-primary text-white font-semibold hover:opacity-90 transition w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <div className="text-center text-white/70 text-sm">
          Don&apos;t have an account? <Link href="/register" className="text-primary font-semibold hover:underline">Register</Link>
        </div>
      </div>
    </div>
  );
}
