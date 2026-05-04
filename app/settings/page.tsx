import SettingsClient from "./SettingsClient";

export const metadata = {
  title: "Settings · Ayaweisoft Pay",
  description: "Manage business info, security, and team access in Ayaweisoft Pay settings.",
  keywords: ["settings", "security", "team", "Ayaweisoft Pay", "fintech", "BaaS"],
  openGraph: {
    title: "Settings · Ayaweisoft Pay",
    description: "Manage business info, security, and team access in Ayaweisoft Pay settings.",
    type: "website",
    images: [{ url: "/asp_logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Settings · Ayaweisoft Pay",
    images: ["/asp_logo.png"],
  },
};

export default function Page() {
  return <SettingsClient />;
}