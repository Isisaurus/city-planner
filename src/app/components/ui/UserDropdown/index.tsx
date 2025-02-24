"use client";

import { User } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface UserDropdownProps {
  handleLogout: () => void;
  user: User;
}

export function UserDropdown({ handleLogout, user }: UserDropdownProps) {
  const [isActive, setIsActive] = useState(false);

  const toggleDropdown = () => {
    setIsActive((prev) => !prev);
  };

  const userDropdownLinks = [
    {
      label: "Profile",
      location: `/profile/${user.id}`,
    },
    {
      label: "Votes",
      location: `/${user.id}/votes`,
    },
    {
      label: "Submissions",
      location: `/${user.id}/projects`,
    },
    {
      label: "Saves",
      location: `/${user.id}/saves`,
    },
  ];
  const imageUrl = user.image;

  return (
    <div>
      <button
        type="button"
        className="flex text-sm rounded-full md:me-0 focus:ring-4 focus:ring-gray-300"
        id="user-menu-button"
        aria-expanded={isActive}
        data-dropdown-toggle="user-dropdown"
        data-dropdown-placement="bottom"
        onClick={toggleDropdown}
      >
        <span className="sr-only">Open user menu</span>
        {user.image ? (
          <Image
            className="w-8 h-8 rounded-full shadow-sm"
            src={imageUrl || ""}
            width={32}
            height={32}
            alt="user image"
          ></Image>
        ) : (
          <span className="w-8 h-8 shadow-md bg-gray-400"></span>
        )}
      </button>
      <div
        className={`absolute right-0 top-12 grid transition-all duration-300 ease-in-out overflow-hidden ${
          isActive
            ? "grid-rows-[1fr] opacity-100 z-50"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="bg-white divide-y divide-gray-100 rounded-lg shadow-sm border-gray-200 m-1">
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900">{user.name}</span>
              <span className="block text-sm  text-gray-500 truncate">
                {user.email}
              </span>
              <form className="my-3" action={handleLogout}>
                <button type="submit">Logout</button>
              </form>
            </div>
            <ul className="text-base list-none py-3 flex flex-col gap-4">
              {userDropdownLinks.map((linkItem) => (
                <li key={linkItem.label}>
                  <Link
                    href={linkItem.location}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {linkItem.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDropdown;
