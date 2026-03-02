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

    const r = await fetch(`${backend}/api/apply`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
      },
            body: JSON.stringify({
        ...req.body,
        // Backend expects "amount" in USD (100–1000)
        amount: Number((req.body as any)?.amount ?? (req.body as any)?.allocation),
        // Also keep allocation for logging/debugging if backend ignores it
        allocation: Number((req.body as any)?.allocation ?? (req.body as any)?.amount),
      }),
    });

    const text = await r.text();
    res.status(r.status);

    // Try to return JSON, otherwise return raw text
    try {
      return res.json(JSON.parse(text));
    } catch {
      return res.send(text);
    }
  } catch (e: any) {
    return res.status(500).json({ ok: false, error: e?.message || "Proxy error" });
  }
}