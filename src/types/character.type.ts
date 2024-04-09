import type { Card } from "./card.type";

export type CharacterMode = "O" | "A1" | "A2" | "AA1";

export type KorCharacterName =
  | "유리나"
  | "사이네"
  | "히미카"
  | "토코요"
  | "오보로"
  | "유키히"
  | "신라"
  | "하가네"
  | "치카게"
  | "쿠루루"
  | "탈리야"
  | "라이라"
  | "우츠로"
  | "호노카"
  | "코르누"
  | "야츠하"
  | "하츠미"
  | "미즈키"
  | "메구미"
  | "카나에"
  | "카무이"
  | "렌리"
  | "아키나"
  | "시스이"
  | "미소라";

export type EngCharacterName =
  | "akina"
  | "chikage"
  | "hagane"
  | "hatsumi"
  | "himika"
  | "honoka"
  | "kamuwi"
  | "kanawe"
  | "korunu"
  | "kururu"
  | "megumi"
  | "misora"
  | "mizuki"
  | "oboro"
  | "raira"
  | "renri"
  | "saine"
  | "shinra"
  | "shisui"
  | "thallya"
  | "tokoyo"
  | "utsuro"
  | "yatsuha"
  | "yukihi"
  | "yurina";

export type JpnCharacterName =
  | "ユリナ"
  | "サイネ"
  | "ヒミカ"
  | "トコヨ"
  | "オボロ"
  | "ユキヒ"
  | "シンラ"
  | "ハガネ"
  | "チカゲ"
  | "クルル"
  | "サリヤ"
  | "ライラ"
  | "ウツロ"
  | "ホノカ"
  | "コルヌ"
  | "ヤツハ"
  | "ハツミ"
  | "ミズキ"
  | "メグミ"
  | "カナヱ"
  | "カムヰ"
  | "レンリ"
  | "アキナ"
  | "シスイ"
  | "ミソラ";

export type CharacterName =
  | KorCharacterName
  | EngCharacterName
  | JpnCharacterName;

export interface Character {
  code: string;
  mode: CharacterMode;
  name: CharacterName;
  modes: CharacterMode[];
  ename: EngCharacterName;
  imagePath: string;
  abilityKeyword: string;
  abilityDescription: string;
  symbolWeapon: string;
  symbolSub: string;
  normalCards: Card[];
  specialCards: Card[];
  extraCards: Card[];
}

export type CharacterDeckInfo = Pick<
  Character,
  "name" | "ename" | "code" | "mode"
>;
