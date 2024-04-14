"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import { translateDeckCode } from "@/utils/deck.util";

import { validateFullDeckCode } from "@/utils/deck.util";

import {
  DeckAbbrevationContainer,
  DeckAbbreviationImageContainer,
  DeckAbbreviationImageWrapper,
  DeckAbbrevationCodeWrapper,
  DeckAbbrevationCode,
} from "@/styles/deck.style";

import type { FC } from "react";
import type { DeckCodeAttrs } from "@/utils/deck.util";

interface DeckAbbreviationProps {
  deckCode: string;
}

const DeckAbbreviation: FC<DeckAbbreviationProps> = ({ deckCode }) => {
  const ICON = {
    width: 200,
    height: 200,
  };

  const [firstChar, setFirstChar] = useState<DeckCodeAttrs | null>(null);
  const [secondChar, setSecondChar] = useState<DeckCodeAttrs | null>(null);

  useEffect(() => {
    if (validateFullDeckCode(deckCode)) {
      const [firstChar, secondChar] = translateDeckCode(deckCode);
      setFirstChar(firstChar);
      setSecondChar(secondChar);
    }
  }, []);

  return (
    validateFullDeckCode(deckCode) &&
    firstChar &&
    secondChar && (
      <DeckAbbrevationContainer>
        <DeckAbbreviationImageContainer>
          <DeckAbbreviationImageWrapper>
            <Image
              alt={`${firstChar.code}-${firstChar.mode}`}
              src={`/images/twit_icon/${firstChar.code.replace("NA-", "")}-${
                firstChar.mode
              }.webp`}
              title={`${firstChar.code}-${firstChar.mode}`}
              width={ICON.width}
              height={ICON.height}
              priority={true}
            />
          </DeckAbbreviationImageWrapper>
          <DeckAbbreviationImageWrapper>
            <Image
              alt={`${secondChar.code}-${secondChar.mode}`}
              src={`/images/twit_icon/${secondChar.code.replace("NA-", "")}-${
                secondChar.mode
              }.webp`}
              title={`${secondChar.code}-${secondChar.mode}`}
              width={ICON.width}
              height={ICON.height}
              priority={true}
            />
          </DeckAbbreviationImageWrapper>
        </DeckAbbreviationImageContainer>
        <DeckAbbrevationCodeWrapper>
          <DeckAbbrevationCode>{deckCode}</DeckAbbrevationCode>
        </DeckAbbrevationCodeWrapper>
      </DeckAbbrevationContainer>
    )
  );
};

export default DeckAbbreviation;
