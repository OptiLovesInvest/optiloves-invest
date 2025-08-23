export async function getPortfolio(wallet: string) {
  const base = (process.env.NEXT_PUBLIC_BACKEND ?? (process.env.NEXT_PUBLIC_BACKEND ?? (process.env.NEXT_PUBLIC_BACKEND ?? process.env.NEXT_PUBLIC_BACKEND_URL)_URL))!;
  const url = `${base}/portfolio?wallet=${encodeURIComponent(wallet)}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Portfolio fetch failed: ${res.status}`);
  return res.json();
}

export async function getOrders(wallet: string) {
  const base = (process.env.NEXT_PUBLIC_BACKEND ?? (process.env.NEXT_PUBLIC_BACKEND ?? (process.env.NEXT_PUBLIC_BACKEND ?? process.env.NEXT_PUBLIC_BACKEND_URL)_URL))!;
  const url = `${base}/orders?wallet=${encodeURIComponent(wallet)}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Orders fetch failed: ${res.status}`);
  return res.json();
}
/**
 * Request a SOL airdrop for a given address.
 * Tries backend POST /airdrop first (if you have it),
 * then falls back to Solana devnet JSON-RPC (client-side).
 */
export async function apiAirdrop(address: string, amountLamports: number = 1_000_000_000) {
  const base = (process.env.NEXT_PUBLIC_BACKEND ?? (process.env.NEXT_PUBLIC_BACKEND ?? (process.env.NEXT_PUBLIC_BACKEND ?? process.env.NEXT_PUBLIC_BACKEND_URL)_URL));

  // 1) Try your backend proxy (if implemented)
  if (base) {
    try {
      const res = await fetch(`${base}/airdrop`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, amountLamports }),
      });
      if (res.ok) return res.json();
    } catch {
      // fall through to client RPC
    }
  }

  // 2) Fallback: direct devnet JSON-RPC (will NOT work on mainnet)
  const cluster = (process.env.NEXT_PUBLIC_SOL_CLUSTER || "devnet").toLowerCase();
  if (cluster === "devnet") {
    const rpc = "https://api.devnet.solana.com";
    const res = await fetch(rpc, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "requestAirdrop",
        params: [address, amountLamports],
      }),
    });
    if (!res.ok) throw new Error(`Airdrop RPC failed: ${res.status}`);
    return res.json(); // { result: <signature> } shape
  }

  throw new Error("Airdrop is disabled on this cluster.");
}


