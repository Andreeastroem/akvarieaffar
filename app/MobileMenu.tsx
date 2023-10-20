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
          setIsOpen(true)
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
      <div className="border-l group-hover:to-blue-300/25 border-solid border-black w-2 rounded-l-full bg-gradient-to-r from-blue-50/25 to-blue-100/25" />
      <div className="whitespace-nowrap bg-blue-100/25 group-hover:bg-blue-300/25 group-active:border-t group-active:border-black">
        {title}
      </div>
      <div className="border-r group-hover:to-blue-300/25 border-solid border-black w-2 rounded-r-full bg-gradient-to-l from-blue-50/25 to-blue-100/25" />
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

function MenuLink({ href, icon }: { href: string; icon?: JSX.Element }) {
  return (
    <Link href={href} className="flex flex-col w-full items-center">
      {icon ? icon : <div className="w-10 h-10 animate-pulse bg-blue-300" />}
    </Link>
  )
}

function MenuButton({ onClick, icon }: { onClick?: () => void; icon?: JSX.Element }) {
  return (
    <div onClick={onClick} className="flex flex-col w-full items-center cursor-pointer">
      {icon ? icon : <div className="w-6 h-6 animate-pulse bg-blue-300" />}
    </div>
  )
}

function MobileMenuLayout({
  setOpen,
  isOpen,
}: {
  isOpen: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const closeMenu = () => setOpen(false)
  return (
    <div
      className={`fixed z-10 transition-all duration-1000 bottom-0 left-0 right-0 bg-blue-800/75 rounded-t-3xl overflow-y-scroll overflow-x-hidden p-4 grid gap-5 ${
        isOpen ? "top-[15%]" : "top-full"
      }`}
    >
      <div className="grid grid-cols-2 gap-3">
        <MobileMenuCategory color="bg-blue-400" title="Fisk" href="/fisk" onClick={closeMenu} />
        <MobileMenuCategory
          color="bg-blue-300"
          title="Artiklar"
          href="/artiklar"
          onClick={closeMenu}
        />
        <MobileMenuCategory color="bg-blue-300" title="Fisk" href="/fisk" onClick={closeMenu} />
        <MobileMenuCategory color="bg-blue-400" title="Fisk" href="/fisk" onClick={closeMenu} />
      </div>
      <ul className="grid gap-2">
        <li>
          <MobileMenuLink title="Om affären" href="/om-affaren" onClick={closeMenu} />
        </li>
        <li>
          <MobileMenuLink title="Kontakt" href="/kontakt" onClick={closeMenu} />
        </li>
        <li>
          <MobileMenuLink title="Populära fiskar" href="/fisk/popular" onClick={closeMenu} />
        </li>
      </ul>
    </div>
  )
}

function MobileMenuOverlay({
  isOpen,
  setOpen,
}: {
  isOpen: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  return (
    <div
      onClick={() => setOpen(false)}
      className={`fixed transition-all duration-1000 bottom-0 left-0 right-0 bg-blue-500/75  overflow-y-scroll overflow-x-hidden grid gap-5 ${
        isOpen ? "top-0" : "top-full"
      }`}
    />
  )
}

function MobileMenuCategory({
  color,
  title,
  href,
  onClick,
}: {
  color: string
  title: string
  href: string
  onClick: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${color} p-3 aspect-square transition-all duration-1000`}
    >
      <h3 className=" font-bold text-2xl">{title}</h3>
    </Link>
  )
}

function MobileMenuLink({
  title,
  href,
  onClick,
}: {
  title: string
  href: string
  onClick: () => void
}) {
  return (
    <Link
      onClick={onClick}
      className="w-full inline-block border border-solid border-blue-500 p-3 rounded-lg hover:rounded-none bg-blue-500 hover:bg-blue-500/25 transition-all duration-1000"
      href={href}
    >
      {title}
    </Link>
  )
}
