// frontend/src/app/layout.tsx
import Link from "next/link";
import * as Sentry from "@sentry/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Optiloves Invest",
  description: "African real estate tokenization",
};

// Include Sentry trace data in metadata so errors/transactions link up nicely
export function generateMetadata(): Metadata {
  return {
    ...metadata,
    other: {
      ...(metadata.other as Record<string, any> | undefined),
      ...Sentry.getTraceData(),
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <header className="w-full bg-black text-white">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="font-semibold tracking-wide">Optiloves Invest</Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/">Properties</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/privacy">Privacy</Link>
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
