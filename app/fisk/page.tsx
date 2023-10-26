import { gql } from "graphql-tag"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { mainImageFragment } from "@/lib/cms/fragments"
import CMSFetch from "@/lib/cms/request"
import { Fish } from "@/lib/db/types"

export default async function FishLandingPage() {
  /**
   * Fetch all categories from database
   * Mocked for now
   *  */
  const res = await CMSFetch<QueryResponse>({ query: FISH_QUERY })

  if (!res) {
    return notFound()
  }

  const families = res.allFish.reduce<Record<string, Pick<Fish, "family" | "mainImage">>>(
    (acc, fish) => {
      if (!acc[fish.family]) {
        return {
          ...acc,
          [fish.family]: fish,
        }
      }
      return acc
    },
    {}
  )

  return (
    <div className="grid md:grid-cols-2 gap-3">
      {Object.entries(families).map(([familyName, familyInformation]) => {
        const family = familyName.toLowerCase()
        return (
          <Link
            key={family}
            href={`/fisk/${family}`}
            className="border rounded-3xl hover:rounded-none relative overflow-hidden transition-all duration-1000 border-indigo-700 border-solid flex justify-center items-center min-h-[200px] hover:bg-indigo-500/25"
          >
            {familyInformation.mainImage && (
              <Image
                alt={familyInformation.mainImage.alt}
                src={familyInformation.mainImage.responsiveImage.src}
                sizes={familyInformation.mainImage.responsiveImage.sizes}
                fill
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
  allFish: Array<Pick<Fish, "family" | "mainImage">>
}
const FISH_QUERY = gql`
  ${mainImageFragment}
  query {
    allFish {
      family
      ...mainImageFragment
    }
  }
`
