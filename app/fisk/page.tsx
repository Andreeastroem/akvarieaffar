import { gql } from "graphql-tag"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { mainImage, mainImageFragment } from "@/lib/cms/fragments"
import CMSFetch from "@/lib/cms/request"

export default async function FishLandingPage() {
  const res = await CMSFetch<QueryResponse>({ query: FISH_QUERY })

  if (!res) {
    return notFound()
  }

  const families = res.allFish.reduce<
    Record<string, { family: { id: string; name: string }; mainImage: mainImage }>
  >((acc, fish) => {
    if (!acc[fish.family.name]) {
      return {
        ...acc,
        [fish.family.name]: fish,
      }
    }
    return acc
  }, {})

  return (
    <div className="grid md:grid-cols-2 gap-3">
      {Object.entries(families).map(([familyName, familyInformation]) => {
        const family = familyName.toLowerCase()
        return (
          <Link
            key={family}
            href={`/fisk/${family}`}
            className="border group rounded-3xl hover:rounded-none relative overflow-hidden transition-all duration-1000 border-indigo-700 border-solid flex justify-center items-center min-h-[200px] hover:bg-indigo-500/25"
          >
            {familyInformation.mainImage && (
              <Image
                alt={familyInformation.mainImage.alt}
                src={familyInformation.mainImage.responsiveImage.src}
                sizes={familyInformation.mainImage.responsiveImage.sizes}
                fill
                className="transition-transform group-hover:scale-110 duration-1000"
                style={{ objectFit: "cover" }}
              />
            )}
            {family}
          </Link>
        )
      })}
    </div>
  )
}

type QueryResponse = {
  allFish: Array<{
    family: {
      name: string
      id: string
    }
    mainImage: mainImage
  }>
}
const FISH_QUERY = gql`
  ${mainImageFragment}
  query {
    allFish {
      family {
        id
        name
      }
      ...mainImageFragment
    }
  }
`
