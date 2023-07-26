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
      <div className="grid grid-cols-2 gap-2">
        <Temperature min={fishInformation.min_temperature} max={fishInformation.max_temperature} />
        <AquariumLength length={fishInformation.aquarium_min_size} />
        <AquariumVolume volume={fishInformation.aquarium_min_volume} />
        <FishLength length={fishInformation.length} />
      </div>
    </div>
  )
}

function BannerImage() {
  return <div className="w-full h-52 bg-blue-400 rounded-3xl animate-pulse" />
}

function Temperature({ min, max }: { min: number; max: number }) {
  return (
    <div className="h-[150px] border border-gray-500 bg-white/20 border-solid flex items-end w-fit rounded-full overflow-hidden relative">
      <span className="top-0 right-0 left-0 text-center absolute">max {max}˚C</span>
      <span className="bottom-0 right-0 left-0 text-center absolute">min {min}˚C</span>
      <div className="bg-gradient-to-b from-red-500 to-red-800 w-14" style={{ height: max * 2 }} />
    </div>
  )
}

function AquariumLength({ length }: { length: number }) {
  return (
    <div className="">
      <div
        className={`w-44 md:w-48 h-24 border border-solid flex items-end ${
          length > 200 ? "border-gray-300" : "border-gray-600"
        }`}
      >
        <div
          className={`w-32 md:w-36 h-16 border-t border-r border-solid flex items-end ${
            100 < length && length < 200
              ? "border-gray-300 -ml-[1px] -mb-[1px] border-b border-l"
              : "border-gray-600"
          }`}
        >
          <div
            className={`w-20 md:w-24 h-10 border-t border-r  border-solid ${
              length <= 100
                ? "border-gray-300 -ml-[1px] -mb-[1px] border-b border-l"
                : "border-gray-600"
            }`}
          />
        </div>
      </div>
      <p className="pt-2">Minsta akvarielängden: {length} cm</p>
    </div>
  )
}

function AquariumVolume({ volume }: { volume: number }) {
  return (
    <div className="">
      <div className="flex items-end border border-solid border-gray-300 h-28 relative">
        <div
          className="bg-gradient-to-t from-blue-600 to-blue-500 w-full"
          style={{ height: `${Math.min(volume / 4, 100)}%` }}
        />
        <span className="bottom-3 right-0 left-0 text-center absolute">{volume} L</span>
      </div>
      <p className="pt-2">Minsta akvarievolymen: {volume} L</p>
    </div>
  )
}

function FishLength({ length }: { length: number }) {
  return <div>Fisken blir kring {length} cm lång</div>
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
