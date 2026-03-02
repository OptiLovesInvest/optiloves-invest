export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const backend = process.env.OPTI_BACKEND_URL;
    const apiKey = process.env.OPTI_API_KEY;

    if (!backend || !apiKey) {
      return new Response(JSON.stringify({ ok:false, error:"Missing server env OPTI_BACKEND_URL or OPTI_API_KEY" }), {
        status: 500,
        headers: { "content-type": "application/json" },
      });
    }

    const r = await fetch(`${backend}/api/apply`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify(body),
    });

    const text = await r.text();
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