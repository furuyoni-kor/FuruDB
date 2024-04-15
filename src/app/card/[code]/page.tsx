"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";

import CardComponent from "@/components/card/Card";
import AttackCard from "@/components/card/AttackCard";
import EnhancementCard from "@/components/card/EnhancementCard";

import { useI18nContext } from "@/context/i18n.context";

import { getCardByCode } from "@/services/card.service";

import { createCardPageTitle } from "@/utils/card.util";

import { BaseButton } from "@/styles/index.style";
import { CardPageWrapper, CardPreviousLinkWrapper } from "@/styles/card.style";

import type { NextPage } from "next";
import type { SuccessResponse } from "@/types/service.type";
import type {
  Card,
  AttackCard as AttackCardType,
  EnhancementCard as EnhancementCardType,
} from "@/types/card.type";

interface PageProps {
  params: { code: string };
}

const CardDetailPage: NextPage<PageProps> = ({ params }) => {
  const I18n = useI18nContext();

  const router = useRouter();

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

  useEffect(() => {
    const fetchCard = async () => {
      const lang = I18n.language;

      const res = await getCardByCode(params.code as string, lang);

      if (res.status === 200) {
        const { card } = res.data as SuccessResponse<Card>;
        setCard(card);
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
            {I18n.t("card.toPreviousPage")}
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

export default CardDetailPage;
