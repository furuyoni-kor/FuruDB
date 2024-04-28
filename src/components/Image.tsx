"use client";

import { forwardRef, useState, useCallback, useMemo, useEffect } from "react";
import Image from "next/image";
import _ from "lodash";

import { useStyleContext } from "@/context/style.context";

import type { ImgHTMLAttributes } from "react";

interface MediaQueryImageAttrs {
  width: number;
  height: number;
}

interface CustomImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  size: {
    pc: MediaQueryImageAttrs;
    laptop: MediaQueryImageAttrs;
    tablet: MediaQueryImageAttrs;
    mobile: MediaQueryImageAttrs;
  };
}

const CustomImage = forwardRef<HTMLImageElement, CustomImageProps>(
  (props, ref) => {
    const { widthState } = useStyleContext();

    return ref ? (
      <>
        <Image
          {...props}
          ref={ref}
          src={props.src as string}
          alt={props.alt as string}
          title={props.title}
          width={props.size[widthState].width || 0}
          height={props.size[widthState].height || 0}
          priority
        />
      </>
    ) : (
      <>
        <Image
          {...props}
          src={props.src as string}
          alt={props.alt as string}
          title={props.title}
          width={props.size[widthState].width || 0}
          height={props.size[widthState].height || 0}
          priority
        />
      </>
    );
  }
);

export default CustomImage;
