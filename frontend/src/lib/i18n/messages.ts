export type Lang = "en" | "fr";

export const M = {
  en: {
    hero_title: "Tokenized access to African real estate.",
    hero_sub: "Invest from $1 per token. Focus: Kinshasa & Luanda.",
    view_properties: "View properties",
    learn_more: "Learn more",
    view_details: "View details",
  },
  fr: {
    hero_title: "Accès tokenisé à l’immobilier africain.",
    hero_sub: "Investissez dès 1 $ par jeton. Focus : Kinshasa & Luanda.",
    view_properties: "Voir les biens",
    learn_more: "En savoir plus",
    view_details: "Voir le détail",
  },
} as const;

export function t(l: Lang, k: keyof typeof M["en"]) {
  return (M as any)[l]?.[k] ?? (M.en as any)[k] ?? String(k);
}