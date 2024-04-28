"use client";

import styled from "styled-components";

import { laptop, tablet, mobile } from "@/utils/style.util";

export const HeaderWrapper = styled.header`
  display: flex;
  justify-content: center;
  background-color: #ff9baa;
`;

export const HeaderContent = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px 40px;
  max-width: 1200px;

  ${tablet`{
    padding: 10px; 20px;
  }`}
`;

export const HeaderLanguageWrapper = styled.div`
  display: flex;
  column-gap: 16px;

  ${tablet`{
    column-gap: 12px;
  }`}

  ${mobile`{
    column-gap: 8px;
  }`}

  

  & > span.fis {
    width: 50px;
    height: 50px;
    border-radius: 8px;
    cursor: pointer;

    ${laptop`{
      width: 40px;
      height: 40px;
    }`}

    ${mobile`{
      width: 30px;
      height: 30px;
    }`}
  }
`;

export const HeaderLogoWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;

  & > a,
  a:link,
  a:visited,
  a:active,
  a: hover {
    color: #000000;
    text-decoration: none;
  }
`;

export const HeaderLogoLinkWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 16px;
`;

export const HeaderLogoText = styled.span`
  font-family: "SangSangRock";
  font-size: 3rem;

  ${laptop`{
    font-size: 2.5rem;
  }`}

  ${tablet`{
    font-size: 2rem;
  }`}

  ${mobile`{
    font-size: 1.5rem;
  }`}
`;

export const HeaderNavLinkWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 0;
  border-radius: 8px;
`;

export const HeaderNavBar = styled.nav`
  display: flex;
  column-gap: 32px;

  & > a,
  a:link,
  a:visited,
  a:active {
    color: #000000;
    text-decoration: none;
  }

  & > a:hover {
    color: #888888;
    text-decoration: none;
  }
`;

export const HeaderNavText = styled.span`
  font-family: "SangSangRock";
  font-size: 2rem;

  ${laptop`{
    font-size: 1.8rem;
  }`}

  ${tablet`{
    font-size: 1.5rem
  }`}

  ${mobile`{
    font-size: 1.2rem;
  }`}
`;
