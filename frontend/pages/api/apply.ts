type Payload = {
  full_name: string;
  email: string;
  phone: string;
  country: string;
  wallet: string;
  amount_usd: number;
  note?: string;
  website?: string; // honeypot
};

function isProbablySolanaAddress(s: string) {
  const t = (s || "").trim();
  return t.length >= 32 && t.length <= 44 && /^[1-9A-HJ-NP-Za-km-z]+$/.test(t);
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const backend = process.env.OPTI_BACKEND_URL || "https://optiloves-backend.onrender.com";
  const apiKey = process.env.OPTI_API_KEY;

  if (!apiKey) return res.status(500).json({ error: "Server not configured (missing OPTI_API_KEY)" });

  const p = (req.body || {}) as Payload;

  // honeypot: bots will fill it
  if (p.website && String(p.website).trim()) return res.status(200).json({ ok: true });

  if (!p.full_name || !p.email || !p.phone || !p.country || !p.wallet) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const amt = Number(p.amount_usd || 0);
  if (!(amt >= 100 && amt <= 1000)) return res.status(400).json({ error: "Amount must be between 100 and 1000" });

  if (!isProbablySolanaAddress(p.wallet)) return res.status(400).json({ error: "Invalid wallet address" });

  const body = {
    full_name: String(p.full_name).trim(),
    email: String(p.email).trim(),
    phone: String(p.phone).trim(),
    country: String(p.country).trim(),
    wallet: String(p.wallet).trim(),
    amount_usd: amt,
    note: String(p.note || "").trim(),
    source: "optilovesinvest.com/apply"
  };

  try {
    const r = await fetch(backend.replace(/\/+$/,"") + "/api/apply", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey
      },
      body: JSON.stringify(body)
    });

    const text = await r.text();
    let j: any = {};
    try { j = JSON.parse(text); } catch { j = { raw: text }; }

    if (!r.ok) return res.status(502).json({ error: j?.error || "Backend error" });

    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ error: "Failed to reach backend" });
  }
}