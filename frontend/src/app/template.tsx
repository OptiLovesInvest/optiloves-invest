"use client";
import type { ReactNode } from "react";
import GlobalBuyButton from "@/components/GlobalBuyButton";

export default function Template({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <GlobalBuyButton />
    </>
  );
}
