import SystemHealthClient from "./SystemHealthClient";

export const metadata = {
  title: "System Health · Ayaweisoft Pay",
  description: "Monitor service uptime, latency, and incident history across Ayaweisoft Pay infrastructure.",
  keywords: ["system health", "status", "uptime", "latency", "Ayaweisoft Pay", "BaaS"],
  openGraph: {
    title: "System Health · Ayaweisoft Pay",
    description: "Monitor service uptime, latency, and incident history.",
    type: "website",
    images: [{ url: "/asp_logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "System Health · Ayaweisoft Pay",
    images: ["/asp_logo.png"],
  },
};

export default function Page() {
  return <SystemHealthClient />;
}
