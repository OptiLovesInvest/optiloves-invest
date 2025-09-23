import BuyAnchorShim from "@/components/BuyAnchorShim";

export default function PropertySlugLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const map: Record<string, string> = { "kin-nsele": "kin-001" };
  const propertyId = map[params.slug] ?? params.slug ?? "kin-001";

  return (
    <>
      <BuyAnchorShim />
      <a
        href={`/api/checkout?property=${encodeURIComponent(propertyId)}`}
        className="fixed bottom-6 right-6 z-50 rounded-2xl px-5 py-3 shadow-lg font-semibold"
      >
        Buy
      </a>
      {children}
    </>
  );
}