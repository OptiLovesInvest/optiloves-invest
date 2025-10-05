import GlobalBuyButton from "../../../components/GlobalBuyButton";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}

      {/* Client-side floating button */}
      <GlobalBuyButton />

      {/* SSR-visible fallback (works in raw HTML, no JS needed) */}
      <a
        id="buy-ssr-fallback"
        href="/thank-you"
        style={{
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: 2147483646, // just beneath the JS button
          padding: "10px 16px",
          borderRadius: 9999,
          background: "#222",
          color: "#fff",
          fontWeight: 700,
          textDecoration: "none",
          border: "1px solid #333"
        }}
      >
        Buy
      </a>
    </>
  );
}