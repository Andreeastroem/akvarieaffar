import { gql } from "graphql-tag"
import Link from "next/link"
import { notFound } from "next/navigation"

import CMSFetch from "@/lib/cms/request"
import { Fish } from "@/lib/db/types"

type QueryResponse = {
  allFish: Array<Pick<Fish, "family">>
}

export default async function FishLandingPage() {
  /**
   * Fetch all categories from database
   * Mocked for now
   *  */
  const res = await CMSFetch<QueryResponse>({ query: FISH_QUERY })

  if (!res) {
    return notFound()
  }

  const families = res.allFish.map((fish) => fish.family)

  return (
    <div className="grid md:grid-cols-2 gap-3">
      {families.map((family) => {
        return (
          <Link
            key={family}
            href={`/fisk/${family}`}
            className="border rounded-3xl hover:rounded-none transition-all duration-1000 border-indigo-700 border-solid flex justify-center items-center min-h-[200px] hover:bg-indigo-500/25"
          >
            {family}
          </Link>
        )
      })}
    </div>
  )
}

const FISH_QUERY = gql`
  query {
    allFish {
      family
      mainImage {
        alt
        url
        responsiveImage {
          height
          width
          sizes
        }
      }
    }
  }
`
