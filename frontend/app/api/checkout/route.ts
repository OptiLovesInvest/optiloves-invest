import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.text();
  const r = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.OPTI_API_KEY!, // SERVER env only
    },
    body,
    cache: "no-store",
  });
  const text = await r.text();
  return new NextResponse(text, { status: r.status, headers: { "Content-Type": r.headers.get("Content-Type") || "application/json" } });
}

export async function GET(req: Request) {
  const { NextResponse } = await import("next/server");
  const u = new URL(req.url);
  const owner = u.searchParams.get("owner");
  const property = u.searchParams.get("property") || "kin-001";
  const quantity = Number(u.searchParams.get("quantity") || "1");

  const payload = JSON.stringify({ owner, property_id: property, quantity });
  const r = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/buy/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.OPTI_API_KEY!,
    },
    body: payload,
    cache: "no-store",
  });

  let data: any = null;
  try { data = await r.json(); } catch {}
  if (!r.ok || !data?.url) {
    return new NextResponse(JSON.stringify({ ok:false, error:"checkout_failed" }), { status: r.status || 500 });
  }
  return NextResponse.redirect(data.url);
}