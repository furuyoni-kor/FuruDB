"use client";

import { CardSearchTagList, CardSearchTag } from "@/styles/card.style";

import type { FC } from "react";
import type { CardCategory, CardType, CardSubType } from "@/types/card.type";

interface SearchTagListProps {
  tags: (CardCategory | CardType | CardSubType)[];
  value: CardCategory | CardType | CardSubType | "";
  onClick: (
    value: CardCategory | CardType | CardSubType | ""
  ) => (e: React.MouseEvent) => void;
}

const SearchTagList: FC<SearchTagListProps> = ({ tags, value, onClick }) => {
  return (
    <CardSearchTagList>
      {tags.map((tag) => (
        <CardSearchTag
          key={tag}
          className={tag === value ? "selected" : ""}
          onClick={onClick(tag)}
        >
          {tag}
        </CardSearchTag>
      ))}
    </CardSearchTagList>
  );
};

export default SearchTagList;
