// frontend/src/app/property/[id]/page.tsx
import { fetchPropertyById } from "../../../lib/api";
import ClientBuy from "./client-buy";

type PageProps = { params: { id: string } };
export const dynamic = "force-dynamic";

export default async function PropertyPage({ params }: PageProps) {
  const p = await fetchPropertyById(params.id);

  if (!p) {
    return (
      <main className="mx-auto max-w-3xl p-6">
        <h1 className="text-xl font-bold">Property not found</h1>
        <p className="mt-2 opacity-80">ID: {params.id}</p>
        <a href="/" className="mt-4 inline-block underline">← Back</a>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-4">
      <a href="/" className="text-sm underline">← Back</a>
      <h1 className="text-2xl font-bold">{p.title}</h1>

      <div className="rounded-xl border p-4 space-y-2">
        <div className="text-sm opacity-80">ID: {p.id}</div>
        <div className="text-sm">Price (USD): <span className="font-semibold">${p.price}</span></div>
        <div className="text-sm opacity-80">{p.availableTokens} tokens available</div>
      </div>

      <ClientBuy propertyId={p.id} />

      <footer className="pt-4 text-xs opacity-70">© {new Date().getFullYear()} Optiloves Invest</footer>
    </main>
  );
}
