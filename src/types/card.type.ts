import type { Season } from "@/types/index.type";
import type { CharacterName } from "@/types/character.type";

export type KorCardType = "공격" | "행동" | "부여" | "미정";
export type KorCardSubType = "대응" | "전력" | "미정";
export type KorCardCategory =
  | "통상패"
  | "비장패"
  | "변형"
  | "독"
  | "구상"
  | "병사"
  | "미정";

export type EngCardType = "Attack" | "Action" | "Enhancement" | "Undefined";
export type EngCardSubType = "Reaction" | "Throughout" | "Undefined";
export type EngCardCategory =
  | "Normal"
  | "Special"
  | "Transform"
  | "Poison"
  | "Plot"
  | "Unit"
  | "Parts"
  | "Undefined";

export type JpnCardType = "攻撃" | "行動" | "付与" | "不定";
export type JpnCardSubType = "全力" | "対応" | "不定";
export type JpnCardCategory =
  | "通常札"
  | "切札"
  | "変形"
  | "毒"
  | "構想"
  | "兵士"
  | "パーツ"
  | "不定";

type CardValue = "X" | "-" | number;

export type CardType = KorCardType | EngCardType | JpnCardType;
export type CardSubType = KorCardSubType | EngCardSubType | JpnCardSubType;
export type CardCategory = KorCardCategory | EngCardCategory | JpnCardCategory;

interface CardLimitation {
  limitAt: string;
  season: Season;
  for: string;
}

interface BaseCard {
  fullCode: string;
  name: string;
  type: CardType;
  subType: CardSubType;
  imagePath: string;
  description: string;
  category: CardCategory;
  code: string;
  character: CharacterName;
  relatedExtraCards: {
    name: string;
    fullCode: string;
  }[];
  e: {
    eType: EngCardType;
    eSubType: EngCardSubType;
    eCategory: EngCardCategory;
  };
  revision: Season[];
  limitation: CardLimitation[];
}

export interface AttackCard extends BaseCard {
  distance: string;
  damage: string;
}
export interface ActionCard extends BaseCard {}
export interface EnhancementCard extends BaseCard {
  enhancementCount: "X" | number;
}

export type NormalCard = AttackCard | ActionCard | EnhancementCard;

export type SpecialCard = NormalCard & { cost: CardValue };

export type Card = NormalCard | SpecialCard;

export type DeprecatedCard = Card & { season: string };

export type EngData = EngCardType | EngCardSubType | EngCardCategory;

export interface CharacterCards {
  normalCards: Card[];
  specialCards: Card[];
  extraCards: Card[];
}
