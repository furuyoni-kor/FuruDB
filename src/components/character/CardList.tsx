"use client";

import Link from "next/link";

import CustomImage from "@/components/Image";

import { EXCEPTION_CHARACTER } from "@/constant/card";

import { useI18nContext } from "@/context/i18n.context";

import {
  CharacterCardWrapper,
  CharacterCardList,
  CharacterCardText,
} from "@/styles/character.style";

import type { FC } from "react";
import type { Card } from "@/types/card.type";
import type { CharacterMode, EngCharacterName } from "@/types/character.type";

interface CardListProps {
  char: EngCharacterName;
  mode: CharacterMode;
  cards: Card[];
  category: "normal" | "special" | "aside";
}

const CardList: FC<CardListProps> = ({ char, mode, cards, category }) => {
  const CARD = {
    pc: {
      width: 125,
      height: 175,
    },
    laptop: {
      width: 100,
      height: 140,
    },
    tablet: {
      width: 75,
      height: 105,
    },
    mobile: {
      width: 50,
      height: 70,
    },
  };

  const I18n = useI18nContext();

  const convertCodeToImage = (code: string) => {
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

  return (
    <CharacterCardWrapper>
      <CharacterCardText>
        {I18n.t(`character.${category}Card`)}
      </CharacterCardText>
      <CharacterCardList>
        {cards.map((card) => (
          <Link
            key={card.fullCode}
            href={`/card/${card.fullCode}?from=character&name=${char}&mode=${mode}`}
          >
            <CustomImage
              src={`/images/card/${I18n.language}/${convertCodeToImage(
                card.fullCode
              )}.webp`}
              alt={card.name}
              title={card.name}
              size={CARD}
              style={{
                borderRadius: 16,
              }}
            />
          </Link>
        ))}
      </CharacterCardList>
    </CharacterCardWrapper>
  );
};

export default CardList;
