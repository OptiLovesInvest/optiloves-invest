export async function GET() {
  const backend = (process.env.NEXT_PUBLIC_BACKEND || "https://optiloves-backend.onrender.com").replace(/\/$/, "");
  const url = `${backend}/properties`;
  try {
    const r = await fetch(url, { headers: { accept: "application/json" }, cache: "no-store" });
    if (!r.ok) return new Response(await r.text(), { status: r.status });
    const data = await r.json();
    const out = Array.isArray(data)
      ? data.map((it: any) => ({
          id: it?.id,
          title: it?.title,
          price: it?.price ?? 50,
          availableTokens: it?.availableTokens ?? it?.available_tokens ?? 3000,
        }))
      : data;
    return new Response(JSON.stringify(out), {
      headers: { "content-type": "application/json", "cache-control": "s-maxage=30, stale-while-revalidate=60" },
      status: 200,
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: "proxy_failed", message: String(e) }), {
      headers: { "content-type": "application/json" },
      status: 500,
    });
  }
}
