type Props = {
  query: string;
  variables?: Record<string, unknown>;
};

export default async function DBFetch<T>({
  query,
  variables,
}: Props): Promise<T | null> {
  const res = await fetch(`${process.env.SUPABASE_URL}/graphql/v1`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apiKey: process.env.SUPABASE_KEY,
      Authorization: `Bearer ${process.env.SUPABASE_KEY}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!res.ok) {
    throw new Error(
      `Network error when fetching db ${res.status} - ${res.statusText}`
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
