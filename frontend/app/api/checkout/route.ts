import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.text();
  const r = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.OPTI_API_KEY!, // SERVER env only
    },
    body,
    cache: "no-store",
  });
  const text = await r.text();
  return new NextResponse(text, { status: r.status, headers: { "Content-Type": r.headers.get("Content-Type") || "application/json" } });
}
