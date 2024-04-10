import { https } from "./https";

import { DEFAULT_LANG } from "@/constant";

import { createQueryString } from "@/utils/service.util";

import type { Language, Rotation } from "@/types/index.type";
import type { Response } from "@/types/service.type";

export const getRecentRotation = async (options: { lang: Language }) => {
  const { lang } = options;

  const queryString = createQueryString([["lang", lang || DEFAULT_LANG]]);

  const response = await https.get<Response<Rotation>>(
    `/rotation/recent?${queryString}`
  );

  return response;
};
