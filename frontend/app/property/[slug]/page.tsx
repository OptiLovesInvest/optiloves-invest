import BuyButton from "../../../components/BuyButton";
export default function Page({ params }:{ params:{ slug:string } }) {
  const slug = params.slug;
  const map: Record<string,string> = { "kin-001":"kin-001", "lua-001":"lua-001" };
  const propertyId = (map[slug] ?? slug) || "kin-001";
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Property: {propertyId}</h1>
      <BuyButton propertyId={propertyId} />
    </main>
  );
}