export const metadata = {
  metadataBase: new URL("https://app.optilovesinvest.com"),
  title: "Optiloves Invest — Tokenized African Real Estate",
  description: "Invest from  per token. Focus: Kinshasa & Luanda.",
  openGraph: {
    title: "Optiloves Invest",
    description: "Tokenized access to African real estate.",
    url: "/",
    images: ["/logo.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Optiloves Invest",
    description: "Tokenized access to African real estate.",
    images: ["/logo.svg"],
  },
  icons: { icon: "/favicon.svg" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body className="antialiased">{children}</body></html>);
}
