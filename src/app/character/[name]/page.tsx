"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";

import CustomImage from "@/components/Image";
import CardList from "@/components/character/CardList";

import { DEFAULT_MODE } from "@/constant";

import { useI18nContext } from "@/context/i18n.context";
import { useStyleContext } from "@/context/style.context";

import { getCharacter } from "@/services/character.service";

import {
  CharacterContainer,
  CharacterInfoWrapper,
  CharacterTitle,
  CharacterName,
  CharacterCode,
  CharacterImageWrapper,
  CharacterDataWrapper,
  CharacterInfoTitle,
  CharacterInfoTitleText,
  CharacterInfoContent,
  CharacterInfoValueWrapper,
  CharacterAbilityDescription,
  CharacterAbilityDescriptionRow,
  CharacterModeButton,
} from "@/styles/character.style";

import Loading from "@/components/Loading";

import type { NextPage } from "next";
import type { Language } from "@/types/index.type";
import type { SuccessResponse } from "@/types/service.type";
import type {
  Character,
  CharacterMode,
  EngCharacterName,
} from "@/types/character.type";
import type { Card } from "@/types/card.type";

interface PageProps {
  params: {
    name: EngCharacterName;
  };
}

const CharacterDetailPage: NextPage<PageProps> = ({ params }) => {
  const TAROT = {
    pc: {
      width: 300,
      height: 600,
    },
    laptop: {
      width: 250,
      height: 500,
    },
    tablet: {
      width: 200,
      height: 400,
    },
    mobile: {
      width: 150,
      height: 300,
    },
  };

  const searchParams = useSearchParams();

  const I18n = useI18nContext();
  const style = useStyleContext();

  const [character, setCharacter] = useState<Character | null>(null);
  const [mode, setMode] = useState<CharacterMode>(
    (searchParams.get("mode")?.toUpperCase() as CharacterMode) || DEFAULT_MODE
  );
  const [language, setLanguage] = useState<Language>(I18n.language);
  const [loading, setLoading] = useState(false);

  const buttonGap = useMemo(() => {
    switch (style.widthState) {
      case "pc":
        return 32;
      case "laptop":
        return 32;
      case "tablet":
        return 16;
      case "mobile":
        return 16;
      default:
        return 0;
    }
  }, [style.widthState]);

  const engFontSize = useMemo(() => {
    switch (style.widthState) {
      case "pc":
        return "2rem";
      case "laptop":
        return "1.6rem";
      case "tablet":
        return "1.3rem";
      case "mobile":
        return "1rem";
      default:
        return "1rem";
    }
  }, [style.widthState]);

  const engLineHeight = useMemo(() => {
    switch (style.widthState) {
      case "pc":
        return "48px";
      case "laptop":
        return "42px";
      case "tablet":
        return "28px";
      case "mobile":
        return "20px";
      default:
        return "48px";
    }
  }, [style.widthState]);

  const changeMode = useCallback(
    (mode: CharacterMode) => (e: React.MouseEvent) => {
      if (typeof window !== "undefined") {
        window.history.pushState(
          {},
          "",
          `${window.location.pathname}${mode !== "O" ? `?mode=${mode}` : ""}`
        );
      }
      setMode(mode);
    },
    []
  );

  useEffect(() => {
    const lang = I18n.language;

    const fetchCharacter = async () => {
      setLoading(true);

      const res = await getCharacter(params.name as EngCharacterName, {
        mode,
        lang,
        detail: true,
      });

      if (res.status === 200) {
        const { character } = res.data as SuccessResponse<Character>;

        setCharacter(character);
        setLanguage(lang);
      }
      setLoading(false);
    };

    fetchCharacter();
  }, [I18n.language, mode]);

  return !loading && character ? (
    <>
      <title>
        {character
          ? `${character.name} - ${I18n.t("index.shortTitle")}`
          : I18n.t("index.title")}
      </title>
      <CharacterContainer>
        <CharacterInfoWrapper>
          <CharacterImageWrapper>
            <CustomImage
              src={`/images/tarot/${language}/${character.code.replace(
                "NA-",
                ""
              )}-${character.mode}.webp`}
              alt={`${character.name}-${character.mode}`}
              size={TAROT}
              style={{ borderRadius: 4 }}
            />
          </CharacterImageWrapper>
          <CharacterDataWrapper
            style={I18n.language === "eng" ? { fontSize: engFontSize } : {}}
          >
            <CharacterTitle>
              <CharacterName>{character.name}</CharacterName>
              <CharacterCode>{`${character.code}-${character.mode}`}</CharacterCode>
            </CharacterTitle>
            <CharacterInfoValueWrapper>
              <CharacterInfoTitle>
                <CharacterInfoTitleText>
                  {I18n.t("character.mode")}
                </CharacterInfoTitleText>
              </CharacterInfoTitle>
              <CharacterInfoContent
                style={{ width: "75%", columnGap: buttonGap }}
              >
                {character.modes.map((mode) => (
                  <CharacterModeButton
                    key={`${character.ename}-${mode}-btn`}
                    onClick={changeMode(mode)}
                  >
                    {mode}
                  </CharacterModeButton>
                ))}
              </CharacterInfoContent>
            </CharacterInfoValueWrapper>
            <CharacterInfoValueWrapper>
              <CharacterInfoTitle>
                <CharacterInfoTitleText>
                  {I18n.t("character.weapon")}
                </CharacterInfoTitleText>
              </CharacterInfoTitle>
              <CharacterInfoContent style={{ width: "25%" }}>
                {character.symbolWeapon}
              </CharacterInfoContent>
              <CharacterInfoTitle>
                <CharacterInfoTitleText>
                  {I18n.t("character.sub")}
                </CharacterInfoTitleText>
              </CharacterInfoTitle>
              <CharacterInfoContent style={{ width: "25%" }}>
                {character.mode !== "O" ? character.symbolSub : "-"}
              </CharacterInfoContent>
            </CharacterInfoValueWrapper>
            <CharacterInfoValueWrapper>
              <CharacterInfoTitle>
                <CharacterInfoTitleText>
                  {I18n.t("character.ability")}
                </CharacterInfoTitleText>
              </CharacterInfoTitle>
              <CharacterInfoContent style={{ width: "75%" }}>
                {character.abilityKeyword}
              </CharacterInfoContent>
            </CharacterInfoValueWrapper>
            <CharacterAbilityDescription
              style={
                I18n.language === "eng" ? { lineHeight: engLineHeight } : {}
              }
            >
              {character.abilityDescription.split("\r\n").map((text, index) => (
                <CharacterAbilityDescriptionRow
                  key={`ability-description-row-${index}`}
                >
                  {text}
                </CharacterAbilityDescriptionRow>
              ))}
            </CharacterAbilityDescription>
          </CharacterDataWrapper>
        </CharacterInfoWrapper>
        {character.normalCards.length > 0 && (
          <CardList
            char={character.ename}
            mode={character.mode}
            cards={character.normalCards as Card[]}
            category="normal"
          />
        )}
        {character.specialCards.length > 0 && (
          <CardList
            char={character.ename}
            mode={character.mode}
            cards={character.specialCards as Card[]}
            category="special"
          />
        )}
        {character.extraCards.length > 0 && (
          <CardList
            char={character.ename}
            mode={character.mode}
            cards={character.extraCards as Card[]}
            category="aside"
          />
        )}
      </CharacterContainer>
    </>
  ) : (
    <Loading />
  );
};

export const runtime = "edge";

export default CharacterDetailPage;
