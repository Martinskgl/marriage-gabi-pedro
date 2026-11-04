import type { Locale, Text } from "@/data/site";

export const locales: Locale[] = ["pt", "en"];
export const defaultLocale: Locale = "pt";

export const isLocale = (value: string): value is Locale =>
  (locales as string[]).includes(value);

/** Resolve um texto do arquivo de dados para o idioma atual. */
export const t = (text: Text, lang: Locale): string =>
  typeof text === "string" ? text : text[lang];
