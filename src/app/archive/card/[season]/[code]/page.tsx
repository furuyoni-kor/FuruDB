"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";

import CardComponent from "@/components/card/Card";
import AttackCard from "@/components/card/AttackCard";
import EnhancementCard from "@/components/card/EnhancementCard";

import { useI18nContext } from "@/context/i18n.context";

import { getCardByCodeWithSeason } from "@/services/card.service";

import { createCardPageTitle } from "@/utils/card.util";

import { BaseButton } from "@/styles/index.style";
import { CardPageWrapper, CardPreviousLinkWrapper } from "@/styles/card.style";

import type { NextPage } from "next";
import type { Season } from "@/types/index.type";
import type { SuccessResponse } from "@/types/service.type";
import type {
  Card,
  DeprecatedCard,
  AttackCard as AttackCardType,
  EnhancementCard as EnhancementCardType,
} from "@/types/card.type";

interface PageProps {
  params: {
    season: string;
    code: string;
  };
}

const CardPage: NextPage<PageProps> = ({ params }) => {
  const I18n = useI18nContext();

  const [card, setCard] = useState<Card | null>(null);

  const engData = useMemo(() => {
    if (card) {
      const { e } = card;
      const { eType, eSubType, eCategory } = e;

      return {
        type: (eType && eType.toLowerCase()) || "",
        subType: (eSubType && eSubType.toLowerCase()) || "",
        category: (eCategory && eCategory.toLowerCase()) || "",
      };
    }

    return {
      type: "",
      subType: "",
      category: "",
    };
  }, [card]);

  const router = useRouter();

  useEffect(() => {
    const fetchCard = async () => {
      const lang = I18n.language;

      const res = await getCardByCodeWithSeason(
        params.code as string,
        params.season as Season,
        lang
      );

      if (res.status === 200) {
        const { history } = res.data as SuccessResponse<DeprecatedCard>;
        setCard(history);
      }
    };

    fetchCard();
  }, [I18n.language]);

  return (
    <>
      <title>
        {card
          ? `${createCardPageTitle({
              name: card.name,
              code: params.code,
              lang: I18n.language,
              season: params.season,
            })} - ${I18n.t("index.shortTitle")}`
          : I18n.t("index.title")}
      </title>
      <CardPageWrapper>
        <CardPreviousLinkWrapper>
          <BaseButton
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              e.stopPropagation();
              router.back();
            }}
          >
            이전 페이지로
          </BaseButton>
        </CardPreviousLinkWrapper>
        {card &&
          ((engData.type === "attack" && (
            <AttackCard card={card as AttackCardType} />
          )) ||
            (engData.type === "enhancement" && (
              <EnhancementCard card={card as EnhancementCardType} />
            )) || <CardComponent card={card} />)}
      </CardPageWrapper>
    </>
  );
};

export const runtime = "edge";

export default CardPage;
