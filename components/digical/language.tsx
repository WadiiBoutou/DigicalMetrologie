"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  digicalTranslations,
  type DigicalTranslationKey,
} from "@/lib/digical-translations";

export type DigicalLanguage = "FR" | "AR";

export type TranslationKey = DigicalTranslationKey;

const STORAGE_KEY = "digical-language";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

const translations = digicalTranslations;

function writeLanguageCookie(value: DigicalLanguage) {
  if (typeof document === "undefined") return;
  document.cookie = `${STORAGE_KEY}=${value}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

type LanguageContextValue = {
  lang: DigicalLanguage;
  setLang: (next: DigicalLanguage) => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

type ProviderProps = {
  children: ReactNode;
  /** From server cookie so first paint matches preference after full reload */
  initialLang: DigicalLanguage;
};

export function DigicalLanguageProvider({ children, initialLang }: ProviderProps) {
  const [lang, setLangState] = useState<DigicalLanguage>(() =>
    initialLang === "AR" ? "AR" : "FR",
  );

  const didReconcileLs = useRef(false);

  useLayoutEffect(() => {
    if (didReconcileLs.current) return;
    didReconcileLs.current = true;
    try {
      const fromLs = window.localStorage.getItem(STORAGE_KEY);
      if (fromLs === "FR" || fromLs === "AR") {
        setLangState((prev) => {
          if (fromLs === prev) return prev;
          writeLanguageCookie(fromLs);
          return fromLs;
        });
      }
    } catch {
      /* ignore */
    }
  }, []);

  const setLang = useCallback((next: DigicalLanguage) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    writeLanguageCookie(next);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (lang === "AR") {
      root.setAttribute("dir", "rtl");
      root.setAttribute("lang", "ar");
    } else {
      root.setAttribute("dir", "ltr");
      root.setAttribute("lang", "fr");
    }
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang }), [lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useDigicalLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useDigicalLanguage must be used inside DigicalLanguageProvider");
  }
  return context;
}

export function useDigicalI18n() {
  const { lang, setLang } = useDigicalLanguage();
  const isArabic = lang === "AR";
  const t = (key: TranslationKey) => translations[key][lang];
  return { lang, setLang, isArabic, t };
}
