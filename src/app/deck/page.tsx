"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";

import { useI18nContext } from "@/context/i18n.context";

import { validateFullDeckCode } from "@/utils/deck.util";

import {
  DeckCodeWrapper,
  DeckCodeInput,
  DeckCodeButton,
  DeckPageWrapper,
  DeckMoveToButton,
} from "@/styles/deck.style";

import type { NextPage } from "next";
import Link from "next/link";

const DeckPage: NextPage = () => {
  const MAX_INPUT_LENGTH = 12;

  const I18n = useI18nContext();
  const router = useRouter();

  const deckCodeInputRef = useRef<HTMLInputElement | null>(null);

  const handleEnterDeckCode = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (deckCodeInputRef.current) {
      const inputValue = deckCodeInputRef.current.value;

      if (inputValue.length > 0) {
        if (validateFullDeckCode(inputValue))
          router.push(`/deck/${inputValue}`);
        else alert("덱 코드 에러");
      } else alert("덱 코드가 비어있음");
    }
  };

  return (
    <DeckPageWrapper>
      <DeckCodeWrapper>
        <DeckCodeInput
          ref={deckCodeInputRef}
          name="deck-code"
          placeholder={I18n.t("deck.enterCode")}
          maxLength={MAX_INPUT_LENGTH}
        />
        <DeckCodeButton onClick={handleEnterDeckCode}>
          {I18n.t("deck.enter")}
        </DeckCodeButton>
        <Link href={`/deck/create`}>
          <DeckMoveToButton>{I18n.t("deck.createDeck")}</DeckMoveToButton>
        </Link>
      </DeckCodeWrapper>
    </DeckPageWrapper>
  );
};

export default DeckPage;
