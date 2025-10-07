import React from "react";

export default function PropertyLayout({ children }:{ children: React.ReactNode }) {
  return (
    <>
      {children}
      <a id="buy-fixed" href="/thank-you"
         style={{position:"fixed",bottom:16,right:16,zIndex:2147483647,
                 padding:"12px 18px",borderRadius:9999,background:"#111",
                 color:"#fff",fontWeight:700,textDecoration:"none"}}>
        Buy
      </a>
    </>
  );
}