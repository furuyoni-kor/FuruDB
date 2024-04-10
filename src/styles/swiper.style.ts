"use client";

import styled from "styled-components";

export const SwiperWrapper = styled.div`
  display: flex;
  width: 1000px;
  background-color: #ff9baa;
  overflow: auto;
  border-radius: 8px;
  overflow-x: auto;
  scroll-snap-align: start;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }

  & > a,
  a:link,
  a:hover,
  a:active,
  a:visited {
    color: #000000;
    text-decoration: none;
  }
`;

export const RotationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  row-gap: 16px;
  padding: 24px;
  box-sizing: border-box;
`;

export const RotationName = styled.span`
  font-family: "SangSangRock";
  font-size: 2.5rem;
  text-align: center;
`;

export const EmptyContent = styled.div``;
