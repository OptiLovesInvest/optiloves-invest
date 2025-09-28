import BuyFloating from "../../_components/BuyFloating";
interface Props { params: { id: string } }

export default function PropertyPage({ params }: Props) {
  const id = params?.id || "kin-001";
  const P = {
    id,
    title: "Kinshasa — Nsele HQ",
    tokenPrice: 50,
    image: "/images/ndaku.jpg",
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">{P.title}</h1>
      <div className="relative w-full h-72 rounded-2xl border overflow-hidden">
        <img src={P.image} alt={P.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div className="mt-4 grid gap-2">
        <div>Token price: ${P.tokenPrice}</div>
        <p>Use the floating button (bottom-right) to start checkout.</p>
      </div>
      <BuyFloating />
    </main>
  );
}
