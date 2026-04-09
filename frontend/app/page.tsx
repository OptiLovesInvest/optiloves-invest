export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function HomePage() {
  const kycHref = "/kyc";
  const propertyHref = "/property/kin-001";
  const dashboardHref = "https://app.optilovesinvest.com";

  return (
    <main className="min-h-screen bg-white text-slate-900">

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 pt-14 pb-10">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-8 shadow-sm">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <p className="text-sm font-medium text-slate-600">
                Optiloves Invest — <span className="font-semibold">Prosper through Love and Investment.</span>
              </p>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Own a piece of African real estate.<br />From <span className="whitespace-nowrap">$50</span>.
              </h1>
              <p className="max-w-2xl text-base text-slate-700 sm:text-lg">
                Earn quarterly income in USDC through tokenized property investments — starting with Kinshasa.
                Private placement. KYC required.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              
                href={kycHref}
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
              >
                Apply to Invest
              </a>
              
                href={dashboardHref}
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
              >
                Investor Dashboard →
              </a>
              <div className="sm:ml-auto text-xs text-slate-500">
                Private placement • KYC required • Distributions paid in USDC
              </div>
            </div>

            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {[
                "Built on Solana (mainnet)",
                "Quarterly USDC distributions",
                "Wallet-based portfolio tracking",
                "KYC-verified investors only",
              ].map((t) => (
                <div key={t} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
                  <span className="mr-2">✅</span>{t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTY */}
      <section className="mx-auto max-w-6xl px-6 pb-12">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Featured Property</p>
              <h2 className="text-xl font-semibold">Kinshasa (Nsele), DR Congo</h2>
              <p className="text-sm text-slate-600">
                A residential property in Nsele — a growing district of Kinshasa with strong rental demand.
                Token holders receive rental-income distributions only (no voting rights).
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {[
                { k: "Property value", v: "$50,000" },
                { k: "Token price", v: "$50" },
                { k: "Total supply", v: "1,000 tokens" },
                { k: "Quarterly rental income", v: "$1,500" },
                { k: "Distribution", v: "$1.50 / token / quarter" },
                { k: "Payout currency", v: "USDC" },
              ].map((x) => (
                <div key={x.k} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-xs font-medium text-slate-600">{x.k}</div>
                  <div className="mt-1 text-base font-semibold text-slate-900">{x.v}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-50 p-4">
              <div className="text-sm font-semibold text-amber-900">Limited allocation available</div>
              <p className="mt-1 text-sm text-amber-800">
                First investors are already onboarded. Apply early to secure your allocation.
              </p>
            </div>

            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
              <div className="text-sm font-semibold text-slate-900">Payout policy</div>
              <p className="mt-1 text-sm text-slate-700">
                Payouts occur at the end of each calendar quarter (Mar 31, Jun 30, Sep 30, Dec 31),
                pro-rated by days held during the quarter.
              </p>
              <div className="mt-3 flex flex-col gap-1 text-sm text-slate-700">
                <div>✅ Pro-rata rental-income distributions</div>
                <div>❌ No voting rights</div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              
                href={kycHref}
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
              >
                Apply to Invest
              </a>
              
                href={propertyHref}
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
              >
                View property details
              </a>
            </div>
          </div>

          {/* TRUST SIDEBAR */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-lg font-semibold">Risk & compliance</h3>
            <p className="mt-2 text-sm text-slate-700">
              Real estate investments carry risk. Returns are not guaranteed. Optiloves Invest operates under a
              private placement model. Invest only what you can afford to hold long term.
            </p>
            <div className="mt-6 space-y-3">
              {[
                { t: "KYC required", d: "We verify investor identity for compliance and investor protection." },
                { t: "Wallet ownership", d: "Tokens are held in your wallet; portfolio tracking is wallet-based." },
                { t: "Transparent policy", d: "Payout schedule and rates are clearly stated upfront." },
              ].map((x) => (
                <div key={x.t} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-sm font-semibold">{x.t}</div>
                  <div className="mt-1 text-sm text-slate-700">{x.d}</div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              
                href={kycHref}
                className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
              >
                Apply to Invest
              </a>
              <p className="mt-2 text-xs text-slate-500 text-center">Takes under 10 minutes</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER SECTION */}
      <section className="mx-auto max-w-4xl px-6 pb-12">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">About the Founder</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">Built by someone who believes in Africa.</h2>
          <p className="mt-4 text-sm text-slate-700 leading-relaxed">
            Optiloves Invest was founded by <strong>Ruben Malungu</strong>, a London-based educator and entrepreneur.
            The mission is to make real estate investment accessible across Africa and the diaspora — through
            transparency, discipline, and long-term value creation.
          </p>
          <p className="mt-3 text-sm text-slate-700 leading-relaxed">
            The platform combines blockchain technology and real assets to deliver structured income opportunities
            backed by property — starting in Kinshasa, and growing from there.
          </p>
        </div>
      </section>

      {/* CAPITAL PHILOSOPHY */}
      <section className="mx-auto max-w-4xl px-6 pb-12">
        <h2 className="text-lg font-semibold text-slate-900">Our Capital Philosophy</h2>
        <div className="mt-4 space-y-3 text-sm text-slate-700">
          <p>Optiloves Invest allocates capital with discipline and long-term conviction.</p>
          <p>
            We focus on income-producing real assets, prioritising transparency, conservative assumptions,
            and structured quarterly distributions backed by real rental income.
          </p>
          <p className="font-medium text-slate-900">Our objective is durable growth — not rapid scale.</p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-6xl px-6 pb-12">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold">How it works</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-5">
            {[
              { n: "1", t: "Verify identity (KYC)", d: "Complete verification for private placement compliance." },
              { n: "2", t: "Connect wallet", d: "Own your tokens directly in your Phantom wallet." },
              { n: "3", t: "Purchase tokens", d: "Start from $50 per token." },
              { n: "4", t: "Track your portfolio", d: "Your holdings update automatically via your wallet." },
              { n: "5", t: "Receive USDC", d: "Quarterly distributions, pro-rated by time held." },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                    {s.n}
                  </div>
                  <div className="text-sm font-semibold">{s.t}</div>
                </div>
                <p className="mt-2 text-sm text-slate-700">{s.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            
              href={kycHref}
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
            >
              Begin with KYC
            </a>
            <span className="text-sm text-slate-600">Ready to invest? Start with $50 and build with discipline.</span>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold">FAQ</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              { q: "Are returns guaranteed?", a: "No. Real estate carries risk and returns are not guaranteed. Invest only what you can hold long term." },
              { q: "When do payouts happen?", a: "End of each calendar quarter: Mar 31, Jun 30, Sep 30, Dec 31 (pro-rated by days held during the quarter)." },
              { q: "Why do I need KYC?", a: "Because we operate under a private placement model and must verify investors for compliance and protection." },
              { q: "What rights do token holders get?", a: "Rental-income distributions only (no voting rights)." },
            ].map((f) => (
              <div key={f.q} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm font-semibold text-slate-900">{f.q}</div>
                <div className="mt-1 text-sm text-slate-700">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-slate-600">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="font-semibold text-slate-900">Optiloves Invest</div>
              <div>Prosper through Love and Investment.</div>
            </div>
            <div className="flex gap-4 text-sm">
              <a href={dashboardHref} className="text-slate-700 hover:text-slate-900 font-medium">Investor Dashboard →</a>
              <a href={kycHref} className="text-slate-700 hover:text-slate-900 font-medium">Apply to Invest</a>
            </div>
          </div>
          <div className="mt-4 text-xs text-slate-500">
            Private placement • KYC required • Invest responsibly
          </div>
          <div className="mt-2 text-xs text-slate-500">
            © {new Date().getFullYear()} Optiloves Invest. All rights reserved.
          </div>
        </div>
      </footer>

    </main>
  );
}
