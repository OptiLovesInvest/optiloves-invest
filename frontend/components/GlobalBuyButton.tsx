"use client";
export default function GlobalBuyButton(){
  async function handleClick(){
    try{
      const r = await fetch("/api/checkout",{ method:"POST", headers:{"content-type":"application/json"},
        body: JSON.stringify({ property_id:"kin-001", quantity:1 }) });
      const j = await r.json().catch(()=>({}));
      window.location.assign((j && j.url) ? j.url : "/thank-you");
    }catch{
      window.location.assign("/thank-you");
    }
  }
  return (
    <button id="buy-fallback-fixed" onClick={handleClick} style={{
      position:"fixed", bottom:16, right:16, zIndex:2147483647, padding:"12px 18px",
      borderRadius:9999, background:"#111", color:"#fff", fontWeight:700, border:"1px solid #222",
      boxShadow:"0 6px 20px rgba(0,0,0,.25), inset 0 0 0 1px rgba(255,255,255,.04)", cursor:"pointer"
    }}>
      Buy
    </button>
  );
}