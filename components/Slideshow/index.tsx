"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

import { DatoImage } from "@/lib/cms/types"

export default function Slideshow({ images }: { images: Array<DatoImage> }) {
  const [shownImageIndex, setShownImageIndex] = useState(0)
  const [thumbnailClicked, setThumbnailClicked] = useState(false)
  const slideshowRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (!slideshowRef.current) return
    slideshowRef.current.scrollTo({
      left: shownImageIndex * slideshowRef.current.clientWidth,
      behavior: "smooth",
    })
  }, [shownImageIndex])

  if (images.length === 0) return null

  return (
    <div className="w-fit">
      <ul
        className="relative scrollbar-hide snap-x snap-mandatory max-w-[400px] flex overflow-scroll"
        onScroll={(e) => {
          if (thumbnailClicked) return
          setShownImageIndex(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))
        }}
        ref={slideshowRef}
      >
        {images.map((image, idx) => {
          return (
            <li className="relative snap-start min-w-[400px] w-full aspect-[1/1]">
              <Image
                key={idx}
                src={image.responsiveImage.src}
                alt={image.alt}
                sizes={image.responsiveImage.sizes}
                fill
                className={`transition-transform duration-1000`}
              />
            </li>
          )
        })}
      </ul>
      <div className="flex justify-center gap-2 mt-2">
        {images.map((_, idx) => {
          return (
            <div
              key={idx}
              className={`w-4 h-4 rounded-full bg-gray-300 ${
                idx === shownImageIndex && "bg-gray-700"
              } ${images.length === 1 && "hidden"}`}
              onClick={() => {
                setShownImageIndex(idx)
                setThumbnailClicked(true)
                setTimeout(() => setThumbnailClicked(false), 300)
                slideshowRef.current?.scrollTo({
                  left: idx * slideshowRef.current.clientWidth,
                  behavior: "smooth",
                })
              }}
            />
          )
        })}
      </div>
      <button
        onClick={() => {
          setShownImageIndex((prev) => (prev + 1) % images.length)
          setThumbnailClicked(true)
        }}
      >
        next
      </button>
    </div>
  )
}
