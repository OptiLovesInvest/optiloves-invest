import Image from 'next/image';
import Link from 'next/link';
export default function Page() {
  const PROPERTY = { id: "kin-nsele", title: "Kinshasa - Nsele HQ", tokenPrice: 50, availableLabel: "Available soon" };

  return (
    <main className="min-h-screen flex flex-col">
      {/* Header (logo 50px) */}
      <header className="w-full border-b bg-white">
        <div className="mx-auto max-w-3xl px-3 py-2 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <Image src="/logo/optiloves-logo.png" alt="Optiloves Invest" width={200} height={50} priority />
          </a>
          <nav className="text-xs flex items-center gap-4">
            <a href="/properties">Properties</a><a href="/learn">Learn</a><a href="/kyc">KYC</a><a href="/?lang=en">EN</a>
          </nav>
        </div>
      </header>

      {/* Hero (one tiny Ndaku image) */}
      <section className="w-full bg-gray-50">
        <div className="mx-auto max-w-3xl px-3 py-3 grid gap-3">
          <div className="overflow-hidden rounded-md border">
            <div className="relative w-full h-[60px]">
  <Image src="/images/ndaku.jpg" alt="Ndaku - Nsele HQ" fill className="object-cover object-center" />
</div>
          </div>
          <div className="grid gap-2">
            <h1 className="text-base font-semibold">Tokenized access to African real estate.</h1>
            <p className="text-xs">Invest from $50 per token. Focus: Kinshasa.</p>
            <div className="flex flex-wrap gap-2 pt-1">
              <a href="/properties">View properties</a> Â· <a href="/pledge">Read our Investor Pledge</a>
            </div>
          </div>
        </div>
      </section>

      {/* Properties: one card, no image */}
      <section className="w-full">
        <div className="mx-auto max-w-3xl px-3 py-3">
          <h2 className="text-sm font-semibold mb-2">Properties</h2>
          <article className="rounded-md border">
            <div className="p-3 grid gap-2">
              <h3 className="font-semibold">{PROPERTY.title}</h3>
              <div className="text-xs">
                <div>Token price: ${PROPERTY.tokenPrice}</div>
                <div>Available: {PROPERTY.availableLabel}</div>
              </div>
              <div className="pt-2 flex gap-2">
                <a href={`/property/${PROPERTY.id}`} className="px-3 py-1 rounded border text-xs hover:bg-gray-100">View</a>
                <a href="/api/checkout" className="px-3 py-1 rounded border text-xs hover:bg-gray-100">Buy</a>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Footer (ASCII) */}
      <footer className="mt-auto w-full border-t bg-white">
        <div className="mx-auto max-w-3xl px-3 py-3 text-xs">
          <div className="flex flex-wrap gap-3">
            <span>(c) 2025 Optiloves Invest</span>
            <a href="/terms">Terms</a><a href="/privacy">Privacy</a><a href="/contact">Contact</a>
          </div>
          <div className="text-gray-600 mt-1">FIGHTING POVERTY WITH LOVE AND INVESTMENT</div>
        </div>
      </footer>
    </main>
  );
}


