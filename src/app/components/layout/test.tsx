// "use client";
// import Link from "next/link";
// import React, { useState } from "react";
// import { auth, signIn, signOut } from "../../../auth";

// const Navbar = () => {
//   const headerLinksArr: { label: string; location: string }[] = [
//     {
//       label: "Home",
//       location: "/",
//     },
//     {
//       label: "News",
//       location: "/news",
//     },
//     {
//       label: "Projects",
//       location: "/projects",
//     },
//     {
//       label: "City Card",
//       location: "/city-card",
//     },
//   ];

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
//   const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

//   return (
//     // <header className="px-5 py-3 bg-blue-500 shadow-sm font-work-sans">
//     //   <nav className="flex justify-between items-center">
//     //     <Link href={"/"}>Logo here</Link>
//     //     <div className="flex items-center gap-5">
//     //       {session && session?.user ? (
//     //         <>
//     //           <span>{session.user.name}</span>
//     //           <form
//     //             action={async () => {
//     //               "use server";
//     //               await signOut({ redirectTo: "/" });
//     //             }}
//     //           >
//     //             <button type="submit">
//     //               <span>Logout</span>
//     //             </button>
//     //           </form>
//     //         </>
//     //       ) : (
//     //         <>
//     //           <form
//     //             action={async () => {
//     //               "use server";
//     //               await signIn("google");
//     //             }}
//     //           >
//     //             <button type="submit">
//     //               <span>Login</span>
//     //             </button>
//     //           </form>
//     //         </>
//     //       )}
//     //     </div>
//     //   </nav>
//     // </header>
//     <header className="px-5 py-3 shadow-sm">
//       <nav className="bg-white border-gray-200 max-w-screen-xl flex flex-wrap items-center justify-between mx-auto ">
//         <Link
//           href="/"
//           className="flex items-center space-x-3 rtl:space-x-reverse"
//         >
//           <span className="self-center text-2xl font-semibold whitespace-nowrap ">
//             City Planner
//           </span>
//         </Link>
//         <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
//           <button
//             type="button"
//             className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 "
//             onClick={toggleDropdown}
//             aria-expanded={isDropdownOpen}
//           >
//             <span className="sr-only">Open user menu</span>
//             <div className="w-8 h-8 rounded-full bg-gray-500"></div>
//           </button>
//           {isDropdownOpen && (
//             <div className="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm ">
//               <div className="px-4 py-3">
//                 <span className="block text-sm text-gray-900 ">
//                   Bonnie Green
//                 </span>
//                 <span className="block text-sm text-gray-500 truncate ">
//                   name@flowbite.com
//                 </span>
//               </div>
//               <ul className="py-2">
//                 <li>
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
//                   >
//                     Dashboard
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
//                   >
//                     Settings
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
//                   >
//                     Earnings
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
//                   >
//                     Sign out
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           )}
//           <button
//             onClick={toggleMenu}
//             type="button"
//             className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
//           >
//             <span className="sr-only">Open main menu</span>
//             <svg
//               className="w-5 h-5"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 17 14"
//             >
//               <path
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M1 1h15M1 7h15M1 13h15"
//               />
//             </svg>
//           </button>
//         </div>
//         <div
//           className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMenuOpen ? "block" : "hidden"}`}
//           id="navbar-user"
//         >
//           <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white md:">
//             {headerLinksArr.map((navLink) => (
//               <li
//                 key={navLink.label}
//                 className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0"
//                 aria-current="page"
//               >
//                 <Link href={navLink.location}>
//                   <span>{navLink.label}</span>
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Navbar;
