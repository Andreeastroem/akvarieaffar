import { isEmptyDocument } from "datocms-structured-text-utils"
import gql from "graphql-tag"
import { notFound } from "next/navigation"
import { StructuredText } from "react-datocms"

import Slideshow from "@/components/Slideshow"
import { additionalImagesFragment, mainImageFragment } from "@/lib/cms/fragments"
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
      <div>
        <h1>{fishInformation.commonName}</h1>
        <div className="flex items-center gap-4">
          <h2 className="font-extralight text-xs capitalize text-gray-500">
            {fishInformation.scientificName}
          </h2>
          <span
            className={`font-extralight text-xs ${fishInformation.inStock ? "bg-green-300" : "bg-red-300"} p-2 rounded-full`}
          >
            {fishInformation.inStock ? "I lager" : "Slut"}
          </span>
        </div>
      </div>
      <div className="">
        {fishInformation.additionalImages && (
          <Slideshow images={fishInformation.additionalImages} />
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {!!fishInformation.price && <InfoCard title="Pris">{fishInformation.price} kr</InfoCard>}
          <InfoCard title="Familj">{fishInformation.family.name}</InfoCard>
          {!!fishInformation.difficulty && (
            <InfoCard title="Svårighetsgrad">{fishInformation.difficulty}</InfoCard>
          )}
          {!!fishInformation.continentOfOrigin && !!fishInformation.countryOfOrigin && (
            <InfoCard title="Ursprung">
              {fishInformation.continentOfOrigin}, {fishInformation.countryOfOrigin}
            </InfoCard>
          )}
          {!!fishInformation.waterType && (
            <InfoCard title="Vattentyp">{fishInformation.waterType}</InfoCard>
          )}
          {!!fishInformation.temperature?.[0].min && !!fishInformation.temperature?.[0].max && (
            <InfoCard title="Temperatur">
              {fishInformation.temperature[0].min} - {fishInformation.temperature[0].max} °C
            </InfoCard>
          )}
          {!!fishInformation.socialNeeds && (
            <InfoCard title="Sociala behov">{fishInformation.socialNeeds}</InfoCard>
          )}
          {!!fishInformation.ph?.[0].min && !!fishInformation.ph?.[0].max && (
            <InfoCard title="pH">
              {fishInformation.ph[0].min} - {fishInformation.ph[0].max}
            </InfoCard>
          )}
          {!!fishInformation.length && (
            <InfoCard title="Längd">{fishInformation.length} cm</InfoCard>
          )}
          {!!fishInformation.depth && <InfoCard title="Djup">{fishInformation.depth}</InfoCard>}
          {!!fishInformation.diet && <InfoCard title="Diet">{fishInformation.diet}</InfoCard>}
          {!!fishInformation.genderDifferences && (
            <InfoCard title="Könsskillnader">{fishInformation.genderDifferences}</InfoCard>
          )}
        </div>
        {!isEmptyDocument(fishInformation.description) && (
          <Description>
            <StructuredText data={fishInformation.description} />
          </Description>
        )}
      </div>
    </div>
  )
}

function Description({ children }: { children: React.ReactNode }) {
  return <div className="max-w-[300px] mx-auto py-3">{children}</div>
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-blue-50 bg-blue-100 p-2 rounded-lg">
      <h3 className="text-sm font-extralight">{title}</h3>
      {children}
    </div>
  )
}

const FISH_PAGE_QUERY = gql`
  ${mainImageFragment}
  ${additionalImagesFragment}
  query getFishPage($id: ItemId) {
    allFish(filter: { id: { eq: $id } }) {
      commonName
      scientificName
      price
      family {
        name
      }
      difficulty
      continentOfOrigin
      countryOfOrigin
      description {
        value
      }
      ...mainImageFragment
      ...additionalImagesFragment
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
      inStock
    }
  }
`
