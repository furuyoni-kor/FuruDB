"use client";

import { useState, useEffect } from "react";
import { redirect } from "next/navigation";

import { useI18nContext } from "@/context/i18n.context";

import { searchCardByKeyword } from "@/services/card.service";

import { CardSearchWrapper } from "@/styles/card.style";

import type { NextPage } from "next";

const CardSearchPage: NextPage = () => {
  const I18n = useI18nContext();

  useEffect(() => {}, [I18n.language]);

  return redirect("/working");
};

export default CardSearchPage;
