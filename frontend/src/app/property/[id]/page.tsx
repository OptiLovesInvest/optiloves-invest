import ClientBuy from "./ClientBuy";

export const dynamic = "force-dynamic";

const fmt = (n: number) => new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n);

const fix = (s?: string) => {
  if (!s) return "";
  try { const dec = decodeURIComponent(escape(s)); if (dec && typeof dec === "string") s = dec; } catch {}
  return s
    .replace(/Â©/g, "©")
    .replace(/â€”/g, "—")
    .replace(/â€“/g, "–")
    .replace(/â€˜/g, "‘")
    .replace(/â€™/g, "’")
    .replace(/â€œ/g, "“")
    .replace(/â€�/g, "”");
};
const cityFrom = (title: string) => {
  const t = fix(title);
  const parts = t.split(/—|–|-/);
  return (parts[0] || t).trim();
};

async function getList() {
  const base = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:5000";
  const url = `${base.replace(/\/$/, "")}/properties`;
  try {
    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();
    return Array.isArray(data) ? data : Array.isArray((data as any)?.value) ? (data as any).value : [];
  } catch {
    return [];
  }
}

export default async function PropertyPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const list = await getList();
  const x = list.find((i: any) => i?.id === id);
  if (!x) {
    return (
      <main className="min-h-screen bg-neutral-50">
        <div className="mx-auto max-w-4xl p-6">
          <a href="/" className="text-sm text-neutral-600 hover:text-black">← Back</a>
          <div className="rounded-2xl border bg-white p-6 mt-4">Property not found.</div>
        </div>
      </main>
    );
  }

  const price = Number(x.price ?? x.token_price ?? 0);
  const available = Number(x.availableTokens ?? x.available_tokens ?? 0);
  const titleRaw = String(x.title || id);
  const title = fix(titleRaw);
  const city = cityFrom(title);

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-4xl p-6 space-y-6">
        <a href="/" className="text-sm text-neutral-600 hover:text-black">← Back</a>

        <div className="rounded-3xl border bg-white p-6 space-y-4">
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          <p className="text-sm text-neutral-500">ID: {id}</p>
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-xl bg-neutral-50 border p-4">
              <p className="text-neutral-600 text-sm">Price</p>
              <p className="font-semibold">${fmt(price)} / token</p>
            </div>
            <div className="rounded-xl bg-neutral-50 border p-4">
              <p className="text-neutral-600 text-sm">Available</p>
              <p className="font-semibold">{fmt(available)} tokens</p>
            </div>
            <div className="rounded-xl bg-neutral-50 border p-4">
              <p className="text-neutral-600 text-sm">City</p>
              <p className="font-semibold">{city}</p>
            </div>
          </div>
        </div>

        <ClientBuy id={id} price={price} available={available} />
      </div>
    </main>
  );
}