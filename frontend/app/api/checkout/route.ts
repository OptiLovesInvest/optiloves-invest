import { NextRequest, NextResponse } from "next/server";
export const runtime = "nodejs";

export async function GET() {
  const hasKey = !!process.env.OPTI_API_KEY && process.env.OPTI_API_KEY.length > 5;
  const be = process.env.BACKEND_URL || "https://optiloves-backend.onrender.com";
  return NextResponse.json({ ok:true, stage:"proxy", hasKey, be });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({} as any));
const { property_id = "kin-001", quantity = 1 } = body || {};
const owner = (body?.owner || process.env.DEFAULT_OWNER || "").toString();

  const BE = process.env.BACKEND_URL || "https://optiloves-backend.onrender.com";
  const API_KEY = process.env.OPTI_API_KEY || "";

  try {
    const res = await fetch(`${BE}/buy/checkout`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": API_KEY
      },
      body: JSON.stringify({ property_id, quantity, owner }),
      cache: "no-store",
    });

    const text = await res.text();
    let data: any = {};
    try { data = JSON.parse(text); } catch {}

    if (res.ok && (data?.url || data?.ok)) {
      return NextResponse.json({ ok:true, url: data.url ?? "/thank-you" });
    }

    return NextResponse.json(
      { ok:false, status: res.status, error: data?.error ?? text ?? "unknown error" },
      { status: 502 }
    );
  } catch (e:any) {
    return NextResponse.json({ ok:false, error: String(e?.message || e) }, { status: 500 });
  }
}

