

"use client";
import { ReactNode } from "react";
import { Sidebar } from "../../components/Sidebar";
import { Topbar } from "../../components/Topbar";
import { Footer } from "../../components/Footer";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-bg-dark">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <Topbar />
        <main className="flex-1 p-6 bg-bg-dark/90">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
