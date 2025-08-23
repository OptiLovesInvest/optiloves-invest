"use client";
import { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";
import { t, Lang } from "../lib/i18n";

type Property = { id: string; title: string; price: number; availableTokens: number };
const API = (process.env.NEXT_PUBLIC_BACKEND ?? process.env.NEXT_PUBLIC_BACKEND_URL) || "https://optiloves-backend.onrender.com";

export default function PropertyList({ lng }: { lng: Lang }) {
  const [items, setItems] = useState<Property[] | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(`${API}/properties`, { cache: "no-store" });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const j = await r.json();
        setItems(Array.isArray(j) ? j : []);
      } catch (e: any) {
        setErr(e?.message || "Failed to load");
        setItems([]);
      }
    })();
  }, []);

  if (items === null) return <div className="text-sm text-gray-500">Loading propertiesâ€¦</div>;
  if (err) return <div className="text-sm text-red-600">Error: {err}</div>;
  if (!items.length) return <div className="text-sm text-gray-500">No properties to show right now.</div>;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p) => <PropertyCard key={p.id} p={p} />)}
    </div>
  );
}



