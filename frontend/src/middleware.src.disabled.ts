import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const ALLOWED_HOSTS = {
  exact: new Set<string>(["app.optilovesinvest.com", "localhost:3000", "127.0.0.1:3000"]),
  suffix: [".vercel.app"], // allow any Vercel preview/production URL
};

function isAllowedHost(host: string | null): boolean {
  if (!host) return false;
  if (ALLOWED_HOSTS.exact.has(host)) return true;
  return ALLOWED_HOSTS.suffix.some((s) => host.endsWith(s));
}

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const host = req.headers.get("host");

  // Redirect apex → app. (only applies if apex ever points here)
  if (host === "optilovesinvest.com") {
    const to = new URL(url.href);
    to.host = "app.optilovesinvest.com";
    return NextResponse.redirect(to, 308);
  }

  // Block unexpected hosts (avoid phishing/mis-config)
  if (!isAllowedHost(host)) {
    return new NextResponse("Forbidden host", { status: 403 });
  }

  // Build response (continue to route/page)
  const res = NextResponse.next();

  // Security headers
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Next.js/dev/analytics
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    "connect-src 'self' https://api.optilovesinvest.com https://*.vercel.app",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; ");

  res.headers.set("Content-Security-Policy", csp);
  res.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("Permissions-Policy", "geolocation=(), camera=(), microphone=()");
  res.headers.set("Cross-Origin-Resource-Policy", "same-site");
  res.headers.set("X-DNS-Prefetch-Control", "off");
  res.headers.set("Vary", "Origin");

  return res;
}

// Skip Next internals/static assets for performance
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|logo.png).*)",
  ],
};