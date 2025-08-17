export type L = "en" | "fr" | "lg" | "pt";

const dict: Record<L, Record<string, string>> = {
  en: { props: "Properties", acct: "Account", lang: "Language", buy: "Buy" },
  fr: { props: "Propriétés", acct: "Compte",   lang: "Langue",   buy: "Acheter" },
  lg: { props: "Ebintu by’ettaka", acct: "Akawunti", lang: "Olulimi", buy: "Gula" },
  pt: { props: "Propriedades", acct: "Conta",  lang: "Idioma",   buy: "Comprar" }
};

export const t = (lng: L, k: string) => dict[lng]?.[k] ?? k;
