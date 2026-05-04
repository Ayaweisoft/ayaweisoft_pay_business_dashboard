"use client";

import AppNavbar from "@/components/AppNavbar";

import { useState } from "react";

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

  const handleChange = (e: any) => {
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
    <main className="bg-[#0B1220] text-white min-h-screen">
      <AppNavbar />

      {/* HERO */}
      <section className="text-center py-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold">
          Let’s build something powerful together
        </h1>

        <p className="text-white/60 mt-5 text-lg">
          Reach out to Ayaweisoft for API integration, enterprise partnerships,
          fintech infrastructure, or technical support.
        </p>

        <div className="mt-6 text-sm text-white/40">
          Response time: <span className="text-green-400">24–48 hours</span>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="grid md:grid-cols-2 gap-10 px-6 max-w-6xl mx-auto pb-24">

        {/* LEFT INFO */}
        <div className="space-y-6">

          <div className="p-6 bg-[#111827] border border-white/10 rounded-xl">
            <h3 className="font-semibold">Sales & Partnerships</h3>
            <p className="text-white/60 text-sm mt-2">
              Enterprise onboarding, banking integrations, and fintech partnerships.
            </p>
            <p className="text-blue-400 text-sm mt-3">
              sales@ayaweisoft.com
            </p>
          </div>

          <div className="p-6 bg-[#111827] border border-white/10 rounded-xl">
            <h3 className="font-semibold">Developer Support</h3>
            <p className="text-white/60 text-sm mt-2">
              API issues, integration help, and technical documentation support.
            </p>
            <p className="text-blue-400 text-sm mt-3">
              dev@ayaweisoft.com
            </p>
          </div>

          <div className="p-6 bg-[#111827] border border-white/10 rounded-xl">
            <h3 className="font-semibold">Security & Compliance</h3>
            <p className="text-white/60 text-sm mt-2">
              Report vulnerabilities or request compliance documentation.
            </p>
            <p className="text-blue-400 text-sm mt-3">
              security@ayaweisoft.com
            </p>
          </div>

        </div>

        {/* FORM */}
        <div className="bg-[#111827] border border-white/10 rounded-xl p-6">

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
                className="w-full bg-black p-3 rounded text-sm"
              />

              <input
                name="email"
                placeholder="Email Address"
                onChange={handleChange}
                className="w-full bg-black p-3 rounded text-sm"
              />

              <input
                name="company"
                placeholder="Company (optional)"
                onChange={handleChange}
                className="w-full bg-black p-3 rounded text-sm"
              />

              <select
                name="type"
                onChange={handleChange}
                className="w-full bg-black p-3 rounded text-sm"
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
                className="w-full bg-black p-3 rounded text-sm"
              />

              <button
                onClick={submit}
                disabled={loading}
                className="w-full py-3 bg-linear-to-r from-blue-500 to-indigo-500 rounded font-semibold"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

              <p className="text-xs text-white/40 text-center">
                Your data is encrypted and securely handled.
              </p>

            </div>
          )}

        </div>

      </section>

      {/* FOOTER CTA */}
      <section className="text-center py-20 px-6 bg-[#0F172A]">
        <h2 className="text-3xl font-bold">
          Need faster integration?
        </h2>

        <p className="text-white/60 mt-3">
          Talk directly to our engineering team for API onboarding.
        </p>

        <div className="mt-6 flex justify-center gap-4 flex-wrap">
          <a
            href="/developers"
            className="px-6 py-3 bg-blue-600 rounded-xl"
          >
            View Docs
          </a>

          <a
            href="/register"
            className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl"
          >
            Get API Key
          </a>
        </div>
      </section>


    </main>
  );
}