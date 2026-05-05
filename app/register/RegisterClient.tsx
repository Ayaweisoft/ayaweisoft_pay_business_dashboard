"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LucideUserPlus,
  LucideLoader2,
  LucideAlertCircle,
  LucideCheckCircle2,
  LucideEye,
  LucideEyeOff,
} from "lucide-react";

export default function RegisterClient() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [accept, setAccept] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!accept) {
      setError("Please accept the terms to continue.");
      return;
    }

    setLoading(true);
    // Mocking an API call
    setTimeout(() => {
      setLoading(false);
      setError("");
      setSuccess("Registration submitted. Check your email to verify your account.");
      console.log("Registration successful for:", form.name);
    }, 1200);
  };

  return (
    <div className="auth-root">
      <div className="auth-card">
        <div className="auth-head">
          <div className="auth-logo-ring">
            <LucideUserPlus size={32} />
          </div>
          <h1 className="auth-title">Create business account</h1>
          <p className="auth-sub">Start using Ayaweisoft Pay today</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && (
            <div className="auth-alert">
              <LucideAlertCircle size={14} />
              {error}
            </div>
          )}

          {success && (
            <div className="auth-success">
              <LucideCheckCircle2 size={14} />
              {success}
            </div>
          )}

          <div className="auth-field">
            <label className="auth-label">Business Name</label>
            <input
              type="text"
              placeholder="e.g. POS Plus Hub"
              className="auth-input"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              required
            />
          </div>

          <div className="auth-field">
            <label className="auth-label">Work Email</label>
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
            <label className="auth-label">Password</label>
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
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <LucideEyeOff size={15} /> : <LucideEye size={15} />}
              </button>
            </div>
          </div>

          <div className="auth-field">
            <label className="auth-label">Confirm Password</label>
            <div className="auth-password-wrap">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                className="auth-input"
                value={form.confirmPassword}
                onChange={e => setForm(f => ({ ...f, confirmPassword: e.target.value }))}
                required
              />
              <button
                type="button"
                className="auth-eye-btn"
                onClick={() => setShowConfirmPassword((v) => !v)}
                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
              >
                {showConfirmPassword ? <LucideEyeOff size={15} /> : <LucideEye size={15} />}
              </button>
            </div>
          </div>

          <label className="auth-check">
            <input
              type="checkbox"
              checked={accept}
              onChange={(e) => setAccept(e.target.checked)}
            />
            <span>I agree to the terms and confirm this is a business account registration.</span>
          </label>

          <button 
            type="submit" 
            disabled={loading}
            className="auth-submit flex items-center justify-center gap-2"
          >
            {loading ? <LucideLoader2 size={18} className="animate-spin" /> : "Register Business"}
          </button>
        </form>

        <div className="auth-foot">
          <p>
            Already have an account?{" "}
            <Link href="/login">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}