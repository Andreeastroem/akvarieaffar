"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

import { Menu } from "@/icons"
import SearchIcon from "@/icons/Search"

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  return (
    <div
      className={`grid grid-cols-3 text-gray-200 justify-center items-center md:hidden bottom-0 left-0 right-0 p-4 bg-blue-500 sticky`}
    >
      {/* <MenuLink href="/fisk" icon={<FishIcon width={40} height={40} color="text-white" />} /> */}
      <MenuSearch className="col-span-2" />
      <MenuButton
        icon={<Menu />}
        onClick={() => {
          setIsOpen((prev) => !prev)
        }}
      />
      {isOpen && (
        <div className="bottom-full absolute w-full flex gap-4 bg-blue-400 p-4 overflow-x-scroll">
          <MenuPill href="/fisk" title="Fisk" />
          <MenuPill href="/artiklar" title="Artiklar" />
          <MenuPill href="/om-affaren" title="Om affären" />
          <MenuPill href="/kontakt" title="Kontakt" />
        </div>
      )}
      {/* <MobileMenuLayout setOpen={setIsOpen} isOpen={isOpen} />
      <MobileMenuOverlay isOpen={isOpen} setOpen={setIsOpen} /> */}
    </div>
  )
}

function MenuPill({ href, title }: { href: string; title: string }) {
  return (
    <Link className="flex group" href={href}>
      <div className="border-l group-hover:to-blue-300/25 border-solid border-black w-2 rounded-l-full bg-gradient-to-r from-blue-950/25 to-blue-500/25" />
      <div className="whitespace-nowrap bg-blue-500/25 group-hover:bg-blue-300/25 group-active:border-t group-active:border-black">
        {title}
      </div>
      <div className="border-r group-hover:to-blue-300/25 border-solid border-black w-2 rounded-r-full bg-gradient-to-l from-blue-950/25 to-blue-500/25" />
    </Link>
  )
}

function MenuSearch({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex gap-1 group p-2 hover:rounded-3xl focus-within:rounded-3xl transition-all duration-1000 outline-none bg-blue-50 text-blue-950 ${className}`}
    >
      <SearchIcon />
      <input
        className="w-full bg-transparent placeholder:opacity-50"
        type="search"
        placeholder={"👷‍♂️"}
      />
    </div>
  )
}

function MenuButton({ onClick, icon }: { onClick?: () => void; icon?: JSX.Element }) {
  return (
    <div onClick={onClick} className="flex flex-col w-full items-center cursor-pointer">
      {icon ? icon : <div className="w-6 h-6 animate-pulse bg-blue-300" />}
    </div>
  )
}
