// frontend/src/app/page.tsx
import { fetchProperties, type Property } from "../lib/api";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let properties: Property[] = [];
  let error: string | null = null;

  try {
    properties = await fetchProperties();
  } catch (e: unknown) {
    error = e instanceof Error ? e.message : "Unknown error fetching properties";
  }

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">Optiloves Invest</h1>
        <p className="text-sm opacity-80">
          Tokenized access to African real estate. $1 per token.
        </p>
      </header>

      {error ? (
        <div className="rounded-lg border p-4 text-sm">
          <div className="font-semibold">Couldn’t load properties</div>
          <div className="mt-1 opacity-80">{error}</div>
          <div className="mt-2 opacity-70">
            Check <code className="font-mono">NEXT_PUBLIC_BACKEND_URL</code> in{" "}
            <code className="font-mono">frontend/.env.local</code>.
          </div>
        </div>
      ) : properties.length === 0 ? (
        <div className="rounded-lg border p-4 text-sm opacity-80">
          No properties to show right now.
        </div>
      ) : (
        <ul className="space-y-3">
          {properties.map((p) => (
            <li key={p.id} className="rounded-xl border p-4 hover:shadow-sm transition">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <a href={`/property/${p.id}`} className="text-base font-semibold underline">{p.title}</a>

                  <div className="mt-1 text-sm opacity-80">ID: {p.id}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm">Price (USD)</div>
                  <div className="text-lg font-bold">${p.price}</div>
                </div>
              </div>
              <div className="mt-2 text-sm opacity-80">{p.availableTokens} tokens available</div>
            </li>
          ))}
        </ul>
      )}

      <footer className="pt-4 text-xs opacity-70">© {new Date().getFullYear()} Optiloves Invest</footer>
    </main>
  );
}
