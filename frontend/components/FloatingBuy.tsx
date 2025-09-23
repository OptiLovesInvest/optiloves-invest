"use client";
import { usePathname } from "next/navigation";
export default function FloatingBuy(){
  const pathname = usePathname() || "";
  const slug = pathname.split("/").pop() || "";
  const map: Record<string,string> = { "kin-nsele":"kin-001" };
  const propertyId = map[slug] ?? slug || "kin-001";
  return <a className="btn-primary buy-fab" href={`/api/checkout?property=${encodeURIComponent(propertyId)}`}>Buy</a>;
}