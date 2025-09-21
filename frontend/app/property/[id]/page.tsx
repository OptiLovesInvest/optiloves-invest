import Link from 'next/link';
interface Props { params: { id: string } }
export default function PropertyPage({ params }: Props) {
  const P = {
    id: "kin-nsele",
    title: "Kinshasa — Nsele HQ",
    tokenPrice: 50,
    image: "/images/ndaku.jpg",
  };
  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">{P.title}</h1>
      <img src={P.image} alt={P.title} className="w-full h-72 object-cover rounded-2xl border" />
      <div className="mt-4 grid gap-2">
        <div>Token price: ${P.tokenPrice}</div>
        <a href={`/property/${P.id}#buy`} className="px-4 py-2 border rounded-lg inline-block">Buy</a>
      </div>
    </main>
  );
}