"use client";

import { useState } from "react";
import Link from "next/link";
import { LucideKeyRound, LucideLoader2, LucideAlertCircle, LucideCheckCircle2 } from "lucide-react";

export default function ForgotPasswordClient() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Please enter your account email.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess("If this email is registered, a reset link has been sent.");
    }, 1000);
  };

  return (
    <div className="auth-root">
      <div className="auth-card">
        <div className="auth-head">
          <div className="auth-logo-ring">
            <LucideKeyRound size={30} />
          </div>
          <h1 className="auth-title">Forgot Password</h1>
          <p className="auth-sub">Enter your email to receive a password reset link.</p>
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
            <label className="auth-label">Account Email</label>
            <input
              type="email"
              className="auth-input"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-submit flex items-center justify-center gap-2" disabled={loading}>
            {loading ? <LucideLoader2 size={18} className="animate-spin" /> : "Send Reset Link"}
          </button>
        </form>

        <div className="auth-foot">
          <p>
            Remember your password? <Link href="/login">Back to login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
