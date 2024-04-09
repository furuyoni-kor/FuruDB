import { https } from "./https";

import { DEFAULT_LANG, DEFAULT_MODE } from "@/constant";

import { createQueryString } from "@/utils/service.util";

import type { Language, Season } from "@/types/index.type";
import type { Response } from "@/types/service.type";
import type { EngCharacterName, CharacterMode } from "@/types/character.type";
import type { Card, CharacterCards, DeprecatedCard } from "@/types/card.type";

export const getCardByCode = async (code: string, lang: Language | null) => {
  const queryString = createQueryString([["lang", lang || DEFAULT_LANG]]);

  const response = await https.get<Response<Card>>(
    `/card/${code}?${queryString}`
  );

  return response;
};

export const getCardsByCharacter = async (
  char: EngCharacterName,
  lang: Language | null,
  mode: CharacterMode | null
) => {
  const queryString = createQueryString([
    ["lang", lang || DEFAULT_LANG],
    ["mode", mode || DEFAULT_MODE],
  ]);

  const response = await https.get<Response<CharacterCards>>(
    `/card/character/${char}?${queryString}`
  );

  return response;
};

export const getCardByCodeWithSeason = async (
  code: string,
  season: Season,
  lang: Language | null
) => {
  const queryString = createQueryString([
    ["lang", lang || DEFAULT_LANG],
    ["season", season],
  ]);

  const response = await https.get<Response<DeprecatedCard>>(
    `/history/${code}?${queryString}`
  );

  return response;
};

export const searchCardByKeyword = async (keyword: string, lang?: Language) => {
  const queryString = createQueryString([
    ["keyword", keyword],
    ["lang", lang || DEFAULT_LANG],
  ]);

  const response = await https.get<Response<Card[]>>(
    `/card/search?${queryString}`
  );

  return response;
};
