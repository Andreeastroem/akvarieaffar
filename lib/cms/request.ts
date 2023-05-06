type Props = {
  query: string;
  variables?: Record<string, unknown>;
};

export default async function CMSFetch<T>({
  query,
  variables,
}: Props): Promise<T | null> {
  const res = await fetch("https://graphql.datocms.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Exclude-Invalid": "true",
      Authorization: process.env.DATOCMS_KEY ?? "",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!res.ok) {
    throw new Error(
      `Network error when fetching datocms: ${res.status} - ${res.statusText}`
    );
    return null;
  }

  const json = await res.json();

  if (json.errors) {
    throw new Error(`Graphql error: ${json.errors}`);
    return null;
  }

  return json.data;
}
