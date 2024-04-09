"use client";

import { redirect } from "next/navigation";

import { NotFoundWrapper } from "@/styles/404.style";

const NotFound = () => {
  return redirect("/working");
};

export default NotFound;
