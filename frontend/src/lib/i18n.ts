export type Lang = "en" | "fr";

const dict = {
  en: {
    hero: {
      title: "Tokenized access to African real estate",
      cta: "View properties",
    },
    nav: {
      terms: "Terms",
      privacy: "Privacy",
    },
    confirm: {
      title: "Order confirmation",
    },
    checkout: {
      title: "Checkout",
      buy: "Buy",
    },
    common: {
      back: "Back",
    },
  },
  fr: {
    hero: {
      title: "AccÃ¨s tokenisÃ© Ã  l'immobilier africain",
      cta: "Voir les biens",
    },
    nav: {
      terms: "Conditions",
      privacy: "ConfidentialitÃ©",
    },
    confirm: {
      title: "Confirmation de la commande",
    },
    checkout: {
      title: "Paiement",
      buy: "Acheter",
    },
    common: {
      back: "Retour",
    },
  },
} as const;

/** Client-side language guess from cookie or browser */
export function getClientLang(): Lang {
  if (typeof document !== "undefined") {
    const m = document.cookie.match(/(?:^|;\\s*)lang=(en|fr)/i);
    if (m) return (m[1].toLowerCase() as Lang);
    return navigator.language?.toLowerCase().startsWith("fr") ? "fr" : "en";
  }
  return "en";
}

/** Dotted-key translation with safe fallback. Always returns a string. */
export function t(lang: Lang, key: string, ..._rest: any[]): string {
  const getPath = (obj: any, path: string) =>
    path.split(".").reduce((acc, k) => (acc && acc[k] !== undefined ? acc[k] : undefined), obj);
  const val = getPath((dict as any)[lang], key) ?? getPath((dict as any).en, key);
  return typeof val === "string" ? val : key;
}

export { dict };
/**
 * Compatibility shim:
 * Some components do `import { L } from "../lib/i18n"` and use `L[lang]["some.key"]`.
 * This proxy maps that to our `t(lang, key)` function.
 */
export const L: any = new Proxy({}, {
  get(_target, langProp) {
    const lang = String(langProp) as any;
    return new Proxy({}, {
      get(_t, keyProp) {
        return t(lang, String(keyProp));
      }
    });
  }
});
