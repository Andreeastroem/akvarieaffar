"use client"

import Link from "next/link"

import WaveText from "@/components/WaveText"

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-default">
      <WaveText text="" />
      {/* {headings.map((heading) => heading)}
      {descriptions.map((description) => description)} */}
      {headings.at(4)}
      {descriptions.at(Math.random() * descriptions.length)}
      <Link
        className="hover:translate-x-3 transition-transform pt-6 block underline underline-offset-2"
        href={"/"}
      >
        Ta dig tillbaka till säkrare farvatten
      </Link>
    </div>
  )
}
const headings = [
  <h1>Dimma på havet</h1>,
  <h1>Sjöröken ligger tät</h1>,
  <h1>Okänt farvatten</h1>,
  <h1>Ute på äventyr?</h1>,
  <Wrapper>
    <h1 className="inline-flex gap-2">
      Nu är du ute och <WaveText text={"seglar ⛵️"} />
    </h1>
  </Wrapper>,
]
const descriptions = [
  <Wrapper>
    Du söker något som inte har
    <span className="bg-black text-black hover:bg-transparent transition-colors duration-1000">
      upptäckts
    </span>
    ännu 🔭
  </Wrapper>,
  <Wrapper>
    Nu håller du nog <span className="rotate-180">kartan</span>
    upp och ner 🗺️
  </Wrapper>,
  <Wrapper>Inte skulle väl du åkt fel? 🤔</Wrapper>,
]

function Wrapper({ children }: { children: React.ReactNode }) {
  return <div className="flex gap-2">{children}</div>
}
