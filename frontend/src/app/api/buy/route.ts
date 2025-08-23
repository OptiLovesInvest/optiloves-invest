import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { property_id, quantity } = await req.json();
    const base = (process.env.NEXT_PUBLIC_BACKEND ?? (process.env.NEXT_PUBLIC_BACKEND ?? process.env.NEXT_PUBLIC_BACKEND_URL)_URL) || "http://127.0.0.1:5000";
    const url = `${base.replace(/\/$/, "")}/buy`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify({ property_id, quantity }),
    });
    const j = await res.json();
    return NextResponse.json(j, { status: res.status || 200 });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Proxy error" }, { status: 500 });
  }
}
