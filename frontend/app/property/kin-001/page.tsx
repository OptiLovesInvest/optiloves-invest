import Link from "next/link";

export default function Page() {
  return (
    <main className="p-6 space-y-4">
      <h1>KIN-001</h1>
      <p>Buy a token for KIN-001.</p>

      {/* Single Buy CTA */}
      <Link
        href="/api/checkout?property=kin-001"
        className="px-4 py-2 border rounded-lg font-bold"
        id="buy-kin-001"
        aria-label="Buy"
        data-buy
      >
        Buy
      </Link>
    </main>
  );
}
