"use client";

import { useI18nContext } from "@/context/i18n.context";

import {
  FooterWrapper,
  FooterContent,
  FooterText,
} from "@/styles/footer.style";

import { Language } from "@/types/index.type";

import type { FC } from "react";

const Footer: FC = () => {
  const I18n = useI18nContext();

  const renderRuleText = (lang: Language) => {
    switch (lang) {
      case "kor":
        return (
          <FooterText>
            ※ 본 사이트는 에셋 사용을 위해 다음{" "}
            <a
              href="https://main-bakafire.ssl-lolipop.jp/furuyoni/na/rule.html"
              target="_blank"
            >
              사용규칙
            </a>
            을 준수합니다.
          </FooterText>
        );

      case "eng":
        return (
          <FooterText>
            ※ This website is following{" "}
            <a
              href="https://main-bakafire.ssl-lolipop.jp/furuyoni/na/rule.html"
              target="_blank"
            >
              rules
            </a>{" "}
            for using assets.
          </FooterText>
        );

      case "jpn":
        return (
          <FooterText>
            ※ このサイトはコモンズ使用のために次の
            <a
              href="https://main-bakafire.ssl-lolipop.jp/furuyoni/na/rule.html"
              target="_blank"
            >
              利用規約
            </a>
            を遵守します。
          </FooterText>
        );
    }
  };

  return (
    <FooterWrapper>
      <FooterContent>
        <FooterText>{I18n.t("footer.footerTopText")}</FooterText>
        {renderRuleText(I18n.language)}
        <FooterText>
          Developed by{" "}
          <a href="https://github.com/winters0727" target="_blank">
            Winters
          </a>
          .
        </FooterText>
        <FooterText>
          Copyright 2018-{new Date().getFullYear()}.{" "}
          <a href="https://bakafire.main.jp/top.html" target="_blank">
            BakaFire Party
          </a>
          ,
          <a href="https://xel.skr.jp/tokiame/" target="_blank">
            TOKIAME
          </a>{" "}
          All rights reserved.
        </FooterText>
      </FooterContent>
    </FooterWrapper>
  );
};

export default Footer;
