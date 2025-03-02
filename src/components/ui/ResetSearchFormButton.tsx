"use client";
import Link from "next/link";
import React from "react";
import { Xmark } from "../icons";
import { usePathname } from "next/navigation";

export const ResetSearchFormButton = () => {
  const basePath = usePathname();
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
      <Link href={basePath}>
        <span className="sr-only">Reset form</span>
        <Xmark className="size-7 text-black" />
      </Link>
    </button>
  );
};

export default ResetSearchFormButton;
