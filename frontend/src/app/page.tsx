export const dynamic = "force-dynamic";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n);

async function safeList() {
  const base = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:5000";
  const url = `${base.replace(/\/$/, "")}/properties`;
  try {
    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();
    const list = Array.isArray(data) ? data : Array.isArray((data as any)?.value) ? (data as any).value : [];
    return list.map((x: any) => ({
      id: String(x.id || ""),
      title: String(x.title || x.id || ""),
      price: Number(x.price ?? x.token_price ?? 0),
      available: Number(x.availableTokens ?? x.available_tokens ?? 0),
    }));
  } catch {
    return [];
  }
}

export default async function Page() {
  const list = await safeList();
  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-5xl p-6 space-y-8">
        <header className="flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight">Optiloves Invest</h1>
          <nav className="text-sm text-neutral-600 space-x-4">
            <a className="hover:text-black" href="/terms">Terms</a>
            <a className="hover:text-black" href="/privacy">Privacy</a>
          </nav>
        </header>

        <section className="rounded-3xl border bg-white p-6">
          <h2 className="text-lg font-semibold">Tokenized access to African real estate.</h2>
          <p className="text-neutral-600">Invest from $1 per token. Focus: Kinshasa &amp; Luanda.</p>
          <div className="mt-4 flex gap-3">
            <a href="#properties" className="rounded-xl bg-black text-white px-4 py-2 text-sm font-medium hover:bg-neutral-800">View properties</a>
            <a href="/privacy" className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-neutral-100">Learn more</a>
          </div>
        </section>

        <section id="properties" className="space-y-4">
          <div className="flex items-end justify-between">
            <h3 className="text-base font-semibold">Properties</h3>
            <p className="text-sm text-neutral-600">{list.length} listed</p>
          </div>

          {list.length === 0 ? (
            <div className="rounded-2xl border bg-white p-6 text-sm text-neutral-600">
              Couldn’t load properties (showing zero). Check NEXT_PUBLIC_BACKEND_URL or backend availability.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {list.map((p: any) => (
                <a key={p.id} href={`/property/${p.id}`} className="rounded-2xl border bg-white p-5 hover:shadow-sm transition">
                  <h4 className="font-semibold">{p.title}</h4>
                  <p className="text-xs text-neutral-500">ID: {p.id}</p>
                  <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-xl bg-neutral-50 border p-3">
                      <p className="text-neutral-600 text-xs">Price</p>
                      <p className="font-semibold">${fmt(p.price)}</p>
                    </div>
                    <div className="rounded-xl bg-neutral-50 border p-3">
                      <p className="text-neutral-600 text-xs">Available</p>
                      <p className="font-semibold">{fmt(p.available)} tokens</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="inline-block rounded-lg bg-black text-white px-3 py-1 text-xs">View details</span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </section>

        <footer className="py-10 text-center text-xs text-neutral-500">
          © 2025 Optiloves Invest
        </footer>
      </div>
    </main>
  );
}