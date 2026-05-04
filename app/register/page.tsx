import RegisterClient from "./RegisterClient";

export const metadata = {
  title: "Register · Ayaweisoft Pay",
  description: "Create your Ayaweisoft Pay business account. Register to access modern BaaS tools for African fintech.",
  keywords: ["register", "sign up", "create account", "Ayaweisoft Pay", "fintech", "BaaS"],
  openGraph: {
    title: "Register · Ayaweisoft Pay",
    description: "Create your Ayaweisoft Pay business account. Register to access modern BaaS tools for African fintech.",
    type: "website",
    images: [{ url: "/asp_logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Register · Ayaweisoft Pay",
    description: "Create your Ayaweisoft Pay business account. Register to access modern BaaS tools for African fintech.",
    images: ["/asp_logo.png"],
  },
};

export default function Page() {
  return <RegisterClient />;
}