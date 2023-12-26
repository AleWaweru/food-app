"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { CartContext } from "./appContext";
import {useContext, useState} from "react";
import ShoppingCart from "@/app/components/layout/icons/ShoppingCart";

const Header = () => {
  const session = useSession();
  const status = session?.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  const {cartProducts} = useContext(CartContext);
  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }

  return (
    <header className="flex text-center justify-between p-1">
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
        {status === "authenticated" && (
          <>
            <Link href="/profile" className="whitespace-nowrap">Hello, {userName}</Link>
            <button
              onClick={() => signOut()}
              className="bg-primary rounded-full text-white px-8 py-2"
            >
              Logout
            </button>
          </>
        )}
        {status === "unauthenticated" && (
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
        )}
       <Link href={'/cart'} className="relative">
            <ShoppingCart/> 
            <span className="absolute -top-2 -right-4 bg-primary text-white text-xs
            p-1 rounded-full leading-3">
            {cartProducts.length}
            </span>
          </Link>
      </nav>
    </header>
  );
};

export default Header;
