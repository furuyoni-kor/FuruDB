import {
  createDeckCode,
  encodeDeckCode,
  decodeDeckCode,
  translateDeckCode,
  validateDeckWithCard,
  validateDeck,
} from "../utils/deck.util";

import type { DeckCodeAttrs } from "@/utils/deck.util";

const YURINA_O_DECK: DeckCodeAttrs = {
  code: "NA-01",
  mode: "O",
  deck: [1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0],
};

const YURINA_O_DECK_CODE = "010F8C";

const SAINE_O_DECK: DeckCodeAttrs = {
  code: "NA-02",
  mode: "O",
  deck: [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
};

const SAINE_O_DECK_CODE = "020C92";

const YATSUHA_O_DECK: DeckCodeAttrs = {
  code: "NA-16",
  mode: "O",
  deck: [1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
};

const YATSUHA_O_DECK_CODE = "160E31";

const YATSUHA_A1_DECK: DeckCodeAttrs = {
  code: "NA-16",
  mode: "A1",
  deck: [1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0],
};

const YATSUHA_A1_DECK_CODE = "161E38";

const YATSUHA_AA1_DECK: DeckCodeAttrs = {
  code: "NA-16",
  mode: "AA1",
  deck: [1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0],
};

const YATSUHA_AA1_DECK_CODE = "162E38";

const YURINA_O_SAINE_O_DECK_CODE = "010F8C020C92";

describe("덱 코드 생성 테스트", () => {
  test("예시 유리나(O) 덱 코드 생성 테스트", () => {
    expect(encodeDeckCode(YURINA_O_DECK)).toEqual(YURINA_O_DECK_CODE);
  });

  test("예시 사이네(O) 덱 코드 생성 테스트", () => {
    expect(encodeDeckCode(SAINE_O_DECK)).toEqual(SAINE_O_DECK_CODE);
  });

  test("예시 야츠하(O) 덱 코드 생성 테스트", () => {
    expect(encodeDeckCode(YATSUHA_O_DECK)).toEqual(YATSUHA_O_DECK_CODE);
  });

  test("예시 야츠하(A1, AA1) 덱 코드 생성 테스트", () => {
    expect(encodeDeckCode(YATSUHA_A1_DECK)).toEqual(YATSUHA_A1_DECK_CODE);
    expect(encodeDeckCode(YATSUHA_AA1_DECK)).toEqual(YATSUHA_AA1_DECK_CODE);
  });

  test("예시 유리나(O)/사이네(O) 덱 코드 생성 테스트", () => {
    expect(createDeckCode(YURINA_O_DECK, SAINE_O_DECK)).toEqual(
      YURINA_O_SAINE_O_DECK_CODE
    );
    expect(createDeckCode(SAINE_O_DECK, YURINA_O_DECK)).toEqual(
      YURINA_O_SAINE_O_DECK_CODE
    );
  });
});

describe("덱 코드 해석 테스트", () => {
  test("예시 유리나(O) 덱 코드 해석 테스트", () => {
    const { code, mode, deck } = decodeDeckCode(YURINA_O_DECK_CODE);

    expect(code).toEqual(YURINA_O_DECK.code);
    expect(mode).toEqual(YURINA_O_DECK.mode);
    expect(deck.join("")).toEqual(YURINA_O_DECK.deck.join(""));
  });

  test("예시 사이네(O) 덱 코드 해석 테스트", () => {
    const { code, mode, deck } = decodeDeckCode(SAINE_O_DECK_CODE);

    expect(code).toEqual(SAINE_O_DECK.code);
    expect(mode).toEqual(SAINE_O_DECK.mode);
    expect(deck.join("")).toEqual(SAINE_O_DECK.deck.join(""));
  });

  test("예시 야츠하(O) 덱 코드 해석 테스트", () => {
    const { code, mode, deck } = decodeDeckCode(YATSUHA_O_DECK_CODE);

    expect(code).toEqual(YATSUHA_O_DECK.code);
    expect(mode).toEqual(YATSUHA_O_DECK.mode);
    expect(deck.join("")).toEqual(YATSUHA_O_DECK.deck.join(""));
  });

  test("예시 야츠하(A1) 덱 코드 해석 테스트", () => {
    const { code, mode, deck } = decodeDeckCode(YATSUHA_A1_DECK_CODE);

    expect(code).toEqual(YATSUHA_A1_DECK.code);
    expect(mode).toEqual(YATSUHA_A1_DECK.mode);
    expect(deck.join("")).toEqual(YATSUHA_A1_DECK.deck.join(""));
  });

  test("예시 야츠하(AA1) 덱 코드 해석 테스트", () => {
    const { code, mode, deck } = decodeDeckCode(YATSUHA_AA1_DECK_CODE);

    expect(code).toEqual(YATSUHA_AA1_DECK.code);
    expect(mode).toEqual(YATSUHA_AA1_DECK.mode);
    expect(deck.join("")).toEqual(YATSUHA_AA1_DECK.deck.join(""));
  });

  test("예시 유리나(O)/사이네(O) 덱 코드 해석 테스트", () => {
    const [yurina, saine] = translateDeckCode(YURINA_O_SAINE_O_DECK_CODE);

    expect(yurina.code).toEqual(YURINA_O_DECK.code);
    expect(yurina.mode).toEqual(YURINA_O_DECK.mode);
    expect(yurina.deck.join("")).toEqual(YURINA_O_DECK.deck.join(""));

    expect(saine.code).toEqual(SAINE_O_DECK.code);
    expect(saine.mode).toEqual(SAINE_O_DECK.mode);
    expect(saine.deck.join("")).toEqual(SAINE_O_DECK.deck.join(""));
  });
});
