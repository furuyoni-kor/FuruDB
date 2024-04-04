"use client";

import { createContext, useContext } from "react";

import { useI18n } from "@/hooks/i18n.hook";

import type { FC } from "react";
import type { Language } from "@/types/index.type";

interface I18nContext {
  language: Language;
  changeLanguage: (nextLanguage: Language) => void;
  t: (query: string) => string | undefined;
}

const I18nContext = createContext<I18nContext>({
  language: "kor",
  changeLanguage: (nextLanguage: Language) => {},
  t: (query: string) => "",
});

export const I18nProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const I18n = useI18n();
  return (
    <I18nContext.Provider value={{ ...I18n }}>{children}</I18nContext.Provider>
  );
};

export const useI18nContext = () => useContext(I18nContext);
