import VirtualAccountsClient from "./VirtualAccountsClient";

export const metadata = {
  title: "Virtual Accounts · Ayaweisoft Pay",
  description: "Manage and create virtual accounts for your business. View transactions and balances in Ayaweisoft Pay.",
  keywords: ["virtual accounts", "VA", "Ayaweisoft Pay", "fintech", "BaaS"],
  openGraph: {
    title: "Virtual Accounts · Ayaweisoft Pay",
    description: "Manage and create virtual accounts for your business. View transactions and balances in Ayaweisoft Pay.",
    type: "website",
    images: [{ url: "/asp_logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Virtual Accounts · Ayaweisoft Pay",
    description: "Manage and create virtual accounts for your business. View transactions and balances in Ayaweisoft Pay.",
    images: ["/asp_logo.png"],
  },
};

export default function Page() {
  return <VirtualAccountsClient />;
}