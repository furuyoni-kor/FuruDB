"use client";

import { redirect } from "next/navigation";

const NotFound = () => {
  return redirect("/working");
};

export default NotFound;
