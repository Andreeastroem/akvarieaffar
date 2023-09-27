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
      <BannerImage />
      <h1>{fishInformation.commonName}</h1>
      <h3>{fishInformation.scientificName}</h3>
      <Aquarium fishInfo={fishInformation} />
    </div>
  )
}

function Aquarium({ fishInfo }: { fishInfo: Fish }) {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full md:h-96 h-60 border flex justify-between">
        <div className="h-full flex flex-col-reverse justify-between items-center w-[10%] min-w-[32px] p-1 bg-gradient-to-b from-transparent to-red-400">
          <span>{fishInfo.temperature.min}</span>
          <span>˚C</span>
          <span>{fishInfo.temperature.max}</span>
        </div>
        <div id="aquarium-content-area" className="w-full flex items-center flex-col">
          <span>{fishInfo.aquariumMinVolume} liter</span>
          <span>{fishInfo.depth}</span>
          <span>{fishInfo.length} cm lång</span>
          <span>{fishInfo.socialNeeds}</span>
          <span>{fishInfo.waterType}</span>
        </div>
        <div className="h-full flex flex-col-reverse justify-between items-center w-[10%] min-w-[32px] p-1 bg-gradient-to-b from-blue-300 to-green-400">
          <span>{fishInfo.ph.min}</span>
          <span>pH</span>
          <span>{fishInfo.ph.max}</span>
        </div>
      </div>
      <span>
        {"<----------"}
        {fishInfo.aquariumMinSize} cm
        {"---------->"}
      </span>
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
