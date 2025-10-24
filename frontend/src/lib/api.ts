export type AirdropResult = { ok: boolean; signature?: string; error?: string };

// Generic JSON POST helper (used by buy.ts)
export async function postJson<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`http ${res.status}`);
  return (await res.json()) as T;
}

// Default to 1 SOL if amount not provided
export async function apiAirdrop(address: string, amountLamports: number = 1_000_000_000): Promise<AirdropResult> {
  try {
    const data = await postJson<AirdropResult>("/api/airdrop", { address, amountLamports });
    return data;
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}
