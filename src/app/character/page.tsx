"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

import Loading from "@/components/Loading";
import CharacterIcon from "@/components/character/CharacterIcon";

import { useI18nContext } from "@/context/i18n.context";

import { getCharacterList } from "@/services/character.service";

import {
  CharacterListContainer,
  CharacterListTitle,
  CharacterListTitleText,
} from "@/styles/character.style";

import type { NextPage } from "next";
import type { Language } from "@/types/index.type";
import type { CharacterName, EngCharacterName } from "@/types/character.type";
import type { SuccessResponse } from "@/types/service.type";

const CharacterListPage: NextPage = () => {
  const I18n = useI18nContext();

  const [language, setLanguage] = useState<Language>(I18n.language);
  const [engCharacterList, setEngCharacterList] = useState<EngCharacterName[]>(
    []
  );
  const [characterList, setCharacterList] = useState<CharacterName[]>([]);

  useEffect(() => {
    const lang = I18n.language;

    const fetchCharacterList = async () => {
      const [langNameResponse, engNameResponse] = await Promise.all([
        getCharacterList({ lang: I18n.language }),
        getCharacterList({ lang: "eng" }),
      ]);

      if (langNameResponse.status === 200 && engNameResponse.status === 200) {
        const { characters: chars } = langNameResponse.data as SuccessResponse<
          CharacterName[]
        >;
        const { characters: engChars } =
          engNameResponse.data as SuccessResponse<EngCharacterName[]>;

        setCharacterList(chars);
        setEngCharacterList(engChars);
        setLanguage(lang);
      }
    };

    fetchCharacterList();
  }, [I18n.language]);

  return characterList.length > 0 ? (
    <>
      <title>{`${I18n.t("character.title")} - ${I18n.t(
        "index.shortTitle"
      )}`}</title>
      <CharacterListTitle>
        <CharacterListTitleText>
          {I18n.t("character.characterList")}
        </CharacterListTitleText>
      </CharacterListTitle>
      <CharacterListContainer>
        {engCharacterList.map((name, index) => (
          <Link key={name} href={`/character/${name}`}>
            <CharacterIcon
              ename={name}
              name={characterList[index]}
              charCode={index + 1}
            />
          </Link>
        ))}
      </CharacterListContainer>
    </>
  ) : (
    <Loading />
  );
};

export default CharacterListPage;
