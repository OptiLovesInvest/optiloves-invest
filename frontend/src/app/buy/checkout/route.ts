export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(req: Request) {
  try {
    const fd = await req.formData();
    const body = {
      property_id: String(fd.get("property_id") || "kin-001"),
      quantity: Number(fd.get("quantity") || "1"),
      owner: String(fd.get("owner") || "")
    };
    const be  = process.env.BACKEND_URL!;
    const key = process.env.OPTI_API_KEY!;
    const r = await fetch(`${be}/buy/checkout`, {
      method: "POST",
      headers: { "content-type":"application/json", "x-api-key": key },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    const j = await r.json().catch(() => ({} as any));
    const url = (j && j.url) ? j.url : "/thank-you";
    return new Response(null, { status: 303, headers: { Location: url }});
  } catch {
    return new Response(null, { status: 303, headers: { Location: "/thank-you" }});
  }
}
