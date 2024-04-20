"use client";

import { useState, useEffect, useMemo } from "react";

import { useI18nContext } from "@/context/i18n.context";

import { LOADING_DATA } from "@/constant";

import { getRandomNumberBetween } from "@/utils/math.util";

import {
  LoadingWrapper,
  LoadingImage,
  LoadingText,
} from "@/styles/loading.style";

import type { FC } from "react";

const LoadingComponent: FC = () => {
  const I18n = useI18nContext();

  const character = useMemo(() => {
    const randomIndex = getRandomNumberBetween(0, LOADING_DATA.length - 1);
    const character = LOADING_DATA[randomIndex];
    return character;
  }, []);
  const [dot, setDot] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDot((prev) => (prev.length === 3 ? "" : prev + "."));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    character && (
      <LoadingWrapper>
        <LoadingImage src={`/images/chibi/${character}.webp`} alt={character} />
        <LoadingText>
          {I18n.t(`loading.${character}`)}
          {dot}
        </LoadingText>
      </LoadingWrapper>
    )
  );
};

export default LoadingComponent;
