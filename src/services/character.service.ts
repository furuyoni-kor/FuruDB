import { https } from "./https";

import { DEFAULT_LANG, DEFAULT_MODE } from "@/constant";

import { createQueryString } from "@/utils/service.util";

import type { Language } from "@/types/index.type";
import type { Response } from "@/types/service.type";
import type {
  Character,
  CharacterName,
  CharacterMode,
  CharacterDeckInfo,
  EngCharacterName,
} from "@/types/character.type";

export const getCharacterList = async (options: {
  lang?: Language | null;
  mode?: CharacterMode | null;
}) => {
  const { lang, mode } = options;

  const queryString = createQueryString([
    ["lang", lang || DEFAULT_LANG],
    ["mode", mode || DEFAULT_MODE],
  ]);

  const response = await https.get<Response<CharacterName[]>>(
    `/character?${queryString}`
  );

  return response;
};

export const getCharacter = async (
  char: EngCharacterName,
  options: {
    lang: Language | null;
    mode?: CharacterMode | null;
    detail?: boolean | null;
  }
) => {
  const { lang, mode, detail } = options;

  const queryString = createQueryString([
    ["lang", lang || DEFAULT_LANG],
    ["mode", mode || DEFAULT_MODE],
    ["detail", (detail && detail.toString()) || null],
  ]);

  const response = await https.get<Response<Character>>(
    `/character/${char}?${queryString}`
  );

  return response;
};

export const getCharacterListWithMode = async (options: {
  lang?: Language | null;
}) => {
  const { lang } = options;

  const queryString = createQueryString([["lang", lang || DEFAULT_LANG]]);

  const response = await https.get<Response<CharacterDeckInfo[]>>(
    `/character/mode?${queryString}`
  );

  return response;
};
