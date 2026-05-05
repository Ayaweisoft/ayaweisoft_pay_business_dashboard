"use client";

import AppNavbar from "@/components/AppNavbar";
import AppFooter from "@/components/AppFooter";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    type: "general",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    setLoading(true);

    // simulate API call
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1200);
  };

  return (
    <main className="mk-root">
      <AppNavbar />

      {/* HERO */}
      <section className="mk-hero mk-shell" style={{ maxWidth: 980 }}>
        <h1 className="mk-title-xl">
          Let’s build something powerful together
        </h1>

        <p className="mk-sub mk-sub--center">
          Reach out to Ayaweisoft for API integration, enterprise partnerships,
          fintech infrastructure, or technical support.
        </p>

        <div className="mk-inline-note">
          Response time: <span className="text-green-400">24–48 hours</span>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="mk-section mk-section--compact">
        <div className="mk-shell mk-grid-2" style={{ gap: 18 }}>

        {/* LEFT INFO */}
        <div className="space-y-6">

          <div className="mk-card">
            <h3 className="mk-card-title">Sales & Partnerships</h3>
            <p className="mk-card-copy">
              Enterprise onboarding, banking integrations, and fintech partnerships.
            </p>
            <p className="text-blue-400 text-sm mt-3">
              sales@ayaweisoft.com
            </p>
          </div>

          <div className="mk-card">
            <h3 className="mk-card-title">Developer Support</h3>
            <p className="mk-card-copy">
              API issues, integration help, and technical documentation support.
            </p>
            <p className="text-blue-400 text-sm mt-3">
              dev@ayaweisoft.com
            </p>
          </div>

          <div className="mk-card">
            <h3 className="mk-card-title">Security & Compliance</h3>
            <p className="mk-card-copy">
              Report vulnerabilities or request compliance documentation.
            </p>
            <p className="text-blue-400 text-sm mt-3">
              security@ayaweisoft.com
            </p>
          </div>

        </div>

        {/* FORM */}
        <div className="mk-card">

          <h2 className="text-xl font-semibold mb-4">Send us a message</h2>

          {sent ? (
            <div className="text-green-400 text-sm">
              ✅ Message sent successfully. Our team will respond shortly.
            </div>
          ) : (
            <div className="space-y-4">

              <input
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
                className="mk-input"
              />

              <input
                name="email"
                placeholder="Email Address"
                onChange={handleChange}
                className="mk-input"
              />

              <input
                name="company"
                placeholder="Company (optional)"
                onChange={handleChange}
                className="mk-input"
              />

              <select
                name="type"
                onChange={handleChange}
                className="mk-select"
              >
                <option value="general">General Inquiry</option>
                <option value="sales">Sales / Enterprise</option>
                <option value="support">Technical Support</option>
                <option value="partnership">Partnership</option>
                <option value="security">Security Report</option>
              </select>

              <textarea
                name="message"
                placeholder="Your message..."
                onChange={handleChange}
                rows={5}
                className="mk-textarea"
              />

              <button
                onClick={submit}
                disabled={loading}
                className="mk-btn mk-btn--primary w-full"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

              <p className="text-xs text-white/40 text-center">
                Your data is encrypted and securely handled.
              </p>

            </div>
          )}

        </div>
        </div>

      </section>

      {/* FOOTER CTA */}
      <section className="mk-section mk-section--muted text-center">
        <div className="mk-shell">
        <h2 className="mk-title-lg">
          Need faster integration?
        </h2>

        <p className="mk-sub mk-sub--center">
          Talk directly to our engineering team for API onboarding.
        </p>

        <div className="mk-actions">
          <Link
            href="/developers"
            className="mk-btn mk-btn--primary"
          >
            View Docs
          </Link>

          <Link
            href="/register"
            className="mk-btn mk-btn--ghost"
          >
            Get API Key
          </Link>
        </div>
        </div>
      </section>

      <AppFooter />


    </main>
  );
}