"use client";

import { validateDeckWithCard } from "@/utils/deck.util";

import type {
  CharacterMode,
  CharacterName,
  EngCharacterName,
} from "@/types/character.type";
import type { DeckArray } from "@/types/deck.type";

export interface SelectedCharacter {
  code: string;
  name: string;
  ename: EngCharacterName;
  mode: CharacterMode;
  deck: DeckArray;
}

interface DeckState {
  characters: [SelectedCharacter | null, SelectedCharacter | null];
}

export interface DeckCardPayload {
  charCode: string;
  mode: CharacterMode;
  category: "normal" | "special";
  cardIndex: number;
}

type DeckAction =
  | "RESET_CHARACTER"
  | "SELECT_CHARACTER"
  | "UNSELECT_CHARACTER"
  | "UPDATE_CHARACTER"
  | "SELECT_CARD";

interface DeckActionPayload {
  character?:
    | Pick<SelectedCharacter, "code" | "mode">
    | Pick<SelectedCharacter, "code" | "mode" | "name" | "ename">;
  card?: DeckCardPayload;
}

const DEFAULT_DECK: DeckArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

export const deckReducer = (
  state: DeckState,
  action: {
    type: DeckAction;
    payload?: DeckActionPayload;
  }
) => {
  const { type, payload } = action;

  switch (type) {
    case "RESET_CHARACTER":
      state.characters = [null, null];
      break;

    case "SELECT_CHARACTER":
      if (payload && payload.character) {
        const { code, mode, name, ename } = payload.character as Pick<
          SelectedCharacter,
          "code" | "mode" | "name" | "ename"
        >;

        if (state.characters.some((char) => char && char.code === code)) {
          const charIndex = state.characters.findIndex(
            (char) => char && char.code === code
          );

          if (charIndex !== -1) {
            const stateCharacter = state.characters[charIndex];

            if (stateCharacter)
              if (stateCharacter.mode === mode)
                state.characters[charIndex] = null;
              else
                state.characters[charIndex] = {
                  code,
                  mode,
                  name,
                  ename,
                  deck: [...DEFAULT_DECK],
                };
          }
        } else {
          if (!state.characters[0]) {
            state.characters[0] = {
              code,
              mode,
              name,
              ename,
              deck: [...DEFAULT_DECK],
            };
          } else if (!state.characters[1]) {
            state.characters[1] = {
              code,
              mode,
              name,
              ename,
              deck: [...DEFAULT_DECK],
            };
          }
        }
        break;
      }
    case "UNSELECT_CHARACTER":
      if (payload && payload.character) {
        const { code, mode } = payload.character;

        if (state.characters.some((char) => char && char.code === code)) {
          const charIndex = state.characters.findIndex(
            (char) => char && char.code === code
          );

          const stateCharacter = state.characters[charIndex];

          if (stateCharacter && stateCharacter.mode === mode)
            state.characters[charIndex] = null;
        }
      }
      break;
    case "UPDATE_CHARACTER":
      if (payload && payload.character) {
        const { code, mode, name, ename } = payload.character as Pick<
          SelectedCharacter,
          "code" | "mode" | "name" | "ename"
        >;

        if (state.characters.some((char) => char && char.code === code)) {
          const charIndex = state.characters.findIndex(
            (char) => char && char.code === code
          );

          if (charIndex !== -1) {
            const stateCharacter = state.characters[charIndex];

            if (stateCharacter && stateCharacter.name !== name) {
              state.characters[charIndex] = {
                code,
                mode,
                name,
                ename,
                deck: [...DEFAULT_DECK],
              };
            }
          }
        }
        break;
      }

    case "SELECT_CARD":
      if (payload && payload.card) {
        const { charCode, mode, category, cardIndex } = payload.card;
        const charIndex = state.characters.findIndex(
          (character) =>
            character && character.code === charCode && character.mode === mode
        );

        if (charIndex !== -1) {
          const stateCharacter = state.characters[charIndex];

          if (
            stateCharacter &&
            validateDeckWithCard(
              state.characters as [SelectedCharacter, SelectedCharacter],
              {
                charCode: stateCharacter.code,
                mode: stateCharacter.mode,
                cardIndex,
                category,
              }
            )
          ) {
            const nextDeckArray = [...stateCharacter.deck];
            const index = category === "normal" ? cardIndex : cardIndex + 7;

            nextDeckArray[index] = stateCharacter.deck[index] ? 0 : 1;

            state.characters[charIndex] = {
              ...stateCharacter,
              deck: nextDeckArray as DeckArray,
            };

            // 사이네 A1, 토코요 A1 예외처리
            if (category === "normal") {
              const anotherCharacter = state.characters[(charIndex + 1) % 2];

              if (anotherCharacter) {
                const nextAnotherDeckArray = [...anotherCharacter.deck];

                if (charCode === "NA-02" && mode === "A1") {
                  if (
                    anotherCharacter.code === "NA-04" &&
                    anotherCharacter.mode === "A1"
                  ) {
                    if (cardIndex === 0) {
                      nextAnotherDeckArray[3] = nextDeckArray[cardIndex]
                        ? 1
                        : 0;
                      state.characters[(charIndex + 1) % 2] = {
                        ...anotherCharacter,
                        deck: nextAnotherDeckArray as DeckArray,
                      };
                    }
                  }
                }

                if (charCode === "NA-04" && mode === "A1") {
                  if (
                    anotherCharacter.code === "NA-02" &&
                    anotherCharacter.mode === "A1"
                  ) {
                    if (cardIndex === 3) {
                      nextAnotherDeckArray[0] = nextDeckArray[cardIndex]
                        ? 1
                        : 0;
                      state.characters[(charIndex + 1) % 2] = {
                        ...anotherCharacter,
                        deck: nextAnotherDeckArray as DeckArray,
                      };
                    }
                  }
                }
              }
            }
          }
        }
      }
  }

  return { ...state };
};
