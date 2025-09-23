import { NextResponse } from "next/server";
export function GET(req: Request) {
  const url = new URL(req.url);
  const raw = url.searchParams.get("property") || "";
  const map: Record<string,string> = { "kin-nsele":"kin-001" };
  const pid = map[raw] ?? raw || "kin-001";
  return NextResponse.redirect(new URL(`/api/checkout?property=${encodeURIComponent(pid)}`, url), 307);
}