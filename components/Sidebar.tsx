"use client";

import { 
  LucideHome, LucideCreditCard, LucideBanknote, LucideSend, 
  LucideList, LucideBarChart, LucidePlug, LucideSettings, 
  LucideMenu, LucideX 
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState, memo } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Utility for cleaner tailwind classes */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const NAV_ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: LucideHome },
  { name: "Wallets", href: "/wallets", icon: LucideCreditCard },
  { name: "Virtual Accounts", href: "/virtual-accounts", icon: LucideBanknote },
  { name: "Payouts", href: "/payouts", icon: LucideSend },
  { name: "Transactions", href: "/transactions", icon: LucideList },
  { name: "Analytics", href: "/analytics", icon: LucideBarChart },
  { name: "API & Webhooks", href: "/api", icon: LucidePlug },
  { name: "Settings", href: "/settings", icon: LucideSettings },
] as const;

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Trigger Button - Mobile Only */}
      {!isOpen && (
        <button
          className="fixed top-4 left-4 z-40 md:hidden p-2 rounded-lg bg-bg-dark/80 border border-border text-white backdrop-blur-sm transition-all hover:scale-105 active:scale-95"
          onClick={toggleSidebar}
          aria-label="Open navigation"
        >
          <LucideMenu size={24} />
        </button>
      )}

      {/* Backdrop Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={closeSidebar}
      />

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-screen w-64 bg-bg-dark/90 glass-card shadow-glass flex flex-col px-4 py-6 transition-transform duration-300 ease-in-out md:static md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header Section */}
        <div className="flex items-center justify-between mb-10 px-2">
          <Link href="/dashboard" className="flex items-center gap-3 group" onClick={closeSidebar}>
            <Image 
              src="/asp_logo.png" 
              alt="Ayaweisoft Pay" 
              width={36}
              height={36}
              className="object-contain opacity-80 drop-shadow-[0_2px_8px_rgba(46,91,255,0.15)] transition-transform group-hover:scale-110"
            />
            <span className="text-white font-bold text-lg tracking-tight">
              Ayaweisoft <span className="text-primary">Pay</span>
            </span>
          </Link>
          
          <button
            className="md:hidden p-2 rounded-md hover:bg-white/5 transition text-white/60"
            onClick={closeSidebar}
            aria-label="Close navigation"
          >
            <LucideX size={20} />
          </button>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 flex flex-col gap-1.5 overflow-y-auto custom-scrollbar">
          {NAV_ITEMS.map((item) => (
            <NavItem 
              key={item.href} 
              {...item} 
              isActive={pathname.startsWith(item.href)} 
              onClick={closeSidebar}
            />
          ))}
        </nav>

        {/* Footer/User Section Placeholder */}
        <div className="pt-4 mt-4">
          <div className="px-4 py-3 rounded-xl bg-white/5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                    JD
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white truncate">John Doe</p>
                    <p className="text-[10px] text-white/40 truncate">Free Tier</p>
                </div>
            </div>
        </div>
      </aside>
    </>
  );
}

/** 
 * Sub-component for individual Nav Items
 * Memoized to prevent re-renders when the sidebar toggle state changes
 */
const NavItem = memo(({ name, href, icon: Icon, isActive, onClick }: any) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 font-medium text-sm group",
        isActive 
          ? "bg-primary text-white shadow-lg shadow-primary/20" 
          : "text-white/60 hover:bg-white/5 hover:text-white"
      )}
    >
      <Icon 
        size={18} 
        className={cn(
          "transition-colors", 
          isActive ? "text-white" : "text-white/40 group-hover:text-white"
        )} 
      />
      <span>{name}</span>
    </Link>
  );
});

NavItem.displayName = "NavItem";