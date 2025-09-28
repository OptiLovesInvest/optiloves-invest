"use client";
import React from "react";

type Props = { propertyId:string; owner:string; quantity?:number };
export default function BuyButton({ propertyId, owner, quantity=1 }:Props) {
  const [loading,setLoading] = React.useState(false);
  async function onClick() {
    try {
      setLoading(true);
      const r = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/buy/intent`, {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ property_id:propertyId, quantity, owner })
      });
      const data = await r.json();
      alert("Buy OK: " + JSON.stringify(data));
    } catch (e:any) {
      alert("Buy failed: " + (e?.message ?? e));
    } finally {
      setLoading(false);
    }
  }
  return <button onClick={onClick} disabled={loading}>{loading?"…":"Buy"}</button>;
}
