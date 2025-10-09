import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { property_id="kin-001", quantity=1 } = await req.json();
    const BE = process.env.NEXT_PUBLIC_API_BASE ?? "https://optiloves-backend.onrender.com";
    const u = `${BE}/buy/quick?property_id=${encodeURIComponent(property_id)}&quantity=${quantity}`;
    const r = await fetch(u, { redirect: "manual" });
    const loc = r.headers.get("location");
    if (r.status >= 300 && r.status < 400 && loc) return NextResponse.json({ ok:true, url:loc });
  } catch {}
  return NextResponse.json({ ok:true, url:"https://optilovesinvest.com/thank-you" });
}
