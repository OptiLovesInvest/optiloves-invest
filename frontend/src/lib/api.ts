export type AirdropResult = { ok: boolean; signature?: string; error?: string };

// Default to 1 SOL (1_000_000_000 lamports) if amount not provided
export async function apiAirdrop(address: string, amountLamports: number = 1_000_000_000): Promise<AirdropResult> {
  try {
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
