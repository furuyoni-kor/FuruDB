"use client";

import styled from "styled-components";

import { BaseButton, BaseInput } from "./index.style";

export const CardPageWrapper = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 64px;
`;

export const CardPreviousLinkWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const CardContainer = styled.article`
  display: flex;
  width: 1200px;
  font-family: "RidiBatang NotoSerifJP";

  & > * {
    box-sizing: border-box;
  }

  & a {
    text-decoration: none;

    &:link {
      color: #0275d8;
    }

    &:hover {
      color: #5bc0de;
    }

    &:visited {
      color: #d9534f;
    }
  }
`;

export const CardImageWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
`;

export const CardDataWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 700px;
  font-size: 2rem;
  border: 2px solid #000000;
  border-radius: 4px;
`;

export const CardTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px;
  row-gap: 16px;
  font-family: "SangSangRock";
  background-color: #000000;
`;

export const CardRuby = styled.ruby`
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 700;
`;

export const CardName = styled.h1`
  color: #ffffff;
  font-size: 3rem;
  font-weight: 700;
`;

export const CardCode = styled.span`
  color: #dddddd;
  font-weight: 700;
`;

export const CardInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  font-family: "SangSangRock";
  border-bottom: 2px solid #000000;
`;

export const CardCategory = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25%;
  height: 100%;
  border-right: 2px solid #000000;
`;

export const CardCategoryText = styled.span``;

export const CardTags = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75%;
  padding: 16px 0;
  column-gap: 16px;
`;

export const CardTag = styled.span`
  padding: 16px 32px;
  font-weight: 700;
  border-radius: 32px;

  &.attack {
    background-color: #f0b4a0;
    color: #500000;
  }

  &.action {
    background-color: #c8c8f0;
    color: #1414a0;
  }

  &.enhancement {
    background-color: #bed2be;
    color: #285028;
  }

  &.reaction {
    background-color: #dcbec8;
    color: #a01e63;
  }

  &.throughout {
    background-color: #e6dcc8;
    color: #3c3c1e;
  }

  &.undefined {
    background-color: #999999;
    color: #ffffff;
  }
`;

export const CardDescription = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: auto;
  padding: 32px;
  line-height: 48px;
  word-break: break-word;
`;

export const CardInfoTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25%;
  height: 100%;
  background-color: #000000;
  color: #ffffff;
  font-weight: 700;
`;

export const CardInfoTitleText = styled.span``;

export const CardInfoContent = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px 0;
`;

export const CardValueWrapper = styled.div`
  display: flex;
  border-bottom: 2px solid #000000;
`;

export const CardRevision = styled.div`
  display: flex;
  font-weight: 700;
  border-top: 2px solid #000000;
`;

export const CardRelatedAsideCards = styled.div`
  display: flex;
  border-top: 2px solid #000000;
`;

export const CardLinkWrapper = styled.div`
  display: flex;
  padding: 16px;
  justify-content: center;
  font-weight: 700;
  border-top: 2px solid #000000;
`;

export const CardDescriptionRow = styled.span``;

export const CardSearchWrapper = styled.section``;

export const CardSearchInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 64px 0;
`;

export const CardSearchInput = styled(BaseInput)`
  width: 600px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
`;

export const CardSearchButton = styled(BaseButton)`
  padding: 16px 32px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
`;

export const CardSearchTagListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 1060px;
  border: 3px solid #000000;
  border-radius: 16px;
  font-family: "SangSangRock";
  font-size: 2rem;
  font-weight: 700;

  & > div:not(:last-child) {
    border-bottom: 3px solid #000000;
  }
`;

export const CardSearchTagList = styled.div`
  display: flex;
  padding: 16px;
  column-gap: 16px;
`;

export const CardSearchTag = styled.span`
  display: flex;
  padding: 16px 32px;
  background-color: #ff9baa;
  border: 3px solid transparent;
  border-radius: 16px;
  text-align: center;
  cursor: pointer;

  &.selected {
    color: #ffffff;
    background-color: #b40a0a;
  }
`;

export const CardSearchListResultCount = styled.div`
  margin-left: auto;
  padding: 16px 32px;
  font-family: "SangSangRock";
  font-size: 2rem;
  font-weight: 700;
  text-align: right;
`;

export const CardSearchListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;

  & > a,
  a:link,
  a:active,
  a:hover,
  a:visited {
    color: #000000;
    text-decoration: none;
  }
`;

export const CardSearchResultContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CardSearchResultWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  height: 100%;

  &:not(.selected):hover > div {
    display: flex;
  }
`;

export const CardSearchResultHoverWrapper = styled.div`
  display: none;
  position: absolute;
  background-color: #ff9baa;
  border-radius: 16px;
  z-index: 4;
`;

export const CardSearchResultEmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 32px;
`;

export const CardSearchResultEmptyImage = styled.img``;

export const CardSearchResultEmptyText = styled.span`
  color: #ffffff;
  font-family: "SangSangRock";
  font-size: 4rem;
  font-weight: 700;
  text-shadow: 2px 2px #ff64c9;
  text-align: center;
`;
