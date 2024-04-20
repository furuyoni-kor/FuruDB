import type { Metadata } from "next";
import type { EngCharacterName } from "@/types/character.type";

export const BASE_METADATA: Metadata = {
  title: "FuruDB - All about Furuyoni, Board Game made by BakaFire Party.",
  description:
    "FuruDB - All about Furuyoni, Board Game made by BakaFire Party.",
  keywords: ["furuyoni", "board game", "database"],
  creator: "Winters",
  icons: ["favicon.ico", "/images/open-graph.jpeg"],
  openGraph: {
    title: "FuruDB - All about Furuyoni, Board Game made by BakaFire Party.",
    description:
      "FuruDB - All about Furuyoni, Board Game made by BakaFire Party.",
    siteName: "FuruDB",
    url: "https://furudb.pages.dev/",
    images: [
      {
        url: "/images/open-graph.jpeg",
        width: 400,
        height: 400,
      },
    ],
    type: "website",
  },
};

export const DEFAULT_LANG = "kor";
export const DEFAULT_MODE = "O";

export const MAX_CLIENT_WIDTH = 1200;

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
