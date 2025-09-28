export const runtime = 'nodejs';
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const owner = url.searchParams.get("owner");
    const property = url.searchParams.get("property") ?? "kin-001";
    const qty = 1;

    const backend = process.env.BACKEND_URL;
    const apiKey = process.env.OPTI_API_KEY;

    if (!backend || !apiKey) {
      return NextResponse.json({ ok:false, error:"server envs missing" }, { status: 500 });
    }

    const payload = { property_id: property, quantity: qty, owner };
    const r = await fetch(`${backend}/buy/checkout`, {
      method: "POST",
      headers: { "content-type":"application/json", "x-api-key": apiKey },
      body: JSON.stringify(payload),
      cache: "no-store"
    });

    const data = await r.json().catch(() => ({}));
    return NextResponse.json(data, { status: r.status });
  } catch (e) {
    return NextResponse.json({ ok:false, error:String(e) }, { status: 500 });
  }
}

