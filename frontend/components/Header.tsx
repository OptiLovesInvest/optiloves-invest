import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <nav className="mx-auto max-w-5xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold">OptiLoves</Link>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/properties">Properties</Link>
          <Link href="/api/checkout">KYC</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy" className="hidden sm:inline">Privacy</Link>
          <Link href="/terms" className="hidden sm:inline">Terms</Link>
        </div>
      </nav>
    </header>
  );
}
