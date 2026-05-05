import ForgotPasswordClient from "./ForgotPasswordClient";

export const metadata = {
  title: "Forgot Password · Ayaweisoft Pay",
  description: "Reset your Ayaweisoft Pay account password securely.",
  keywords: ["forgot password", "reset password", "Ayaweisoft Pay", "authentication"],
  openGraph: {
    title: "Forgot Password · Ayaweisoft Pay",
    description: "Reset your Ayaweisoft Pay account password securely.",
    type: "website",
    images: [{ url: "/asp_logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Forgot Password · Ayaweisoft Pay",
    description: "Reset your Ayaweisoft Pay account password securely.",
    images: ["/asp_logo.png"],
  },
};

export default function Page() {
  return <ForgotPasswordClient />;
}
