import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(_req: NextRequest) {
  // No-op in dev: let everything through
  return NextResponse.next();
}

// Apply to all routes except Next.js internals
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};


