import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const cookieOpts = {
  path: "/",
  maxAge: 60 * 60 * 24 * 365,
  sameSite: "lax" as const,
  secure: true,
};

function sec(extra: Record<string,string> = {}) {
  return {
    "content-type": "application/json",
    "cache-control": "no-store",
    ...extra,
  };
}

export async function POST(req: Request) {
  const { lang } = await req.json().catch(() => ({}));
  if (lang !== "en" && lang !== "fr") {
    return new NextResponse(JSON.stringify({ error: "bad lang" }), { status: 400, headers: sec() });
  }
  const res = new NextResponse(null, { status: 204, headers: sec({ allow: "GET,POST,OPTIONS" }) });
  res.cookies.set("lang", lang, cookieOpts);
  return res;
}

// Handy for no-JS / quick tests: /api/lang?lang=fr&to=/
export async function GET(req: Request) {
  const url = new URL(req.url);
  const lang = url.searchParams.get("lang");
  const to = url.searchParams.get("to") || "/";
  const res = NextResponse.redirect(new URL(to, url), { status: 302 });
  if (lang === "en" || lang === "fr") res.cookies.set("lang", lang, cookieOpts);
  return res;
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      ...sec(),
      allow: "GET,POST,OPTIONS",
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET,POST,OPTIONS",
      "access-control-allow-headers": "content-type",
    },
  });
}