import Link from "next/link"

import { Menu } from "@/icons"
import SearchIcon from "@/icons/Search"

export default async function MobileMenu() {
  return (
    <div className="grid grid-cols-3 justify-center items-center md:hidden fixed bottom-0 left-0 right-0 p-4 bg-blue-950 rounded-t-3xl">
      <MenuLink href="/fisk" />
      <MenuSearch />
      <MenuButton icon={<Menu />} />
    </div>
  )
}

function MenuSearch() {
  return (
    <div className="flex gap-1 group border-blue-600 p-2 rounded-2xl focus-within:rounded-none transition-all duration-1000 outline-none focus-within:border-blue-400 border-2">
      <SearchIcon />
      <input
        className="w-full bg-transparent placeholder:opacity-50"
        type="search"
        placeholder={"👷‍♂️🏗️"}
      />
    </div>
  )
}

function MenuLink({ href, icon }: { href: string; icon?: JSX.Element }) {
  return (
    <Link href={href} className="flex flex-col w-full items-center">
      {icon ? icon : <div className="w-6 h-6 animate-pulse bg-blue-300" />}
    </Link>
  )
}

function MenuButton({ onClick, icon }: { onClick?: () => void; icon?: JSX.Element }) {
  return (
    <div onClick={onClick} className="flex flex-col w-full items-center">
      {icon ? icon : <div className="w-6 h-6 animate-pulse bg-blue-300" />}
    </div>
  )
}
