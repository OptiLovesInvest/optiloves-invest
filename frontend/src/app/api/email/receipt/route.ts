import { NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const base = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:5000";
    const res = await fetch(`${base.replace(/\/$/, "")}/email/receipt`, {
      method: "POST", headers: { "Content-Type": "application/json" }, cache: "no-store",
      body: JSON.stringify(payload),
    });
    const j = await res.json();
    return NextResponse.json(j, { status: res.status || 200 });
  } catch (e: any) {
    return NextResponse.json({ ok:false, error: e?.message || "Proxy error" }, { status: 500 });
  }
}