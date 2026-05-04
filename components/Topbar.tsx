import { LucideBell, LucideUser, LucideSettings, LucideSearch } from "lucide-react";
import Image from "next/image";

export function Topbar() {
  return (
    <header className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-border bg-bg-dark/80 backdrop-blur z-10">
      <div className="flex items-center gap-3 min-w-30">
        {/* <Image src="/asp_logo.png" alt="Ayaweisoft Pay Logo" width={32} height={32} className="rounded-lg bg-white/10" /> */}
        {/* <span className="text-primary font-bold text-lg tracking-tight hidden sm:inline">Ayaweisoft Pay</span> */}
      </div>
      <div className="flex items-center gap-2 w-1/2 max-w-lg flex-1">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search Transactions..."
            className="w-full bg-bg-card/80 border border-border rounded-lg px-4 py-2 pl-10 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary transition"
          />
          <LucideSearch className="absolute left-3 top-2.5 text-white/50" size={18} />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-bg-card transition">
          <LucideBell className="text-white" size={20} />
        </button>
        <button className="p-2 rounded-full hover:bg-bg-card transition">
          <LucideUser className="text-white" size={20} />
        </button>
        <button className="p-2 rounded-full hover:bg-bg-card transition">
          <LucideSettings className="text-white" size={20} />
        </button>
      </div>
    </header>
  );
}
