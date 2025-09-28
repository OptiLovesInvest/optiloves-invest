import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const owner = url.searchParams.get("owner") ?? "";
    const property = (url.searchParams.get("property") ?? "kin-001").toLowerCase();
    const debug = url.searchParams.get("debug") === "1";

    const backend = process.env.BACKEND_URL;
    const apiKey  = process.env.OPTI_API_KEY;

    if (!backend || !apiKey) {
      const body = { ok:false, error:"MISSING_ENVS", hasBackend:!!backend, hasKey:!!apiKey };
      return NextResponse.json(body, { status: 500 });
    }

    const payload = { property_id: property, quantity: 1, owner };
    const r = await fetch(`${backend}/buy/checkout`, {
      method: "POST",
      headers: { "content-type":"application/json", "x-api-key": apiKey },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const text = await r.text();
    let data: any = null;
    try { data = JSON.parse(text); } catch { /* keep text */ }

    if (!r.ok) {
      const body = {
        ok:false,
        error:"UPSTREAM_ERROR",
        upstream: { status: r.status, text: text?.slice(0,500) }
      };
      return NextResponse.json(body, { status: 502 });
    }

    // Normal success
    const ok = !!(data && (data.url || data.ok));
    const urlOut = data?.url ?? "https://optilovesinvest.com/thank-you";
    const result = { ok, url: urlOut };
    // Optional verbose output
    if (debug) result["_diag"] = { backend, hasKey:true };
    return NextResponse.json(result, { status: 200 });

  } catch (e:any) {
    return NextResponse.json({ ok:false, error:String(e) }, { status: 500 });
  }
}
