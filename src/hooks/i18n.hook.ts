"use client";

import { useState, useEffect } from "react";

import LanguageData from "@/i18n/index.i18n";

import { DEFAULT_LANG } from "@/constant";

import type { Language } from "@/types/index.type";

type Data = {
  [key in Language]: object;
};

const data = LanguageData as Data;

export const useI18n = () => {
  const [language, setLanguage] = useState<Language>(
    (typeof window !== "undefined" &&
      (localStorage.getItem("i18n-language") as Language)) ||
      DEFAULT_LANG
  );
  const [i18n, setI18n] = useState(data[language]);

  const changeLanguage = (nextLang: Language) => setLanguage(nextLang);

  const t = (query: string) => {
    const keyArray = query.split(".");

    if (keyArray.length < 2)
      throw new Error(`I18n query is inappropriate. (query: ${query})`);

    let langKey: string | undefined = "";
    let tValue = i18n;

    while (keyArray.length > 0) {
      langKey = keyArray.shift();

      if (langKey) {
        const keys = Object.keys(tValue);

        if (keys.includes(langKey)) {
          tValue = (tValue as object)[langKey as keyof object];

          if (keyArray.length === 0) {
            if (typeof tValue === "string") return tValue;
            else throw new Error("I18n query path is unavailable.");
          }
          continue;
        }

        throw new Error(`I18n query key is not matched. (query: ${query})`);
      }

      throw new Error(`I18n query key is not exist. (query: ${query})`);
    }
  };

  useEffect(() => {
    setI18n(data[language]);
    localStorage.setItem("i18n-language", language);
  }, [language]);

  return {
    language,
    changeLanguage,
    t,
  };
};
