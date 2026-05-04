import DashboardClient from "./DashboardClient";

export const metadata = {
  title: "Dashboard · Ayaweisoft Pay",
  description: "Business dashboard overview: metrics, analytics, recent activity, and health for Ayaweisoft Pay Banking-as-a-Service.",
  keywords: ["dashboard", "analytics", "metrics", "fintech", "Ayaweisoft Pay", "BaaS", "Nigeria", "Africa"],
  openGraph: {
    title: "Dashboard · Ayaweisoft Pay",
    description: "Business dashboard overview: metrics, analytics, recent activity, and health for Ayaweisoft Pay Banking-as-a-Service.",
    type: "website",
    images: [{ url: "/asp_logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dashboard · Ayaweisoft Pay",
    description: "Business dashboard overview: metrics, analytics, recent activity, and health for Ayaweisoft Pay Banking-as-a-Service.",
    images: ["/asp_logo.png"],
  },
};

export default function Page() {
  return <DashboardClient />;
}