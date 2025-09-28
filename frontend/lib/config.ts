export const BUY_LINK =
  process.env.NEXT_PUBLIC_BUY_LINK && process.env.NEXT_PUBLIC_BUY_LINK.startsWith("http")
    ? process.env.NEXT_PUBLIC_BUY_LINK
    : "/api/checkout";

