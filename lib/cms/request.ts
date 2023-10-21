import { ASTNode, print } from "graphql"

type Props = {
  query: ASTNode
  variables?: Record<string, unknown>
}

export default async function CMSFetch<T>({ query, variables }: Props): Promise<T | null> {
  const res = await fetch("https://graphql.datocms.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Exclude-Invalid": "true",
      Authorization: process.env.DATOCMS_KEY ?? "",
    },
    body: JSON.stringify({
      query: print(query),
      variables: { ...variables },
    }),
  })

  if (!res.ok) {
    throw new Error(`Network error when fetching datocms: ${res.status} - ${res.statusText}`)
  }

  const json = await res.json()

  if (json.errors) {
    console.log(json.errors)
    console.error(JSON.stringify(json.errors, null, 2))
    throw new Error(`Graphql error: ${json.errors}`)
  }

  return json.data
}
