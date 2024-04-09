import type { Metadata } from "next";
import type { EngCharacterName } from "@/types/character.type";

export const BASE_METADATA: Metadata = {
  title: "FuruDB - All about Furuyoni, Board Game made by BakaFire Party.",
  description:
    "FuruDB - All about Furuyoni, Board Game made by BakaFire Party.",
  keywords: ["furuyoni", "board game", "database"],
  creator: "Winters",
  icons: ["favicon.ico", "/images/twit_icon/21-A1.webp"],
  openGraph: {
    title: "FuruDB - All about Furuyoni, Board Game made by BakaFire Party.",
    description:
      "FuruDB - All about Furuyoni, Board Game made by BakaFire Party.",
    images: "/images/twit_icon/21.A1.webp",
    siteName: "FuruDB",
  },
};

export const DEFAULT_LANG = "kor";
export const DEFAULT_MODE = "O";

export const LOADING_DATA = ["yurina", "saine_a1", "tokoyo_a1"];

export const MAX_CHARACTER_COUNT = 25;

export const ENG_CHARACTER_NAME: EngCharacterName[] = [
  "yurina",
  "saine",
  "himika",
  "tokoyo",
  "oboro",
  "yukihi",
  "shinra",
  "hagane",
  "chikage",
  "kururu",
  "thallya",
  "raira",
  "utsuro",
  "honoka",
  "korunu",
  "yatsuha",
  "hatsumi",
  "mizuki",
  "megumi",
  "kanawe",
  "kamuwi",
  "renri",
  "akina",
  "shisui",
  "misora",
];
