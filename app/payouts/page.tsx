import PayoutsClient from "./PayoutsClient";

export const metadata = {
  title: "Payouts · Ayaweisoft Pay",
  description: "Send single or bulk payouts to any bank account. View payout history and manage transfers in Ayaweisoft Pay.",
  keywords: ["payouts", "transfers", "bulk transfer", "Ayaweisoft Pay", "fintech", "BaaS"],
  openGraph: {
    title: "Payouts · Ayaweisoft Pay",
    description: "Send single or bulk payouts to any bank account. View payout history and manage transfers in Ayaweisoft Pay.",
    type: "website",
    images: [{ url: "/asp_logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Payouts · Ayaweisoft Pay",
    description: "Send single or bulk payouts to any bank account. View payout history and manage transfers in Ayaweisoft Pay.",
    images: ["/asp_logo.png"],
  },
};

export default function Page() {
  return <PayoutsClient />;
}