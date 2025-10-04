import "./globals.css";
import type { Metadata } from "next";


import GlobalBuyButton from "@/components/GlobalBuyButton";
export const dynamic = "force-dynamic";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="theme-pan">{children}  <GlobalBuyButton />
  </body>
    </html>
  );
}
