export type Property = {
  id: string;
  title: string;
  city: string;
  country: string;
  image: string;
  pricePerTokenUsd: number;
  available: number;
  status: "available" | "sold-out" | "coming-soon";
};

export const properties: Property[] = [
  {
    id: "kin-001",
    title: "Ndaku Ngindu (HQ)",
    city: "Kinshasa",
    country: "DRC",
    image: "/ndaku-ngindu.png",
    pricePerTokenUsd: 50,
    available: 4997,
    status: "available",
  },
] as const;

