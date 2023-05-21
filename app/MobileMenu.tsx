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
    <div className="grid grid-cols-3 -mx-3 -mb-3 justify-center items-center md:hidden sticky bottom-0 left-0 right-0 p-4 bg-blue-950 rounded-t-3xl">
      <MenuLink href="/fisk" />
      <MenuSearch />
      <MenuButton
        icon={<Menu />}
        onClick={() => {
          setIsOpen(true)
        }}
      />
      <MobileMenuLayout setOpen={setIsOpen} isOpen={isOpen} />
      <MobileMenuOverlay isOpen={isOpen} setOpen={setIsOpen} />
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
        isOpen ? "top-[20%]" : "top-full"
      }`}
    >
      <div className="grid grid-cols-2 gap-3">
        <MobileMenuCategory
          color="bg-blue-400"
          hoverColor="hover:bg-blue-400/75"
          title="Fisk"
          href="/fisk"
          onClick={closeMenu}
        />
        <MobileMenuCategory
          color="bg-blue-300"
          hoverColor="hover:bg-blue-300/75"
          title="Fisk"
          href="/fisk"
          onClick={closeMenu}
        />
        <MobileMenuCategory
          color="bg-blue-300"
          hoverColor="hover:bg-blue-300/75"
          title="Fisk"
          href="/fisk"
          onClick={closeMenu}
        />
        <MobileMenuCategory
          color="bg-blue-400"
          hoverColor="hover:bg-blue-400/75"
          title="Fisk"
          href="/fisk"
          onClick={closeMenu}
        />
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
  hoverColor,
  title,
  href,
  onClick,
}: {
  color: string
  hoverColor: string
  title: string
  href: string
  onClick: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${color} ${hoverColor} active:rounded-3xl rounded-2xl p-3 min-h-[150px] transition-all duration-1000 hover:rounded-none`}
    >
      <h3 className="text-blue-950 font-bold text-2xl">{title}</h3>
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
