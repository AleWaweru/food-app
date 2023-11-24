import Link from "next/link";

export default function Home() {
  return (
    <>
    <header className="flex text-center justify-between p-1">
      <Link className="text-primary font-semibold text-2xl" href="">Hot Dishes</Link>

      <nav className="flex gap-5 text-gray-400 items-center font-semibold">
        <Link href={""}>Home</Link>
        <Link href={""}>Menu</Link>
        <Link href={""}>About</Link>
        <Link href={""}>Contact</Link>
        <Link href={""} className="bg-primary text-white px-4 py-2">Login</Link>
      </nav>
    </header>
    </>
  );
}
