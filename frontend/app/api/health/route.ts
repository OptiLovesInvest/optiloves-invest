import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const info = {
    ok: true,
    service: "health",
    backend: process.env.BACKEND_URL || null,
    rateLimit: {
      windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 60000),
      max: Number(process.env.RATE_LIMIT_MAX || 5),
    },
    ts: new Date().toISOString(),
  };
  return NextResponse.json(info, { status: 200, headers: { "Cache-Control": "no-store, no-cache" } });
}