"use client";
import Link from "next/link";
import React from "react";
import { Xmark } from "../icons";

export const ResetSearchFormButton = () => {
  const handleResetForm = () => {
    const form = document.getElementById("search-form") as HTMLFormElement;
    if (form) form.reset();
  };
  return (
    <button
      type="reset"
      onClick={handleResetForm}
      className="border-2 border-black flex items-center justify-center p-1 rounded-full"
    >
      <Link href={window.location.pathname}>
        <span className="sr-only">Reset form</span>
        <Xmark className="size-7 text-black" />
      </Link>
    </button>
  );
};

export default ResetSearchFormButton;
