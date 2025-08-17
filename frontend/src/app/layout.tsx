// frontend/src/app/layout.tsx
import Link from "next/link";
import * as Sentry from "@sentry/nextjs";
import type { Metadata } from "next";

// Use ONLY generateMetadata (do not export `metadata`)
const baseMeta: Metadata = {
  title: "Optiloves Invest",
  description: "African real estate tokenization",
};

export function generateMetadata(): Metadata {
  return {
    ...baseMeta,
    other: {
      ...(baseMeta.other as Record<string, any> | undefined),
      ...Sentry.getTraceData(),
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <header className="w-full bg-black text-white">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4">
            <Link href="/" className="font-semibold tracking-wide flex items-center gap-2">
              <img src="/logo.png" alt="logo" className="h-7 w-7 rounded" />
              Optiloves Invest
            </Link>
            <nav className="ml-auto flex items-center gap-4 text-sm">
              <Link href="/">Properties</Link>
              <Link href="/account">Account</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/privacy">Privacy</Link>
              <span className="opacity-60">|</span>
              <span className="opacity-80">Language:</span>
              <Link href="/?lng=en">EN</Link>
              <Link href="/?lng=fr">FR</Link>
              <Link href="/?lng=lg">LG</Link>
              <Link href="/?lng=pt">PT</Link>
            </nav>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 py-6">{children}</main>

        <footer className="max-w-5xl mx-auto px-4 py-10 text-sm text-gray-500">
          <div className="border-t pt-6 flex items-center justify-between">
            <span>© {new Date().getFullYear()} Optiloves Invest</span>
            <div className="flex gap-4">
              <Link href="/terms">Terms</Link>
              <Link href="/privacy">Privacy</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
