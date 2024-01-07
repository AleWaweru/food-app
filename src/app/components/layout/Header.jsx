"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { CartContext } from "./appContext";
import { useContext, useState } from "react";
import ShoppingCart from "@/app/components/layout/icons/ShoppingCart";
import Hamb from "./icons/hamb";

const Header = () => {
  const session = useSession();
  const status = session?.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  const { cartProducts } = useContext(CartContext);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }

  function AuthLinks({ status, userName }) {
    if (status === "authenticated") {
      return (
        <>
          <Link href="/profile" className="whitespace-nowrap">
            Hello, {userName}
          </Link>
          <button
            onClick={() => signOut()}
            className="bg-primary rounded-full text-white px-8 py-2"
          >
            Logout
          </button>
        </>
      );
    }

    if (status === "unauthenticated") {
      return (
        <>
          <Link href={"/login"} className="">
            Login
          </Link>
          <Link
            href={"/register"}
            className="bg-primary text-white rounded-full px-8 py-2"
          >
            Register
          </Link>
        </>
      );
    }
  }

  return (
    <header>
      <div className="flex items-center md:hidden justify-between">
        <Link className="text-primary font-semibold text-2xl" href="/">
          Hot Dishes
        </Link>

        <div className="flex gap-6 items-center">
          <Link href={"/cart"} className="relative mt-3">
            <ShoppingCart />

            {cartProducts.length > 0 && (
              <span
                className="absolute -top-2 -right-4 bg-primary text-white text-xs
               py-1 px-1 rounded-full leading-3"
              >
                {cartProducts.length}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMobileNavOpen((prev) => !prev)}
            className="p-1 border-none"
          >
            <Hamb />
          </button>
        </div>
      </div>
      {mobileNavOpen && (
        <div
        onClick={() => setMobileNavOpen(false)}
        className="md:hidden p-4 bg-gray-200 rounded-lg mt-2 flex flex-col gap-2 text-center">
          <Link href={"/"}>Home</Link>
          <Link href={"/menu"}>Menu</Link>
          <Link href={"/#about"}>About</Link>
          <Link href={"/#contact"}>Contact</Link>
          <AuthLinks status={status} userName={userName} />
        </div>
      )}

      <div className="hidden md:flex text-center justify-between">
        <nav className="flex gap-8 text-gray-500 items-center font-semibold">
          <Link className="text-primary font-semibold text-2xl" href="/">
            Hot Dishes
          </Link>
          <Link href={"/"}>Home</Link>
          <Link href={"/menu"}>Menu</Link>
          <Link href={"/#about"}>About</Link>
          <Link href={"/#contact"}>Contact</Link>
        </nav>
        <nav className="flex gap-4 text-gray-500 items-center font-semibold">
          <AuthLinks status={status} userName={userName} />

          <Link href={"/cart"} className="relative">
            <ShoppingCart />

            {cartProducts.length > 0 && (
              <span
                className="absolute -top-2 -right-4 bg-primary text-white text-xs
              py-1 px-1 rounded-full leading-3"
              >
                {cartProducts.length}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
