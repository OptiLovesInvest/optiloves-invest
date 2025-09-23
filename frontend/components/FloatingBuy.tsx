"use client";
import { usePathname } from "next/navigation";
export default function FloatingBuy(){
  const slug = (usePathname()||"").split("/").pop()||"";
  const map: Record<string,string> = { "kin-nsele":"kin-001" };
  const pid = map[slug] ?? slug || "kin-001";
  return <a className="btn" style={{position:"fixed",right:"18px",bottom:"18px",zIndex:2147483647}}
            href={`/api/checkout?property=${encodeURIComponent(pid)}`}>Buy</a>;
}