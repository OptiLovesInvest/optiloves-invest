import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";
export const fetchCache = "force-no-store";

const BACKEND = process.env.BACKEND_URL || null;
const RATE_LIMIT_WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS || 60_000);
const RATE_LIMIT_MAX = Number(process.env.RATE_LIMIT_MAX || 5);

export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      service: "health",
      backend: BACKEND,
      rateLimit: { windowMs: RATE_LIMIT_WINDOW_MS, max: RATE_LIMIT_MAX },
      ts: new Date().toISOString(),
    },
    { status: 200, headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } }
  );
}