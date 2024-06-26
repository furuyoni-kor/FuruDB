"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import "flag-icons";

import CustomImage from "@/components/Image";

import { ENG_CHARACTER_NAME } from "@/constant";

import { useI18nContext } from "@/context/i18n.context";

import { getRandomNumberBetween } from "@/utils/math.util";

import {
  HeaderWrapper,
  HeaderContent,
  HeaderLanguageWrapper,
  HeaderNavLinkWrapper,
  HeaderNavBar,
  HeaderNavText,
  HeaderLogoWrapper,
  HeaderLogoLinkWrapper,
  HeaderLogoText,
} from "@/styles/header.style";

import type { FC } from "react";
import type { Language } from "@/types/index.type";
import type { EngCharacterName } from "@/types/character.type";

const Header: FC = () => {
  const ICON = {
    pc: {
      width: 80,
      height: 80,
    },
    laptop: {
      width: 80,
      height: 80,
    },
    tablet: {
      width: 60,
      height: 60,
    },
    mobile: {
      width: 60,
      height: 60,
    },
  };

  const I18n = useI18nContext();

  const NAVBAR = [
    {
      name: I18n.t("header.character") as string,
      href: "/character",
    },
    {
      name: I18n.t("header.card") as string,
      href: "/card",
    },
    {
      name: I18n.t("header.deck") as string,
      href: "/deck",
    },
  ];

  // TODO: 미소라 SD 이미지가 추가되면 -2을 -1로 변경할 것
  const [character, setCharacter] = useState<EngCharacterName>(
    ENG_CHARACTER_NAME[getRandomNumberBetween(0, ENG_CHARACTER_NAME.length - 2)]
  );

  const changeLanguage = useCallback(
    (language: Language) => (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      I18n.changeLanguage(language);
    },
    []
  );

  return (
    <HeaderWrapper>
      <HeaderContent>
        <HeaderLogoWrapper>
          <Link href="/">
            <HeaderLogoLinkWrapper>
              <CustomImage
                title="header-logo-chibi"
                alt="header-logo-chibi"
                src={`/images/chibi/${character}.webp`}
                size={ICON}
              />
              <HeaderLogoText>FuruDB</HeaderLogoText>
            </HeaderLogoLinkWrapper>
          </Link>
        </HeaderLogoWrapper>
        <HeaderNavBar>
          {NAVBAR.map(({ name, href }: { name: string; href: string }) => (
            <Link key={href} href={href}>
              <HeaderNavLinkWrapper>
                <HeaderNavText>{name}</HeaderNavText>
              </HeaderNavLinkWrapper>
            </Link>
          ))}
        </HeaderNavBar>
        <HeaderLanguageWrapper>
          <span className="fi fis fi-kr" onClick={changeLanguage("kor")}></span>
          <span className="fi fis fi-us" onClick={changeLanguage("eng")}></span>
          <span className="fi fis fi-jp" onClick={changeLanguage("jpn")}></span>
        </HeaderLanguageWrapper>
      </HeaderContent>
    </HeaderWrapper>
  );
};

export default Header;
