import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { resources, type Locale } from "./translations";

const LOCALE_STORAGE_KEY = "pulseroadmap.locale";
const DEFAULT_LOCALE: Locale = "en";

function isSupportedLocale(locale: string | null | undefined): locale is Locale {
  return locale === "en" || locale === "fr";
}

function readStoredLocale(): Locale {
  if (typeof window === "undefined") {
    return DEFAULT_LOCALE;
  }

  const storedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);

  return isSupportedLocale(storedLocale) ? storedLocale : DEFAULT_LOCALE;
}

void i18n.use(initReactI18next).init({
  defaultNS: "translation",
  fallbackLng: DEFAULT_LOCALE,
  interpolation: {
    escapeValue: false,
  },
  lng: readStoredLocale(),
  resources,
});

i18n.on("languageChanged", (locale) => {
  if (typeof window !== "undefined" && isSupportedLocale(locale)) {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  }
});

export { i18n, isSupportedLocale };
export type { Locale };
