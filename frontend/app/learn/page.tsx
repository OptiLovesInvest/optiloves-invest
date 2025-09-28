export const metadata = {
  title: "Learn â€” Optiloves Invest",
  description: "How Optiloves Invest works: tokens, rental income, fees, and security.",
};

export default function LearnPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10 space-y-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">Learn</h1>
        <p className="text-gray-600">Quick answers to how Optiloves Invest works.</p>
      </header>

      <section className="space-y-4">
        <details className="border rounded-xl p-5" open>
          <summary className="font-semibold cursor-pointer">What is a property token?</summary>
          <p className="mt-2 text-gray-700">
            A digital unit that represents exposure to a specific realâ€‘estate project listed on our platform.
            Tokens are recorded on blockchain for transparent balances and transfers.
          </p>
        </details>

        <details className="border rounded-xl p-5">
          <summary className="font-semibold cursor-pointer">What is the minimum investment?</summary>
          <p className="mt-2 text-gray-700">$50 per token. You can buy 1 token or more.</p>
        </details>

        <details className="border rounded-xl p-5">
          <summary className="font-semibold cursor-pointer">How are funds used?</summary>
          <p className="mt-2 text-gray-700">
            95% of funds go directly into developing new rental properties (starting with Kinshasa â€” Nsele HQ).
            Up to 5% covers administration and operations (legal, accounting, platform, property management).
          </p>
        </details>

        <details className="border rounded-xl p-5">
          <summary className="font-semibold cursor-pointer">Do token holders receive rental income?</summary>
          <p className="mt-2 text-gray-700">
            Yes. Net rental income is shared with token holders proportionally to the number of tokens they hold.
          </p>
        </details>

        <details className="border rounded-xl p-5">
          <summary className="font-semibold cursor-pointer">Which blockchain do you use?</summary>
          <p className="mt-2 text-gray-700">
            The MVP uses Solana for fast, lowâ€‘cost transactions. Wallet integrations (e.g., Phantom) allow you to view and manage your tokens.
          </p>
        </details>

        <details className="border rounded-xl p-5">
          <summary className="font-semibold cursor-pointer">Is KYC required?</summary>
          <p className="mt-2 text-gray-700">
            Yes, to protect investors and comply with regulations. Start at the KYC page before purchasing tokens.
          </p>
        </details>

        <details className="border rounded-xl p-5">
          <summary className="font-semibold cursor-pointer">Where do I start?</summary>
          <p className="mt-2 text-gray-700">
            Visit the Properties page, select a project, and choose â€œBuyâ€. New investors should review the Investor Pledge first.
          </p>
        </details>
      </section>

      <footer className="text-xs text-gray-500">
        Â© 2025 Optiloves Invest â€¢ FIGHTING POVERTY WITH LOVE AND INVESTMENT
      </footer>
    </main>
  );
}

