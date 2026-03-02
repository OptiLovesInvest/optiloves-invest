export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PROXY_VERSION = "05d5dac0";

function withHeaders(res: Response) {
  const h = new Headers(res.headers);
  h.set("x-opti-apply-proxy", "app-" + PROXY_VERSION);
  return new Response(res.body, { status: res.status, headers: h });
}

export async function GET() {
  return withHeaders(new Response(JSON.stringify({ ok: true, proxy: "app", version: PROXY_VERSION }), {
    status: 200,
    headers: { "content-type": "application/json" },
  }));
}

export async function POST(req: Request) {
  try {
    const body: any = await req.json();

    const backend = process.env.OPTI_BACKEND_URL;
    const apiKey = process.env.OPTI_API_KEY;

    if (!backend || !apiKey) {
      return withHeaders(new Response(JSON.stringify({ ok:false, error:"Missing server env OPTI_BACKEND_URL or OPTI_API_KEY" }), {
        status: 500,
        headers: { "content-type": "application/json" },
      }));
    }

    const amountNum = Number(body?.amount ?? body?.allocation);

    const payload = {
      ...body,
      amount: amountNum,
      allocation: Number(body?.allocation ?? body?.amount),
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

    if (!r.ok) {
      // Always wrap error with sent payload for debugging
      let upstream: any = text;
      try { upstream = JSON.parse(text); } catch {}
      return withHeaders(new Response(JSON.stringify({ ok:false, upstream, sent: payload }), {
        status: r.status,
        headers: { "content-type": "application/json" },
      }));
    }

    return withHeaders(new Response(text, {
      status: r.status,
      headers: { "content-type": r.headers.get("content-type") || "application/json" },
    }));

  } catch (e: any) {
    return withHeaders(new Response(JSON.stringify({ ok:false, error: e?.message || "Proxy error" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    }));
  }
}