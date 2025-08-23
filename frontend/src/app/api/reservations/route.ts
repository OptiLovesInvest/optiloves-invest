import { NextResponse } from "next/server";
export async function GET() {
  try {
    const base = (process.env.NEXT_PUBLIC_BACKEND ?? (process.env.NEXT_PUBLIC_BACKEND ?? (process.env.NEXT_PUBLIC_BACKEND ?? (process.env.NEXT_PUBLIC_BACKEND ?? process.env.NEXT_PUBLIC_BACKEND_URL)_URL))_URL) || "${process.env.NEXT_PUBLIC_BACKEND ?? (process.env.NEXT_PUBLIC_BACKEND ?? (process.env.NEXT_PUBLIC_BACKEND ?? process.env.NEXT_PUBLIC_BACKEND_URL)_URL)}";
    const res = await fetch(`${base.replace(/\/$/, "")}/reservations`, { cache: "no-store" });
    const j = await res.json();
    return NextResponse.json(j, { status: res.status || 200 });
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}


