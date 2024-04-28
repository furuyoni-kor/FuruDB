"use client";

import { createContext, useContext, useState, useMemo, useEffect } from "react";
import _ from "lodash";

import type { FC } from "react";

export type WidthState = "mobile" | "tablet" | "laptop" | "pc";

interface StyleContext {
  innerWidth: number;
  widthState: WidthState;
}
const StyleContext = createContext<StyleContext>({
  innerWidth: 0,
  widthState: "pc",
});

export const StyleProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const DEBOUNCE_TIME = 500;

  const [innerWidth, setInnerWidth] = useState(0);

  const widthState = useMemo<WidthState>(() => {
    if (innerWidth > 1279) return "pc";
    if (innerWidth > 991) return "laptop";
    if (innerWidth > 767) return "tablet";
    // if (innerWidth > 575) return 'mobile';

    return "mobile";
  }, [innerWidth]);

  const onResize = _.debounce(() => {
    const innerWidth = window.innerWidth;
    setInnerWidth(innerWidth);
  }, DEBOUNCE_TIME);

  useEffect(() => {
    const currentInnerWidth = window.innerWidth;
    setInnerWidth(currentInnerWidth);

    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <StyleContext.Provider value={{ innerWidth, widthState }}>
      {children}
    </StyleContext.Provider>
  );
};

export const useStyleContext = () => useContext(StyleContext);
