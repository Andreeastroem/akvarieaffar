import { notFound } from "next/navigation"

import DBFetch from "@/lib/db/request"
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
  fishCollection: {
    edges: Array<{ node: Fish }>
  }
}

export default async function FishPage({ searchParams: { id } }: Props) {
  console.log("id", id)
  const response = await DBFetch<QueryResponse>({
    query: FISH_PAGE_QUERY,
    variables: { id },
  })

  if (!response) {
    return notFound()
  }

  const fishInformation = response.fishCollection.edges[0].node

  return (
    <div>
      <h2>{fishInformation.trade_name}</h2>
      <h3>{fishInformation.scientific_name}</h3>
    </div>
  )
}

const FISH_PAGE_QUERY = `
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
