"use client";

import styled from "styled-components";

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
  width: 50%;
`;

export const CardDataWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 50%;
  font-size: 2rem;
  border: 2px solid #000000;
  border-radius: 4px;
`;

export const CardTitle = styled.h3`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px;
  row-gap: 16px;
  font-family: "SangSangRock";
  background-color: #000000;
`;

export const CardYomigana = styled.sup`
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 700;
`;

export const CardName = styled.h1`
  color: #ffffff;
  font-size: 3rem;
  font-weight: 700;
`;

export const CardCode = styled.h2`
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

export const CardInfoTitle = styled.h3`
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
