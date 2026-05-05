// app/developers/page.tsx
import AppNavbar from "@/components/AppNavbar";
import AppFooter from "@/components/AppFooter";
import Link from "next/link";

export default function Developers() {
  return (
    <main className="mk-root">

      <AppNavbar />

      {/* HERO */}
      <section className="mk-hero mk-shell">
        <h1 className="mk-title-xl">
          Build with Ayaweisoft APIs
        </h1>

        <p className="mk-sub mk-sub--center">
          Integrate payments, virtual accounts, wallets, and payouts with a single API.
        </p>

        <div className="mk-actions">
          <Link href="/register" className="mk-btn mk-btn--primary">
            Get API Keys
          </Link>
          <Link href="/docs" className="mk-btn mk-btn--ghost">
            View Docs
          </Link>
        </div>
      </section>

      {/* QUICK START */}
      <section className="mk-section mk-section--compact">
        <div className="mk-shell mk-grid-2 items-center" style={{ gap: 18 }}>

        <div>
          <h2 className="mk-title-lg mb-4">Quickstart</h2>
          <p className="mk-sub">
            Start accepting payments and generating virtual accounts in minutes.
          </p>

          <ul className="mk-list-check">
            <li>✔ Create account</li>
            <li>✔ Get API keys</li>
            <li>✔ Make your first API call</li>
          </ul>
        </div>

        <div className="mk-code mk-code--green">
{`POST /v1/virtual-accounts

{
  "name": "John Doe",
  "email": "john@email.com"
}

→ Returns account instantly`}
        </div>

        </div>
      </section>

      {/* CORE APIs */}
      <section className="mk-section">
        <div className="mk-shell">
        <h2 className="mk-title-lg text-center mb-10">Core APIs</h2>

        <div className="mk-grid-3">

          {[
            "Payments API",
            "Virtual Accounts API",
            "Payout API",
            "Wallet API",
            "Webhook Events",
            "KYC & Verification"
          ].map((api) => (
            <div key={api} className="mk-card">
              <h3 className="mk-card-title">{api}</h3>
              <p className="mk-card-copy">
                Fully documented and scalable.
              </p>
            </div>
          ))}

        </div>
        </div>
      </section>

      {/* SDKS */}
      <section className="mk-section mk-section--muted text-center">
        <div className="mk-shell">
        <h2 className="mk-title-lg mb-4">SDKs & Libraries</h2>

        <p className="mk-sub mk-sub--center">
          Integrate faster using official SDKs.
        </p>

        <div className="mk-actions" style={{ marginTop: 18 }}>
          <span className="mk-pill">Node.js</span>
          <span className="mk-pill">PHP</span>
          <span className="mk-pill">Python</span>
          <span className="mk-pill">Java</span>
        </div>
        </div>
      </section>

      {/* WEBHOOKS */}
      <section className="mk-section">
        <div className="mk-shell mk-grid-2 items-center" style={{ gap: 18 }}>

        <div className="mk-code mk-code--blue">
{`POST /webhook

{
  "event": "payment.success",
  "amount": 50000
}`}
        </div>

        <div>
          <h2 className="mk-title-lg mb-4">Real-time Webhooks</h2>
          <p className="mk-sub">
            Get instant notifications for payments, transfers, and events.
          </p>
        </div>

        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mk-section text-center">
        <div className="mk-shell">
        <h2 className="mk-title-lg mb-4">
          Start building today
        </h2>

        <Link
          href="/register"
          className="mk-btn mk-btn--primary"
        >
          Create Free Account
        </Link>
        </div>
      </section>

      <AppFooter />


    </main>
  );
}