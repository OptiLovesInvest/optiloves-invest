export { t } from "./messages";
export type { Lang } from "./messages";
export { getClientLang, setClientLang } from "./client";

// Compat for legacy imports in repo:
export type L = import("./messages").Lang;
export function getLng(){ return "en"; }