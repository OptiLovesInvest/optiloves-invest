import BuyButton from "../../../components/BuyButton";
export default function Page() {
  const propertyId = "kin-001";
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Property: {propertyId}</h1>
      <BuyButton propertyId={propertyId} />
    </main>
  );
}