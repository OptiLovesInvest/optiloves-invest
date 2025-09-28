import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(_req: NextRequest) {
  // No-op in dev: let everything through
  return NextResponse.next();
}

// Apply to all routes except Next.js internals
export const config = {
  // Apply middleware ONLY to real pages; exclude api/_next/thank-you automatically
  matcher: ['/property/:path*','/properties','/kyc','/account','/','/pledge','/terms'],
};



