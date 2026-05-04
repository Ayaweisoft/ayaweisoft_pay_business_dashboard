"use client";

import { useState } from "react";
import { FormInput } from "../../components/FormInput";
import { LucideShieldCheck, LucideKey, LucideUsers, LucideMail, LucidePhone } from "lucide-react";

export default function SettingsClient() {
  const [business, setBusiness] = useState({ 
    name: "Ayaweisoft Ltd.", 
    email: "info@ayaweisoft.com", 
    phone: "+2348000000000" 
  });
  const [password, setPassword] = useState({ current: "", new: "" });
  const [twoFA, setTwoFA] = useState(true);

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-white/60 text-sm">Manage business info, security, and team access.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl">
        {/* Left Column: Business & Security */}
        <div className="flex flex-col gap-8">
          {/* Business Info */}
          <section className="glass-card p-6 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-primary/10 text-primary">
                <LucideKey size={20} />
              </span>
              <h2 className="text-lg font-bold text-white">Business Profile</h2>
            </div>
            
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <FormInput 
                label="Business Name" 
                value={business.name} 
                onChange={e => setBusiness(b => ({ ...b, name: e.target.value }))} 
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput 
                  label="Email Address" 
                  value={business.email} 
                  onChange={e => setBusiness(b => ({ ...b, email: e.target.value }))} 
                />
                <FormInput 
                  label="Phone Number" 
                  value={business.phone} 
                  onChange={e => setBusiness(b => ({ ...b, phone: e.target.value }))} 
                />
              </div>
              <button className="px-6 py-2 rounded-lg bg-primary text-white font-bold hover:opacity-90 transition">
                Update Profile
              </button>
            </form>
          </section>

          {/* Security */}
          <section className="glass-card p-6 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-success/10 text-success">
                <LucideShieldCheck size={20} />
              </span>
              <h2 className="text-lg font-bold text-white">Security & Password</h2>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-border">
              <div>
                <p className="text-sm font-bold text-white">Two-Factor Authentication</p>
                <p className="text-xs text-white/40">Add an extra layer of security to your account.</p>
              </div>
              <button 
                onClick={() => setTwoFA(v => !v)} 
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  twoFA ? "bg-success text-white shadow-lg shadow-success/20" : "bg-white/10 text-white/60"
                }`}
              >
                {twoFA ? "Active" : "Disabled"}
              </button>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <FormInput 
                label="Current Password" 
                type="password" 
                placeholder="••••••••"
              />
              <FormInput 
                label="New Password" 
                type="password" 
                placeholder="Minimum 8 characters"
              />
              <div className="flex gap-3">
                <button className="px-6 py-2 rounded-lg bg-primary text-white font-bold hover:opacity-90 transition">
                  Save Password
                </button>
                <button className="px-6 py-2 rounded-lg border border-border text-white/60 hover:text-white transition">
                  Rotate API Keys
                </button>
              </div>
            </form>
          </section>
        </div>

        {/* Right Column: Team */}
        <div className="flex flex-col gap-8">
          <section className="glass-card p-6 flex flex-col gap-6 h-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-primary/10 text-primary">
                  <LucideUsers size={20} />
                </span>
                <h2 className="text-lg font-bold text-white">Team Management</h2>
              </div>
              <button className="text-xs font-bold text-primary hover:underline">
                + Invite Member
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {[
                { name: "John Doe", email: "john@posplus.com", role: "Admin", initial: "J" },
                { name: "Jane Smith", email: "jane@posplus.com", role: "Business User", initial: "S" }
              ].map((member, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-border hover:bg-white/5 transition">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      {member.initial}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{member.name}</p>
                      <p className="text-xs text-white/40">{member.email}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded font-bold ${
                    member.role === 'Admin' ? 'bg-primary/10 text-primary' : 'bg-white/10 text-white/60'
                  }`}>
                    {member.role}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="mt-auto p-4 rounded-xl bg-primary/5 border border-primary/20">
              <p className="text-xs text-white/60 leading-relaxed">
                <span className="font-bold text-primary">Pro Tip:</span> Administrators have full access to API keys and payout processing. Use "Business User" for staff handling records only.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}