// src/app/property/[id]/page.tsx
import BuyClient from "./client-buy";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type Property = {
  id: string;
  title: string;
  price: number;
  availableTokens: number;
};

const FALLBACKS: Record<string, Omit<Property, "availableTokens">> = {
  "kin-001": { id: "kin-001", title: "Kinshasa — Gombe Apartments", price: 120_000 },
  "lua-001": { id: "lua-001", title: "Luanda — Ilha Offices",       price: 250_000 },
};

async function getProperty(id: string): Promise<Property | null> {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL || "https://api.optilovesinvest.com";
  try {
    const res = await fetch(`${backend}/properties`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch properties");
    const list = (await res.json()) as Property[];
    return list.find((p) => p.id === id) ?? null;
  } catch {
    // Fallback to static price if API is unreachable
    const fb = FALLBACKS[id];
    if (!fb) return null;
    return { ...fb, availableTokens: 0 };
  }
}

export default async function PropertyPage({ params }: { params: { id: string } }) {
  const prop = await getProperty(params.id);
  if (!prop) notFound();

  const { title, price, availableTokens } = prop;

  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: "0 16px" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>{title}</h1>

      <div style={{ marginBottom: 18, color: "#444" }}>
        Token price: {price.toLocaleString()} — Available: {availableTokens.toLocaleString()}
      </div>

      {/* Pass `id` (not propId) so it matches your BuyClient props */}
      <BuyClient id={params.id} price={price} />
    </main>
  );
}
