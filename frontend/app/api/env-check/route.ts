import { NextResponse } from "next/server";
export const runtime = "nodejs";
export async function GET() {
  return NextResponse.json({
    ok: true,
    hasBackend: !!process.env.BACKEND_URL,
    hasKey: !!process.env.OPTI_API_KEY
  });
}
