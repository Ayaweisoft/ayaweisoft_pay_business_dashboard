import ApiClient from "./ApiClient";

export const metadata = {
  title: "API & Webhooks · Ayaweisoft Pay",
  description: "Manage your API keys, configure webhook endpoints, and view integration logs for Ayaweisoft Pay.",
  keywords: ["api", "webhooks", "developer", "fintech", "Ayaweisoft Pay", "BaaS"],
  openGraph: {
    title: "API & Webhooks · Ayaweisoft Pay",
    description: "Manage your API keys and webhook configurations.",
    type: "website",
    images: [{ url: "/asp_logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "API & Webhooks · Ayaweisoft Pay",
    images: ["/asp_logo.png"],
  },
};

export default function Page() {
  return <ApiClient />;
}