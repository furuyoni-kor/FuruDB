"use client";

import styled from "styled-components";

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
`;

export const HeaderLanguageWrapper = styled.div`
  display: flex;
  column-gap: 16px;

  & > span.fis {
    width: 50px;
    height: 50px;
    border-radius: 8px;
    cursor: pointer;
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
`;

export const HeaderNavLinkWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 32px;
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
  font-size: 2.5rem;
`;
