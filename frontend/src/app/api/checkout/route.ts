export async function POST(req: Request) {
  await req.json().catch(()=>({}));
  return Response.json({ ok: true, url: "/thank-you" });
}
