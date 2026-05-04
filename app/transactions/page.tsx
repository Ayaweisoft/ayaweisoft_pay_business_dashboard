import TransactionsClient from "./TransactionsClient";

export const metadata = {
  title: "Transactions · Ayaweisoft Pay",
  description: "View and filter all business transactions. Search, filter, and audit your transaction history in Ayaweisoft Pay.",
  keywords: ["transactions", "history", "audit", "Ayaweisoft Pay", "fintech", "BaaS"],
  openGraph: {
    title: "Transactions · Ayaweisoft Pay",
    description: "View and filter all business transactions. Search, filter, and audit your transaction history in Ayaweisoft Pay.",
    type: "website",
    images: [{ url: "/asp_logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Transactions · Ayaweisoft Pay",
    description: "View and filter all business transactions. Search, filter, and audit your transaction history in Ayaweisoft Pay.",
    images: ["/asp_logo.png"],
  },
};

export default function Page() {
  return <TransactionsClient />;
}