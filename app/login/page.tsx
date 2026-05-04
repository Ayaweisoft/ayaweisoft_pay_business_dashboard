import LoginClient from "./LoginClient";

export const metadata = {
  title: "Login · Ayaweisoft Pay",
  description: "Sign in to your Ayaweisoft Pay business dashboard. Secure access for fintech teams.",
  keywords: ["login", "sign in", "authentication", "Ayaweisoft Pay", "fintech", "BaaS"],
  openGraph: {
    title: "Login · Ayaweisoft Pay",
    description: "Sign in to your Ayaweisoft Pay business dashboard. Secure access for fintech teams.",
    type: "website",
    images: [{ url: "/asp_logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Login · Ayaweisoft Pay",
    description: "Sign in to your Ayaweisoft Pay business dashboard. Secure access for fintech teams.",
    images: ["/asp_logo.png"],
  },
};

export default function Page() {
  return <LoginClient />;
}