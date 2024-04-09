"use client";

import { useState, useMemo, useEffect } from "react";
import { useParams } from "next/navigation";

import CardComponent from "@/components/card/Card";
import AttackCard from "@/components/card/AttackCard";
import EnhancementCard from "@/components/card/EnhancementCard";

import { useI18nContext } from "@/context/i18n.context";

import { getCardByCodeWithSeason } from "@/services/card.service";

import type { NextPage } from "next";
import type { Season } from "@/types/index.type";
import type { SuccessResponse } from "@/types/service.type";
import type {
  Card,
  DeprecatedCard,
  AttackCard as AttackCardType,
  EnhancementCard as EnhancementCardType,
} from "@/types/card.type";

const CardPage: NextPage = () => {
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

  const params = useParams();

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
    card &&
    ((engData.type === "attack" && (
      <AttackCard card={card as AttackCardType} />
    )) ||
      (engData.type === "enhancement" && (
        <EnhancementCard card={card as EnhancementCardType} />
      )) || <CardComponent card={card} />)
  );
};

export const runtime = "edge";

export default CardPage;
