// frontend/src/lib/api.ts
export type Property = {
  id: string;
  title: string;
  price: number;           // USD per token
  availableTokens: number; // remaining supply
};

const BASE = process.env.NEXT_PUBLIC_BACKEND_URL;
if (!BASE) {
  console.warn("NEXT_PUBLIC_BACKEND_URL is not set. Add it to frontend/.env.local");
}

/** Build URLs safely (no double slashes) */
function url(path: string) {
  const base = (BASE ?? "").replace(/\/+$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

export async function fetchProperties(): Promise<Property[]> {
  const res = await fetch(url("/properties"), {
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Failed to fetch properties: ${res.status} ${text}`);
  }
  return res.json();
} // 👈 important closing brace

export async function fetchPropertyById(id: string): Promise<Property | null> {
  // If there is no /property/<id> endpoint, fetch all and find one.
  const list = await fetchProperties();
  return list.find((p) => p.id === id) ?? null;
}
export async function apiAirdrop(pubkey: string): Promise<{ ok: boolean; signature?: string; error?: string }> {
  try {
    const res = await fetch(url("/airdrop"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wallet: pubkey }),
      cache: "no-store",
    });
    // If your backend doesn't have /airdrop yet, this may 404 at runtime—but build will succeed.
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return { ok: false, error: `HTTP ${res.status} ${text}` };
    }
    const json = await res.json().catch(() => ({}));
    return { ok: json?.ok ?? true, signature: json?.signature, error: json?.error };
  } catch (e: any) {
    return { ok: false, error: e?.message ?? "airdrop failed" };
  }
}

