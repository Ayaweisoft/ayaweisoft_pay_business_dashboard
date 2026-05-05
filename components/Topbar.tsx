"use client";

import { LucideBell, LucideSettings, LucideSearch, LucideChevronDown } from "lucide-react";
import Link from "next/link";

interface TopbarProps {
  userName?: string;
  userInitials?: string;
  notifCount?: number;
}

export function Topbar({ userName = "John Doe", userInitials = "JD", notifCount = 3 }: TopbarProps) {
  return (
    <header className="app-topbar">

      {/* Search */}
      <div className="search-wrap app-topbar__search">
        <span className="search-icon">
          <LucideSearch size={14} strokeWidth={2} />
        </span>
        <input
          className="search-input"
          placeholder="Search transactions, wallets…"
        />
      </div>

      {/* Right actions */}
      <div className="app-topbar__actions">

        {/* Notifications */}
        <Link
          href="/notifications"
          style={{
            position: "relative",
            width: 34, height: 34,
            borderRadius: "var(--radius-md)",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "none",
            border: "1px solid transparent",
            color: "var(--foreground-muted)",
            cursor: "pointer",
            transition: "all 150ms ease",
          }}
          className="app-topbar__icon-btn"
          aria-label="Notifications"
        >
          <LucideBell size={16} strokeWidth={2} />
          {notifCount > 0 && (
            <span style={{
              position: "absolute", top: 4, right: 4,
              width: 8, height: 8, borderRadius: "50%",
              background: "var(--primary)",
              border: "1.5px solid var(--surface-container-low)",
            }} />
          )}
        </Link>

        {/* Settings */}
        <Link
          href="/settings"
          style={{
            width: 34, height: 34,
            borderRadius: "var(--radius-md)",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "none", border: "1px solid transparent",
            color: "var(--foreground-muted)", cursor: "pointer",
            transition: "all 150ms ease",
          }}
          className="app-topbar__icon-btn"
          aria-label="Settings"
        >
          <LucideSettings size={16} strokeWidth={2} />
        </Link>

        {/* Divider */}
        <div style={{ width: 1, height: 22, background: "var(--border-subtle)", margin: "0 4px" }} />

        {/* User chip */}
        <button
          style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "5px 10px 5px 5px",
            borderRadius: "var(--radius-lg)",
            background: "var(--surface-container)",
            border: "1px solid var(--border-subtle)",
            cursor: "pointer",
            transition: "all 150ms ease",
          }}
          onMouseOver={e => (e.currentTarget.style.borderColor = "var(--border-mid)")}
          onMouseOut={e  => (e.currentTarget.style.borderColor = "var(--border-subtle)")}
        >
          <span className="avatar avatar--sm">{userInitials}</span>
          <span className="app-topbar__user-name" style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--foreground)" }}>
            {userName.split(" ")[0]}
          </span>
          <LucideChevronDown size={12} color="var(--foreground-muted)" />
        </button>
      </div>
    </header>
  );
}
