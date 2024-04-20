"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import _ from "lodash";

import Loading from "@/components/Loading";
import SearchEmptyResult from "@/components/card/SearchEmptyResult";
import SearchTagList from "@/components/card/SearchTagList";
import CardMagnifier from "@/components/card/CardMagnifier";
import Pagination from "@/components/Pagination";

import { CARD_CATEGORY, CARD_TYPE, CARD_SUBTYPE } from "@/constant/card";

import { useI18nContext } from "@/context/i18n.context";

import { searchCardsByKeyword } from "@/services/card.service";

import {
  CardSearchButton,
  CardSearchInput,
  CardSearchInputWrapper,
  CardSearchListResultCount,
  CardSearchListWrapper,
  CardSearchResultContainer,
  CardSearchTagListWrapper,
  CardSearchWrapper,
} from "@/styles/card.style";

import type { NextPage } from "next";
import type { Dispatch, SetStateAction } from "react";
import type { Language } from "@/types/index.type";
import type { SuccessResponseWithPagination } from "@/types/service.type";
import type {
  Card,
  CardCategory,
  CardType,
  CardSubType,
} from "@/types/card.type";

interface SearchData {
  keyword: string;
  category: string;
  type: string;
  subType: string;
}

const CardSearchPage: NextPage = () => {
  const THROTTLE_TIME = 2000;
  const DEBOUNCE_TIME = 1000;
  const PAGINATION_PER = 10;
  const MAX_COUNTS_PER_PAGE = 10;
  const MAX_INPUT_LENGTH = 30;

  const CARD = {
    width: 180,
    height: 252,
  };
  const CARD_HOVER = {
    width: 500,
    height: 700,
    top: -220,
  };
  const HOVER = 196;

  const I18n = useI18nContext();

  const [keyword, setKeyword] = useState("");
  const [cards, setCards] = useState<Card[] | null>(null);
  const [cardCategory, setCardCategory] = useState("");
  const [cardType, setCardType] = useState("");
  const [cardSubType, setCardSubType] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [totalLength, setTotalLength] = useState(0);

  const [prevOptions, setPrevOptions] = useState<SearchData>({
    keyword: "",
    category: "",
    type: "",
    subType: "",
  });

  const [onLoad, setOnLoad] = useState(false);
  const [loading, setLoaindg] = useState(false);
  const [language, setLanguage] = useState(I18n.language);

  const cardSearchInputRef = useRef<HTMLInputElement | null>(null);

  const initializeState = () => {
    setOnLoad(false);

    setKeyword("");
    setCards([]);
    setCardCategory("");
    setCardType("");
    setCardSubType("");

    setCurrentPage(1);
    setTotalPage(1);
    setTotalLength(0);
  };

  const isSearchOptionChange = (
    options: SearchData,
    prevOptions: SearchData
  ) => {
    return !(
      options.keyword === prevOptions.keyword &&
      options.category === prevOptions.category &&
      options.type === prevOptions.type &&
      options.subType === prevOptions.subType
    );
  };

  const fetchOptions = useMemo(() => {
    return {
      lang: language,
      category: cardCategory as CardCategory | "",
      type: cardType as CardType | "",
      subType: cardSubType as CardSubType | "",
      page: currentPage,
      per: MAX_COUNTS_PER_PAGE,
    };
  }, [cardCategory, cardType, cardSubType, currentPage, language]);

  const cardLinkQuery = useMemo(() => {
    const queryObject: { [key: string]: string } = {
      from: "card",
    };

    if (keyword) queryObject["keyword"] = keyword;
    if (cardCategory) queryObject["category"] = cardCategory;
    if (cardType) queryObject["type"] = cardType;
    if (cardSubType) queryObject["sub"] = cardSubType;

    return Object.entries(queryObject)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
  }, [keyword, cardCategory, cardType, cardSubType]);

  const fetchCardsByKeyword = async (
    keyword: string,
    options: {
      lang: Language;
      category: CardCategory | "";
      type: CardType | "";
      subType: CardSubType | "";
      page: number;
      per: number;
    }
  ) => {
    if (!loading) {
      setLoaindg(true);

      try {
        const response = await searchCardsByKeyword(keyword, options);

        if (response.status === 200) {
          const { cards, totalPage, totalLength } =
            response.data as SuccessResponseWithPagination<Card[]>;

          setKeyword(keyword);
          setCards(cards);
          setTotalPage(totalPage);
          setTotalLength(totalLength);

          const currentSearchOptions = {
            keyword,
            category: options.category,
            type: options.type,
            subType: options.subType,
          };

          if (isSearchOptionChange(currentSearchOptions, prevOptions)) {
            setPrevOptions(currentSearchOptions);
            setCurrentPage(1);
          }
        }
      } catch (err: any) {
        setKeyword("");
        setCards([]);
        setCurrentPage(1);
        setTotalPage(1);
        setTotalLength(0);
      }
      setLoaindg(false);
    }
  };

  const handlePressEnter = _.throttle((e: React.KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.code === "Enter" && cardSearchInputRef.current) {
      const inputValue = cardSearchInputRef.current.value;

      fetchCardsByKeyword(inputValue, fetchOptions);

      setOnLoad(true);
    }
  }, THROTTLE_TIME);

  const handleClickSearchBtn = _.throttle((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (cardSearchInputRef.current) {
      const inputValue = cardSearchInputRef.current.value;

      fetchCardsByKeyword(inputValue, fetchOptions);

      setOnLoad(true);
    }
  }, THROTTLE_TIME);

  const handleClickTag =
    (setState: Dispatch<SetStateAction<string>>) =>
    (value: CardCategory | CardType | CardSubType | "") =>
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setState((prevValue) => (prevValue !== value ? value : ""));
    };

  const handleClickPage = (page: number) =>
    _.debounce((e: React.MouseEvent) => {
      if (!loading) setCurrentPage(page);
    }, DEBOUNCE_TIME);

  useEffect(() => {
    if (cardSearchInputRef.current) cardSearchInputRef.current.value = "";
    initializeState();
    setLanguage(I18n.language);
  }, [I18n.language]);

  useEffect(() => {
    if (onLoad && cardSearchInputRef.current) {
      const inputValue = cardSearchInputRef.current.value;

      fetchCardsByKeyword(inputValue, fetchOptions);
    }
  }, [currentPage]);

  return (
    <CardSearchWrapper>
      <CardSearchTagListWrapper>
        <SearchTagList
          tags={CARD_CATEGORY.map(
            (category) => I18n.t(`card.category.${category}`) as CardCategory
          )}
          value={cardCategory as CardCategory | ""}
          onClick={handleClickTag(setCardCategory)}
        />
        <SearchTagList
          tags={CARD_TYPE.map(
            (type) => I18n.t(`card.type.${type}`) as CardType
          )}
          value={cardType as CardType | ""}
          onClick={handleClickTag(setCardType)}
        />
        <SearchTagList
          tags={CARD_SUBTYPE.map(
            (subType) => I18n.t(`card.subType.${subType}`) as CardSubType
          )}
          value={cardSubType as CardSubType | ""}
          onClick={handleClickTag(setCardSubType)}
        />
      </CardSearchTagListWrapper>
      <CardSearchInputWrapper>
        <CardSearchInput
          ref={cardSearchInputRef}
          name="card-search-inpout"
          type="search"
          autoComplete="false"
          placeholder="키워드 입력 :)"
          maxLength={MAX_INPUT_LENGTH}
          onKeyDown={handlePressEnter}
        />
        <CardSearchButton onClick={handleClickSearchBtn}>검색</CardSearchButton>
      </CardSearchInputWrapper>
      <CardSearchResultContainer>
        {loading ? (
          <Loading />
        ) : cards && cards.length > 0 ? (
          <>
            <CardSearchListResultCount>
              {onLoad &&
                cards &&
                cards.length > 0 &&
                `${I18n.t("card.search.result")}: ${totalLength}${I18n.t(
                  "card.search.count"
                )}`}
            </CardSearchListResultCount>
            <CardSearchListWrapper>
              {cards &&
                cards.length > 0 &&
                cards.map((card, index) => (
                  <Link
                    key={`search-result-${index}-${card.fullCode}`}
                    href={`/card/${card.fullCode}?${cardLinkQuery}`}
                  >
                    <CardMagnifier
                      card={card}
                      cardStyle={CARD}
                      hoverStyle={CARD_HOVER}
                      hoverLeft={HOVER}
                      hoverRight={HOVER}
                    />
                  </Link>
                ))}
            </CardSearchListWrapper>
            {totalLength > 0 && (
              <Pagination
                page={currentPage}
                totalPage={totalPage}
                per={PAGINATION_PER}
                onClick={handleClickPage}
              />
            )}
          </>
        ) : (
          onLoad && <SearchEmptyResult />
        )}
      </CardSearchResultContainer>
    </CardSearchWrapper>
  );
};

export default CardSearchPage;
