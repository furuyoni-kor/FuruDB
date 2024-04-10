import type { CharacterName } from "./character.type";

export type Language = "kor" | "jpn" | "eng";

export type Season =
  | "S1"
  | "S2"
  | "S3"
  | "S4"
  | "S5"
  | "S6"
  | "S6-2"
  | "S7"
  | "S7-2"
  | "S8"
  | "S8-2"
  | "S9";

export interface Rotation {
  startFrom: string;
  endAt: string;
  rotation: CharacterName[];
}
