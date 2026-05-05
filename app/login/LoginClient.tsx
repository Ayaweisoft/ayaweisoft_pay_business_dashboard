"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LucideLock,
  LucideLoader2,
  LucideAlertCircle,
  LucideEye,
  LucideEyeOff,
  LucideCheckCircle2,
} from "lucide-react";

export default function LoginClient() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // Demo credentials
  const DEMO_EMAIL = "demo@ayaweisoft.com";
  const DEMO_PASSWORD = "demopass";

  const applyDemo = () => {
    setForm({ email: DEMO_EMAIL, password: DEMO_PASSWORD });
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email.trim() || !form.password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

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
    <div className="auth-root">
      <div className="auth-card">
        {/* Header */}
        <div className="auth-head">
          <div className="auth-logo-ring">
            <LucideLock size={32} />
          </div>
          <h1 className="auth-title">Sign in to Ayaweisoft Pay</h1>
          <p className="auth-sub">Access your business dashboard</p>
        </div>

        {/* Demo Alert */}
        <div className="auth-demo">
          <p className="auth-demo-kicker">Demo Credentials</p>
          <code className="auth-demo-code">demo@ayaweisoft.com / demopass</code>
          <button type="button" className="auth-help-link mt-2" onClick={applyDemo}>
            Use demo login
          </button>
        </div>

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit}>
          {error && (
            <div className="auth-alert">
              <LucideAlertCircle size={14} />
              {error}
            </div>
          )}

          <div className="auth-field">
            <label className="auth-label">Email Address</label>
            <input
              type="email"
              placeholder="name@company.com"
              className="auth-input"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              required
            />
          </div>

          <div className="auth-field">
            <div className="auth-field-row">
              <label className="auth-label">Password</label>
              <Link href="/forgot-password" className="auth-help-link">Forgot?</Link>
            </div>
            <div className="auth-password-wrap">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="auth-input"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                required
              />
              <button
                type="button"
                className="auth-eye-btn"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? <LucideEyeOff size={15} /> : <LucideEye size={15} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="auth-submit flex items-center justify-center gap-2"
          >
            {loading ? <LucideLoader2 size={18} className="animate-spin" /> : "Secure Login"}
          </button>

          {!loading && !error && form.email === DEMO_EMAIL && form.password === DEMO_PASSWORD && (
            <div className="auth-success">
              <LucideCheckCircle2 size={14} />
              Demo credentials loaded. Press Secure Login to continue.
            </div>
          )}
        </form>

        <div className="auth-foot">
          <p>
            Don't have a business account?{" "}
            <Link href="/register">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}