export type AirdropResult = { ok: boolean; signature?: string; error?: string };

export async function apiAirdrop(address: string, amountLamports: number): Promise<AirdropResult> {
  try {
    // Try hitting a Next.js API route if you wire one later; safe for build.
    const res = await fetch("/api/airdrop", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address, amountLamports })
    });
    if (!res.ok) return { ok: false, error: "http " + res.status };
    const data = await res.json();
    return data as AirdropResult;
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}
