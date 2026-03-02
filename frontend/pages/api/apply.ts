import type { NextApiRequest, NextApiResponse } from "next";

const PROXY_VERSION = "27bcd3c7";

function setHdr(res: NextApiResponse) {
  res.setHeader("x-opti-apply-proxy", "pages-" + PROXY_VERSION);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  setHdr(res);

  if (req.method === "GET") {
    return res.status(200).json({ ok: true, proxy: "pages", version: PROXY_VERSION });
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
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

    const r = await fetch(${backend}/api/apply, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify(payload),
    });

    const text = await r.text();
res.status(r.status);

// If upstream rejects, return its response (no secrets)
if (!r.ok) {
  try {
    return res.json({ ok: false, upstreamStatus: r.status, upstream: JSON.parse(text) });
  } catch {
    return res.json({ ok: false, upstreamStatus: r.status, upstream: text });
  }
}

    // If upstream rejects, return upstream + what we sent (no secrets)
    if (!r.ok) {
      try {
        return res.json({ ok: false, upstream: JSON.parse(text), sent: payload });
      } catch {
        return res.json({ ok: false, upstream: text, sent: payload });
      }
    }

    // Success: return upstream response
    try {
      return res.json(JSON.parse(text));
    } catch {
      return res.send(text);
    }
  } catch (e: any) {
    return res.status(500).json({ ok: false, error: e?.message || "Proxy error" });
  }
}