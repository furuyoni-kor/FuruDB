import type { CharacterMode } from "@/types/character.type";
import type { DeckArray } from "@/types/deck.type";

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
  const deck = (parseInt(deckCode.slice(3, deckCode.length), 16) - START_SALT)
    .toString(2)
    .split("")
    .map((val) => parseInt(val));

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
  ];
};
