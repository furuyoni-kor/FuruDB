"use client";

import { useRef, useEffect } from "react";

import { useI18nContext } from "@/context/i18n.context";

import {
  WorkingImage,
  WorkingPageWrapper,
  WorkingText,
} from "@/styles/working.style";

import type { NextPage } from "next";

const WorkingPage: NextPage = () => {
  const classList = ["move-left", "work-left", "move-right", "work-right"];

  const I18n = useI18nContext();

  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    let classIndex = 0;

    const intervalId = setInterval(() => {
      if (imageRef.current) {
        const image = imageRef.current;

        const prevClass = classList[classIndex];
        if (classIndex === classList.length - 1) classIndex = -1;
        const nextClass = classList[++classIndex];

        image.classList.remove(prevClass);
        image.classList.add(nextClass);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <WorkingPageWrapper>
      <WorkingImage
        ref={imageRef}
        alt="hagane-chibi"
        title="working"
        className="moveLeft"
        src="/images/chibi/hagane.webp"
        style={{
          transform: "scaleX(-1) translateX(-500px)",
        }}
      />
      {(I18n.t("error.work") as string).split("\r\n").map((text) => (
        <WorkingText>{text}</WorkingText>
      ))}
    </WorkingPageWrapper>
  );
};

export default WorkingPage;
