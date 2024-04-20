"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import _ from "lodash";

import { MAX_CLIENT_WIDTH } from "@/constant";

import { useI18nContext } from "@/context/i18n.context";

import { convertCodeToImage } from "@/utils/card.util";

import {
  CardSearchResultHoverWrapper,
  CardSearchResultWrapper,
} from "@/styles/card.style";

import type { FC } from "react";
import type { Card } from "@/types/card.type";

interface CardMagnifierProps {
  className?: string;
  card: Card;
  cardStyle: {
    width: number;
    height: number;
  };
  hoverStyle: {
    width: number;
    height: number;
    top: number;
  };
  hoverLeft: number;
  hoverRight: number;
}

const CardMagnifier: FC<CardMagnifierProps> = ({
  className,
  card,
  cardStyle,
  hoverStyle,
  hoverLeft,
  hoverRight,
}) => {
  const INITIAL_LEFT = -Number.MAX_SAFE_INTEGER;
  const DEBOUNCE_TIME = 1000;

  const [imageLeft, setImageLeft] = useState(INITIAL_LEFT);
  const [clientWidth, setClientWidth] = useState(0);

  const imageRef = useRef<HTMLImageElement | null>(null);

  const I18n = useI18nContext();

  useEffect(() => {
    const onResize = _.debounce(() => {
      const currentClientWidth = document.documentElement.offsetWidth;
      setClientWidth(currentClientWidth);

      if (imageRef.current) {
        const left = imageRef.current.getBoundingClientRect().left;

        if (currentClientWidth <= MAX_CLIENT_WIDTH) {
          setImageLeft(left);
        } else {
          const difference = (currentClientWidth - MAX_CLIENT_WIDTH) / 2;
          setImageLeft(left - difference);
        }
      }
    }, DEBOUNCE_TIME);

    onResize();

    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <CardSearchResultWrapper className={className || ""}>
      <Image
        ref={imageRef}
        width={cardStyle.width}
        height={cardStyle.height}
        title={card.name}
        alt={card.name}
        priority={true}
        src={`/images/card/${I18n.language}/${convertCodeToImage(
          card.fullCode
        )}.webp`}
      />
      {imageLeft !== INITIAL_LEFT && (
        <CardSearchResultHoverWrapper
          style={
            imageLeft <=
            Math.round(
              (clientWidth <= MAX_CLIENT_WIDTH
                ? clientWidth
                : MAX_CLIENT_WIDTH) / 2
            )
              ? {
                  left: `${hoverLeft}px`,
                  top: `${hoverStyle.top}px`,
                }
              : {
                  right: `${hoverRight}px`,
                  top: `${hoverStyle.top}px`,
                }
          }
        >
          <Image
            width={hoverStyle.width}
            height={hoverStyle.height}
            title={card.name}
            alt={card.name}
            src={`/images/card/${I18n.language}/${convertCodeToImage(
              card.fullCode
            )}.webp`}
          />
        </CardSearchResultHoverWrapper>
      )}
    </CardSearchResultWrapper>
  );
};

export default CardMagnifier;
