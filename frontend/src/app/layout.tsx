// frontend/src/app/layout.tsx
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Optiloves Invest",
  description: "African real estate tokenization — $1 per token.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <header className="w-full bg-black text-white">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-6">
            <Link href="/" className="font-semibold tracking-wide text-white">
              Optiloves Invest
            </Link>
            <nav className="ml-auto flex items-center gap-5 text-sm">
              <Link href="/">Properties</Link>
              <Link href="/account">Account</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/privacy">Privacy</Link>
              <span className="h-5 w-px bg-white/25 mx-1 hidden sm:inline-block" />
              <span className="opacity-80">Language:</span>
              <Link className="rounded-lg px-2 py-1 bg-white/10 hover:bg-white/20" href="/?lng=en">EN</Link>
              <Link className="rounded-lg px-2 py-1 bg-white/10 hover:bg-white/20" href="/?lng=fr">FR</Link>
              <Link className="rounded-lg px-2 py-1 bg-white/10 hover:bg-white/20" href="/?lng=lg">LG</Link>
              <Link className="rounded-lg px-2 py-1 bg-white/10 hover:bg-white/20" href="/?lng=pt">PT</Link>
            </nav>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 py-6">{children}</main>

        <footer className="max-w-5xl mx-auto px-4 py-10 text-sm text-gray-500">
          <div className="border-t pt-6 flex flex-wrap items-center justify-between gap-4">
            <span>© {new Date().getFullYear()} Optiloves Invest</span>
            <div className="flex gap-5">
              <Link href="/terms">Terms</Link>
              <Link href="/privacy">Privacy</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
