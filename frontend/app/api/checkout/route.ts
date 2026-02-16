export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";

function clampQty(qtyRaw: string | null) {
  const n = parseInt((qtyRaw ?? "1"), 10);
  if (!Number.isFinite(n) || n < 1) return 1;
  if (n > 100) return 100;
  return n;
}

async function handler(req: Request) {
  try {
    let qty = 1;

    if (req.method === "GET") {
      const url = new URL(req.url);
      qty = clampQty(url.searchParams.get("qty"));
    } else if (req.method === "POST") {
      const body = await req.json().catch(() => ({} as any));
      qty = clampQty(body?.qty?.toString?.() ?? null);
    }

    const backend = process.env.OPTILOVES_BACKEND_URL ?? "https://optiloves-backend.onrender.com";
    const apiKey = process.env.OPTILOVES_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ ok: false, error: "Server misconfig: missing OPTILOVES_API_KEY" }, { status: 500 });
    }

    const target = `${backend.replace(/\/+$/, "")}/buy/checkout?qty=${qty}`;

    const r = await fetch(target, {
      method: "GET",
      headers: { "x-api-key": apiKey, "accept": "application/json" },
      cache: "no-store"
    });

    const text = await r.text();
    let data: any = null;
    try { data = JSON.parse(text); } catch { data = { raw: text }; }

    if (!r.ok) {
      return NextResponse.json({ ok: false, status: r.status, backend: target, backendBody: data }, { status: 502 });
    }

    const checkoutUrl = data?.url;
    if (!checkoutUrl) {
      return NextResponse.json({ ok: false, error: "Backend returned no url", backendBody: data }, { status: 502 });
    }

    return NextResponse.json({ ok: true, url: checkoutUrl });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "Unknown error" }, { status: 500 });
  }
}

export async function GET(req: Request) { return handler(req); }
export async function POST(req: Request) { return handler(req); }
