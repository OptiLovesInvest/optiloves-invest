import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const APEX = "optilovesinvest.com";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const url = req.nextUrl;

  // allow local & vercel previews
  if (host === "localhost:3000" || host === "127.0.0.1:3000" || host.endsWith(".vercel.app")) {
    return NextResponse.next();
  }

  // send www/app to apex
  if (host === `www.${APEX}` || host === `app.${APEX}`) {
    url.hostname = APEX;
    return NextResponse.redirect(url, 308);
  }

  // apex already canonical
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|api/.*|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|css|js|map|txt|xml|woff|woff2|ttf|otf)).*)",
  ],
};
