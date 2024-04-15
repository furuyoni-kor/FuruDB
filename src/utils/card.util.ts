import { EXCEPTION_CHARACTER } from "@/constant/card";

import type { Language } from "@/types/index.type";

export const convertCodeToImage = (code: string) => {
  const splitedCode = code.split("-");

  const [charCode, character, cardCode] = [
    splitedCode[1],
    splitedCode[2],
    splitedCode.slice(3, splitedCode.length),
  ];

  return EXCEPTION_CHARACTER.includes(character)
    ? [charCode, character, ...cardCode].join("-")
    : [charCode, ...cardCode].join("-");
};

export const createCardPageTitle = (attrs: {
  name: string;
  code: string;
  lang: Language;
  season?: string;
}) => {
  const { name, code, lang, season } = attrs;

  const splitedName = name.split("\r\n");

  if (splitedName.length === 2) {
    const cardName = splitedName[1];

    return `${cardName} (${season ? `${code} ${season}` : code})`;
  }

  return `${name} (${season ? `${code} ${season}` : code})`;
};
