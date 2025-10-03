import { NextResponse } from "next/server";

const BACKEND = process.env.BACKEND_URL || "https://optiloves-backend.onrender.com";
const API_KEY = process.env.OPTI_API_KEY || "";

async function proxyCheckout(body: any) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), 10000);
  try {
    const res = await fetch(`${BACKEND}/buy/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": API_KEY },
      body: JSON.stringify(body || {}),
      cache: "no-store",
      signal: controller.signal,
    });
    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, status: res.status, data };
  } catch {
    return { ok: false, status: 502, data: { ok:false, error:"gateway_error" } };
  } finally { clearTimeout(t); }
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({} as any));
  if (!body?.property_id || typeof body.property_id !== "string" || !body.property_id.trim()) {
    return NextResponse.json({ ok:false, error:"invalid_property_id" }, { status: 400 });
  }
  const r = await proxyCheckout(body);
  if (!r.ok) {
    console.error("checkout_failed", { status: r.status, backend: r.data });
    return NextResponse.json({ ok:false, error:"checkout_failed", backend:r.data }, { status: r.status });
  }
  return NextResponse.json(r.data, { status: 200 });
}

export async function GET() {
  return NextResponse.json({ ok:true, proxy:"checkout", backend: BACKEND }, { status: 200 });
}