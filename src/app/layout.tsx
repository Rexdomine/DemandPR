import type { Metadata } from "next";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { getSiteUrl } from "@/lib/site-url";

import "./globals.css";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: siteUrl,
  alternates: siteUrl ? { canonical: "/" } : undefined,
  title: {
    default: "Demand PR | Africa Market Entry & Business Growth",
    template: "%s | Demand PR",
  },
  description:
    "Strategic market-entry advisory, investor support and stakeholder engagement for organisations expanding across African markets.",
  applicationName: "Demand PR",
  openGraph: {
    title: "Demand PR",
    description: "Expand into Africa with confidence.",
    type: "website",
    locale: "en_GB",
    url: siteUrl,
  },
  twitter: {
    card: "summary",
    title: "Demand PR",
    description: "Expand into Africa with confidence.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
