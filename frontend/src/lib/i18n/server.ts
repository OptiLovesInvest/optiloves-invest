import { cookies } from "next/headers";
import type { Lang } from "./messages";

export function getServerLang(): Lang {
  try {
    const c = cookies().get("lang")?.value;
    return c === "fr" ? "fr" : "en";
  } catch {
    return "en";
  }
}