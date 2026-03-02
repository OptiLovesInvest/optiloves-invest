export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body: any = await req.json();

    const backend = process.env.OPTI_BACKEND_URL;
    const apiKey = process.env.OPTI_API_KEY;

    if (!backend || !apiKey) {
      return new Response(JSON.stringify({ ok:false, error:"Missing server env OPTI_BACKEND_URL or OPTI_API_KEY" }), {
        status: 500,
        headers: { "content-type": "application/json" },
      });
    }

    // Normalize amount (backend validates "amount" 100..1000)
    const amountNum = Number(body?.amount ?? body?.allocation);

    const payload = {
      ...body,
      amount: amountNum,
      allocation: Number(body?.allocation ?? body?.amount),
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
        return new Response(JSON.stringify({ ok:false, upstream: JSON.parse(text), sent: payload }), {
          status: r.status,
          headers: { "content-type": "application/json" },
        });
      } catch {
        return new Response(JSON.stringify({ ok:false, upstream: text, sent: payload }), {
          status: r.status,
          headers: { "content-type": "application/json" },
        });
      }
    }

    // Success: return upstream response
    return new Response(text, {
      status: r.status,
      headers: { "content-type": r.headers.get("content-type") || "application/json" },
    });

  } catch (e: any) {
    return new Response(JSON.stringify({ ok:false, error: e?.message || "Proxy error" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}