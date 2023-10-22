"use client"

import Image from "next/image"
import { useState } from "react"

import { ChevronUp } from "@/icons"
import { DatoImage } from "@/lib/cms/types"

export default function Slideshow({ images }: { images: Array<DatoImage> }) {
  const [shownImageIndex, setShownImageIndex] = useState(0)
  if (images.length === 0) return null
  /** As long as *images* exists these will be defined */
  const previousImage = images.at(shownImageIndex - 1) as DatoImage
  const image = images.at(shownImageIndex) as DatoImage
  const nextImage = images.at((shownImageIndex + 1) % images.length) as DatoImage
  return (
    <div className="relative w-full aspect-video overflow-hidden">
      <Image
        src={previousImage.responsiveImage.src}
        alt={previousImage.alt}
        sizes={previousImage.responsiveImage.sizes}
        fill
        className="translate-x-full transition-transform duration-500"
      />
      <Image
        src={image.responsiveImage.src}
        alt={image.alt}
        sizes={image.responsiveImage.sizes}
        fill
        className=" transition-transform duration-500"
      />
      <Image
        src={nextImage.responsiveImage.src}
        alt={nextImage.alt}
        sizes={nextImage.responsiveImage.sizes}
        fill
        className="-translate-x-full transition-transform duration-500"
      />
      <div className="text-white flex z-20 absolute top-0 bottom-0 left-0 right-0">
        <div
          className="w-1/2 flex items-center h-full hover:cursor-pointer"
          onClick={() => {
            setShownImageIndex((prev) => (prev - 1) % images.length)
          }}
        >
          <ChevronUp className="-rotate-90 text-white" width={48} height={48} />
        </div>
        <div
          className="w-1/2 flex items-center h-full justify-end hover:cursor-pointer"
          onClick={() => {
            setShownImageIndex((prev) => (prev + 1) % images.length)
          }}
        >
          <ChevronUp className="rotate-90 text-white" width={48} height={48} />
        </div>
      </div>
    </div>
  )
}
