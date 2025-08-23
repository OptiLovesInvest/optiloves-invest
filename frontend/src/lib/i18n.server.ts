import { cookies } from "next/headers";
import type { Lang } from "./i18n";
export function getServerLang(): Lang { const v = cookies().get("lang")?.value; return v === "fr" ? "fr" : "en"; }