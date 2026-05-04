"use client";
"use client";
import { useState } from "react";
import { FormInput } from "../../components/FormInput";
import { LucideShieldCheck, LucideKey, LucideUsers, LucideLock } from "lucide-react";

export default function SettingsPage() {
  const [business, setBusiness] = useState({ name: "Ayaweisoft Ltd.", email: "info@ayaweisoft.com", phone: "+2348000000000" });
  const [password, setPassword] = useState({ current: "", new: "" });
  const [twoFA, setTwoFA] = useState(true);

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Settings</h1>
          <p className="text-white/60 text-sm">Manage business info, security, and team access.</p>
        </div>
      </div>

      {/* Business Info */}
      <div className="glass-card p-6 flex flex-col gap-4 max-w-xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="p-2 rounded-lg bg-primary/10 text-primary"><LucideKey size={20} /></span>
          <span className="text-base font-bold text-white">Business Info</span>
        </div>
        <form className="flex flex-col gap-3">
          <FormInput label="Business Name" value={business.name} onChange={e => setBusiness(b => ({ ...b, name: e.target.value }))} />
          <FormInput label="Email" value={business.email} onChange={e => setBusiness(b => ({ ...b, email: e.target.value }))} />
          <FormInput label="Phone" value={business.phone} onChange={e => setBusiness(b => ({ ...b, phone: e.target.value }))} />
          <button type="submit" className="mt-2 px-4 py-2 rounded-lg bg-primary text-white font-semibold hover:opacity-90 transition w-max">Save</button>
        </form>
      </div>

      {/* Security Settings */}
      <div className="glass-card p-6 flex flex-col gap-4 max-w-xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="p-2 rounded-lg bg-success/10 text-success"><LucideShieldCheck size={20} /></span>
          <span className="text-base font-bold text-white">Security</span>
        </div>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-white/80 text-sm">2FA:</span>
          <button onClick={() => setTwoFA(v => !v)} className={`px-3 py-1 rounded-lg text-xs font-semibold transition border border-border ${twoFA ? "bg-success text-white" : "bg-bg-card text-white/70 hover:bg-primary/10"}`}>
            {twoFA ? "Enabled" : "Enable"}
          </button>
        </div>
        <form className="flex flex-col gap-3">
          <FormInput label="Current Password" type="password" value={password.current} onChange={e => setPassword(p => ({ ...p, current: e.target.value }))} />
          <FormInput label="New Password" type="password" value={password.new} onChange={e => setPassword(p => ({ ...p, new: e.target.value }))} />
          <button type="submit" className="mt-2 px-4 py-2 rounded-lg bg-primary text-white font-semibold hover:opacity-90 transition w-max">Change Password</button>
        </form>
        <button className="mt-2 px-4 py-2 rounded-lg bg-error text-white font-semibold hover:opacity-90 transition w-max">Reset API Keys</button>
      </div>

      {/* Team Management (UI only) */}
      <div className="glass-card p-6 flex flex-col gap-4 max-w-xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="p-2 rounded-lg bg-primary/10 text-primary"><LucideUsers size={20} /></span>
          <span className="text-base font-bold text-white">Team Access</span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-white/90">
            <span className="font-medium">John Doe</span>
            <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">Admin</span>
          </div>
          <div className="flex items-center justify-between text-white/90">
            <span className="font-medium">Jane Smith</span>
            <span className="text-xs bg-white/10 text-white px-2 py-1 rounded">Business User</span>
          </div>
        </div>
        <button className="mt-2 px-4 py-2 rounded-lg bg-primary text-white font-semibold hover:opacity-90 transition w-max">Invite Team Member</button>
      </div>
    </div>
  );
}
