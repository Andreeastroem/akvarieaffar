"use client"

import { useState } from "react"

export default function QuickFacts({
  children,
  className,
  style,
}: {
  children: React.ReactNode
  className?: string
  style: React.CSSProperties
}) {
  const [isOpen, setOpen] = useState(false)

  return (
    <div
      style={style}
      className={`relative ${isOpen ? "h-fit" : "h-[100px]"} overflow-hidden ${className}`}
    >
      <div>{children}</div>
      <div
        className={`w-full p-2 flex justify-center items-center text-white text-2xl cursor-pointer transition-all ${
          isOpen
            ? ""
            : "bg-gradient-to-t from-white to-transparent left-0 right-0 bottom-0 absolute"
        }`}
        onClick={() => setOpen(!isOpen)}
      >
        {isOpen ? "☝️" : "👇"}
      </div>
    </div>
  )
}
