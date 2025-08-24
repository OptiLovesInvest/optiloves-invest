import Image from "next/image";
import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo-optiloves.png" alt="Optiloves Invest" width={36} height={36} priority />
          <span className="text-base font-semibold">Optiloves Invest</span>
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link href="/properties" className="hover:underline">Properties</Link>
          <Link href="/account" className="hover:underline">Account</Link>
          <Link href="/terms" className="hover:underline">Terms</Link>
          <Link href="/privacy" className="hover:underline">Privacy</Link>
        </nav>
      </div>
    </header>
  );
}

