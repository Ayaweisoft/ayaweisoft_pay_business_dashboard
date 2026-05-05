

"use client";
import { ReactNode } from "react";
import { Sidebar } from "../../components/Sidebar";
import { Topbar } from "../../components/Topbar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full max-w-full overflow-x-hidden bg-bg-dark">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        <Topbar />
        <main className="flex-1 min-w-0 flex justify-center overflow-x-hidden bg-bg-dark/90">
          <div className="w-full max-w-[1440px] min-w-0">{children}</div>
        </main>
      </div>
    </div>
  );
}
