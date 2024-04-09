import { EXCEPTION_CHARACTER } from "@/constant/card";

export const convertCodeToImage = (code: string) => {
  const splitedCode = code.split("-");

  const [charCode, character, cardCode] = [
    splitedCode[1],
    splitedCode[2],
    splitedCode.slice(3, splitedCode.length),
  ];

  return EXCEPTION_CHARACTER.includes(character)
    ? [charCode, character, ...cardCode].join("-")
    : [charCode, ...cardCode].join("-");
};
