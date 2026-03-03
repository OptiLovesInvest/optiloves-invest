import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/((?!_next|favicon.ico|robots.txt|sitemap.xml).*)"],
};

export default function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const { pathname, search } = req.nextUrl;

  // Keep API on the same host to avoid POST redirect issues
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Redirect www -> apex
  if (host === "www.optilovesinvest.com") {
    const url = req.nextUrl.clone();
    url.hostname = "optilovesinvest.com";
    url.pathname = pathname;
    url.search = search;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}