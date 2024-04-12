"use client";

import styled from "styled-components";

export const MainPageWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const RecentCharacterRotationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 32px;
`;

export const RecentCharacterRotationTitle = styled.h1`
  display: flex;
  align-items: center;
  column-gap: 32px;
  font-family: "SangSangRock";
  font-size: 5rem;
`;

export const OriginWarPeriod = styled.span`
  font-size: 3rem;
`;

export const MainIconWrapper = styled.div`
  display: flex;
`;

export const RecentCardListWrapper = styled.aside``;

export const BaseButton = styled.button`
  padding: 16px 32px;
  font-family: "SangSangRock";
  font-size: 2rem;
  font-weight: 700;
  background-color: #b40a0a;
  border-color: transparent;
  border-radius: 4px;
  color: #ffffff;
  cursor: pointer;

  &:disabled {
    background-color: #aaaaaa;
  }
`;
