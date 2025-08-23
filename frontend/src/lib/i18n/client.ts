import type { Lang } from "./messages";

export function getClientLang(): Lang {
  const m = document.cookie.match(/(?:^|;\s*)lang=(en|fr)/);
  return (m?.[1] as Lang) ?? "en";
}

export function setClientLang(l: Lang) {
  document.cookie = `lang=${l}; Max-Age=${60*60*24*365}; Path=/; SameSite=Lax; Secure`;
}