import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 space-y-6">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="text-gray-600">The page you’re looking for doesn’t exist.</p>
      <div className="flex gap-3">
        <Link href="/" className="rounded-lg px-4 py-2 border">Go home</Link>
        <Link href="/properties" className="rounded-lg px-4 py-2 bg-black text-white">View properties</Link>
        <Link href="/pledge" className="rounded-lg px-4 py-2 border">Read our Investor Pledge</Link>
      </div>
      <p className="text-xs text-gray-500 pt-6">© 2025 Optiloves Invest • FIGHTING POVERTY WITH LOVE AND INVESTMENT</p>
    </main>
  );
}

