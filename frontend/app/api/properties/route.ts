export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { properties } from "@/lib/properties";

export async function GET() {
  return NextResponse.json(
    { properties },
    {
      headers: {
        // long-lived static cache; page pulls can still be fully static
        "Cache-Control": "public, max-age=31536000, s-maxage=31536000, immutable",
      },
    }
  );
}



