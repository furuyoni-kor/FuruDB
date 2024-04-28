"use client";

import { useCallback, useRef } from "react";

import CustomImage from "@/components/Image";

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
    pc: {
      width: 200,
      height: 200,
    },
    laptop: {
      width: 150,
      height: 150,
    },
    tablet: {
      width: 130,
      height: 130,
    },
    mobile: {
      width: 100,
      height: 100,
    },
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
      <CustomImage
        ref={imageRef}
        alt={name}
        src={`/images/twit_icon/${charCode.toString().padStart(2, "0")}-O.webp`}
        title={name}
        size={ICON}
        style={{
          borderRadius: 16,
        }}
        onMouseEnter={onMouseEnter}
      />
      {/* <Image
        ref={imageRef}
        alt={name}
        src={`/images/twit_icon/${charCode.toString().padStart(2, "0")}-O.webp`}
        title={name}
        width={ICON.pc.width}
        height={ICON.pc.height}
        priority={true}
        style={{
          display: "flex",
          borderRadius: 16,
        }}
        onMouseEnter={onMouseEnter}
      /> */}
      {EASTEREGG_CHARCODE.includes(charCode) && (
        <CustomImage
          ref={secondImageRef}
          alt={`${name}-B`}
          title={`${name}-B`}
          src={`/images/twit_icon/${charCode
            .toString()
            .padStart(2, "0")}-O-B.webp`}
          size={ICON}
          style={{
            display: "none",
            borderRadius: 16,
          }}
          onMouseEnter={onMouseEnter}
        />
        // <Image
        //   ref={secondImageRef}
        //   alt={`${name}-B`}
        //   title={`${name}-B`}
        //   src={`/images/twit_icon/${charCode
        //     .toString()
        //     .padStart(2, "0")}-O-B.webp`}
        //   width={ICON.pc.width}
        //   height={ICON.pc.height}
        //   priority={true}
        //   style={{
        //     display: "none",
        //     borderRadius: 16,
        //   }}
        //   onMouseEnter={onMouseEnter}
        // />
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
