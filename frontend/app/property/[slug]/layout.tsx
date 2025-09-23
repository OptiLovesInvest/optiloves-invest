import FloatingBuy from "@/components/FloatingBuy";

export default function PropertySlugLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  return (
    <>
      <FloatingBuy />
      <script dangerouslySetInnerHTML={{ __html: `(function(){
  try{
    if(location.pathname.startsWith("/property/")){
      var slug = location.pathname.split("/").pop() || "";
      var map  = {"kin-nsele":"kin-001"};
      var pid  = map[slug] || slug || "kin-001";
      var id = "opti-inline-buy";
      if(!document.getElementById(id)){
        var a = document.createElement("a");
        a.id = id;
        a.href = "/api/checkout?property="+encodeURIComponent(pid);
        a.textContent = "Buy";
        a.style.cssText = "position:fixed;top:18px;right:18px;padding:12px 18px;border-radius:12px;background:#0ea5e9;color:#fff;font-weight:700;text-decoration:none;z-index:2147483647;box-shadow:0 8px 24px rgba(14,165,233,.35)";
        document.body.appendChild(a);
        console.log("[InlineBuy] injected →", a.href);
      }
    }
  }catch(e){ console.error("[InlineBuy] error", e); }
})()` }} />
      {children}
    </>
  );
}