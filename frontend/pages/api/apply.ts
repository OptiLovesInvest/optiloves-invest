import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  try {
    const backend = process.env.OPTI_BACKEND_URL;
    const apiKey = process.env.OPTI_API_KEY;

    if (!backend || !apiKey) {
      return res.status(500).json({ ok: false, error: "Missing server env OPTI_BACKEND_URL or OPTI_API_KEY" });
    }

    const body: any = req.body || {};

    // Normalize amount: backend validates "amount" (100..1000)
    const amountNum = Number(body.amount ?? body.allocation);

    const payload = {
      ...body,
      amount: amountNum,
      allocation: Number(body.allocation ?? body.amount),
    };

    const r = await fetch(`${backend}/api/apply`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify(payload),
    });

    const text = await r.text();

    // Debug on upstream error: return what we sent + upstream response (no secrets)
    if (!r.ok) {
      try {
        return res.status(r.status).json({ ok: false, upstream: JSON.parse(text), sent: payload });
      } catch {
        return res.status(r.status).json({ ok: false, upstream: text, sent: payload });
      }
    }

    // Success: return upstream response
    try {
      return res.status(r.status).json(JSON.parse(text));
    } catch {
      return res.status(r.status).send(text);
    }
  } catch (e: any) {
    return res.status(500).json({ ok: false, error: e?.message || "Proxy error" });
  }
}