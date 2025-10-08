import { NextResponse } from "next/server";

export async function POST() {
  // Frontend-only success. No backend dependency.
  const oid = Math.random().toString(36).slice(2);
  return NextResponse.json({ ok:true, url:`https://optilovesinvest.com/thank-you?oid=${oid}` });
}
