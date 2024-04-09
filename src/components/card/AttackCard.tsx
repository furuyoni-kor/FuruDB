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
import type { AttackCard } from "@/types/card.type";

interface AttackCardProps {
  card: AttackCard;
}

const AttackCard: FC<AttackCardProps> = ({ card }) => {
  const I18n = useI18nContext();

  return (
    <Card card={card}>
      <CardValueWrapper>
        <CardInfoTitle>
          <CardInfoTitleText>
            {I18n.t("card.attackCard.distance")}
          </CardInfoTitleText>
        </CardInfoTitle>
        <CardInfoContent style={{ width: "75%" }}>
          {card.distance}
        </CardInfoContent>
      </CardValueWrapper>
      <CardValueWrapper>
        <CardInfoTitle>
          <CardInfoTitleText>
            {I18n.t("card.attackCard.aura")}
          </CardInfoTitleText>
        </CardInfoTitle>
        <CardInfoContent style={{ width: "25%" }}>
          {card.damage.split("/")[0]}
        </CardInfoContent>
        <CardInfoTitle>
          <CardInfoTitleText>
            {I18n.t("card.attackCard.life")}
          </CardInfoTitleText>
        </CardInfoTitle>
        <CardInfoContent style={{ width: "25%" }}>
          {card.damage.split("/")[1]}
        </CardInfoContent>
      </CardValueWrapper>
    </Card>
  );
};

export default AttackCard;
