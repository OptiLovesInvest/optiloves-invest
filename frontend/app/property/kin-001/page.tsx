import BuyFloating from "../../_components/BuyFloating";
export default function Page() {
  const P = {
    id: "kin-001",
    title: "Kinshasa — Nsele HQ",
    tokenPrice: 50,
    image: "/images/ndaku.jpg",
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">{P.title}</h1>

      <div className="relative w-full h-72 rounded-2xl border overflow-hidden">
        {/* Use plain img to avoid Next/Image config issues */}
        <img src={P.image} alt={P.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>

      <div className="mt-4 grid gap-2">
        <div>Token price: ${P.tokenPrice}</div>
        <p>Use the floating Buy button (bottom-right) to start checkout.</p>
      </div>

        <div className="mt-6">
    <Link
      href="/api/checkout?property=kin-001&owner=69CJqijdBsRg6FdcXZxrtPnjJwsYy1mRcWPpATLxXF6B"
      className="inline-flex items-center rounded-xl px-4 py-2 bg-black text-white font-semibold border border-white/30"
    >
      Buy
    </Link>
  </div>

  <BuyFloating />
    </main>
  );
}
