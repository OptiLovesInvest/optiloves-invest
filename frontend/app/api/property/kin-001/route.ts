import { NextResponse } from "next/server";
export function GET(req: Request) {
  const url = new URL(req.url);
  return NextResponse.redirect(new URL("/api/checkout?property=kin-001", url), 307);
}

