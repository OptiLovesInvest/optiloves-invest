export type Lang = import("./i18n").Lang;

/**
 * Get current UI language.
 * - Tries ?lang=en/fr/lg/pt
 * - Then localStorage "lang"
 * - Defaults to "en"
 */
export function getLang(): Lang {
  try {
    if (typeof window !== "undefined") {
      const qs = new URLSearchParams(window.location.search);
      const q = (qs.get("lang") || "").toLowerCase();
      if (q === "en" || q === "fr" || q === "lg" || q === "pt") return q as Lang;

      const stored = (localStorage.getItem("lang") || "").toLowerCase();
      if (stored === "en" || stored === "fr" || stored === "lg" || stored === "pt") return stored as Lang;
    }
  } catch {}
  return "en" as Lang;
}

export function setLang(lang: Lang) {
  try { if (typeof window !== "undefined") localStorage.setItem("lang", lang); } catch {}
}
