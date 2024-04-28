"use client";

import styled from "styled-components";

import { laptop, tablet, mobile } from "@/utils/style.util";

import { BaseButton } from "@/styles/index.style";

// 캐릭터 리스트 페이지

export const CharacterListContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 32px;
  flex-wrap: wrap;

  ${laptop`{
    gap: 24px;
  }`}

  ${tablet`{
    gap: 16px;
  }`}

  ${mobile`{
    gap: 12px;
  }`}
`;

export const CharacterListTitle = styled.h1`
  display: flex;
  justify-content: center;
  margin-bottom: 60px;
`;

export const CharacterListTitleText = styled.span`
  font-family: "SangSangRock";
  font-size: 5rem;

  ${laptop`{
    font-size: 4.5rem;
  }`}

  ${tablet`{
    font-size: 4rem;
  }`}

  ${mobile`{
    font-size: 3.5rem;
  }`}
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

  ${laptop`{
    font-size: 2.2rem;
  }`}

  ${tablet`{
    font-size: 2rem;
  }`}

  ${mobile`{
    font-size: 1.4rem;
  }`}
`;

// 캐릭터 상세 페이지

export const CharacterContainer = styled.article`
  display: flex;
  flex-direction: column;
  width: 1200px;
  border-radius: 16px;
  border: 2px solid #000000;

  ${laptop`{
    width: 912px;
  }`}

  ${tablet`{
    width: 688px;
  }`}

  ${mobile`{
    width: 496px;
  }`}
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

  ${tablet`{
    padding: 24px;
  }`}
`;

export const CharacterName = styled.h1`
  color: #ffffff;
  font-size: 3rem;
  font-weight: 700;

  ${laptop`{
    font-size: 2.6rem;    
  }`}

  ${tablet`{
    font-size: 2.2rem
  }`}

  ${mobile`{
    font-size: 1.8rem;
  }`}
`;

export const CharacterCode = styled.span`
  color: #dddddd;
  font-size: 2rem;
  font-weight: 700;

  ${laptop`{
    font-size: 1.8rem;
  }`}

  ${tablet`{
    font-size: 1.5rem;
  }`}

  ${mobile`{
    font-size: 1.2rem;
  }`}
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

  ${laptop`{
    width: 60px;
    padding: 12px;
  }`}

  ${tablet`{
    width: 50px;
    padding: 8px;
    font-size: 1rem;
  }`}

  ${mobile`{
    width: 40px;
    font-size: 0.8rem;
  }`}
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

  ${laptop`{
    line-height: 42px;
  }`}

  ${tablet`{
    line-height: 36px;
  }`}

  ${mobile`{
    line-height: 24px;
  }`}
`;

export const CharacterAbilityDescriptionRow = styled.span``;

export const CharacterImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35%;
  padding: 32px;
  border-right: 2px solid #000000;

  ${laptop`{
    padding: 24px;
  }`}

  ${tablet`{
    padding: 16px;
  }`}

  ${mobile`{
    padding: 8px;
  }`}
`;

export const CharacterDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;
  font-size: 2rem;

  ${laptop`{
    font-size: 1.8rem;
  }`}

  ${tablet`{
    font-size: 1.5rem;
  }`}

  ${mobile`{
    font-size: 1.2rem;
  }`}
`;

export const CharacterCardWrapper = styled.section`
  display: flex;
  flex-direction: column;
  border-top: 2px solid #000000;
`;

export const CharacterCardText = styled.span`
  dispaly: flex;
  padding: 32px;
  background-color: #000000;
  color: #ffffff;
  font-family: "SangSangRock";
  font-size: 3rem;

  ${laptop`{
    font-size: 2.5rem;
  }`}

  ${tablet`{
    padding: 24px;
    font-size: 2rem;
  }`}

  ${mobile`{
    padding: 16px;
    font-size: 1.5rem;
  }`}
`;

export const CharacterCardList = styled.div`
  display: flex;
  padding: 32px;
  column-gap: 32px;

  ${laptop`{
    padding: 24px;
    column-gap: 24px;
  }`}

  ${tablet`{
    padding: 16px;
    column-gap: 16px;
  }`}

  ${mobile`{
    padding: 8px;
    column-gap: 8px;
  }`}
`;

export const CharacterCardImage = styled.img`
  width: 100px;
  height: auto;
`;
