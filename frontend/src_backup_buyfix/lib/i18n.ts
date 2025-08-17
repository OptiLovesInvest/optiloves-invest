// src/lib/i18n.ts
export type L = 'en' | 'fr' | 'lg' | 'pt';

const FALLBACK: L = 'en';
const STORAGE_KEY = 'optiloves_lng';
const ALL: L[] = ['en', 'fr', 'lg', 'pt'];
export const LANGS = ALL;

export function getLng(): L {
  if (typeof window === 'undefined') return FALLBACK; // SSR
  const raw = localStorage.getItem(STORAGE_KEY);
  return (ALL as string[]).includes(raw || '') ? (raw as L) : FALLBACK;
}

export function setLng(lng: L) {
  if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, lng);
}

const dict: Record<L, Record<string, string>> = {
  en: {
    'app.name': 'Optiloves Invest',
    'nav.properties': 'Properties',
    'nav.account': 'Account',
    'hero.title': 'Tokenized access to African real estate. $1 per token.',
    'footer.rights': '© 2025 Optiloves Invest',
    'props': 'Properties',
  },
  fr: {
    'app.name': 'Optiloves Invest',
    'nav.properties': 'Biens',
    'nav.account': 'Compte',
    'hero.title': 'Accès tokenisé à l’immobilier africain. 1 $ par jeton.',
    'footer.rights': '© 2025 Optiloves Invest',
    'props': 'Biens',
  },
  lg: {
    'app.name': 'Optiloves Invest',
    'nav.properties': 'Ebintu by’ettaka',
    'nav.account': 'Akaawunta',
    'hero.title': 'Okugula mu by’ettaka bya Afrika mu butono. $1 buli token.',
    'footer.rights': '© 2025 Optiloves Invest',
    'props': 'Ebintu',
  },
  pt: {
    'app.name': 'Optiloves Invest',
    'nav.properties': 'Propriedades',
    'nav.account': 'Conta',
    'hero.title': 'Acesso tokenizado ao imobiliário africano. $1 por token.',
    'footer.rights': '© 2025 Optiloves Invest',
    'props': 'Propriedades',
  },
};

// helper to detect if a string is a language code
function isLng(s: string): s is L {
  return (ALL as string[]).includes(s);
}

/**
 * Flexible translator:
 * - t('key', 'en')  OR
 * - t('en', 'key')
 * - t('key') uses current/fallback language
 */
export function t(a: string, b?: string): string {
  let key: string;
  let lng: L | undefined;

  if (isLng(a)) {
    lng = a;
    key = b ?? '';
  } else {
    key = a;
    lng = (b as L | undefined);
  }

  const lang = lng ?? (typeof window === 'undefined' ? FALLBACK : getLng());
  return dict[lang]?.[key] ?? dict[FALLBACK]?.[key] ?? key;
}
