export const TOKEN_PRICE_USD = 50 as const;
export function overrideTokenPrice(_: number | undefined | null) {
  return TOKEN_PRICE_USD;
}