import { notFound } from "next/navigation"

import CMSFetch from "@/lib/cms/request"
import { Fish } from "@/lib/db/types"

type Props = {
  params: {
    family: string
    fish: string
  }
  searchParams: {
    id: number
  }
}

type QueryResponse = {
  allFish: Array<Fish>
}

export default async function FishPage({ searchParams: { id } }: Props) {
  const response = await CMSFetch<QueryResponse>({
    query: FISH_PAGE_QUERY,
    variables: { id },
  })

  if (!response) {
    return notFound()
  }

  const fishInformation = response.allFish[0]

  return (
    <div className="grid gap-6">
      <h1>{fishInformation.commonName}</h1>
      <h3>{fishInformation.scientificName}</h3>
      <BannerImage />
    </div>
  )
}

function BannerImage() {
  return <div className="w-full h-52 bg-blue-400 rounded-3xl animate-pulse" />
}

const FISH_PAGE_QUERY = `
  query getFishPage($id: ItemId) {
    allFish(filter: {id: {eq: $id}}) {
      commonName
      scientificName
      price
      family
      difficulty
      continentOfOrigin
      countryOfOrigin
      description {
        value
      }
      mainImage {
        alt
        url
      }
      waterType
      temperature {
        min
        max
      }
      socialNeeds
      ph {
        min
        max
      }
      length
      additionalImages {
        alt
        url
      }
      aquariumMinSize
      aquariumMinVolume
      depth
      diet
      genderDifferences
    }
  }
`

const _FISH_PAGE_QUERY_DB = `
  query getFish($id: BigInt!) {
    fishCollection(filter: {id: {eq: $id}}) {
      edges {
        node {
          id
          scientific_name
          trade_name
          family
          continent
          origin
          water_type
          diet
          difficulty
          aquarium_min_size
          aquarium_min_volume
          min_temperature
          max_temperature
          min_pH_value
          max_pH_value
          length
        }
      }
    }
  }
`
