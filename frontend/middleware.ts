import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/property/kin-001") {
    const url = req.nextUrl.clone();
    url.pathname = "/api/checkout";
    url.search = "property=kin-001";
    return NextResponse.redirect(url, 307);
  }
  return NextResponse.next();
}
export const config = { matcher: ["/property/kin-001"] };