"use client";

import { useCallback, useRef } from "react";
import Image from "next/image";

import { EASTEREGG_CHARCODE } from "@/constant/character";

import {
  CharacterListIconWrapper,
  CharacterListIconName,
  CharacterListIconNameWrapper,
} from "@/styles/character.style";

import type { FC } from "react";
import type { EngCharacterName } from "@/types/character.type";

interface CharacterIconProps {
  name: string;
  ename: EngCharacterName;
  charCode: number;
}

const CharacterIcon: FC<CharacterIconProps> = ({ name, ename, charCode }) => {
  const ICON = {
    width: 200,
    height: 200,
  };

  const iconRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const secondImageRef = useRef<HTMLImageElement | null>(null);

  const onMouseEnter = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (iconRef.current && iconRef.current.style.display === "none") {
      iconRef.current.style.display = "flex";
    }

    if (EASTEREGG_CHARCODE.includes(charCode)) {
      if (imageRef.current && secondImageRef.current) {
        imageRef.current.style.display = "none";
        secondImageRef.current.style.display = "block";
      }
    }
  }, []);

  const onMouseLeave = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (iconRef.current && iconRef.current.style.display === "flex") {
      iconRef.current.style.display = "none";
    }

    if (EASTEREGG_CHARCODE.includes(charCode)) {
      if (imageRef.current && secondImageRef.current) {
        secondImageRef.current.style.display = "none";
        imageRef.current.style.display = "block";
      }
    }
  }, []);

  return (
    <CharacterListIconWrapper>
      <Image
        ref={imageRef}
        alt={name}
        src={`/images/twit_icon/${charCode.toString().padStart(2, "0")}-O.webp`}
        title={name}
        width={ICON.width}
        height={ICON.height}
        priority={true}
        style={{
          display: "flex",
          borderRadius: 16,
        }}
        onMouseEnter={onMouseEnter}
      />
      {EASTEREGG_CHARCODE.includes(charCode) && (
        <Image
          ref={secondImageRef}
          alt={`${name}-B`}
          title={`${name}-B`}
          src={`/images/twit_icon/${charCode
            .toString()
            .padStart(2, "0")}-O-B.webp`}
          width={ICON.width}
          height={ICON.height}
          priority={true}
          style={{
            display: "none",
            borderRadius: 16,
          }}
          onMouseEnter={onMouseEnter}
        />
      )}
      <CharacterListIconNameWrapper
        ref={iconRef}
        style={{ display: "none" }}
        onMouseLeave={onMouseLeave}
      >
        <CharacterListIconName>{name}</CharacterListIconName>
      </CharacterListIconNameWrapper>
    </CharacterListIconWrapper>
  );
};

export default CharacterIcon;
