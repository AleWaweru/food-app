import { useSession } from "next-auth/react";
import Link from "next/link"

const Header = () => {
  const session = useSession();
  console.log(session);
  return (
    <header className="flex text-center justify-between p-1">
    <nav className="flex gap-8 text-gray-500 items-center font-semibold">
    <Link className="text-primary font-semibold text-2xl" href="/">Hot Dishes</Link>
      <Link href={"/"}>Home</Link>
      <Link href={""}>Menu</Link>
      <Link href={""}>About</Link>
      <Link href={""}>Contact</Link>
    </nav>
    <nav className="flex gap-4 text-gray-500 items-center font-semibold">
    <Link href={"/login"} className="">Login</Link>
    <Link href={"/register"} className="bg-primary text-white rounded-full px-8 py-2">Register</Link>
    </nav>
  </header>
  )
}

export default Header;