"use client";
import { usePathname } from "next/navigation";

export default function FloatingBuy(){
  const pathname = usePathname() || ""; console.log("[FloatingBuy] on", pathname); console.log("[FloatingBuy] mounted on", pathname);
  const slug = pathname.split("/").pop() || "";
  const map: Record<string,string> = { "kin-nsele":"kin-001" };
  const propertyId = map[slug] ?? slug || "kin-001";
  return (
    <a
      href={`/api/checkout?property=${encodeURIComponent(propertyId)}`}
      style={{
        position:"fixed", right:"18px", bottom:"18px", zIndex: 2147483647,
        padding:"12px 18px", borderRadius:"12px",
        background:"#0ea5e9", color:"#fff", fontWeight:700, textDecoration:"none",
        boxShadow:"0 8px 24px rgba(14,165,233,.35)"
      }}
    >Buy</a>
  );
}
