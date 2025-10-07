export default function Page({ params }:{ params:{ slug:string } }) {
  return (
    <main style={{padding:"24px"}}>
      <h1>Property: {params.slug}</h1>
      <p>Temporary minimal page to guarantee a visible BUY button.</p>
      <a id="buy-fixed" href="/thank-you"
         style={{position:"fixed",bottom:16,right:16,zIndex:2147483647,
                 padding:"12px 18px",borderRadius:9999,background:"#111",
                 color:"#fff",fontWeight:700,textDecoration:"none"}}>
        Buy
      </a>
    </main>
  );
}