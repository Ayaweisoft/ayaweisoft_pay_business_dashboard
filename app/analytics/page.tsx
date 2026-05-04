import AnalyticsClient from "./AnalyticsClient";

export const metadata = {
  title: "Analytics · Ayaweisoft Pay",
  description: "Analyze your business performance with Ayaweisoft Pay's analytics dashboard. Track key metrics and visualize trends.",
  keywords: ["analytics", "dashboard", "fintech", "Ayaweisoft Pay"],
  openGraph: {
    title: "Analytics · Ayaweisoft Pay",
    description: "Analyze your business performance with Ayaweisoft Pay's analytics dashboard.",
    type: "website",
    images: [{ url: "/asp_logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Analytics · Ayaweisoft Pay",
    images: ["/asp_logo.png"],
  },
};

export default function Page() {
  return <AnalyticsClient />;
}