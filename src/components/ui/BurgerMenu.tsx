"use client";
import React, { useState, useEffect, useRef } from "react";
import BarsArrowDown from "../icons/BarsArrowDown";
import { BarsArrowUp } from "../icons";
import NavLink from "./NavLink";
import { usePathname } from "next/navigation";

export const BurgerMenu = ({
  navItems,
}: {
  navItems: { label: string; href: string }[];
}) => {
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => {
    setIsActive((prev) => !prev);
  };
  const burgerButtonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const path = usePathname();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        burgerButtonRef.current &&
        menuRef.current &&
        !burgerButtonRef.current.contains(event.target as Node) &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsActive(false);
      } else {
        return;
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsActive(false);
  }, [path]);

  return (
    <>
      <button
        className="block visible md:invisible md:hidden m-2"
        onClick={handleClick}
        type="button"
        ref={burgerButtonRef}
      >
        <span className="text-black relative">
          <BarsArrowDown
            className={`${isActive ? "opacity-0" : "animate-fade-down opacity-100"} h-7 w-7 relative`}
          />
          <BarsArrowUp
            className={`${isActive ? "animate-fade-up opacity-100" : "opacity-0"} absolute top-0 h-7 w-7
            `}
          />
        </span>
      </button>
      <div
        ref={menuRef}
        className={`max-w-screen-xl w-full absolute right-0 top-16 grid transition-all duration-300 ease-in-out overflow-hidden bg-white ${
          isActive
            ? "grid-rows-[1fr] opacity-100 z-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="rounded-lg shadow-sm border-gray-200 m-1">
            <ul className=" text-base list-none py-3 flex flex-col gap-4">
              {navItems.map((navItem) => (
                <NavLink key={navItem.label} navItem={navItem} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default BurgerMenu;
