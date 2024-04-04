import type { Card } from "./card.type";

export type CharacterMode = "O" | "A1" | "A2" | "AA1";

type CharacterData = {
  [key in CharacterMode]: string;
};

type CharacterCardData = {
  [key in CharacterMode]: Card[] | string[];
};

export type CharacterName =
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

export interface Character {
  code: string;
  mode: CharacterMode;
  name: string;
  ename: CharacterName;
  imagePath: string;
  abilityKeyword: string;
  abilityDescription: string;
  symbolWeapon: string;
  symbolSub: string;
  normalCards: Card[] | string[];
  specialCards: Card[] | string[];
  extraCards: Card[] | string[];
}

export interface CharacterWithAll {
  code: string;
  mode: CharacterMode[];
  name: CharacterData;
  ename: CharacterName;
  imagePath: CharacterData;
  abilityKeyword: string;
  abilityDescription: string;
  symbolWeapon: string;
  symbolSub: CharacterData;
  normalCards: CharacterCardData;
  specialCards: CharacterCardData;
  extraCards: CharacterCardData;
}
