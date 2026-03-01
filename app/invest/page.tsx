export const dynamic = "force-dynamic";

export default function InvestPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold">Invest with Optiloves Invest</h1>

      <p className="mt-4 text-base">
        Optiloves Invest is a private investment platform focused on disciplined capital allocation
        and long-term value creation.
      </p>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">How it works</h2>
        <ol className="mt-3 list-decimal pl-6 space-y-2">
          <li>Complete identity verification (KYC).</li>
          <li>Confirm your Solana wallet address.</li>
          <li>Select your allocation (min \, max \,000).</li>
          <li>Receive confirmation and portfolio visibility.</li>
        </ol>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Current allocation policy</h2>
        <ul className="mt-3 list-disc pl-6 space-y-2">
          <li>Minimum: \</li>
          <li>Maximum per investor: \,000</li>
          <li>Selective onboarding (private placement phase)</li>
        </ul>
      </section>

      <a className="mt-10 inline-block rounded-xl px-5 py-3 text-base font-medium shadow" href="/apply">
        Apply to Invest
      </a>

      <p className="mt-8 text-sm opacity-80">
        Optiloves Invest — Prosper through Love and Investment.
      </p>
    </main>
  );
}