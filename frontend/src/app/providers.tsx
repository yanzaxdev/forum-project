"use client";

import { ThemeProvider } from "next-themes";
import { useSearchParams, useRouter } from "next/navigation";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { xTrans } from "~/translations";
import { Lang } from "~/utils/language";

export enum Dir {
  LTR = "ltr",
  RTL = "rtl",
}
interface LanguageContextType {
  lang: Lang;
  isRTL: boolean;
  dir: Dir;
  translation: typeof xTrans.en & typeof xTrans.he;
  langParam: string;
  setLanguage: (lang: Lang) => void;
}

const defaultLanguageContext: LanguageContextType = {
  lang: Lang.HE,
  isRTL: false,
  dir: Dir.LTR,
  translation: xTrans.en,
  langParam: "",
  setLanguage: () => {
    throw new Error("setLanguage not implemented");
  },
};

const LanguageContext = createContext<LanguageContextType>(
  defaultLanguageContext,
);

export const useLanguage = () => useContext(LanguageContext);

export const Providers = ({ children }: { children: ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentLang = searchParams.get("lang") as Lang;
  const [lang, setLang] = useState<Lang>(currentLang || "he");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (currentLang) setLang(currentLang);
  }, [currentLang]);

  const setLanguage = (newLang: Lang) => {
    setLang(newLang);
    const params = new URLSearchParams(searchParams);
    if (newLang === Lang.HE) params.delete("lang");
    else params.set("lang", newLang);
    router.push(`?${params.toString()}`);
  };

  if (!mounted) return null;

  const isRTL = lang === Lang.HE;

  const contextValue: LanguageContextType = {
    lang,
    isRTL,
    dir: isRTL ? Dir.RTL : Dir.LTR,
    translation: lang === Lang.HE ? xTrans.he : xTrans.en,
    langParam: lang === Lang.HE ? "" : "?lang=en",
    setLanguage,
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LanguageContext.Provider value={contextValue}>
        {children}
      </LanguageContext.Provider>
    </ThemeProvider>
  );
};

export const AppWrapper = ({ children }: { children: ReactNode }) => (
  <Providers>{children}</Providers>
);
