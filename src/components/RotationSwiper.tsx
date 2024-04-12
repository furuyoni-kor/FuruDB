"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  EmptyContent,
  RotationName,
  RotationWrapper,
  SwiperWrapper,
} from "@/styles/swiper.style";

import type { FC, UIEvent } from "react";
import type { CharacterName, EngCharacterName } from "@/types/character.type";

interface RotationSwiperProps {
  characters: EngCharacterName[];
  rotation: CharacterName[];
  engRotation: EngCharacterName[];
}

const RotationSwiper: FC<RotationSwiperProps> = ({
  rotation,
  engRotation,
  characters,
}) => {
  const ICON = {
    width: 152,
    height: 152,
  };
  const PER_ICON = 5;
  const SWIPER_TIME = 3000;

  const swiperRef = useRef<HTMLDivElement | null>(null);

  const padIndex = (num: number) => num.toString().padStart(2, "0");

  const onScroll = (e: React.UIEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    if (swiperRef.current) {
      const swiper = swiperRef.current;
      const swiperWidth = swiper.clientWidth;
      const maxSwiperWidth = swiper.scrollWidth;

      const maxIndex = maxSwiperWidth / swiperWidth;

      let swiperIndex = 0;

      const intervalId = setInterval(() => {
        swiper.scrollTo({
          left: (++swiperIndex % maxIndex) * swiperWidth,
        });
      }, SWIPER_TIME);

      return () => clearInterval(intervalId);
    }
  }, []);

  return (
    <SwiperWrapper ref={swiperRef} onScroll={onScroll}>
      {engRotation.map((name, index) => (
        <Link key={`swiper-${name}`} href={`/character/${name}`}>
          <RotationWrapper>
            <Image
              alt={name}
              src={`/images/twit_icon/${padIndex(
                characters.indexOf(name) + 1
              )}-O.webp`}
              width={ICON.width}
              height={ICON.height}
              title={name}
              priority={true}
              style={{ borderRadius: 16 }}
            />
            <RotationName>{rotation[index]}</RotationName>
          </RotationWrapper>
        </Link>
      ))}
      {rotation.length % PER_ICON &&
        Array({ length: rotation.length % PER_ICON })
          .fill("")
          .map((_, index) => (
            <RotationWrapper key={`swiper-empty-area-${index}`}>
              <EmptyContent style={{ width: ICON.width }} />
            </RotationWrapper>
          ))}
    </SwiperWrapper>
  );
};

export default RotationSwiper;
