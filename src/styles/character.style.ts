"use client";

import styled from "styled-components";

import { BaseButton } from "@/styles/index.style";

// 캐릭터 리스트 페이지

export const CharacterListContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 32px;
  row-gap: 32px;
  flex-wrap: wrap;
`;

export const CharacterListTitle = styled.h1`
  display: flex;
  justify-content: center;
  margin-bottom: 60px;
`;

export const CharacterListTitleText = styled.span`
  font-family: "SangSangRock";
  font-size: 5rem;
`;

export const CharacterListIconWrapper = styled.div`
  display: flex;
  position: relative;
`;

export const CharacterListIconNameWrapper = styled.div`
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #00000080;
  border-radius: 16px;
  z-index: 3;
`;

export const CharacterListIconName = styled.span`
  color: #ffffff;
  font-family: "SangSangRock";
  font-size: 3rem;
  pointer-events: none;
`;

// 캐릭터 상세 페이지

export const CharacterContainer = styled.article`
  display: flex;
  flex-direction: column;
  width: 1200px;
  border-radius: 16px;
  border: 2px solid #000000;
`;

export const CharacterInfoWrapper = styled.section`
  display: flex;
`;

export const CharacterTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px;
  row-gap: 16px;
  font-family: "SangSangRock";
  background-color: #000000;
  border-top-right-radius: 16px;
`;

export const CharacterName = styled.h1`
  color: #ffffff;
  font-size: 3rem;
  font-weight: 700;
`;

export const CharacterCode = styled.span`
  color: #dddddd;
  font-size: 2rem;
  font-weight: 700;
`;

export const CharacterInfoTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25%;
  height: 100%;
  background-color: #000000;
  color: #ffffff;
  font-weight: 700;
`;

export const CharacterModeButton = styled(BaseButton)`
  width: 80px;
  padding: 16px;
  font-size: 1.2rem;
`;

export const CharacterInfoTitleText = styled.span``;

export const CharacterInfoContent = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px 0;
`;

export const CharacterInfoValueWrapper = styled.div`
  display: flex;
  border-bottom: 2px solid #000000;
`;

export const CharacterAbilityDescription = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: auto;
  padding: 32px;
  line-height: 48px;
  word-break: break-word;
`;

export const CharacterAbilityDescriptionRow = styled.span``;

export const CharacterImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35%;
  padding: 32px;
  border-right: 2px solid #000000;
`;

export const CharacterDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;
  font-size: 2rem;
`;

export const CharacterImage = styled.img`
  width: 200px;
  height: auto;
`;

export const CharacterCardWrapper = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  border-top: 2px solid #000000;
`;

export const CharacterCardText = styled.span`
  dispaly: flex;
  padding: 32px;
  background-color: #000000;
  color: #ffffff;
  font-family: "SangSangRock";
  font-size: 3rem;
`;

export const CharacterCardList = styled.div`
  display: flex;
  padding: 32px;
  column-gap: 32px;
`;

export const CharacterCardImage = styled.img`
  width: 100px;
  height: auto;
`;
