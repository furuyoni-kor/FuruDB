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
  A2: 2,
  AA1: 3,
};

const MODE_TO_NUMBER_EXCEPTION: {
  [key: string]: { [key in CharacterMode]: number };
} = {
  "NA-16": {
    O: 0,
    A1: 1,
    AA1: 2,
    A2: 3,
  },
};

const MODE_TO_NUMBER_EXCEPTION_KEYS = Object.keys(MODE_TO_NUMBER_EXCEPTION);

const NUMBER_TO_MODE = ["O", "A1", "A2", "AA1"];

const NUMBER_TO_MODE_EXCEPTION: {
  [key: string]: CharacterMode[];
} = {
  "NA-16": ["O", "A1", "AA1", "A2"],
};
const NUMBER_TO_MODE_EXCEPTION_KEYS = Object.keys(NUMBER_TO_MODE_EXCEPTION);

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
  const modeNumber = MODE_TO_NUMBER_EXCEPTION_KEYS.includes(code)
    ? MODE_TO_NUMBER_EXCEPTION[code][mode]
    : MODE_TO_NUMBER[mode];

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
) => {
  // 사이네 A1, 토코요 A1 예외처리
  if (
    firstGoddess.code === "NA-02" &&
    firstGoddess.mode === "A1" &&
    secondGoddess.code === "NA-04" &&
    secondGoddess.mode === "A1"
  ) {
    const copiedDeck = [...secondGoddess.deck];
    if (secondGoddess.deck[3]) copiedDeck[3] = 0;
    return (
      encodeDeckCode(firstGoddess) +
      encodeDeckCode({ ...secondGoddess, deck: copiedDeck as DeckArray })
    );
  } else if (
    firstGoddess.code === "NA-04" &&
    firstGoddess.mode === "A1" &&
    secondGoddess.code === "NA-02" &&
    secondGoddess.mode === "A1"
  ) {
    const copiedDeck = [...firstGoddess.deck];
    if (firstGoddess.deck[3]) copiedDeck[3] = 0;
    return (
      encodeDeckCode(secondGoddess) +
      encodeDeckCode({ ...firstGoddess, deck: copiedDeck as DeckArray })
    );
  }

  return firstGoddess.code !== secondGoddess.code &&
    firstGoddess.code < secondGoddess.code
    ? encodeDeckCode(firstGoddess) + encodeDeckCode(secondGoddess)
    : encodeDeckCode(secondGoddess) + encodeDeckCode(firstGoddess);
};

export const decodeDeckCode = (deckCode: string) => {
  const code = "NA-" + deckCode.slice(0, 2);
  const mode = NUMBER_TO_MODE_EXCEPTION_KEYS.includes(code)
    ? NUMBER_TO_MODE_EXCEPTION[code][parseInt(deckCode[2])]
    : NUMBER_TO_MODE[parseInt(deckCode[2])];
  const deck = convertCodeToArray(deckCode.slice(3, deckCode.length));

  // 예외 케이스: 야츠하 A1, AA1에 4번 비장패는 1번 비장패로 취급한다.
  // if (
  //   code === "NA-16" &&
  //   (mode === "A1" || mode === "AA1") &&
  //   deck[deck.length - 4] === 1
  // ) {
  //   const replaceDeck = deck.slice(0, 7).concat(0, 0, 0, 1);

  //   return {
  //     code,
  //     mode,
  //     deck: replaceDeck,
  //   };
  // }

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
        const character = characters[normalCharIndex];
        const selectedDeck = character.deck.slice(0, NORMAL_CARDS_COUNT);

        if (selectedDeck[data.cardIndex]) return true;

        const anotherCharacter = characters[(normalCharIndex + 1) % 2];

        const anotherDeck = anotherCharacter.deck.slice(0, NORMAL_CARDS_COUNT);

        // 사이네 A1, 토코요 A1 예외처리
        if (
          (character.code === "NA-02" &&
            character.mode === "A1" &&
            anotherCharacter.code === "NA-04" &&
            anotherCharacter.mode === "A1") ||
          (data.charCode === "NA-04" &&
            data.mode === "A1" &&
            anotherCharacter.code === "NA-02" &&
            anotherCharacter.mode === "A1")
        ) {
          if (
            character.code === "NA-02" &&
            character.mode === "A1" &&
            anotherCharacter.code === "NA-04" &&
            anotherCharacter.mode === "A1"
          ) {
            if (
              sumArray(selectedDeck) + sumArray(anotherDeck) <
              (selectedDeck[0] && anotherCharacter.deck[3]
                ? MAX_NORMAL_CARDS_COUNT + 1
                : MAX_NORMAL_CARDS_COUNT)
            )
              return true;
          } else if (
            character.code === "NA-04" &&
            character.mode === "A1" &&
            anotherCharacter.code === "NA-02" &&
            anotherCharacter.mode === "A1"
          ) {
            if (
              sumArray(selectedDeck) + sumArray(anotherDeck) <
              (selectedDeck[3] && anotherCharacter.deck[0]
                ? MAX_NORMAL_CARDS_COUNT + 1
                : MAX_NORMAL_CARDS_COUNT)
            )
              return true;
          }
        }

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

export const validateDeck = (
  firstDeck: DeckArray,
  secondDeck: DeckArray,
  exceptions?: {
    normalCount?: number;
    specialCount?: number;
  }
) => {
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

  const normalSum = sumArray(firstNormalCards) + sumArray(secondNormalCards);
  const specialSum = sumArray(firstSpecialCards) + sumArray(secondSpecialCards);

  return (
    (exceptions?.normalCount && exceptions.normalCount > MAX_NORMAL_CARDS_COUNT
      ? normalSum === exceptions.normalCount
      : normalSum === MAX_NORMAL_CARDS_COUNT) &&
    (exceptions?.specialCount &&
    exceptions.specialCount >= MAX_SPECIAL_CARDS_COUNT
      ? specialSum === exceptions.specialCount
      : specialSum === MAX_SPECIAL_CARDS_COUNT)
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
