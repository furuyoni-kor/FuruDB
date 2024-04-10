"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Image from "next/image";

import CardList from "@/components/character/CardList";

import { DEFAULT_MODE } from "@/constant";

import { useI18nContext } from "@/context/i18n.context";

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

const CharacterDetailPage: NextPage = () => {
  const TAROT = {
    width: 300,
    height: 600,
  };

  const params = useParams();
  const searchParams = useSearchParams();

  const I18n = useI18nContext();

  const [character, setCharacter] = useState<Character | null>(null);
  const [mode, setMode] = useState<CharacterMode>(
    (searchParams.get("mode")?.toUpperCase() as CharacterMode) || DEFAULT_MODE
  );
  const [language, setLanguage] = useState<Language>(I18n.language);
  const [loading, setLoading] = useState(false);

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
    <CharacterContainer>
      <CharacterInfoWrapper>
        <CharacterImageWrapper>
          <Image
            src={`/images/tarot/${language}/${character.code.replace(
              "NA-",
              ""
            )}-${character.mode}.webp`}
            alt={`${character.name}-${character.mode}`}
            width={TAROT.width}
            height={TAROT.height}
            priority={true}
            style={{ borderRadius: 4 }}
          />
        </CharacterImageWrapper>
        <CharacterDataWrapper>
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
            <CharacterInfoContent style={{ width: "75%", columnGap: 32 }}>
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
          <CharacterAbilityDescription>
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
        <CardList cards={character.normalCards as Card[]} category="normal" />
      )}
      {character.specialCards.length > 0 && (
        <CardList cards={character.specialCards as Card[]} category="special" />
      )}
      {character.extraCards.length > 0 && (
        <CardList cards={character.extraCards as Card[]} category="aside" />
      )}
    </CharacterContainer>
  ) : (
    <Loading />
  );
};

export const runtime = "edge";

export default CharacterDetailPage;
