"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

import { convertCodeToImage } from "@/utils/card.util";

import { useI18nContext } from "@/context/i18n.context";

import {
  CardContainer,
  CardImageWrapper,
  CardDataWrapper,
  CardName,
  CardDescription,
  CardDescriptionRow,
  CardCode,
  CardInfoWrapper,
  CardCategory,
  CardTags,
  CardTag,
  CardTitle,
  CardCategoryText,
  CardRelatedExtraCards,
  CardRevision,
  CardInfoTitle,
  CardInfoTitleText,
  CardInfoContent,
  CardValueWrapper,
  CardLinkWrapper,
} from "@/styles/card.style";

import type { FC } from "react";
import type { Card, DeprecatedCard, SpecialCard } from "@/types/card.type";

interface CardProps {
  children?: React.ReactNode;
  card: Card | DeprecatedCard;
}

const CardComponent: FC<CardProps> = ({ children, card }) => {
  const CARD = {
    width: 500,
    height: 700,
  };

  const I18n = useI18nContext();

  const engData = useMemo(() => {
    const { e } = card;
    const { eType, eSubType, eCategory } = e;

    return {
      type: (eType && eType.toLowerCase()) || "",
      subType: (eSubType && eSubType.toLowerCase()) || "",
      category: (eCategory && eCategory.toLowerCase()) || "",
    };
  }, []);

  return (
    <CardContainer>
      <CardImageWrapper>
        <Image
          alt={card.fullCode}
          src={`/images/card/${I18n.language}/${
            (card as DeprecatedCard).season
              ? `${(card as DeprecatedCard).season}/`
              : ""
          }${convertCodeToImage(card.fullCode)}.webp`}
          title={card.name}
          width={CARD.width}
          height={CARD.height}
          priority={true}
          style={{
            borderRadius: 16,
          }}
        />
      </CardImageWrapper>
      <CardDataWrapper>
        <CardTitle>
          <CardName>{card.name}</CardName>
          <CardCode>{card.fullCode}</CardCode>
        </CardTitle>
        <CardInfoWrapper>
          <CardCategory>
            <CardCategoryText>{card.category}</CardCategoryText>
          </CardCategory>
          <CardTags>
            {card.type && (
              <CardTag className={engData.type}>{card.type}</CardTag>
            )}
            {card.subType && (
              <CardTag className={engData.subType}>{card.subType}</CardTag>
            )}
          </CardTags>
        </CardInfoWrapper>
        {children}
        {engData.category === "special" && (card as SpecialCard).cost && (
          <CardValueWrapper>
            <CardInfoTitle>
              <CardInfoTitleText>
                {I18n.t("card.specialCard.cost")}
              </CardInfoTitleText>
            </CardInfoTitle>
            <CardInfoContent style={{ width: "75%" }}>
              {(card as SpecialCard).cost}
            </CardInfoContent>
          </CardValueWrapper>
        )}
        {(card as DeprecatedCard).season && (
          <CardValueWrapper>
            <CardInfoTitle>
              <CardInfoTitleText>
                {I18n.t("card.deprecatedCard.season")}
              </CardInfoTitleText>
            </CardInfoTitle>
            <CardInfoContent style={{ width: "75%" }}>
              {(card as DeprecatedCard).season}
            </CardInfoContent>
          </CardValueWrapper>
        )}
        <CardDescription>
          {card.description.split("\r\n").map((text, index) => (
            <CardDescriptionRow key={`card-description-row-${index}`}>
              {text}
            </CardDescriptionRow>
          ))}
        </CardDescription>
        {!(card as DeprecatedCard).season &&
          card.relatedExtraCards.length > 0 && (
            <CardRelatedExtraCards>
              <CardInfoTitle>
                <CardInfoTitleText>
                  {I18n.t("card.extraCard")}
                </CardInfoTitleText>
              </CardInfoTitle>
              <CardInfoContent
                style={{ flexDirection: "column", padding: 16, rowGap: 16 }}
              >
                {card.relatedExtraCards.map(({ name, fullCode }) => (
                  <Link key={fullCode} href={`/card//${fullCode}`}>
                    {name}
                  </Link>
                ))}
              </CardInfoContent>
            </CardRelatedExtraCards>
          )}
        {!(card as DeprecatedCard).season && card.revision.length > 0 && (
          <CardRevision>
            <CardInfoTitle>
              <CardInfoTitleText>{I18n.t("card.revision")}</CardInfoTitleText>
            </CardInfoTitle>
            <CardInfoContent style={{ padding: 16, columnGap: 24 }}>
              {card.revision.map((season) => (
                <Link
                  key={`${card.fullCode}-${season}`}
                  href={`/archive/card/${season}/${card.fullCode}`}
                >
                  {season}
                </Link>
              ))}
            </CardInfoContent>
          </CardRevision>
        )}
        {(card as DeprecatedCard).season && (
          <CardLinkWrapper>
            <Link href={`/card/${card.fullCode}`}>
              {I18n.t("card.toRecentCard")}
            </Link>
          </CardLinkWrapper>
        )}
      </CardDataWrapper>
    </CardContainer>
  );
};

export default CardComponent;
