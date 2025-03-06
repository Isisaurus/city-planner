"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export const NavLink = ({
  navItem,
}: {
  navItem: { label: string; href: string };
}) => {
  const { label, href } = navItem;

  const isActive = usePathname() === href;

  return (
    <li className="flex">
      <Link
        href={href}
        className={`block ${isActive ? "text-black font-semibold" : "text-black/60"} hover:text-black/80 hover:bg-gray-100 rounded-xl transition-all ease-in flex items-center justify-center flex-1 h-full py-2 px-3`}
      >
        <span>{label}</span>
      </Link>
    </li>
  );
};

export default NavLink;
