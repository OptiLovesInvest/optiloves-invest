import BuyButton from "../../../components/BuyButton";

export default function Page() {
  const propertyId = "kin-nsele";
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Kinshasa — Nsele HQ</h1>
      <p className="mt-2 text-sm">Token price: $50</p>
      {/* Always-visible fallback button */}
      <BuyButton propertyId={propertyId} />
    </main>
  );
}