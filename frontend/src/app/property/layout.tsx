import GlobalBuyButton from "../../../components/GlobalBuyButton";
export default function PropertyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <a id="buy-ssr-fallback" href="/thank-you" style={{
        position:"fixed",bottom:16,right:16,zIndex:2147483646,padding:"10px 16px",
        borderRadius:9999,background:"#222",color:"#fff",fontWeight:700,
        textDecoration:"none",border:"1px solid #333"
      }}>Buy</a>
      <GlobalBuyButton />
    </>
  );
}