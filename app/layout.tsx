import type { Metadata, Viewport } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";

// ─── Fonts ────────────────────────────────────────────────────────────────────
// DM Sans: clean, modern, highly legible — perfect for fintech UI labels & body
// DM Serif Display: editorial weight for hero headlines only
const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: "Ayaweisoft Pay — Banking as a Service",
    template: "%s · Ayaweisoft Pay",
  },
  description:
    "Modern Banking-as-a-Service dashboard. Send, receive, and manage money at scale — built for African fintech teams.",
  keywords: ["fintech", "payments", "banking", "BaaS", "Nigeria", "Africa"],
  authors: [{ name: "Ayaweisoft Technologies" }],
  robots: { index: false, follow: false },
  icons: {
    icon: "/asp_logo.png",
    apple: "/asp_logo.png",
  },
  openGraph: {
    title: "Ayaweisoft Pay — Banking as a Service",
    description: "Pay · Transfer · Grow",
    type: "website",
    images: [{ url: "/asp_logo.png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#060D1F",
  width: "device-width",
  initialScale: 1,
};

// ─── Layout ───────────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${dmSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-white selection:bg-primary/30 selection:text-white">
        <div className="flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}