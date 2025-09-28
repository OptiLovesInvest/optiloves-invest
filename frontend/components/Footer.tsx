import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t mt-10">
      <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>Ã‚Â© 2025 OptiLoves Invest</div>
        <div className="flex items-center gap-4">
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/api/checkout">KYC</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
}


