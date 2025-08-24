export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative">
        <div className="mx-auto max-w-5xl px-4 pt-10 pb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Optiloves Invest</h1>
          <p className="mt-3 text-base md:text-lg text-gray-700">
            Tokenized access to African real estate &mdash; Focus: Kinshasa and Luanda.
          </p>
        </div>

        <div className="mx-auto max-w-5xl px-4">
          <img src="/hero.jpg" alt="Kinshasa and Nsele development" className="w-full h-64 md:h-96 object-cover rounded-2xl shadow" />
        </div>

        <div className="mx-auto max-w-5xl px-4 py-6 text-center">
          <p className="text-sm uppercase tracking-wide text-gray-600">Fighting poverty with love and investment</p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <a href="/properties" className="px-4 py-2 rounded-xl bg-black text-white hover:opacity-90">View properties</a>
            <a href="/how-it-works" className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50">How it works</a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="/faq" className="p-4 rounded-2xl border hover:bg-gray-50">
            <div className="font-semibold">FAQ</div>
            <div className="text-sm text-gray-600">Common questions</div>
          </a>
          <a href="/properties" className="p-4 rounded-2xl border hover:bg-gray-50">
            <div className="font-semibold">Properties</div>
            <div className="text-sm text-gray-600">Browse listed assets</div>
          </a>
          <a href="/wallet" className="p-4 rounded-2xl border hover:bg-gray-50">
            <div className="font-semibold">Connect Wallet</div>
            <div className="text-sm text-gray-600">Start investing</div>
          </a>
        </div>
      </section>
    </main>
  );
}