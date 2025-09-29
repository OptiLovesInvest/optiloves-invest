import { NextResponse } from "next/server";
export async function POST() {
  return NextResponse.json({ ok:true, stage:"minimal", url:"https://optilovesinvest.com/thank-you" }, { status:200 });
}
export async function GET() {
  return NextResponse.json({ ok:true, stage:"minimal" }, { status:200 });
}