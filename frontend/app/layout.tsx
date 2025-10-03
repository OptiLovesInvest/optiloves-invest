import "../styles/ui.css";
import GlobalBuyButton from "../components/GlobalBuyButton";
import "../styles/ui-polish.css";
import type { Metadata } from "next";
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL("https://optilovesinvest.com"),
  title: "Optiloves Invest - Tokenized access to African real estate",
  description: "Invest from $50 per token. Focus: Kinshasa & Luanda. Fighting poverty with love and investment.",
  openGraph: {
    title: "Optiloves Invest",
    description: "Invest from $50 per token. Focus: Kinshasa & Luanda.",
    url: "https://optilovesinvest.com",
    siteName: "Optiloves Invest",
    type: "website",
    images: ["/og/og-card.png"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Optiloves Invest",
    description: "Invest from $50 per token. Focus: Kinshasa & Luanda.",
    images: ["/og/og-card.png"]
  }
};

import BuyAnchorShim from "@/components/BuyAnchorShim";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{/* build:76e62e58 */}{children}  <BuyAnchorShim />
    </body>
    </html>
  );
}

