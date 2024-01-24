export const i18n = {
  defaultLocale: "en",
  locales: ["en", "de-DE", "de-CH", "nl"],
} as const;

export type Locale = (typeof i18n)["locales"][number];
