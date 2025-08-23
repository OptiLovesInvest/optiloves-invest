const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

export async function getProperties() {
  const res = await fetch(`${BASE_URL}/properties`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to fetch properties: ${res.status}`);
  return res.json();
}

/**
 * Backend airdrop proxy.
 * Your Flask backend should expose POST /airdrop
 * Body: { wallet: string, sol?: number }
 * Returns JSON (e.g. { ok: true, tx_signature: "...", ... })
 */
export async function apiAirdrop(wallet: string, sol: number = 1) {
  const res = await fetch(`${BASE_URL}/airdrop`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ wallet, sol }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Airdrop failed (${res.status}): ${text}`);
  }
  return res.json();
}
