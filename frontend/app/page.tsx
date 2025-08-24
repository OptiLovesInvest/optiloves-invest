import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero (20% width, centered) */}
      <section className="mx-auto max-w-5xl px-4 py-12 md:py-16 text-center">
        <Image
          src="/hero.jpg"
          alt="OptiLoves Invest Ã¢â‚¬â€ Fighting poverty with love and investment"
          width={1200}
          height={1200}
          sizes="(max-width: 768px) 80vw, (max-width: 1024px) 60vw, 50vw"
          priority
          className="mx-auto w-\[60%\] md:w-\[40%\] lg:w-\[20%\] h-auto" rounded-xl shadow"
        />
        <h1 className="mt-6 text-4xl md:text-5xl font-semibold tracking-tight">Optiloves Invest</h1>
        <p className="mt-3 text-lg md:text-xl">
          Tokenized access to African real estate Ã¢â‚¬â€ Focus: Kinshasa and Luanda.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/properties" className="px-5 py-2.5 rounded-xl bg-black text-white hover:opacity-90">View properties</Link>
          <Link href="/how-it-works" className="px-5 py-2.5 rounded-xl border hover:bg-gray-50">How it works</Link>
          <Link href="/faq" className="px-5 py-2.5 rounded-xl border hover:bg-gray-50">FAQ</Link>
        </div>
        <p className="mt-4 text-sm text-gray-600">
          Kinshasa and Nsele development Ã¢â‚¬â€ Fighting poverty with love and investment
        </p>
      </section>

      {/* Why section */}
      <section className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        <h2 className="text-2xl font-semibold">Why Optiloves</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border p-5">
            <h3 className="font-medium">Tokenized ownership</h3>
            <p className="mt-1 text-sm text-gray-600">Buy fractions of vetted properties with on-chain transparency.</p>
          </div>
          <div className="rounded-2xl border p-5">
            <h3 className="font-medium">Accessible entry</h3>
            <p className="mt-1 text-sm text-gray-600">Start small and build your portfolio over time.</p>
          </div>
          <div className="rounded-2xl border p-5">
            <h3 className="font-medium">Real impact</h3>
            <p className="mt-1 text-sm text-gray-600">Fund Kinshasa & Luanda developments that create jobs and growth.</p>
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="mx-auto max-w-5xl px-4 pb-16">
        <div className="rounded-2xl border p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-medium">Ready to explore assets?</h3>
            <p className="text-sm text-gray-600">Browse current listings and view projected yields.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/properties" className="px-4 py-2 rounded-xl bg-black text-white hover:opacity-90">Browse properties</Link>
            <Link href="/wallet" className="px-4 py-2 rounded-xl border hover:bg-gray-50">Connect Wallet</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
