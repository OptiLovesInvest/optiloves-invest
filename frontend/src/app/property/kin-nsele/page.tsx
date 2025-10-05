export const dynamic = "force-static";

export default function Page() {
  return (
    <main style={{padding:24}}>
      <h1>Kin-Nsele — Static Override</h1>
      <p>Temporary static page to unblock launch.</p>

      {/* SSR-visible fallback (works even if JS fails) */}
      <a
        id="buy-ssr-fallback"
        href="/thank-you"
        style={{
          display:"inline-block",marginTop:16,padding:"10px 16px",
          borderRadius:9999,background:"#222",color:"#fff",
          fontWeight:700,textDecoration:"none",border:"1px solid #333",
          position:"fixed",bottom:16,right:16,zIndex:2147483646
        }}
      >
        Buy
      </a>
    </main>
  );
}