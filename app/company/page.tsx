import AppNavbar from "@/components/AppNavbar";
import AppFooter from "@/components/AppFooter";
import Link from "next/link";

export default function CompanyPage() {
  return (
    <main className="mk-root">

      <AppNavbar />

      {/* HERO */}
      <section className="mk-hero mk-shell" style={{ maxWidth: 1060 }}>
        <h1 className="mk-title-xl">
          Building the financial infrastructure powering modern Africa
        </h1>

        <p className="mk-sub mk-sub--center" style={{ maxWidth: 760 }}>
          Ayaweisoft is a fintech infrastructure company enabling businesses to
          move money, create financial products, and scale with secure APIs,
          banking partnerships, and intelligent automation systems.
        </p>

        <div className="mk-actions">
          <Link
            href="/developers"
            className="mk-btn mk-btn--primary"
          >
            Explore APIs
          </Link>

          <Link
            href="/contact"
            className="mk-btn mk-btn--ghost"
          >
            Talk to Us
          </Link>
        </div>
      </section>

      {/* MISSION / VISION */}
      <section className="mk-section mk-section--compact">
        <div className="mk-shell mk-grid-3">

        <div className="mk-card">
          <h3 className="mk-card-title">Our Mission</h3>
          <p className="mk-card-copy">
            To simplify financial infrastructure for African businesses by
            providing secure, scalable, and developer-friendly APIs.
          </p>
        </div>

        <div className="mk-card">
          <h3 className="mk-card-title">Our Vision</h3>
          <p className="mk-card-copy">
            To become the backbone of digital financial systems across Africa,
            powering payments, banking, and embedded finance.
          </p>
        </div>

        <div className="mk-card">
          <h3 className="mk-card-title">Our Approach</h3>
          <p className="mk-card-copy">
            API-first, security-driven, and built for scale from startups to
            enterprise financial systems.
          </p>
        </div>

        </div>
      </section>

      {/* STORY / TIMELINE */}
      <section className="mk-section">
        <div className="mk-shell" style={{ maxWidth: 980 }}>

        <h2 className="mk-title-lg mb-10 text-center">Our Journey</h2>

        <div className="space-y-8">

          {[
            {
              year: "2020",
              title: "Foundation",
              desc: "Ayaweisoft was founded as a software engineering company building fintech solutions for local businesses."
            },
            {
              year: "2022",
              title: "Fintech Expansion",
              desc: "We began building payment systems, POS infrastructure, and digital financial tools for enterprises."
            },
            {
              year: "2024",
              title: "API Infrastructure Launch",
              desc: "We launched Ayaweisoft Pay — a unified API for payments, virtual accounts, and payouts."
            },
            {
              year: "2026",
              title: "Scaling Across Africa",
              desc: "Expanding into enterprise banking infrastructure and cross-border payment systems."
            }
          ].map((item, i) => (
            <div
              key={i}
              className="mk-card flex gap-6"
            >
              <div className="text-blue-400 font-bold w-20">
                {item.year}
              </div>

              <div>
                <h4 className="font-semibold">{item.title}</h4>
                <p className="mk-card-copy mt-1">{item.desc}</p>
              </div>
            </div>
          ))}

        </div>
        </div>

      </section>

      {/* WHAT WE BUILD */}
      <section className="mk-section mk-section--compact">
        <div className="mk-shell">

        <h2 className="mk-title-lg mb-10 text-center">
          What We Build
        </h2>

        <div className="mk-grid-3">

          {[
            "Payment Infrastructure APIs",
            "Virtual Account Systems",
            "Payout & Settlement Engines",
            "POS & Agency Banking Systems",
            "Fintech SaaS Platforms",
            "Enterprise Financial Tools"
          ].map((item) => (
            <div
              key={item}
              className="mk-card"
            >
              <p className="font-semibold">{item}</p>
            </div>
          ))}

        </div>
        </div>

      </section>

      {/* TRUST / COMPLIANCE */}
      <section className="mk-section mk-section--muted text-center">
        <div className="mk-shell">

        <h2 className="mk-title-lg mb-4">Security & Trust</h2>

        <p className="mk-sub mk-sub--center" style={{ maxWidth: 740 }}>
          We operate with enterprise-grade security standards, encrypted
          transactions, fraud detection systems, and regulated banking partners
          to ensure reliability at scale.
        </p>

        <div className="mk-actions" style={{ marginTop: 20 }}>
          <span className="mk-pill">End-to-end encryption</span>
          <span className="mk-pill">Fraud monitoring</span>
          <span className="mk-pill">99.9% uptime</span>
          <span className="mk-pill">Licensed partners</span>
        </div>
        </div>

      </section>

      {/* LEADERSHIP */}
      <section className="mk-section mk-section--compact text-center">
        <div className="mk-shell" style={{ maxWidth: 920 }}>

        <h2 className="mk-title-lg mb-4">Leadership</h2>

        <p className="mk-sub mk-sub--center">
          Ayaweisoft is led by engineers and fintech architects building
          infrastructure for real-world financial systems across Africa.
        </p>
        </div>
      </section>

      {/* CTA */}
      <section className="mk-section text-center">
        <div className="mk-shell">

        <h2 className="mk-title-lg">
          Let’s build the future of finance together
        </h2>

        <p className="mk-sub mk-sub--center">
          Whether you're a startup, bank, or enterprise — we can power your system.
        </p>

        <div className="mk-actions">
          <Link
            href="/developers"
            className="mk-btn mk-btn--primary"
          >
            Start Building
          </Link>

          <Link
            href="/contact"
            className="mk-btn mk-btn--ghost"
          >
            Contact Sales
          </Link>
        </div>
        </div>

      </section>

      <AppFooter />



    </main>
  );
}