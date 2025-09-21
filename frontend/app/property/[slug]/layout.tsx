import BuyAnchorShim from "@/components/BuyAnchorShim";

// Server component layout (has params)
export default function PropertySlugLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  // Map slug → canonical propertyId (extend as needed)
  const map: Record<string,string> = { "kin-nsele": "kin-001" };
  const propertyId = map[params.slug] ?? params.slug ?? "kin-001";

  return (
    <html>
      <body>
        {/* JS intercept stays mounted */}
        <BuyAnchorShim />
        {/* Guaranteed working Buy button (floating) */}
        <a
          href={`/api/checkout?property=${encodeURIComponent(propertyId)}`}
          className="fixed bottom-6 right-6 rounded-2xl px-5 py-3 shadow-lg font-semibold"
        >
          Buy
        </a>
        {children}
      </body>
    </html>
  );
}