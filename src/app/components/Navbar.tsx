import Link from "next/link";
import React from "react";
import { auth, signIn, signOut } from "../../../auth";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-blue-500 shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href={"/"}>Logo here</Link>
        <div className="flex items-center gap-5">
          {session && session?.user ? (
            <>
              <span>{session.user.name}</span>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">
                  <span>Logout</span>
                </button>
              </form>
            </>
          ) : (
            <>
              <form
                action={async () => {
                  "use server";
                  await signIn("google");
                }}
              >
                <button type="submit">
                  <span>Login</span>
                </button>
              </form>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
