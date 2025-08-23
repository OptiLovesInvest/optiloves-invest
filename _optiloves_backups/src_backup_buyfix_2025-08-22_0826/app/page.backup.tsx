// frontend/src/app/page.tsx

import BackendStatus from "../components/BackendStatus";



import PropertyCard from "../components/PropertyCard";
import { t, L } from "../lib/i18n";

type Property = { id: string; title: string; price: number; availableTokens: number };

export const dynamic = "force-dynamic";

async function getProperties(): Promise<Property[]> {
  const api = process.env.NEXT_PUBLIC_BACKEND_URL || "https://optiloves-backend.onrender.com";
  try {
    const res = await fetch(`${api}/properties`, { cache: "no-store" });
    if (!res.ok) {
      console.error("Failed to load properties:", res.status, await res.text());
      return [];
    }
    return res.json();
  } catch (e) {
    console.error("Fetch error:", e);
    return [];
  }
}

export default async function Home({
  searchParams,
}: { searchParams?: Record<string, string | string[] | undefined> }) {
  const lngParam = (typeof searchParams?.lng === "string" ? searchParams.lng : "en").toLowerCase();
  const lng = (["en","fr","lg","pt"].includes(lngParam) ? lngParam : "en") as L;
  const props = await getProperties();

  return (
    <main className="space-y-6">

<BackendStatus className="fixed top-3 right-3 z-50 bg-white/90 backdrop-blur border-gray-200 shadow-sm text-gray-800" />


      <section className="rounded-3xl bg-black text-white px-6 py-10">
        <h1 className="text-3xl font-bold">Optiloves Invest</h1>
        <p className="opacity-80">Tokenized access to African real estate. $1 per token.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">{t(lng, "props")}</h2>
        {props.length === 0 ? (
          <div className="text-sm text-gray-500">No properties to show right now.</div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {props.map((p) => <PropertyCard key={p.id} p={p} lng={lng} />)}
          </div>
        )}
      </section>
    </main>
  );
}
