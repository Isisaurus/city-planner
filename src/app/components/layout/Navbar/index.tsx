import Link from "next/link";
import { auth, signOut } from "../../../../../auth";
import { UserDropdown } from "@/app/components/ui";

const headerLinksArr: { label: string; location: string }[] = [
  {
    label: "Home",
    location: "/",
  },
  {
    label: "News",
    location: "/news",
  },
  {
    label: "Projects",
    location: "/projects",
  },
  {
    label: "City Card",
    location: "/city-card",
  },
];
export async function Navbar() {
  const session = await auth();

  const handleLogout = async () => {
    "use server";

    await signOut({ redirectTo: "/" });
  };

  return (
    <header className="px-5 py-3 shadow-sm">
      <nav className="bg-white border-gray-200 max-w-screen-xl flex flex-wrap items-center justify-between mx-auto relative">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap ">
            City Planner
          </span>
        </Link>

        <ul className="flex-1 mx-auto flex items-center justify-center font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white md:">
          {headerLinksArr.map((navLink) => (
            <li
              key={navLink.label}
              className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0"
              aria-current="page"
            >
              <Link href={navLink.location}>
                <span>{navLink.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        {session && session?.user ? (
          <UserDropdown handleLogout={handleLogout} user={session.user} />
        ) : (
          <Link href={"/login"}>Login</Link>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
