"use client";

import Card from "@/components/card/Card";

import { useI18nContext } from "@/context/i18n.context";

import {
  CardInfoTitle,
  CardInfoTitleText,
  CardInfoContent,
  CardValueWrapper,
} from "@/styles/card.style";

import type { FC } from "react";
import type { EnhancementCard } from "@/types/card.type";

interface EnhancementCardProps {
  card: EnhancementCard;
}

const EnhancementCard: FC<EnhancementCardProps> = ({ card }) => {
  const I18n = useI18nContext();

  return (
    <Card card={card}>
      <CardValueWrapper>
        <CardInfoTitle>
          <CardInfoTitleText>
            {I18n.t("card.enhancementCard.enhancement")}
          </CardInfoTitleText>
        </CardInfoTitle>
        <CardInfoContent style={{ width: "75%" }}>
          {card.enhancementCount}
        </CardInfoContent>
      </CardValueWrapper>
    </Card>
  );
};

export default EnhancementCard;
