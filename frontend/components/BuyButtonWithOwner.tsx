"use client";
import { useSearchParams } from "next/navigation";
import BuyButton from "./BuyButton";

type Props = { propertyId: string; quantity?: number; owner?: string };

export default function BuyButtonWithOwner(props: Props) {
  const sp = useSearchParams();
  const ownerQs =
    sp?.get("owner") ||
    sp?.get("o") ||
    sp?.get("wallet") ||
    sp?.get("address") ||
    "";
  const owner = (props.owner && String(props.owner)) || ownerQs || "";
  return <BuyButton {...(props as any)} owner={owner} />;
}