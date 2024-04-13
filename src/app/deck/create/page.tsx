"use client";

import { useState, useEffect, useMemo, useCallback, useReducer } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Loading from "@/components/Loading";
import IconList from "@/components/deck/IconList";
import DeckCharacter from "@/components/deck/DeckCharacter";

import { deckReducer } from "@/reducer/deckReducer";

import { useI18nContext } from "@/context/i18n.context";

import {
  createDeckCode,
  validateDeck,
  validateDeckWithCard,
} from "@/utils/deck.util";

import {
  getCharacter,
  getCharacterListWithMode,
} from "@/services/character.service";

import {
  DeckPageWrapper,
  CharacterSelectContainer,
  SelectedCharacterImageWrapper,
  SelectedCharacterImageContainer,
  SelectedCharacterNameWrapper,
  SelectedCharacterName,
  StepButton,
  StepButtonWrapper,
  DeckCreateWrapper,
} from "@/styles/deck.style";

import type { NextPage } from "next";
import type { SuccessResponse } from "@/types/service.type";
import type { Character, CharacterDeckInfo } from "@/types/character.type";
import type { DeckCardPayload, SelectedCharacter } from "@/reducer/deckReducer";

type DECK_STEP = "SELECT" | "BUILD" | "COMPLETE";

const DeckCreatePage: NextPage = () => {
  const PER_ROW = 8;
  const SELECTED_CHARACTER = {
    width: 300,
    height: 300,
  };

  const router = useRouter();
  const I18n = useI18nContext();

  const [characters, setCharacters] = useState<CharacterDeckInfo[]>([]);
  const [charactersWithCards, setCharactersWithCards] = useState<
    [Character, Character] | null
  >(null);
  const [step, setStep] = useState<DECK_STEP>("SELECT");
  const [loading, setLoading] = useState(false);

  const [state, dispatch] = useReducer(deckReducer, {
    characters: [null, null],
  });

  const ensembleException = useMemo(() => {
    const firstCharacter = state.characters[0];
    const secondCharacter = state.characters[1];

    if (firstCharacter && secondCharacter) {
      if (
        (firstCharacter.code === "NA-02" &&
          firstCharacter.mode === "A1" &&
          secondCharacter.code === "NA-04" &&
          secondCharacter.mode === "A1") ||
        (firstCharacter.code === "NA-04" &&
          firstCharacter.mode === "A1" &&
          secondCharacter.code === "NA-02" &&
          secondCharacter.mode === "A1")
      )
        return true;
    }

    return false;
  }, [state.characters[0], state.characters[1]]);

  const handleClickCharacterIcon = (
    character: Pick<SelectedCharacter, "code" | "mode" | "name" | "ename">
  ) =>
    useCallback((e: React.MouseEvent) => {
      dispatch({
        type: "SELECT_CHARACTER",
        payload: {
          character,
        },
      });
    }, []);

  const handleClickStepBtn = (step: DECK_STEP) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    switch (step) {
      case "SELECT":
        dispatch({ type: "RESET_CHARACTER" });
        break;
      case "COMPLETE":
        const createdDeckCode = createDeckCode(
          ...(state.characters as [SelectedCharacter, SelectedCharacter])
        );
        router.push(`/deck/${createdDeckCode}`);
        break;
    }

    setStep(step);
  };

  const handleClickCharacterImage =
    (character: Pick<SelectedCharacter, "code" | "mode">) =>
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dispatch({
        type: "UNSELECT_CHARACTER",
        payload: {
          character,
        },
      });
    };

  const handleClickCardImage = useCallback(
    (card: DeckCardPayload) => (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (
        validateDeckWithCard(
          state.characters as [SelectedCharacter, SelectedCharacter],
          card
        )
      )
        dispatch({
          type: "SELECT_CARD",
          payload: { card },
        });
    },
    [state.characters]
  );

  const parseCharacterName = (name: string) => {
    const splitedName = name.split(" ");

    return (
      <SelectedCharacterNameWrapper>
        <SelectedCharacterName>{splitedName[0]}</SelectedCharacterName>
        <SelectedCharacterName>
          {splitedName.slice(1, splitedName.length).join(" ")}
        </SelectedCharacterName>
      </SelectedCharacterNameWrapper>
    );
  };

  useEffect(() => {
    const fetchAndUpdateCharacters = async () => {
      const lang = I18n.language;

      setLoading(true);

      const res = await getCharacterListWithMode({ lang });

      if (res.status === 200) {
        const { characters } = res.data as SuccessResponse<CharacterDeckInfo[]>;
        setCharacters(characters);

        if (state.characters.some((character) => character)) {
          for (const stateCharacter of state.characters) {
            if (stateCharacter) {
              const charIndex = characters.findIndex(
                (character) =>
                  stateCharacter.code === character.code &&
                  stateCharacter.mode === character.mode
              );

              if (charIndex !== -1) {
                dispatch({
                  type: "UPDATE_CHARACTER",
                  payload: { character: characters[charIndex] },
                });
              }
            }
          }
        }
      }
      setLoading(false);
    };

    fetchAndUpdateCharacters();
  }, [I18n.language]);

  useEffect(() => {
    const fetchCharacterCards = async () => {
      const lang = I18n.language;

      if (state.characters.every((character) => character)) {
        setLoading(true);

        const [firstChar, secondChar] = state.characters;

        if (firstChar && secondChar) {
          const [firstCharRes, secondCharRes] = await Promise.all([
            getCharacter(firstChar.ename, {
              lang,
              mode: firstChar.mode,
              detail: true,
            }),
            getCharacter(secondChar.ename, {
              lang,
              mode: secondChar.mode,
              detail: true,
            }),
          ]);

          if (firstCharRes.status === 200 && secondCharRes.status === 200) {
            setCharactersWithCards([
              (firstCharRes.data as SuccessResponse<Character>).character,
              (secondCharRes.data as SuccessResponse<Character>).character,
            ]);
          }
        }
        setLoading(false);
      }
    };

    if (step === "BUILD") fetchCharacterCards();
  }, [I18n.language, step]);

  return !loading && characters.length > 0 ? (
    <DeckPageWrapper>
      {step === "SELECT" && (
        <CharacterSelectContainer>
          <SelectedCharacterImageContainer>
            <SelectedCharacterImageWrapper>
              {state.characters[0] && (
                <>
                  <Image
                    alt={`${state.characters[0].code}-${state.characters[0].mode}`}
                    src={`/images/twit_icon/${state.characters[0].code.replace(
                      "NA-",
                      ""
                    )}-${state.characters[0].mode}.webp`}
                    title={state.characters[0].name}
                    width={SELECTED_CHARACTER.width}
                    height={SELECTED_CHARACTER.height}
                    priority={true}
                    onClick={handleClickCharacterImage({
                      code: state.characters[0].code,
                      mode: state.characters[0].mode,
                    })}
                  />
                  {parseCharacterName(state.characters[0].name)}
                </>
              )}
            </SelectedCharacterImageWrapper>
            <SelectedCharacterImageWrapper>
              {state.characters[1] && (
                <>
                  <Image
                    alt={`${state.characters[1].code}-${state.characters[1].mode}`}
                    src={`/images/twit_icon/${state.characters[1].code.replace(
                      "NA-",
                      ""
                    )}-${state.characters[1].mode}.webp`}
                    title={state.characters[1].name}
                    width={SELECTED_CHARACTER.width}
                    height={SELECTED_CHARACTER.height}
                    priority={true}
                    onClick={handleClickCharacterImage({
                      code: state.characters[1].code,
                      mode: state.characters[1].mode,
                    })}
                  />
                  {parseCharacterName(state.characters[1].name)}
                </>
              )}
            </SelectedCharacterImageWrapper>
          </SelectedCharacterImageContainer>
          <StepButtonWrapper>
            <StepButton
              disabled={!state.characters.every((character) => character)}
              onClick={handleClickStepBtn("BUILD")}
            >
              {I18n.t("deck.create.buildDeck")}
            </StepButton>
          </StepButtonWrapper>
          <IconList
            characters={characters}
            selectedCharacters={state.characters}
            perRow={PER_ROW}
            onClick={handleClickCharacterIcon}
          />
        </CharacterSelectContainer>
      )}
      {step === "BUILD" &&
        charactersWithCards &&
        state.characters[0] &&
        state.characters[1] && (
          <DeckCreateWrapper>
            <DeckCharacter
              deck={(state.characters[0] as SelectedCharacter).deck}
              character={charactersWithCards[0]}
              onClick={handleClickCardImage}
            />
            <StepButtonWrapper>
              <StepButton onClick={handleClickStepBtn("SELECT")}>
                {I18n.t("deck.create.selectMegami")}
              </StepButton>
              <StepButton
                disabled={
                  ensembleException
                    ? !validateDeck(
                        state.characters[0].deck,
                        state.characters[1].deck,
                        { normalCount: 8 }
                      )
                    : !validateDeck(
                        state.characters[0].deck,
                        state.characters[1].deck
                      )
                }
                onClick={handleClickStepBtn("COMPLETE")}
              >
                {I18n.t("deck.create.createCode")}
              </StepButton>
            </StepButtonWrapper>
            <DeckCharacter
              deck={(state.characters[1] as SelectedCharacter).deck}
              character={charactersWithCards[1]}
              onClick={handleClickCardImage}
            />
          </DeckCreateWrapper>
        )}
    </DeckPageWrapper>
  ) : (
    <Loading />
  );
};

export default DeckCreatePage;
