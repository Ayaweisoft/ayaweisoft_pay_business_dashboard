import NotificationsClient from "./NotificationsClient";

export const metadata = {
  title: "Notifications · Ayaweisoft Pay",
  description: "Track system alerts, payouts, transactions, and account events in one notification center.",
  keywords: ["notifications", "alerts", "activity", "Ayaweisoft Pay", "fintech", "BaaS"],
  openGraph: {
    title: "Notifications · Ayaweisoft Pay",
    description: "Track system alerts and account events in one place.",
    type: "website",
    images: [{ url: "/asp_logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Notifications · Ayaweisoft Pay",
    images: ["/asp_logo.png"],
  },
};

export default function Page() {
  return <NotificationsClient />;
}
