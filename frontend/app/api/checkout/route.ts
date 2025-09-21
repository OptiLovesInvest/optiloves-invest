import { NextResponse } from "next/server";
import { BUY_LINK } from "@/lib/config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const origin = new URL(req.url).origin;
  const target = BUY_LINK.startsWith("http") ? BUY_LINK : new URL(BUY_LINK, origin).toString();
  return NextResponse.redirect(target, { status: 303 });
}