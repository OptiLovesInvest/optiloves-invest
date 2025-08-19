import PropertyCard, { type Property } from "../components/PropertyCard";
const fix = (s?: string) => {
  if (!s) return "";
  try {
    // Attempt to reverse common mojibake (Latin-1 read as UTF-8)
    const dec = decodeURIComponent(escape(s));
    if (dec && typeof dec === "string") s = dec;
  } catch {}
  return s
    .replace(/Â©/g, "©")
    .replace(/â€”/g, "—")
    .replace(/â€“/g, "–")
    .replace(/â€˜/g, "‘")
    .replace(/â€™/g, "’")
    .replace(/â€œ/g, "“")
    .replace(/â€�/g, "”");
};

export const dynamic = "force-dynamic";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n);

async function getProperties(): Promise<Property[]> {
  const base = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:5000";
  const url = `${base.replace(/\/$/, "")}/properties`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    const list = Array.isArray(data) ? data : Array.isArray(data?.value) ? data.value : [];
    return list
      .map((x: any) => ({
        id: x.id,
        title: fix(x.title),
        price: Number(x.price ?? x.token_price ?? 0),
        availableTokens: Number(x.availableTokens ?? x.available_tokens ?? 0),
      }))
      .filter((p) => p?.id);
  } catch {
    return [];
  }
}

export default async function Page() {
  const props = await getProperties();

  return (
    <main className="min-h-screen bg-neutral-50">
      {/* Top bar */}
      <header className="border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-[#2e7d32] via-[#f9a825] to-[#c62828]" />
            <span className="font-semibold tracking-tight">Optiloves Invest</span>
          </div>
          <nav className="hidden sm:flex items-center gap-5 text-sm text-neutral-600">
            <a href="#properties" className="hover:text-black">Properties</a>
            <a href="#" className="hover:text-black">Account</a>
            <a href="#" className="hover:text-black">Terms</a>
            <a href="#" className="hover:text-black">Privacy</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <div className="rounded-3xl border bg-neutral-50 p-8 sm:p-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Tokenized access to African real estate.</h1>
                <p className="text-neutral-600 mt-2">Invest from $1 per token. Focus: Kinshasa &amp; Luanda.</p>
              </div>
              <div className="flex gap-3">
                <a href="#properties" className="rounded-xl px-4 py-2.5 text-sm font-medium bg-black text-white hover:bg-neutral-800 transition">View properties</a>
                <a href="#" className="rounded-xl px-4 py-2.5 text-sm font-medium border hover:bg-neutral-100 transition">Learn more</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Properties */}
      <section id="properties" className="pb-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-end justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">Properties</h2>
            <p className="text-sm text-neutral-500">{props.length ? `${fmt(props.length)} listed` : "No properties available"}</p>
          </div>

          {props.length === 0 ? (
            <div className="rounded-2xl border bg-white p-6 text-sm text-neutral-600">
              Couldn’t load properties. Check <code className="bg-neutral-100 px-1 rounded">NEXT_PUBLIC_BACKEND_URL</code> and your backend.
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {props.map((p) => (
                <PropertyCard key={p.id} p={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/70">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-neutral-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2025 Optiloves Invest</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-black">EN</a>
            <a href="#" className="hover:text-black">FR</a>
            <a href="#" className="hover:text-black">LG</a>
            <a href="#" className="hover:text-black">PT</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

