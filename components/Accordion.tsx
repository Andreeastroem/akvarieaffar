"use client"

import { useState } from "react"

export default function QuickFacts({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const [isOpen, setOpen] = useState(false)

  return (
    <div className={`relative ${isOpen ? "h-fit" : "h-[100px]"} overflow-hidden`}>
      <div className={className}>{children}</div>
      <div
        className={`w-full p-2 flex justify-center items-center text-white text-2xl cursor-pointer transition-all ${
          isOpen ? "" : "bg-gradient-to-t from-gray-950 to-transparent bottom-0 absolute"
        }`}
        onClick={() => setOpen(!isOpen)}
      >
        {isOpen ? "☝️" : "👇"}
      </div>
    </div>
  )
}
