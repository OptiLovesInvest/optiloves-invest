import Image from 'next/image';
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
      <div className="relative w-full h-72 rounded-2xl border overflow-hidden">
  <Image src={P.image} alt={P.title} fill className="object-cover" />
</div>
      <div className="mt-4 grid gap-2">
        <div>Token price: ${P.tokenPrice}</div>
        <Link href={`/kyc?property=${params.id}`} className="rounded-lg px-2 py-1 bg-black text-white">Buy</Link>
      </div>
    </main>
  );
}