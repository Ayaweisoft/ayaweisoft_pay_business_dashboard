import AppNavbar from "@/components/AppNavbar";
import AppFooter from "@/components/AppFooter";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    desc: "For early-stage startups testing and building",
    price: "Pay as you go",
    features: [
      "Virtual Accounts",
      "Wallet API",
      "Basic dashboard",
      "Email support",
    ],
  },
  {
    name: "Growth",
    desc: "For scaling fintechs and businesses",
    price: "Custom pricing",
    highlight: true,
    features: [
      "Everything in Starter",
      "Payout API (NIP transfers)",
      "Webhook events",
      "Priority support",
      "Advanced analytics",
    ],
  },
  {
    name: "Enterprise",
    desc: "For high-volume and regulated businesses",
    price: "Contact us",
    features: [
      "Dedicated infrastructure",
      "Custom settlement",
      "Multi-user access",
      "SLA guarantees",
      "Dedicated account manager",
    ],
  },
];

const fees = [
  {
    title: "Collections (Virtual Accounts)",
    value: "₦10 – ₦25 per transaction",
  },
  {
    title: "Payouts (Bank Transfers)",
    value: "₦10 per transfer",
  },
  {
    title: "Airtime & Bills",
    value: "2.5% – 3%",
  },
  {
    title: "Account Setup",
    value: "Free",
  },
];

export default function PricingPage() {
  return (
    <main className="mk-root">

      <AppNavbar />

      {/* HERO */}
      <section className="mk-hero mk-shell">
        <h1 className="mk-title-xl">
          Simple, scalable pricing
        </h1>

        <p className="mk-sub mk-sub--center">
          Transparent pricing designed for African fintechs and digital businesses.
        </p>
      </section>

      {/* PLANS */}
      <section className="mk-section mk-section--compact">
        <div className="mk-shell mk-grid-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`p-6 rounded-xl border ${
              plan.highlight
                ? "mk-card border-blue-500"
                : "mk-card"
            }`}
          >
            <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
            <p className="mk-card-copy mb-4">{plan.desc}</p>

            <p className="text-2xl font-bold mb-6">{plan.price}</p>

            <ul className="mk-list-check mb-6">
              {plan.features.map((f) => (
                <li key={f}>✔ {f}</li>
              ))}
            </ul>

            <Link
              href="/register"
              className={`mk-btn w-full ${
                plan.highlight
                  ? "mk-btn--primary"
                  : "mk-btn--ghost"
              }`}
            >
              Get Started
            </Link>
          </div>
        ))}
        </div>
      </section>

      {/* FEES BREAKDOWN */}
      <section className="mk-section mk-section--muted">
        <div className="mk-shell text-center" style={{ maxWidth: 1040 }}>
          <h2 className="mk-title-lg mb-10">
            Transaction Fees
          </h2>

          <div className="mk-grid-2">
            {fees.map((fee) => (
              <div
                key={fee.title}
                className="mk-card"
              >
                <h4 className="text-white font-semibold mb-2">
                  {fee.title}
                </h4>
                <p className="mk-card-copy">{fee.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENTERPRISE CTA */}
      <section className="mk-section text-center">
        <div className="mk-shell">
        <h2 className="mk-title-lg mb-4">
          Need custom pricing?
        </h2>

        <p className="mk-sub mk-sub--center">
          We support high-volume businesses with tailored pricing and infrastructure.
        </p>

        <Link
          href="/contact"
          className="mk-btn mk-btn--primary"
        >
          Contact Sales
        </Link>
        </div>
      </section>

      {/* TRUST */}
      <section className="mk-section--compact mk-shell" style={{ textAlign: "center", color: "rgba(226,225,239,0.62)" }}>
        Ayaweisoft Pay is a financial technology platform.  
        Banking services are provided by Mbawula Microfinance Bank, licensed by the Central Bank of Nigeria.
      </section>

      <AppFooter />


    </main>
  );
}