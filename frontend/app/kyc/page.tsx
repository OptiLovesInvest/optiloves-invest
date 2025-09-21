import { redirect } from "next/navigation";

export default function Page({ searchParams }: { searchParams: { property?: string } }) {
  const map: Record<string,string> = { "kin-nsele": "kin-001" };
  const raw = searchParams?.property ?? "";
  const propertyId = map[raw] ?? raw || "kin-001";
  redirect(`/api/checkout?property=${encodeURIComponent(propertyId)}`);
}