"use client";

import Image from "next/image";

import { useI18nContext } from "@/context/i18n.context";

import { MAX_NORMAL_CARDS_COUNT } from "@/constant/deck";

import { convertCodeToImage } from "@/utils/card.util";

import {
  DeckContainer,
  DeckCharacterWrapper,
  DeckCharacterImageWrapper,
  DeckCharacterNameWrapper,
  DeckCharacterName,
  DeckCardWrapper,
  DeckCardContainer,
  DeckCardTitle,
  DeckCardList,
  DeckCardListImageSelected,
  DeckCardListImageWrapper,
} from "@/styles/deck.style";

import type { FC } from "react";
import type { Character } from "@/types/character.type";
import type { DeckArray } from "@/types/deck.type";
import type { DeckCardPayload } from "@/reducer/deckReducer";

interface DeckProps {
  deck: DeckArray;
  character: Character;
  onClick: (card: DeckCardPayload) => (e: React.MouseEvent) => void;
}

const DeckCharacter: FC<DeckProps> = ({ deck, character, onClick }) => {
  const TAROT = {
    width: 200,
    height: 400,
  };
  const CARD = {
    width: 100,
    height: 140,
  };

  const { code, mode, name, normalCards, specialCards } = character;

  const parseCharacterName = (name: string) => {
    const splitedName = name.split(" ");

    return (
      <DeckCharacterNameWrapper>
        <DeckCharacterName>{splitedName[0]}</DeckCharacterName>
        <DeckCharacterName>
          {splitedName.slice(1, splitedName.length).join(" ")}
        </DeckCharacterName>
      </DeckCharacterNameWrapper>
    );
  };

  const I18n = useI18nContext();

  return (
    <DeckContainer>
      <DeckCharacterWrapper>
        <DeckCharacterImageWrapper>
          <Image
            alt={character.name}
            src={`/images/tarot/${I18n.language}/${code.replace(
              "NA-",
              ""
            )}-${mode}.webp`}
            width={TAROT.width}
            height={TAROT.height}
            priority={true}
            style={{ borderRadius: 4 }}
          />
        </DeckCharacterImageWrapper>
        {parseCharacterName(name)}
      </DeckCharacterWrapper>
      <DeckCardWrapper>
        <DeckCardContainer>
          <DeckCardTitle
            style={
              I18n.language === "eng"
                ? { fontSize: "2rem", lineHeight: "24px" }
                : { fontSize: "2.5rem", lineHeight: "48px" }
            }
          >
            {(I18n.t("deck.build.normal") as string)
              .split("")
              .map((char, index) => (
                <span key={`normal-${index}-${char}`}>{char}</span>
              ))}
          </DeckCardTitle>
          <DeckCardList>
            {normalCards.map((card, index) => (
              <DeckCardListImageWrapper key={card.fullCode}>
                <Image
                  alt={card.fullCode}
                  className={deck[index] ? "selected" : ""}
                  src={`/images/card/${I18n.language}/${convertCodeToImage(
                    card.fullCode
                  )}.webp`}
                  title={card.name}
                  width={CARD.width}
                  height={CARD.height}
                  priority={true}
                  onClick={onClick({
                    charCode: character.code,
                    category: "normal",
                    mode: character.mode,
                    cardIndex: index,
                  })}
                />
                <DeckCardListImageSelected
                  style={{
                    fontSize: I18n.language === "eng" ? "1.6rem" : "2rem",
                  }}
                  onClick={onClick({
                    charCode: character.code,
                    category: "normal",
                    mode: character.mode,
                    cardIndex: index,
                  })}
                >
                  <span>{I18n.t("deck.build.selected")}</span>
                </DeckCardListImageSelected>
              </DeckCardListImageWrapper>
            ))}
          </DeckCardList>
        </DeckCardContainer>
        <DeckCardContainer>
          <DeckCardTitle
            style={
              I18n.language === "eng"
                ? { fontSize: "2rem", lineHeight: "24px" }
                : { fontSize: "2.5rem", lineHeight: "48px" }
            }
          >
            {(I18n.t("deck.build.special") as string)
              .split("")
              .map((char, index) => (
                <span key={`speciall-${index}-${char}`}>{char}</span>
              ))}
          </DeckCardTitle>
          <DeckCardList>
            {specialCards.map((card, index) => (
              <DeckCardListImageWrapper
                key={card.fullCode}
                onClick={onClick({
                  charCode: character.code,
                  category: "special",
                  mode: character.mode,
                  cardIndex: index,
                })}
              >
                <Image
                  alt={card.fullCode}
                  className={
                    deck[index + MAX_NORMAL_CARDS_COUNT] ? "selected" : ""
                  }
                  src={`/images/card/${I18n.language}/${convertCodeToImage(
                    card.fullCode
                  )}.webp`}
                  title={card.name}
                  width={CARD.width}
                  height={CARD.height}
                  priority={true}
                />
                <DeckCardListImageSelected
                  style={{
                    fontSize: I18n.language === "eng" ? "1.6rem" : "2rem",
                  }}
                  onClick={onClick({
                    charCode: character.code,
                    category: "special",
                    mode: character.mode,
                    cardIndex: index,
                  })}
                >
                  <span>{I18n.t("deck.build.selected")}</span>
                </DeckCardListImageSelected>
              </DeckCardListImageWrapper>
            ))}
          </DeckCardList>
        </DeckCardContainer>
      </DeckCardWrapper>
    </DeckContainer>
  );
};

export default DeckCharacter;
