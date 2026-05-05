// components/Navbar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/developers", label: "Developers" },
  { href: "/pricing", label: "Pricing" },
  { href: "/company", label: "Company" },
  { href: "/docs", label: "Docs" },
] as const;

export default function AppNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="mk-nav">
      <Link href="/" className="mk-nav__brand">
        <span className="mk-nav__logo-wrap">
          <Image
            src="/asp_logo.png"
            alt="Ayaweisoft Pay Logo"
            width={32}
            height={32}
            className="object-contain"
            priority
          />
        </span>
        <span className="mk-nav__brand-name">Ayaweisoft Pay</span>
      </Link>

      {/* Desktop Nav */}
      <nav className="mk-nav__links" aria-label="Primary navigation">
        {NAV_LINKS.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`mk-nav__link ${active ? "mk-nav__link--active" : ""}`}
              aria-current={active ? "page" : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Desktop Actions */}
      <div className="mk-nav__actions">
        <Link
          href="/login"
          className="mk-nav__btn mk-nav__btn--ghost"
        >
          Sign in
        </Link>
        <Link
          href="/register"
          className="mk-nav__btn mk-nav__btn--primary"
        >
          Get Started
        </Link>
      </div>

      {/* Mobile Hamburger */}
      <button
        className="mk-nav__toggle"
        onClick={() => setMobileOpen((v) => !v)}
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileOpen}
      >
        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="mk-nav__mobile" role="dialog" aria-modal="true">
          <button
            className="mk-nav__mobile-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>

          <nav className="mk-nav__mobile-links" aria-label="Mobile navigation">
            {NAV_LINKS.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`mk-nav__mobile-link ${active ? "mk-nav__mobile-link--active" : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mk-nav__mobile-actions">
            <Link
              href="/login"
              className="mk-nav__btn mk-nav__btn--ghost"
              onClick={() => setMobileOpen(false)}
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="mk-nav__btn mk-nav__btn--primary"
              onClick={() => setMobileOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}