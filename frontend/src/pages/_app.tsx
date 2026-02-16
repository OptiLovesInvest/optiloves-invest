import Link from 'next/link';
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import GlobalBuyButton from "../../components/GlobalBuyButton";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isProperty = router.pathname.startsWith("/property");

  return (
    <>
      <Component {...pageProps} />
      {isProperty && (
        <>
          {/* SSR fallback visible in raw HTML (no JS/probes) */}
          <Link
            id="buy-ssr-fallback"
            href="/thank-you"
            style={{
              position: "fixed",
              bottom: 16,
              right: 16,
              zIndex: 2147483646,
              padding: "10px 16px",
              borderRadius: 9999,
              background: "#222",
              color: "#fff",
              fontWeight: 700,
              textDecoration: "none",
              border: "1px solid #333",
            }}
          >
            Buy
          </Link>
          {/* Client floating CTA on top for real users */}
          <GlobalBuyButton />
        </>
      )}
    </>
  );
}



