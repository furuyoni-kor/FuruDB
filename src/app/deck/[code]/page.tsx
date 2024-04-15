"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useParams, redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import html2canvas from "html2canvas";

import Loading from "@/components/Loading";

import { MAX_NORMAL_CARDS_COUNT } from "@/constant/deck";

import { useI18nContext } from "@/context/i18n.context";

import { convertCodeToImage } from "@/utils/card.util";
import { translateDeckCode, validateFullDeckCode } from "@/utils/deck.util";

import { getCharacter, getCharacterList } from "@/services/character.service";

import {
  DeckCodeWrapper,
  DeckCodeInput,
  DeckCodeButton,
  DeckPageWrapper,
  DeckCompleteWrapper,
  DeckSaveImageButton,
  DeckCompleteContainer,
  DeckCompleteCharacters,
  DeckCompleteCharacterWrapper,
  DeckCompleteCharacterName,
  DeckCompleteCharacterImageWrapper,
  DeckCompleteCardContainer,
  DeckCompleteCardListWrapper,
  DeckCompleteCardTitle,
  DeckCompleteCardList,
  DeckCompleteCodeWrapper,
  DeckCompleteCodeTitle,
  DeckCompleteCodeContent,
} from "@/styles/deck.style";

import type { NextPage } from "next";
import type { NormalCard, SpecialCard } from "@/types/card.type";
import type { Character, EngCharacterName } from "@/types/character.type";
import type { SuccessResponse } from "@/types/service.type";

interface NormalCardData {
  fullCode: string;
  name: string;
}

interface SpecialCardData extends NormalCardData {
  cost: number;
}

const DeckDetailPage: NextPage = () => {
  const TAROT = {
    width: 250,
    height: 500,
  };

  const CARD = {
    width: 180,
    height: 252,
  };

  const params = useParams();

  const I18n = useI18nContext();

  const [deckCode, setDeckCode] = useState((params.code as string) || "");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [characters, setCharacters] = useState<[Character, Character] | null>(
    null
  );
  const [normalCards, setNormalCards] = useState<NormalCardData[] | null>(null);
  const [specialCards, setSpecialCards] = useState<SpecialCardData[] | null>(
    null
  );

  const [loading, setLoading] = useState(false);

  const deckRef = useRef<HTMLDivElement | null>(null);

  const isDeckCodeFavorite = useMemo(() => {
    if (favorites.includes(deckCode)) return true;

    return false;
  }, [favorites]);

  const handleCopyDeckCode = async (e: React.MouseEvent) => {
    await navigator.clipboard.writeText(deckCode);
    alert(I18n.t("deck.copyDeckCode"));
  };

  const downloadDeckImage = async (e: React.MouseEvent) => {
    if (deckRef.current) {
      const deck = deckRef.current;

      const canvas = await html2canvas(deck);
      const image = canvas.toDataURL();

      const link = document.createElement("a");
      link.setAttribute("download", deckCode);
      link.setAttribute("href", image);
      link.click();
    }
  };

  const handleAddFavorites = (e: React.MouseEvent) => {
    if (typeof window !== "undefined" && validateFullDeckCode(deckCode)) {
      const favorites = localStorage.getItem("favorites");

      if (favorites) {
        const deckCodesArray = favorites.split(",");

        const nextDeckCodesArray = deckCodesArray.includes(deckCode)
          ? deckCodesArray.filter((code) => code !== deckCode)
          : [...deckCodesArray, deckCode];

        if (nextDeckCodesArray.length > 0)
          localStorage.setItem("favorites", nextDeckCodesArray.join(","));
        else localStorage.removeItem("favorites");

        setFavorites(nextDeckCodesArray.length > 0 ? nextDeckCodesArray : []);
      } else {
        localStorage.setItem("favorites", deckCode);
        setFavorites([deckCode]);
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && validateFullDeckCode(deckCode))
      setFavorites(localStorage.getItem("favorites")?.split(",") || []);
  }, []);

  useEffect(() => {
    const sortCards = (
      prev: NormalCardData | SpecialCardData,
      next: NormalCardData | SpecialCardData
    ) => {
      const splitedPrev = prev.fullCode.split("-");
      const splitedNext = next.fullCode.split("-");

      const prevCharCode = parseInt(splitedPrev[1]);
      const nextCharCode = parseInt(splitedNext[1]);

      return prevCharCode - nextCharCode;
    };

    const fetchCharacters = async () => {
      setLoading(true);

      const characterListRes = await getCharacterList({ lang: "eng" });

      if (characterListRes.status === 200) {
        const { characters } = characterListRes.data as SuccessResponse<
          EngCharacterName[]
        >;

        const deckData = translateDeckCode(deckCode).map((deckInfo) => ({
          ...deckInfo,
          ename: characters[parseInt(deckInfo.code.split("-")[1]) - 1],
        }));

        const [firstCharRes, secondCharRes] = await Promise.all(
          deckData.map((data) =>
            getCharacter(data.ename, {
              lang: I18n.language,
              mode: data.mode,
              detail: true,
            })
          )
        );

        if (firstCharRes.status === 200 && secondCharRes.status === 200) {
          const { character: firstChar } =
            firstCharRes.data as SuccessResponse<Character>;
          const { character: secondChar } =
            secondCharRes.data as SuccessResponse<Character>;
          setCharacters([firstChar, secondChar]);

          const firstCharNormalCards = (firstChar.normalCards as NormalCard[])
            .map((card, index) =>
              deckData[0].deck[index]
                ? { fullCode: card.fullCode, name: card.name }
                : null
            )
            .filter((card) => card) as NormalCardData[];
          const firstCharSpecialCards = (
            firstChar.specialCards as SpecialCard[]
          )
            .map((card, index) =>
              deckData[0].deck[index + MAX_NORMAL_CARDS_COUNT]
                ? { fullCode: card.fullCode, name: card.name, cost: card.cost }
                : null
            )
            .filter((card) => card) as SpecialCardData[];

          const secondCharNormalCards = (secondChar.normalCards as NormalCard[])
            .map((card, index) =>
              deckData[1].deck[index]
                ? { fullCode: card.fullCode, name: card.name }
                : null
            )
            .filter((card) => card) as NormalCardData[];
          const secondCharSpecialCards = (
            secondChar.specialCards as SpecialCard[]
          )
            .map((card, index) =>
              deckData[1].deck[index + MAX_NORMAL_CARDS_COUNT]
                ? { fullCode: card.fullCode, name: card.name, cost: card.cost }
                : null
            )
            .filter((card) => card) as SpecialCardData[];

          const normalCards = firstCharNormalCards.concat(
            secondCharNormalCards
          );
          const specialCards = firstCharSpecialCards.concat(
            secondCharSpecialCards
          );

          normalCards.sort(sortCards);
          specialCards.sort(sortCards);

          setNormalCards(normalCards);
          setSpecialCards(specialCards);
        }
      }
      setLoading(false);
    };

    fetchCharacters();
  }, [I18n.language]);

  return validateFullDeckCode(deckCode) ? (
    !loading && characters && normalCards && specialCards ? (
      <DeckPageWrapper>
        <DeckCompleteContainer>
          <DeckCodeWrapper>
            <DeckCodeInput
              name="deck-code"
              disabled
              readOnly
              value={deckCode}
            />
            <DeckCodeButton onClick={handleCopyDeckCode}>
              {I18n.t("deck.copy")}
            </DeckCodeButton>
            <DeckSaveImageButton onClick={downloadDeckImage}>
              {I18n.t("deck.saveAsImage")}
            </DeckSaveImageButton>
            <DeckSaveImageButton onClick={handleAddFavorites}>
              {isDeckCodeFavorite
                ? I18n.t("deck.removeFavorite")
                : I18n.t("deck.addFavorite")}
            </DeckSaveImageButton>
          </DeckCodeWrapper>
          <DeckCompleteWrapper ref={deckRef}>
            <DeckCompleteCharacters>
              <DeckCompleteCharacterWrapper>
                <DeckCompleteCharacterImageWrapper>
                  <Link
                    href={`/character/${characters[0].ename}${
                      characters[0].mode !== "O"
                        ? `?mode${characters[0].mode}`
                        : ""
                    }`}
                  >
                    <Image
                      alt={characters[0].name}
                      src={`/images/tarot/${
                        I18n.language
                      }/${characters[0].code.replace("NA-", "")}-${
                        characters[0].mode
                      }.webp`}
                      title={characters[0].name}
                      width={TAROT.width}
                      height={TAROT.height}
                      priority={true}
                    />
                  </Link>
                </DeckCompleteCharacterImageWrapper>
                <DeckCompleteCharacterName>
                  <span>{characters[0].name}</span>
                </DeckCompleteCharacterName>
              </DeckCompleteCharacterWrapper>
              <DeckCompleteCharacterWrapper>
                <DeckCompleteCharacterImageWrapper>
                  <Link
                    href={`/character/${characters[1].ename}${
                      characters[1].mode !== "O"
                        ? `?mode${characters[1].mode}`
                        : ""
                    }`}
                  >
                    <Image
                      alt={characters[1].name}
                      src={`/images/tarot/${
                        I18n.language
                      }/${characters[1].code.replace("NA-", "")}-${
                        characters[1].mode
                      }.webp`}
                      title={characters[1].name}
                      width={TAROT.width}
                      height={TAROT.height}
                      priority={true}
                    />
                  </Link>
                </DeckCompleteCharacterImageWrapper>
                <DeckCompleteCharacterName
                  style={{ borderBottomLeftRadius: 12 }}
                >
                  <span>{characters[1].name}</span>
                </DeckCompleteCharacterName>
              </DeckCompleteCharacterWrapper>
            </DeckCompleteCharacters>
            <DeckCompleteCardListWrapper>
              <DeckCompleteCardContainer>
                <DeckCompleteCardTitle style={{ borderTopRightRadius: 12 }}>
                  {I18n.t("deck.normalCard")}
                </DeckCompleteCardTitle>
                <DeckCompleteCardList>
                  {normalCards.map((card) => (
                    <Link
                      key={card.fullCode}
                      href={`/card/${card.fullCode}?from=deck&code=${deckCode}`}
                    >
                      <Image
                        alt={card.fullCode}
                        src={`/images/card/${
                          I18n.language
                        }/${convertCodeToImage(card.fullCode)}.webp`}
                        title={card.name}
                        width={CARD.width}
                        height={CARD.height}
                        priority={true}
                      />
                    </Link>
                  ))}
                </DeckCompleteCardList>
              </DeckCompleteCardContainer>
              <DeckCompleteCardContainer>
                <DeckCompleteCardTitle>
                  {I18n.t("deck.specialCard")}
                </DeckCompleteCardTitle>
                <DeckCompleteCardList>
                  {specialCards.map((card) => (
                    <Link
                      key={card.fullCode}
                      href={`/card/${card.fullCode}?from=deck&code=${deckCode}`}
                    >
                      <Image
                        alt={card.fullCode}
                        src={`/images/card/${
                          I18n.language
                        }/${convertCodeToImage(card.fullCode)}.webp`}
                        title={card.name}
                        width={CARD.width}
                        height={CARD.height}
                        priority={true}
                      />
                    </Link>
                  ))}
                </DeckCompleteCardList>
              </DeckCompleteCardContainer>
              <DeckCompleteCodeWrapper>
                <DeckCompleteCodeTitle>
                  {" "}
                  {I18n.t("deck.code")}
                </DeckCompleteCodeTitle>
                <DeckCompleteCodeContent>{deckCode}</DeckCompleteCodeContent>
              </DeckCompleteCodeWrapper>
            </DeckCompleteCardListWrapper>
          </DeckCompleteWrapper>
        </DeckCompleteContainer>
      </DeckPageWrapper>
    ) : (
      <Loading />
    )
  ) : (
    redirect("/deck")
  );
};

export const runtime = "edge";

export default DeckDetailPage;
