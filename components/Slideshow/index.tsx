"use client"

import Image from "next/image"
import { useState } from "react"

import { ChevronUp } from "@/icons"
import { DatoImage } from "@/lib/cms/types"

export default function Slideshow({ images }: { images: Array<DatoImage> }) {
  const [shownImageIndex, setShownImageIndex] = useState(0)
  if (images.length === 0) return null
  const hasLeftImage = shownImageIndex > 0
  const hasRightImage = shownImageIndex < images.length - 1
  return (
    <>
      <div className="relative w-full aspect-video overflow-hidden">
        {images.map((image, idx) => {
          return (
            <Image
              key={idx}
              src={image.responsiveImage.src}
              alt={image.alt}
              sizes={image.responsiveImage.sizes}
              fill
              style={{
                transform: `translateX(${100 * (idx - shownImageIndex)}%)`,
              }}
              className={`transition-transform duration-1000`}
            />
          )
        })}
        <div className="text-white flex z-20 absolute top-0 bottom-0 left-0 right-0 md:px-3">
          <div
            className={`w-1/2 flex items-center h-full text-white ${
              hasLeftImage && "hover:cursor-pointer"
            } group`}
            onClick={() => {
              setShownImageIndex((prev) => {
                if (prev === 0) return prev
                return prev - 1
              })
            }}
          >
            {hasLeftImage && (
              <ChevronUp className="-rotate-90 group-hover:scale-125 transition-all md:w-12 md:h-12 rounded-full md:p-2 group-hover:bg-gray-50/25" />
            )}
          </div>
          <div
            className={`w-1/2 flex items-center h-full justify-end ${
              hasRightImage && "hover:cursor-pointer"
            } group`}
            onClick={() => {
              setShownImageIndex((prev) => {
                if (prev === images.length - 1) return prev
                return prev + 1
              })
            }}
          >
            {hasRightImage && (
              <ChevronUp className="rotate-90 text-white group-hover:scale-125 md:w-12 md:h-12 transition-all rounded-full md:p-2 group-hover:bg-gray-50/25" />
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-2 mt-2">
        {images.map((_, idx) => {
          return (
            <div
              key={idx}
              className={`w-4 h-4 rounded-full bg-gray-300 ${
                idx === shownImageIndex && "bg-gray-700"
              } ${images.length === 1 && "hidden"}`}
              onClick={() => setShownImageIndex(idx)}
            />
          )
        })}
      </div>
    </>
  )
}
