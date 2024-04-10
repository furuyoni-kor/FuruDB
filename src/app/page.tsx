"use client";

import { useState, useEffect, useMemo } from "react";
import dayjs from "dayjs";

import RotationSwiper from "@/components/RotationSwiper";

import { useI18nContext } from "@/context/i18n.context";

import { getRecentRotation } from "@/services/index.service";
import { getCharacterList } from "@/services/character.service";

import {
  MainPageWrapper,
  OriginWarPeriod,
  RecentCharacterRotationContainer,
  RecentCharacterRotationTitle,
} from "@/styles/index.style";

import type { NextPage } from "next";
import type { CharacterName, EngCharacterName } from "@/types/character.type";
import type { SuccessResponse } from "@/types/service.type";
import type { Rotation } from "@/types/index.type";

interface OriginWarDatetime {
  startFrom: string;
  endAt: string;
}

const MainPage: NextPage = () => {
  const I18n = useI18nContext();

  const [engRotation, setEngRotation] = useState<EngCharacterName[] | null>(
    null
  );
  const [rotation, setRotation] = useState<CharacterName[] | null>(null);
  const [characterList, setCharacterList] = useState<EngCharacterName[] | null>(
    null
  );
  const [originWarDatetime, setOriginWarDatetime] =
    useState<OriginWarDatetime | null>(null);

  const originWarPeriod = useMemo(() => {
    if (originWarDatetime) {
      return `(${dayjs(originWarDatetime.startFrom).format(
        "YYYY/MM"
      )} ~ ${dayjs(originWarDatetime.endAt).format("YYYY/MM")})`;
    }

    return "";
  }, [originWarDatetime]);

  useEffect(() => {
    const fetchRotation = async () => {
      if (I18n.language === "eng") {
        const [response, charResponse] = await Promise.all([
          getRecentRotation({
            lang: I18n.language,
          }),
          getCharacterList({ lang: "eng" }),
        ]);

        if (response.status === 200 && charResponse.status === 200) {
          const { rotation: data } = response.data as SuccessResponse<Rotation>;
          const { characters } = charResponse.data as SuccessResponse<
            EngCharacterName[]
          >;

          setRotation(data.rotation);
          setCharacterList(characters);
          setOriginWarDatetime({
            startFrom: data.startFrom,
            endAt: data.endAt,
          });
        }
      } else {
        const [response, engResponse, charResponse] = await Promise.all([
          getRecentRotation({ lang: I18n.language }),
          getRecentRotation({ lang: "eng" }),
          getCharacterList({ lang: "eng" }),
        ]);

        if (
          response.status === 200 &&
          engResponse.status === 200 &&
          charResponse.status === 200
        ) {
          const { rotation: data } = response.data as SuccessResponse<Rotation>;
          const { rotation: engData } =
            engResponse.data as SuccessResponse<Rotation>;
          const { characters } = charResponse.data as SuccessResponse<
            EngCharacterName[]
          >;

          setRotation(data.rotation);
          setEngRotation(engData.rotation as EngCharacterName[]);
          setCharacterList(characters);
          setOriginWarDatetime({
            startFrom: data.startFrom,
            endAt: data.endAt,
          });
        }
      }
    };

    fetchRotation();
  }, [I18n.language]);

  return (
    <MainPageWrapper>
      {rotation && engRotation && characterList && (
        <RecentCharacterRotationContainer>
          <RecentCharacterRotationTitle>
            {I18n.t("index.originWar")}{" "}
            <OriginWarPeriod>{originWarPeriod}</OriginWarPeriod>
          </RecentCharacterRotationTitle>
          <RotationSwiper
            characters={characterList}
            rotation={rotation}
            engRotation={engRotation}
          />
        </RecentCharacterRotationContainer>
      )}
    </MainPageWrapper>
  );
};

export default MainPage;
