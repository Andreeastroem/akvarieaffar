"use client"
import { ChevronUp as ChevronUpIcon } from "icons"
import { useEffect, useState } from "react"

type Props = {
  children: React.ReactNode
  direction?: "tl" | "tr" | "bl" | "br"
  className?: string
}

export default function Notification({ children, className = "", direction = "tr" }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const directionClassname = getDirectionClassname(direction)

  useEffect(() => {
    if (isOpen) {
      lockScroll()
    } else {
      unlockScroll()
    }
  })

  return (
    <>
      <div
        className={`${isOpen ? "fixed" : "hidden"} left-0 top-0 right-0 bottom-0 bg-blue-500/25`}
        onClick={() => {
          setIsOpen(false)
        }}
      />
      <div className={`md:fixed ${directionClassname} ${className}`}>
        <div
          className={`absolute hidden md:block -translate-x-[110%] ${
            isOpen ? "rotate-90 left-0" : "-rotate-90 left-full"
          } top-[50%] bg-white rounded-full p-1 transition-all duration-1000 border border-gray-300 cursor-pointer hover:bg-gray-100 transform-gpu hover:tran`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <ChevronUpIcon width={24} height={24} />
        </div>
        <div
          className={`transition-all duration-1000 w-full opacity-100 ${
            isOpen ? "md:translate-x-0 md:opacity-100" : "md:translate-x-full md:opacity-0"
          }`}
        >
          {children}
        </div>
      </div>
    </>
  )
}

function lockScroll() {
  document.body.style.overflow = "hidden"
}
function unlockScroll() {
  document.body.style.overflow = "auto"
}

function getDirectionClassname(direction: Props["direction"]) {
  switch (direction) {
    case "tl":
      return "top-48 left-0"
    case "tr":
      return "top-48 right-3"
    case "bl":
      return "bottom-48 left-0"
    case "br":
      return "bottom-48 right-0"
  }
}
