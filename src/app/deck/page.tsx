"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

import DeckAbbreviation from "@/components/deck/DeckAbbreivation";

import { useI18nContext } from "@/context/i18n.context";

import { validateFullDeckCode } from "@/utils/deck.util";

import {
  DeckCodeWrapper,
  DeckCodeInput,
  DeckCodeButton,
  DeckPageWrapper,
  DeckMoveToButton,
  DeckFavorites,
  DeckFavoritesTitle,
} from "@/styles/deck.style";

import type { NextPage } from "next";
import Link from "next/link";

const DeckPage: NextPage = () => {
  const MAX_INPUT_LENGTH = 12;

  const I18n = useI18nContext();
  const router = useRouter();

  const [favorites, setFavorites] = useState<string[]>([]);

  const deckCodeInputRef = useRef<HTMLInputElement | null>(null);

  const handleEnterDeckCode = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (deckCodeInputRef.current) {
      const inputValue = deckCodeInputRef.current.value;

      if (inputValue.length > 0) {
        if (validateFullDeckCode(inputValue))
          router.push(`/deck/${inputValue}`);
        else alert(I18n.t("deck.codeError"));
      } else alert(I18n.t("deck.codeEmpty"));
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFavorites(localStorage.getItem("favorites")?.split(",") || []);
    }
  }, []);

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
      {favorites.length > 0 && (
        <DeckFavorites>
          <DeckFavoritesTitle>{I18n.t("deck.favorite")}</DeckFavoritesTitle>
          {favorites.map((deckCode) => (
            <Link key={deckCode} href={`/deck/${deckCode}`}>
              <DeckAbbreviation deckCode={deckCode} />
            </Link>
          ))}
        </DeckFavorites>
      )}
    </DeckPageWrapper>
  );
};

export default DeckPage;
