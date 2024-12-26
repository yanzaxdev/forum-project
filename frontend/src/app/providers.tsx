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

type Language = "en" | "he";

interface LanguageContextType {
  lang: Language;
  isHeb: boolean;
  t: typeof xTrans.en | typeof xTrans.he;
  langParam: string;
  setLanguage: (lang: Language) => void;
}

const defaultLanguageContext: LanguageContextType = {
  lang: "en",
  isHeb: false,
  t: xTrans.en,
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

  const currentLang = searchParams.get("lang") as Language;
  const [lang, setLang] = useState<Language>(currentLang || "he");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (currentLang) setLang(currentLang);
  }, [currentLang]);

  const setLanguage = (newLang: Language) => {
    setLang(newLang);
    const params = new URLSearchParams(searchParams);
    if (newLang === "he") params.delete("lang");
    else params.set("lang", newLang);
    router.push(`?${params.toString()}`);
  };

  if (!mounted) return null;

  const contextValue: LanguageContextType = {
    lang,
    isHeb: lang === "he",
    t: lang === "he" ? xTrans.he : xTrans.en,
    langParam: lang === "he" ? "" : "?lang=en",
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
