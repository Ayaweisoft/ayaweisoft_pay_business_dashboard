"use client";

import { useState } from "react";
import { FormInput } from "../../components/FormInput";
import { LucideShieldCheck, LucideKey, LucideUsers } from "lucide-react";

export default function SettingsClient() {
  const [business, setBusiness] = useState({ 
    name: "Ayaweisoft Ltd.", 
    email: "info@ayaweisoft.com", 
    phone: "+2348000000000" 
  });
  const [password, setPassword] = useState({ current: "", new: "" });
  const [twoFA, setTwoFA] = useState(true);

  const teamMembers = [
    { name: "John Doe", email: "john@posplus.com", role: "Admin", initial: "J" },
    { name: "Jane Smith", email: "jane@posplus.com", role: "Business User", initial: "S" },
  ] as const;

  return (
    <div className="page-root">
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="page-sub">Manage business info, security, and team access.</p>
        </div>
      </div>

      <div className="settings-grid">
        {/* Left Column: Business & Security */}
        <div className="settings-stack">
          {/* Business Info */}
          <section className="panel settings-section">
            <div className="section-header">
              <span className="icon-chip icon-chip--blue"><LucideKey size={18} /></span>
              <h2 className="section-title">Business Profile</h2>
            </div>
            <form className="section-body" onSubmit={e => e.preventDefault()}>
              <div className="field">
                <label className="label">Business Name</label>
                <FormInput
                  value={business.name}
                  onChange={e => setBusiness(b => ({ ...b, name: e.target.value }))}
                  className="input"
                />
              </div>
              <div className="form-row-2">
                <div className="field">
                  <label className="label">Email Address</label>
                  <FormInput
                    value={business.email}
                    onChange={e => setBusiness(b => ({ ...b, email: e.target.value }))}
                    className="input"
                  />
                </div>
                <div className="field">
                  <label className="label">Phone Number</label>
                  <FormInput
                    value={business.phone}
                    onChange={e => setBusiness(b => ({ ...b, phone: e.target.value }))}
                    className="input"
                  />
                </div>
              </div>
              <button className="btn btn-primary btn-lg settings-form-cta">
                Update Profile
              </button>
            </form>
          </section>

          {/* Security */}
          <section className="panel settings-section">
            <div className="section-header">
              <span className="icon-chip icon-chip--green"><LucideShieldCheck size={18} /></span>
              <h2 className="section-title">Security &amp; Password</h2>
            </div>
            <div className="section-body">
              <div className="panel settings-inline-panel">
                <div className="panel-header">
                  <span className="panel-title">Two-Factor Authentication</span>
                  <button
                    onClick={() => setTwoFA(v => !v)}
                    className={`btn btn-sm ${twoFA ? 'btn-primary' : 'btn-subtle'}`}
                    aria-pressed={twoFA}
                  >
                    {twoFA ? "Active" : "Disabled"}
                  </button>
                </div>
                <div className="settings-inline-note">
                  Add an extra layer of security to your account.
                </div>
              </div>

              <form className="field settings-password-form" onSubmit={e => e.preventDefault()}>
                <div className="field">
                  <label className="label">Current Password</label>
                  <FormInput
                    type="password"
                    value={password.current}
                    onChange={e => setPassword(p => ({ ...p, current: e.target.value }))}
                    placeholder="••••••••"
                    className="input"
                  />
                </div>
                <div className="field">
                  <label className="label">New Password</label>
                  <FormInput
                    type="password"
                    value={password.new}
                    onChange={e => setPassword(p => ({ ...p, new: e.target.value }))}
                    placeholder="Minimum 8 characters"
                    className="input"
                  />
                </div>

                <div className="settings-password-actions">
                  <button className="btn btn-primary btn-lg">Save Password</button>
                  <button className="btn btn-ghost btn-lg">Rotate API Keys</button>
                </div>
              </form>
            </div>
          </section>
        </div>

        {/* Right Column: Team */}
        <div className="settings-side-col">
          <section className="panel settings-section settings-section--fill">
            <div className="section-header section-header--between">
              <div className="section-header-group">
                <span className="icon-chip icon-chip--teal"><LucideUsers size={18} /></span>
                <h2 className="section-title">Team Management</h2>
              </div>
              <button className="btn btn-primary btn-sm">+ Invite Member</button>
            </div>
            <div className="section-body settings-members">
              {teamMembers.map((member) => (
                <div key={member.email} className="panel settings-member-row">
                  <div className="settings-member-main">
                    <span className="avatar avatar--md settings-member-avatar">
                      {member.initial}
                    </span>
                    <div>
                      <p className="settings-member-name">{member.name}</p>
                      <p className="settings-member-email">{member.email}</p>
                    </div>
                  </div>
                  <span className={`badge settings-member-role ${member.role === 'Admin' ? 'badge--info' : 'badge--neutral'}`}>
                    {member.role}
                  </span>
                </div>
              ))}
            </div>
            <div className="settings-tip-panel">
              <div className="settings-tip-copy">
                <span className="settings-tip-label">Pro Tip:</span> Administrators have full access to API keys and payout processing. Use "Business User" for staff handling records only.
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}