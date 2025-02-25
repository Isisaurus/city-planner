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
    <li
      className={`block py-2 px-3 ${isActive ? "text-black" : "text-black/60"}`}
    >
      <Link href={href}>
        <span>{label}</span>
      </Link>
    </li>
  );
};

export default NavLink;
