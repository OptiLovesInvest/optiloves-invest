import Link from 'next/link';
export default function Properties() {
  const P = {
    id: "kin-nsele",
    title: "Kinshasa Ã¢â‚¬â€ Nsele HQ",
    tokenPrice: 50,
    availableLabel: "Status: Coming soon",
    image: "/images/ndaku.jpg",
  };
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Properties</h1>
      <article className="rounded-2xl border overflow-hidden">
        <img src={P.image} alt={P.title} className="w-full h-48 object-cover" />
        <div className="p-4 grid gap-2">
          <h2 className="font-semibold">{P.title}</h2>
          <div className="text-sm">
            <div>Token price: ${P.tokenPrice}</div>
            <div>Available: {P.availableLabel}</div>
          </div>
          <div className="pt-2 flex gap-3">
            <a href={`/property/${P.id}`} className="px-4 py-2 border rounded-lg">View</a>
            <Link href={`/kyc?property=${P.id}`} className="px-4 py-2 border rounded-lg">Buy</Link>
          </div>
        </div>
      </article>
    </main>
  );
}



