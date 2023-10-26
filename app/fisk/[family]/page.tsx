import gql from "graphql-tag"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { mainImageFragment } from "@/lib/cms/fragments"
import CMSFetch from "@/lib/cms/request"
import { Fish } from "@/lib/db/types"
import { slugify } from "@/lib/util/slugify"

type Props = {
  params: {
    family: string
  }
}

export default async function FishFamilyLandingPage({ params: { family } }: Props) {
  const res = await CMSFetch<QueryResponse>({
    query: FAMILY_PAGE_QUERY,
    variables: { family },
  })

  if (!res) {
    return notFound()
  }

  const fishInFamily = res.allFish

  return (
    <div>
      <h1>{family}</h1>
      <div className="grid grid-cols-2 md:grid-cols-4">
        {fishInFamily.map((fish) => {
          return <FishLink fishData={fish} family={family} />
        })}
      </div>
    </div>
  )
}

function FishLink({ fishData, family }: { fishData: FishInformation; family: string }) {
  const slug = slugify(fishData.scientificName)
  return (
    <div className="border relative hover:m-3 hover:p-0 group overflow-hidden duration-1000 hover:rounded-3xl transition-all border-indigo-700 border-solid p-3">
      <Link
        href={`/fisk/${family}/${slug}?id=${fishData.id}`}
        className="w-full flex justify-center"
      >
        <div className="relative rounded-3xl z-10">
          {fishData.mainImage && (
            <Image
              src={fishData.mainImage.responsiveImage.src}
              alt={fishData.mainImage.alt}
              sizes={fishData.mainImage.responsiveImage.sizes}
              width={200}
              height={200}
            />
          )}
        </div>
      </Link>
      <div className="transition-all duration-[2s] group-hover:bg-blue-400/25 -z-10 absolute left-0 right-0 bottom-0 top-[100%] group-hover:top-[0%]"></div>
      <div className="flex flex-col items-center px-2">
        <h3 className="uppercase font-bold">{fishData.commonName}</h3>
        <span className="text-gray-500 text-xs capitalize">{fishData.scientificName}</span>
      </div>
    </div>
  )
}

type FishInformation = Pick<Fish, "commonName" | "scientificName" | "id" | "mainImage">

type QueryResponse = {
  allFish: Array<FishInformation>
}

const FAMILY_PAGE_QUERY = gql`
  ${mainImageFragment}
  query familyPage($family: String!) {
    allFish(filter: { family: { eq: $family } }) {
      commonName
      scientificName
      id
      ...mainImageFragment
    }
  }
`
