import FloatingBuy from "@/components/FloatingBuy";
import BuyAnchorShim from "@/components/BuyAnchorShim";

export default function PropertyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BuyAnchorShim />
      <FloatingBuy />
      {children}
    </>
  );
}

