"use client";

import {
  LucideHome, LucideCreditCard, LucideBanknote, LucideSend,
  LucideList, LucideBarChart, LucidePlug, LucideSettings,
  LucideMenu, LucideX, LucideChevronRight, LucideBell, LucideActivity,
  LucideLogOut, LucideZap,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, memo, useEffect } from "react";
import Image from "next/image";

const NAV_ITEMS = [
  { name: "Dashboard",        href: "/dashboard",        icon: LucideHome,        badge: null },
  { name: "Wallets",          href: "/wallets",          icon: LucideCreditCard,  badge: null },
  { name: "Virtual Accounts", href: "/virtual-accounts", icon: LucideBanknote,    badge: null },
  { name: "Payouts",          href: "/payouts",          icon: LucideSend,        badge: "3"  },
  { name: "Transactions",     href: "/transactions",     icon: LucideList,        badge: null },
  { name: "Analytics",        href: "/analytics",        icon: LucideBarChart,    badge: null },
  { name: "Notifications",    href: "/notifications",    icon: LucideBell,        badge: "2" },
  { name: "System Health",    href: "/system-health",    icon: LucideActivity,    badge: null },
  { name: "API & Webhooks",   href: "/api",              icon: LucidePlug,        badge: null },
  { name: "Settings",         href: "/settings",         icon: LucideSettings,    badge: null },
] as const;

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <>
      <style>{styles}</style>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open navigation"
        className="sidebar-mobile-toggle"
      >
        <LucideMenu size={18} strokeWidth={2} />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          role="presentation"
          onClick={() => setIsOpen(false)}
          className={`sidebar-backdrop ${isOpen ? "sidebar-backdrop--visible" : ""}`}
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? "sidebar--open" : ""}`} aria-label="Main navigation">
        <div className="sidebar-inner">

          {/* Header: Logo + Close */}
          <div className="sidebar-header">
            <Link href="/dashboard" className="sidebar-logo" onClick={() => setIsOpen(false)}>
              <div className="sidebar-logo-icon">
                <LucideZap size={16} strokeWidth={2.5} color="#fff" />
              </div>
              <div className="sidebar-logo-text">
                <span className="sidebar-logo-name">Ayaweisoft</span>
                <span className="sidebar-logo-suffix">Pay</span>
              </div>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="sidebar-close-btn"
              aria-label="Close navigation"
            >
              <LucideX size={16} />
            </button>
          </div>

          {/* Status Chip */}
          <div className="sidebar-status-chip">
            <span className="sidebar-status-dot" />
            <span>All systems operational</span>
          </div>

          {/* Section Label */}
          <p className="sidebar-section-label">Main Menu</p>

          {/* Nav */}
          <nav className="sidebar-nav" aria-label="Primary navigation">
            {NAV_ITEMS.map((item, i) => (
              <NavItem
                key={item.href}
                {...item}
                index={i}
                isActive={pathname.startsWith(item.href)}
                onClick={() => setIsOpen(false)}
              />
            ))}
          </nav>

          {/* Bottom Section */}
          <div className="sidebar-bottom">
            {/* Notification row */}
            <Link href="/notifications" className="sidebar-notif-btn" aria-label="Notifications" onClick={() => setIsOpen(false)}>
              <LucideBell size={14} />
              <span className="sidebar-notif-text">Notifications</span>
              <span className="sidebar-notif-badge">2</span>
            </Link>

            {/* User Card */}
            <div className="sidebar-user-card">
              <div className="sidebar-avatar" aria-hidden="true">JD</div>
              <div className="sidebar-user-info">
                <p className="sidebar-user-name">John Doe</p>
                <span className="sidebar-user-tier">Free Tier</span>
              </div>
              <button className="sidebar-logout-btn" aria-label="Log out">
                <LucideLogOut size={13} />
              </button>
            </div>
          </div>

        </div>
      </aside>
    </>
  );
}

// ─────────────────────────────────────────────
// NavItem
// ─────────────────────────────────────────────
const NavItem = memo(
  ({ name, href, icon: Icon, isActive, onClick, badge, index }: {
    name: string;
    href: string;
    icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
    isActive: boolean;
    onClick: () => void;
    badge: string | null;
    index: number;
  }) => (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={`nav-item ${isActive ? "nav-item--active" : ""}`}
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <span className={`nav-item-icon-wrap ${isActive ? "nav-item-icon-wrap--active" : ""}`}>
        <Icon size={15} strokeWidth={isActive ? 2.5 : 2} />
      </span>
      <span className="nav-item-label">{name}</span>
      {badge && <span className="nav-item-badge">{badge}</span>}
      {isActive && <LucideChevronRight size={11} className="nav-item-chevron" />}
    </Link>
  )
);
NavItem.displayName = "NavItem";

// ─────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────
const styles = `
  /* ── Tokens ── */
  :root {
    --sidebar-w: 232px;
    --sidebar-bg: #0d0f14;
    --sidebar-border: rgba(255,255,255,0.07);
    --sidebar-surface: rgba(255,255,255,0.04);
    --sidebar-surface-hover: rgba(255,255,255,0.07);

    --primary: #2e5bff;
    --primary-dim: rgba(46,91,255,0.15);
    --primary-glow: rgba(46,91,255,0.35);

    --text-bright: #f0f2ff;
    --text-muted: rgba(240,242,255,0.45);
    --text-faint: rgba(240,242,255,0.25);

    --radius-md: 10px;
    --radius-sm: 7px;
    --transition: 0.18s cubic-bezier(0.4,0,0.2,1);
  }

  /* ── Mobile toggle ── */
  .sidebar-mobile-toggle {
    display: none;
    position: fixed;
    top: 14px;
    left: 14px;
    z-index: 60;
    width: 38px;
    height: 38px;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-sm);
    background: var(--sidebar-bg);
    border: 1px solid var(--sidebar-border);
    color: var(--text-muted);
    cursor: pointer;
    transition: color var(--transition), border-color var(--transition), box-shadow var(--transition);
  }
  .sidebar-mobile-toggle:hover {
    color: var(--text-bright);
    border-color: rgba(255,255,255,0.15);
    box-shadow: 0 4px 16px rgba(0,0,0,0.4);
  }

  /* ── Backdrop ── */
  .sidebar-backdrop {
    display: none;
    position: fixed;
    inset: 0;
    z-index: 40;
    background: rgba(0,0,0,0);
    backdrop-filter: blur(0px);
    transition: background 0.25s ease, backdrop-filter 0.25s ease;
  }
  .sidebar-backdrop--visible {
    background: rgba(0,0,0,0.65);
    backdrop-filter: blur(4px);
  }

  /* ── Sidebar shell ── */
  .sidebar {
    position: sticky;
    top: 0;
    left: 0;
    height: 100dvh;
    width: var(--sidebar-w);
    flex-shrink: 0;
    background: var(--sidebar-bg);
    border-right: 1px solid var(--sidebar-border);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    z-index: 50;
  }

  /* subtle noise texture */
  .sidebar::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none;
    opacity: 0.6;
    z-index: 0;
  }

  .sidebar-inner {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 18px 10px;
    gap: 4px;
  }

  /* ── Header ── */
  .sidebar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 6px 16px;
    border-bottom: 1px solid var(--sidebar-border);
    margin-bottom: 6px;
  }

  .sidebar-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    border-radius: var(--radius-sm);
    padding: 4px 2px;
    transition: opacity var(--transition);
  }
  .sidebar-logo:hover { opacity: 0.85; }

  .sidebar-logo-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: linear-gradient(135deg, #2e5bff, #7b61ff);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px var(--primary-glow);
    flex-shrink: 0;
  }

  .sidebar-logo-text {
    display: flex;
    flex-direction: column;
    line-height: 1.15;
  }
  .sidebar-logo-name {
    font-size: 12px;
    font-weight: 700;
    color: var(--text-bright);
    letter-spacing: -0.01em;
  }
  .sidebar-logo-suffix {
    font-size: 10px;
    font-weight: 500;
    color: var(--primary);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .sidebar-close-btn {
    display: none;
    width: 28px;
    height: 28px;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    background: var(--sidebar-surface);
    border: 1px solid var(--sidebar-border);
    color: var(--text-muted);
    cursor: pointer;
    transition: color var(--transition), background var(--transition);
  }
  .sidebar-close-btn:hover {
    color: var(--text-bright);
    background: var(--sidebar-surface-hover);
  }

  /* ── Status ── */
  .sidebar-status-chip {
    display: flex;
    align-items: center;
    gap: 6px;
    margin: 0 4px 10px;
    padding: 5px 10px;
    border-radius: 20px;
    background: rgba(52,211,153,0.08);
    border: 1px solid rgba(52,211,153,0.18);
    font-size: 10px;
    color: #34d399;
    letter-spacing: 0.02em;
    width: fit-content;
  }
  .sidebar-status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #34d399;
    box-shadow: 0 0 6px #34d399;
    animation: pulse-dot 2.4s ease-in-out infinite;
  }
  @keyframes pulse-dot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.75); }
  }

  /* ── Section label ── */
  .sidebar-section-label {
    font-size: 9.5px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-faint);
    padding: 0 10px;
    margin-bottom: 4px;
  }

  /* ── Nav ── */
  .sidebar-nav {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 8px 10px;
    border-radius: var(--radius-sm);
    font-size: 13px;
    font-weight: 500;
    color: var(--text-muted);
    text-decoration: none;
    transition: color var(--transition), background var(--transition);
    position: relative;
    animation: nav-fade-in 0.3s ease both;
  }
  @keyframes nav-fade-in {
    from { opacity: 0; transform: translateX(-6px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  .nav-item:hover:not(.nav-item--active) {
    color: var(--text-bright);
    background: var(--sidebar-surface-hover);
  }
  .nav-item--active {
    color: #fff;
    font-weight: 600;
    background: var(--primary-dim);
    box-shadow: inset 0 0 0 1px rgba(46,91,255,0.25);
  }
  /* active indicator bar */
  .nav-item--active::before {
    content: '';
    position: absolute;
    left: 0;
    top: 20%;
    bottom: 20%;
    width: 3px;
    border-radius: 0 3px 3px 0;
    background: var(--primary);
    box-shadow: 0 0 8px var(--primary-glow);
  }

  .nav-item-icon-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 7px;
    background: var(--sidebar-surface);
    flex-shrink: 0;
    color: var(--text-muted);
    transition: background var(--transition), color var(--transition), box-shadow var(--transition);
  }
  .nav-item--active .nav-item-icon-wrap,
  .nav-item-icon-wrap--active {
    background: var(--primary);
    color: #fff;
    box-shadow: 0 4px 12px var(--primary-glow);
  }
  .nav-item:hover:not(.nav-item--active) .nav-item-icon-wrap {
    background: rgba(255,255,255,0.08);
    color: var(--text-bright);
  }

  .nav-item-label {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .nav-item-badge {
    font-size: 9px;
    font-weight: 700;
    background: var(--primary);
    color: #fff;
    border-radius: 10px;
    padding: 1px 5px;
    letter-spacing: 0.02em;
    box-shadow: 0 2px 6px var(--primary-glow);
  }

  .nav-item-chevron {
    color: rgba(255,255,255,0.4);
    flex-shrink: 0;
  }

  /* ── Bottom ── */
  .sidebar-bottom {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding-top: 10px;
    border-top: 1px solid var(--sidebar-border);
    margin-top: 4px;
  }

  .sidebar-notif-btn {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 7px 10px;
    border-radius: var(--radius-sm);
    background: transparent;
    border: none;
    color: var(--text-muted);
    font-size: 12px;
    cursor: pointer;
    width: 100%;
    transition: color var(--transition), background var(--transition);
  }
  .sidebar-notif-btn:hover {
    color: var(--text-bright);
    background: var(--sidebar-surface-hover);
  }
  .sidebar-notif-text { flex: 1; text-align: left; }
  .sidebar-notif-badge {
    font-size: 9px;
    font-weight: 700;
    background: #f97316;
    color: #fff;
    border-radius: 10px;
    padding: 1px 5px;
  }

  .sidebar-user-card {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 9px 10px;
    border-radius: var(--radius-md);
    background: var(--sidebar-surface);
    border: 1px solid var(--sidebar-border);
    transition: border-color var(--transition);
  }
  .sidebar-user-card:hover {
    border-color: rgba(255,255,255,0.12);
  }

  .sidebar-avatar {
    width: 30px;
    height: 30px;
    border-radius: 8px;
    background: linear-gradient(135deg, #2e5bff, #7b61ff);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: 800;
    color: #fff;
    letter-spacing: 0.02em;
    flex-shrink: 0;
    box-shadow: 0 3px 8px var(--primary-glow);
  }

  .sidebar-user-info { flex: 1; min-width: 0; }
  .sidebar-user-name {
    font-size: 12px;
    font-weight: 700;
    color: var(--text-bright);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .sidebar-user-tier {
    font-size: 10px;
    color: var(--text-faint);
    background: var(--sidebar-surface);
    border: 1px solid var(--sidebar-border);
    border-radius: 4px;
    padding: 1px 5px;
    letter-spacing: 0.04em;
  }

  .sidebar-logout-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    border-radius: 6px;
    background: transparent;
    border: 1px solid var(--sidebar-border);
    color: var(--text-faint);
    cursor: pointer;
    flex-shrink: 0;
    transition: color var(--transition), border-color var(--transition), background var(--transition);
  }
  .sidebar-logout-btn:hover {
    color: #f87171;
    border-color: rgba(248,113,113,0.35);
    background: rgba(248,113,113,0.08);
  }

  /* ────────────────────────────────────────
     RESPONSIVE  (≤ 768px = mobile)
  ──────────────────────────────────────── */
  @media (max-width: 768px) {
    .sidebar-mobile-toggle {
      display: flex;
    }
    .sidebar-backdrop {
      display: block;
    }
    .sidebar {
      position: fixed;
      top: 0;
      left: 0;
      height: 100dvh;
      transform: translateX(-100%);
      transition: transform 0.28s cubic-bezier(0.4,0,0.2,1),
                  box-shadow 0.28s ease;
    }
    .sidebar--open {
      transform: translateX(0);
      box-shadow: 8px 0 40px rgba(0,0,0,0.6);
    }
    .sidebar-close-btn {
      display: flex;
    }
  }

  /* ── Tablet: narrower sidebar ── */
  @media (min-width: 769px) and (max-width: 1024px) {
    :root { --sidebar-w: 200px; }
    .sidebar-logo-name { font-size: 11px; }
    .nav-item { font-size: 12px; padding: 7px 8px; }
  }

  /* ── Focus visible ── */
  .nav-item:focus-visible,
  .sidebar-mobile-toggle:focus-visible,
  .sidebar-close-btn:focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
  }
`;