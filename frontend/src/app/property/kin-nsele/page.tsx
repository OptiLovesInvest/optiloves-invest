export const dynamic = 'force-static';
export default function Page() {
  return (
    <main style={{padding:24}}>
      <h1>Kin-Nsele — Static Override</h1>
      <p>Temporary static page to unblock launch.</p>
      <a id="buy-static-cta" href="/thank-you"
         style={{position:'fixed',bottom:16,right:16,zIndex:2147483647,
                 padding:'10px 16px',borderRadius:9999,background:'#111',
                 color:'#fff',fontWeight:600,textDecoration:'none'}}>Buy Now</a>
    </main>
  );
}