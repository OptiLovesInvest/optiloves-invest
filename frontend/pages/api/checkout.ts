import type { NextApiRequest, NextApiResponse } from "next";

function clampQty(q: any) {
  const n = parseInt(String(q ?? "1"), 10);
  if (!Number.isFinite(n) || n < 1) return 1;
  if (n > 100) return 100;
  return n;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET" && req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).end();
  }

  try {
    const qty = req.method === "GET" ? clampQty(req.query.qty) : clampQty((req.body as any)?.qty);

    const backend = process.env.OPTILOVES_BACKEND_URL ?? "https://optiloves-backend.onrender.com";
    const apiKey = process.env.OPTILOVES_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ ok: false, error: "Server misconfig: missing OPTILOVES_API_KEY" });
    }

    const target = `${String(backend).replace(/\/+$/, "")}/buy/checkout?qty=${qty}`;

    const r = await fetch(target, {
      method: "GET",
      headers: { "x-api-key": apiKey, "accept": "application/json" },
      cache: "no-store",
    });

    const text = await r.text();
    let data: any = null;
    try { data = JSON.parse(text); } catch { data = { raw: text }; }

    if (!r.ok) {
      return res.status(502).json({ ok: false, status: r.status, backend: target, backendBody: data });
    }

    if (!data?.url) {
      return res.status(502).json({ ok: false, error: "Backend returned no url", backendBody: data });
    }

    return res.status(200).json({ ok: true, url: data.url });
  } catch (e: any) {
    return res.status(500).json({ ok: false, error: e?.message ?? "Unknown error" });
  }
}
