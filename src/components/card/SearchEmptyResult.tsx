"use client";

import { useMemo } from "react";

import { EMPTY_DATA } from "@/constant/card";

import { useI18nContext } from "@/context/i18n.context";

import { getRandomNumberBetween } from "@/utils/math.util";

import {
  CardSearchResultEmptyContainer,
  CardSearchResultEmptyImage,
  CardSearchResultEmptyText,
} from "@/styles/card.style";

import type { FC } from "react";

const SearchEmptyResult: FC = () => {
  const I18n = useI18nContext();

  const character = useMemo(() => {
    const randomIndex = getRandomNumberBetween(0, EMPTY_DATA.length - 1);
    const character = EMPTY_DATA[randomIndex];
    return character;
  }, []);

  return (
    character && (
      <CardSearchResultEmptyContainer>
        <CardSearchResultEmptyImage
          alt={character}
          src={`/images/chibi/${character}.webp`}
        />
        <CardSearchResultEmptyText>
          {I18n.t(`card.search.empty.${character}`)}
        </CardSearchResultEmptyText>
      </CardSearchResultEmptyContainer>
    )
  );
};

export default SearchEmptyResult;
