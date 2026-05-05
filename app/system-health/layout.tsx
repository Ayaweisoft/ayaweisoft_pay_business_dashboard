"use client";

import { ReactNode } from "react";
import { Sidebar } from "../../components/Sidebar";
import { Topbar } from "../../components/Topbar";

export default function SectionLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full max-w-full overflow-x-hidden bg-bg-dark">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        <Topbar />
        <main className="flex-1 min-w-0 overflow-x-hidden p-3 sm:p-4 md:p-6 bg-bg-dark/90">{children}</main>
      </div>
    </div>
  );
}
