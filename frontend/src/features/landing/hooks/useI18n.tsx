import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { loadMultipleTranslations } from "../i18n/utils/load";
import { locale as localeSignal, translations } from "../i18n/store";
import { compileTemplate } from "../i18n/utils/template";
import type { Locale } from "../i18n/types";

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, props?: Record<string, string | number | boolean>) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

const getInitialLocale = (): Locale => {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem("portfolio-locale");
  if (stored === "de" || stored === "en") return stored;
  return window.location.pathname.startsWith("/de") ? "de" : "en";
};

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);
  const [, forceRender] = useState(0);

  useEffect(() => {
    localeSignal.value = locale;
    window.localStorage.setItem("portfolio-locale", locale);

    let cancelled = false;
    loadMultipleTranslations(["common"], locale).then((loadedTranslations) => {
      if (cancelled) return;
      translations.value = loadedTranslations;
      forceRender((value) => value + 1);
    });

    return () => {
      cancelled = true;
    };
  }, [locale]);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale: setLocaleState,
      t: (key, props = {}) => {
        const translation = translations.value[key];
        if (!translation) return "";
        return compileTemplate(translation)(props as Record<string, string>);
      },
    }),
    [locale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useI18n = () => {
  const value = useContext(I18nContext);
  if (!value) {
    throw new Error("useI18n must be used inside I18nProvider");
  }
  return value;
};
