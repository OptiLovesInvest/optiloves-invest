export type Property = { id: string; title: string; price: number; available: number };

export const PROPERTIES: Record<string, Property> = {
  "kin-001": { id: "kin-001", title: "Kinshasa — Gombe Apartments", price: 50, available: 4997 },
  "lua-001": { id: "lua-001", title: "Luanda — Ilha Offices",      price: 50, available: 3000 },
};

export function getProperty(id: string) {
  return PROPERTIES[id];
}