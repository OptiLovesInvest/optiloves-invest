export const dynamic = 'force-static';

export default function Page() {
  return (
    <main style={{padding:'24px',maxWidth:960,margin:'0 auto'}}>
      <h1 style={{fontSize:32,fontWeight:800,marginBottom:12}}>Kin-Nsele — Static Override</h1>
      <p style={{fontSize:16,opacity:.9,marginBottom:24}}>
        Temporary static page to unblock launch. Checkout is currently stubbed to a Thank-You confirmation.
      </p>

      <section style={{background:'#f6f6f6',padding:16,borderRadius:12}}>
        <h2 style={{fontSize:20,marginBottom:8}}>Property Highlights</h2>
        <ul style={{marginLeft:18, lineHeight:1.6}}>
          <li>Token price: </li>
          <li>Supply: 1,000</li>
          <li>Quarterly rental distribution: .50 / token</li>
        </ul>
      </section>

      {/* Always-visible Buy button (no JS, no env) */}
      <a id="buy-plain" href="/thank-you"
         style={{
           position:'fixed',right:16,bottom:16,zIndex:2147483647,
           padding:'12px 18px',borderRadius:9999,background:'#111',
           color:'#fff',fontWeight:700,textDecoration:'none',boxShadow:'0 6px 20px rgba(0,0,0,.2)'
         }}>
        Buy
      </a>
    </main>
  );
}
