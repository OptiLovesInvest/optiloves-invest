import { NextResponse } from "next/server";

const cookieOpts = { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" as const, secure: true };

export async function POST(req: Request) {
  const { lang } = await req.json().catch(() => ({}));
  if (lang !== "en" && lang !== "fr") return NextResponse.json({ error: "bad lang" }, { status: 400 });
  const res = new NextResponse(null, { status: 204 });
  res.cookies.set("lang", lang, cookieOpts);
  return res;
}

// Also support GET ?lang=fr&to=/  (handy for quick tests / no-JS)
export async function GET(req: Request) {
  const url = new URL(req.url);
  const lang = url.searchParams.get("lang");
  const to = url.searchParams.get("to") || "/";
  const res = NextResponse.redirect(new URL(to, url), { status: 302 });
  if (lang === "en" || lang === "fr") res.cookies.set("lang", lang, cookieOpts);
  return res;
}