import gql from "graphql-tag"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { mainImageFragment } from "@/lib/cms/fragments"
import CMSFetch from "@/lib/cms/request"
import { DatoImage } from "@/lib/cms/types"
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
          const slug = slugify(fish.scientificName)
          return (
            <FishLink
              href={`/fisk/${family}/${slug}?id=${fish.id}`}
              title={fish.scientificName}
              key={fish.scientificName}
              image={fish.mainImage}
            />
          )
        })}
      </div>
    </div>
  )
}

function FishLink({
  href,
  title,
  image,
}: {
  href: string
  title: string
  image: DatoImage | undefined
}) {
  return (
    <div className="border  hover:m-3 hover:p-0 group overflow-hidden duration-1000 hover:rounded-3xl transition-all border-indigo-700 border-solid p-3">
      <Link href={href} className="w-full flex justify-center">
        <div className="relative rounded-3xl">
          {image && (
            <Image
              src={image.responsiveImage.src}
              alt={image.alt}
              sizes={image.responsiveImage.sizes}
              width={200}
              height={200}
            />
          )}
          <div className="transition-all duration-[2s]  group-hover:bg-blue-600/50 absolute left-0 right-0 bottom-0 top-[100%] group-hover:top-[20%]"></div>
        </div>
      </Link>
      <h3>{title}</h3>
      <span className="block w-14 h-4 bg-blue-400 animate-pulse" />
    </div>
  )
}

type QueryResponse = {
  allFish: Array<Pick<Fish, "scientificName" | "commonName" | "id" | "mainImage">>
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
