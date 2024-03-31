import type { Card } from "./card.type";

export type CharacterMode = "O" | "A1" | "A2" | "AA1";

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
  mode: CharacterMode[];
  name: string;
  imagePath: string;
  abilityKeyword: string;
  abilityDescription: string;
  symbolWeapon: string;
  SymbolSub?: string;
  normalCards: Card;
  specialCards: Card;
  extraCards: Card;
}
