import Link from "next/link";
import { auth, signOut } from "@/../auth";
import { UserDropdown, NavLink, BurgerMenu } from "@/components/ui";
import { ArrowRight } from "@/components/icons";

export async function Navbar() {
  const session = await auth();
  const navItems: { label: string; href: string }[] = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "City Card",
      href: "/city-card",
    },
  ];

  const handleLogout = async () => {
    "use server";

    await signOut({ redirectTo: "/" });
  };

  return (
    <header className="px-2">
      <nav className="container flex items-center gap-2 px-4 py-2 my-2 rounded-full bg-white shadow-md relative">
        <Link href="/" className="flex items-center gap-1">
          <span className="bg-black text-white rounded-full w-9 h-9 flex items-center justify-center">
            CP
          </span>
          <span className="font-bold">City Planner</span>
        </Link>
        <ul className="font-medium flex-1 justify-center invisible hidden md:flex md:visible">
          {navItems.map((navItem) => (
            <NavLink navItem={navItem} key={navItem.label} />
          ))}
        </ul>
        <div className="flex gap-2 ml-auto md:ml-0 items-center">
          {session && session?.user ? (
            <UserDropdown handleLogout={handleLogout} user={session.user} />
          ) : (
            <Link
              href={"/login"}
              className="button flex items-center justify-center gap-2"
            >
              <span>Sign in</span>
              <span className="bg-white rounded-full p-1">
                <ArrowRight className="size-5 text-black" />
              </span>
            </Link>
          )}
          <BurgerMenu navItems={navItems} />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
