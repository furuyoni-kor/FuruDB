import { MAX_CHARACTER_COUNT } from "@/constant";
import {
  MAX_CARDS_COUNT,
  MAX_NORMAL_CARDS_COUNT,
  MAX_SPECIAL_CARDS_COUNT,
  NORMAL_CARDS_COUNT,
  SPECIAL_CARDS_COUNT,
} from "@/constant/deck";

import { sumArray } from "@/utils/math.util";

import type { CharacterMode } from "@/types/character.type";
import type { DeckArray } from "@/types/deck.type";
import type { SelectedCharacter } from "@/reducer/deckReducer";

export interface DeckCodeAttrs {
  code: string;
  mode: CharacterMode;
  deck: DeckArray;
}

const START_SALT = parseInt("100000000000", 2);

const MODE_TO_NUMBER: { [key in CharacterMode]: number } = {
  O: 0,
  A1: 1,
  AA1: 2,
  A2: 3,
};

const NUMBER_TO_MODE = ["O", "A1", "AA1", "A2"];

const convertCodeToArray = (code: string) => {
  const deckArray = (parseInt(code, 16) - START_SALT)
    .toString(2)
    .split("")
    .map((val) => parseInt(val));

  return deckArray.length === MAX_CARDS_COUNT
    ? deckArray
    : Array.from({ length: MAX_CARDS_COUNT - deckArray.length })
        .fill(0)
        .concat(deckArray);
};

export const encodeDeckCode = (attrs: DeckCodeAttrs) => {
  const { code, mode, deck } = attrs;

  const charNumber = code.replace("NA-", "").padStart(2, "0");
  const modeNumber = MODE_TO_NUMBER[mode];

  // 예외 케이스: 야츠하 A1, AA1에 4번 비장패는 1번 비장패로 취급한다.
  if (
    charNumber === "16" &&
    (modeNumber === 1 || modeNumber === 2) &&
    deck[deck.length - 1] === 1
  ) {
    const replacedDeck = deck.slice(0, 7).concat([1, 0, 0, 0]);
    const deckNumber = parseInt("1" + replacedDeck.join(""), 2).toString(16);

    return (charNumber + modeNumber + deckNumber).toUpperCase();
  }

  const deckNumber = parseInt("1" + deck.join(""), 2).toString(16);

  return (charNumber + modeNumber + deckNumber).toUpperCase();
};

export const createDeckCode = (
  firstGoddess: DeckCodeAttrs,
  secondGoddess: DeckCodeAttrs
) =>
  firstGoddess.code !== secondGoddess.code &&
  firstGoddess.code < secondGoddess.code
    ? encodeDeckCode(firstGoddess) + encodeDeckCode(secondGoddess)
    : encodeDeckCode(secondGoddess) + encodeDeckCode(firstGoddess);

export const decodeDeckCode = (deckCode: string) => {
  const code = "NA-" + deckCode.slice(0, 2);
  const mode = NUMBER_TO_MODE[parseInt(deckCode[2])];
  const deck = convertCodeToArray(deckCode.slice(3, deckCode.length));

  // 예외 케이스: 야츠하 A1, AA1에 4번 비장패는 1번 비장패로 취급한다.
  if (
    code === "NA-16" &&
    (mode === "A1" || mode === "AA1") &&
    deck[deck.length - 4] === 1
  ) {
    const replaceDeck = deck.slice(0, 7).concat(0, 0, 0, 1);

    return {
      code,
      mode,
      deck: replaceDeck,
    };
  }

  return {
    code,
    mode,
    deck,
  };
};

export const translateDeckCode = (deckCode: string) => {
  const firstGoddessDeckCode = deckCode.slice(0, 6);
  const secondGoddessDeckCode = deckCode.slice(6, deckCode.length);

  return [
    decodeDeckCode(firstGoddessDeckCode),
    decodeDeckCode(secondGoddessDeckCode),
  ] as [DeckCodeAttrs, DeckCodeAttrs];
};

export const validateDeckWithCard = (
  characters: [SelectedCharacter, SelectedCharacter],
  data: {
    charCode: string;
    mode: CharacterMode;
    cardIndex: number;
    category: "normal" | "special";
  }
) => {
  switch (data.category) {
    case "normal":
      const normalCharIndex = characters.findIndex(
        (character) =>
          character.code === data.charCode && character.mode === data.mode
      );

      if (normalCharIndex !== -1) {
        const selectedDeck = characters[normalCharIndex].deck.slice(
          0,
          NORMAL_CARDS_COUNT
        );

        if (selectedDeck[data.cardIndex]) return true;

        const anotherDeck = characters[(normalCharIndex + 1) % 2].deck.slice(
          0,
          NORMAL_CARDS_COUNT
        );

        if (
          sumArray(selectedDeck) + sumArray(anotherDeck) <
          MAX_NORMAL_CARDS_COUNT
        )
          return true;
      }

      return false;

    case "special":
      const specialCharIndex = characters.findIndex(
        (character) =>
          character.code === data.charCode && character.mode === data.mode
      );

      if (specialCharIndex !== -1) {
        const selectedDeck = characters[specialCharIndex].deck.slice(
          NORMAL_CARDS_COUNT,
          NORMAL_CARDS_COUNT + SPECIAL_CARDS_COUNT
        );

        if (selectedDeck[data.cardIndex]) return true;

        const anotherDeck = characters[(specialCharIndex + 1) % 2].deck.slice(
          NORMAL_CARDS_COUNT,
          NORMAL_CARDS_COUNT + SPECIAL_CARDS_COUNT
        );

        if (
          sumArray(selectedDeck) + sumArray(anotherDeck) <
          MAX_SPECIAL_CARDS_COUNT
        )
          return true;
      }

      return false;
  }
};

export const validateDeck = (firstDeck: DeckArray, secondDeck: DeckArray) => {
  const firstNormalCards = firstDeck.slice(0, NORMAL_CARDS_COUNT);
  const firstSpecialCards = firstDeck.slice(
    NORMAL_CARDS_COUNT,
    NORMAL_CARDS_COUNT + SPECIAL_CARDS_COUNT
  );

  const secondNormalCards = secondDeck.slice(0, NORMAL_CARDS_COUNT);
  const secondSpecialCards = secondDeck.slice(
    NORMAL_CARDS_COUNT,
    NORMAL_CARDS_COUNT + SPECIAL_CARDS_COUNT
  );

  return (
    sumArray(firstNormalCards) + sumArray(secondNormalCards) === 7 &&
    sumArray(firstSpecialCards) + sumArray(secondSpecialCards) === 3
  );
};

export const validateDeckCode = (deckCode: string) => {
  if (deckCode.length !== 6) return false;

  const code = parseInt(deckCode.slice(0, 2));

  if (code < 1 || code > MAX_CHARACTER_COUNT) return false;

  const mode = deckCode[2];

  const modeValues = Object.values(MODE_TO_NUMBER);
  if (!modeValues.includes(parseInt(mode))) return false;

  const deck = convertCodeToArray(deckCode.slice(3, deckCode.length));

  if (!deck.every((cardExists) => cardExists === 0 || cardExists === 1))
    return false;
  if (deck.length !== MAX_CARDS_COUNT) return false;

  return true;
};

export const validateFullDeckCode = (deckCode: string) => {
  const firstGoddessDeckCode = deckCode.slice(0, 6);
  const secondGoddessDeckCode = deckCode.slice(6, deckCode.length);

  const firstGoddessDeckArray = convertCodeToArray(
    firstGoddessDeckCode.slice(3, firstGoddessDeckCode.length)
  ) as DeckArray;
  const secondGoddessDeckArray = convertCodeToArray(
    secondGoddessDeckCode.slice(3, secondGoddessDeckCode.length)
  ) as DeckArray;

  return (
    validateDeckCode(firstGoddessDeckCode) &&
    validateDeckCode(secondGoddessDeckCode) &&
    validateDeck(firstGoddessDeckArray, secondGoddessDeckArray)
  );
};
