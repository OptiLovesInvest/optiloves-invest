"use client";
import { useEffect } from "react";

export default function BuyAnchorShim(){
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!location.pathname.startsWith("/property/")) return;
    console.log("[OptiShim] mounted:", location.pathname);

    const onClick = (e: any) => {
      const el = e?.target as Element | null;
      if (!el) return;

      // 1) Exact anchor id/href
      const buyAnchor = el.closest?.("a[href='#buy'], #buy") as HTMLAnchorElement | null;
      if (buyAnchor) {
        e.preventDefault();
        redirect();
        return;
      }

      // 2) Generic clickable widgets
      const root = el.closest?.("a,button,[role='button'],[data-buy]") as HTMLElement | null;
      if (!root) return;

      // If anchor has a real href (not #/#buy/empty) let it proceed
      const href = (root as HTMLAnchorElement).getAttribute?.("href") || "";
      if (href && !/^#?$/.test(href) && href !== "#buy") return;

      // Heuristics: explicit data attr or label contains "buy"
      const hasFlag = root.hasAttribute("data-buy") || root.id === "buy";
      const label = (root.textContent || "").trim().toLowerCase();
      const looksLikeBuy = hasFlag || /\bbuy\b/.test(label);
      if (!looksLikeBuy) return;

      e.preventDefault();
      redirect();
    };

    function redirect(){
      const slug = location.pathname.split("/").pop() || "";
      const map  = { "kin-nsele": "kin-001" };
      const propertyId = (map as any)[slug] || slug || "kin-001";
      console.log("[OptiShim] redirect â†’ /api/checkout?property=", propertyId);
      location.href = `/api/checkout?property=${encodeURIComponent(propertyId)}`;
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}
