export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Page({ searchParams }: { searchParams: Record<string, string | undefined> }) {
  const property_id = searchParams.property_id ?? "kin-001";
  const quantity    = searchParams.quantity ?? "1";
  const owner       = searchParams.owner ?? "";
  return (
    <main style={{maxWidth:520,margin:"64px auto",padding:"24px",fontFamily:"sans-serif"}}>
      <h1 style={{marginBottom:16}}>Test Checkout</h1>
      <form method="post" action="/buy/checkout" id="buy-ssr-form">
        <div style={{marginBottom:12}}>
          <label>Property ID<br/><input name="property_id" defaultValue={property_id} required /></label>
        </div>
        <div style={{marginBottom:12}}>
          <label>Quantity<br/><input name="quantity" type="number" min="1" defaultValue={quantity} required /></label>
        </div>
        <div style={{marginBottom:16}}>
          <label>Owner (wallet)<br/><input name="owner" defaultValue={owner} required /></label>
        </div>
        <button type="submit" style={{padding:"10px 16px",borderRadius:9999,background:"#111",color:"#fff",fontWeight:600}}>
          Buy Now
        </button>
      </form>
      <p style={{marginTop:12,opacity:.7}}>Share: <code>/buy?property_id=kin-001&owner=YOUR_WALLET</code></p>
    </main>
  );
}
