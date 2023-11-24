import React from 'react'
import Link from "next/link"

const Header = () => {
  return (
    <header className="flex text-center justify-between p-1">
    <Link className="text-primary font-semibold text-2xl" href="">Hot Dishes</Link>

    <nav className="flex gap-8 text-gray-500 items-center font-semibold">
      <Link href={""}>Home</Link>
      <Link href={""}>Menu</Link>
      <Link href={""}>About</Link>
      <Link href={""}>Contact</Link>
      <Link href={""} className="bg-primary text-white rounded-full px-8 py-2">Login</Link>
    </nav>
  </header>
  )
}

export default Header;