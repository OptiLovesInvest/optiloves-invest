export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-white text-black p-6">
      <h1 className="text-3xl font-bold">Optiloves Invest Dashboard</h1>
      <p className="mt-2 text-sm">Prosper through Love and Investment.</p>

      <section className="mt-8 grid gap-4 md:grid-cols-4">
        <div className="border p-4">
          <p className="text-sm">Assets Under Management</p>
          <h2 className="text-2xl font-semibold">$50,000</h2>
        </div>

        <div className="border p-4">
          <p className="text-sm">Active Properties</p>
          <h2 className="text-2xl font-semibold">1</h2>
        </div>

        <div className="border p-4">
          <p className="text-sm">Token Supply</p>
          <h2 className="text-2xl font-semibold">1,000</h2>
        </div>

        <div className="border p-4">
          <p className="text-sm">Quarterly Rental Income</p>
          <h2 className="text-2xl font-semibold">$1,500</h2>
        </div>
      </section>

      <section className="mt-8 border p-4">
        <h2 className="text-xl font-semibold">Investment Terms</h2>
        <div className="mt-4 space-y-2 text-sm">
          <p><strong>Network:</strong> Solana Mainnet</p>
          <p><strong>Minimum Initial Allocation:</strong> $100</p>
          <p><strong>Maximum per Investor:</strong> $1,000</p>
          <p><strong>Distribution:</strong> $1.50 per token per quarter</p>
          <p><strong>Payout Currency:</strong> USDC</p>
          <p><strong>KYC:</strong> Required</p>
          <p><strong>Rights:</strong> Rental-income only, no voting rights</p>
          <p><strong>Exit Policy:</strong> 90-day written notice, subject to available liquidity</p>
        </div>
      </section>
    </main>
  );
}
