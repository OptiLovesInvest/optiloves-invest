export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return new Response(
    JSON.stringify({ ok: true, url: "https://optilovesinvest.com/thank-you" }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
}
 
