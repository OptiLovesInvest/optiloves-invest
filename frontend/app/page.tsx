export default function Home() {
  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-3xl">
        <header className="pt-10">
          <h1 className="text-4xl font-bold tracking-tight">Optiloves Invest</h1>
          <p className="mt-2 text-lg opacity-90">Prosper through Love and Investment.</p>

          <p className="mt-6 text-base leading-relaxed">
            Invest in tokenized African real estate from <strong>$50</strong>. Earn quarterly <strong>USDC</strong> income backed by real rental
            property. <strong>Private placement</strong>. <strong>KYC required</strong>.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/buy/checkout"
              className="inline-block rounded-xl px-5 py-2 border font-medium"
            >
              Invest Now
            </a>
            <a
              href="#property"
              className="inline-block rounded-xl px-5 py-2 border opacity-90 ml-2"
            >
              View Property
            </a>
          </div>

          <div className="mt-6 rounded-2xl border p-4">
            <ul className="grid gap-2 sm:grid-cols-2 text-sm">
              <li>✅ Mainnet token issued (Solana)</li>
              <li>✅ Quarterly distribution (USDC)</li>
              <li>✅ Wallet-based portfolio tracking</li>
              <li>✅ KYC-verified private investors</li>
            </ul>
          </div>
        </header>

        <section id="property" className="mt-10">
          <h2 className="text-2xl font-semibold">Featured Property — Kinshasa (Nsele)</h2>
          <div className="mt-4 rounded-2xl border p-4">
            <dl className="grid gap-3 sm:grid-cols-2 text-sm">
              <div>
                <dt className="opacity-70">Property Value</dt>
                <dd className="font-medium">$50,000</dd>
              </div>
              <div>
                <dt className="opacity-70">Token Price</dt>
                <dd className="font-medium">$50</dd>
              </div>
              <div>
                <dt className="opacity-70">Total Supply</dt>
                <dd className="font-medium">1,000 tokens</dd>
              </div>
              <div>
                <dt className="opacity-70">Quarterly Rental Income</dt>
                <dd className="font-medium">$1,500</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="opacity-70">Distribution</dt>
                <dd className="font-medium">.50 per token per quarter (USDC)</dd>
            <p className="mt-2 text-sm opacity-85">
              Token holders receive rental-income distributions only (no voting rights).
            </p>
              </div>
            </dl>

            <p className="mt-4 text-sm opacity-85">
              Payouts occur at the end of each calendar quarter (Mar 31, Jun 30, Sep 30, Dec 31), pro-rated by days held during the quarter.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">How it works</h2>
          <ol className="mt-4 grid gap-3 text-sm">
            <li className="rounded-2xl border p-4">1) Complete KYC verification</li>
            <li className="rounded-2xl border p-4">2) Connect your wallet</li>
            <li className="rounded-2xl border p-4">3) Purchase tokens</li>
            <li className="rounded-2xl border p-4">4) Track holdings in your portfolio</li>
            <li className="rounded-2xl border p-4">5) Receive quarterly USDC income</li>
          </ol>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Risk & compliance</h2>
          <div className="mt-4 rounded-2xl border p-4 text-sm opacity-90">
            Real estate investments carry risk. Returns are not guaranteed. Optiloves Invest operates under a private placement model.
            Invest only what you can afford to hold long term.
          </div>
        </section>

        <footer className="mt-12 pb-10">
          <div className="rounded-2xl border p-4">
            <p className="text-sm">
              Ready to invest? Start with $50 and build with discipline.
            </p>
            <a
              href="/buy/checkout"
              className="inline-block mt-3 rounded-xl px-5 py-2 border font-medium"
            >
              Begin Investment
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}


