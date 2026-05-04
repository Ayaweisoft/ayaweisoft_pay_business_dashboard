import WalletsClient from "./WalletsClient";

export const metadata = {
  title: "Wallets · Ayaweisoft Pay",
  description: "Manage your business wallets and balances. Create, view, and organize NGN and USD wallets in Ayaweisoft Pay.",
  keywords: ["wallets", "balances", "virtual wallet", "Ayaweisoft Pay", "fintech", "BaaS"],
  openGraph: {
    title: "Wallets · Ayaweisoft Pay",
    description: "Manage your business wallets and balances. Create, view, and organize NGN and USD wallets in Ayaweisoft Pay.",
    type: "website",
    images: [{ url: "/asp_logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wallets · Ayaweisoft Pay",
    description: "Manage your business wallets and balances. Create, view, and organize NGN and USD wallets in Ayaweisoft Pay.",
    images: ["/asp_logo.png"],
  },
};

export default function Page() {
  return <WalletsClient />;
}