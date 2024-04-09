"use client";

import { useMemo } from "react";
import Image from "next/image";

import { IconListWrapper, IconListRow } from "@/styles/deck.style";

import type { FC } from "react";
import type { CharacterDeckInfo } from "@/types/character.type";
import type { SelectedCharacter } from "@/reducer/deckReducer";

interface IconListProps {
  characters: CharacterDeckInfo[];
  selectedCharacters: [SelectedCharacter | null, SelectedCharacter | null];
  perRow: number;
  onClick: (
    character: Pick<SelectedCharacter, "code" | "mode" | "name" | "ename">
  ) => (e: React.MouseEvent) => void;
}

const IconList: FC<IconListProps> = ({
  characters,
  selectedCharacters,
  perRow,
  onClick,
}) => {
  const ICON = {
    width: 110,
    height: 110,
  };

  const CharacterIconArray = useMemo(() => {
    const resultArray = [];

    for (let i = 0; i < Math.ceil(characters.length / perRow); i++) {
      resultArray.push(characters.slice(i * perRow, (i + 1) * perRow));
    }

    return resultArray;
  }, [characters]);

  return (
    <IconListWrapper>
      {CharacterIconArray.map((row, rowIndex) => (
        <IconListRow key={`icon-row-${rowIndex}`}>
          {row.map(({ code, name, ename, mode }) => (
            <Image
              key={`${code}-${ename}-${mode}-icon`}
              className={
                selectedCharacters.some(
                  (character) =>
                    character &&
                    character.code === code &&
                    character.mode === mode
                )
                  ? "selected"
                  : ""
              }
              alt={`${code}-${name}`}
              src={`/images/icon/${code.replace("NA-", "")}-${mode}.webp`}
              title={name}
              width={ICON.width}
              height={ICON.height}
              priority={true}
              onClick={onClick({ code, mode, name, ename })}
              style={{
                transform: `translate(${
                  (rowIndex % 2 ? ICON.width / 2 : 0) + -ICON.width / 4
                }px, ${(-ICON.height * rowIndex) / 4}px)`,
              }}
            />
          ))}
        </IconListRow>
      ))}
    </IconListWrapper>
  );
};

export default IconList;
