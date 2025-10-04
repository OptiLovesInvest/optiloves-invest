import type { ReactNode } from "react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Template({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <a id="buy-static-cta" href="/thank-you"
         style={{
           position:"fixed",bottom:16,right:16,zIndex:2147483647,
           padding:"10px 16px",borderRadius:9999,background:"#111",
           color:"#fff",fontWeight:600,textDecoration:"none"
         }}>
        Buy Now
      </a>
    </>
  );
}
