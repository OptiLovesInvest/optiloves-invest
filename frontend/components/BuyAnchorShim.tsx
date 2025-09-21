"use client";
import { useEffect } from "react";

export default function BuyAnchorShim(){
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target?.closest?.("a[href='#buy']");
      if (!a) return;
      e.preventDefault();
      const slug = location.pathname.split("/").pop() || "";
      const map  = { "kin-nsele": "kin-001" };
      const propertyId = map[slug] || slug || "kin-001";
      location.href = `/account?property=${encodeURIComponent(propertyId)}#invest`;
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}