import DBFetch from "@/lib/db/request";
import { Fish } from "@/lib/db/types";
import { slugify } from "@/lib/util/slugify";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: {
    family: string;
  };
};

type QueryResponse = {
  fishCollection: {
    edges: Array<{ node: Pick<Fish, "scientific_name" | "trade_name" | "id"> }>;
  };
};

export default async function FishFamilyLandingPage({
  params: { family },
}: Props) {
  const res = await DBFetch<QueryResponse>({
    query: FAMILY_PAGE_QUERY,
    variables: { family },
  });

  if (!res) {
    return notFound();
  }

  const fishInFamily = res.fishCollection.edges.map((edge) => edge.node);

  return (
    <div>
      <h2>{family}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4">
        {fishInFamily.map((fish) => {
          const slug = slugify(fish.scientific_name);
          return (
            <FishLink
              href={`/fisk/${family}/${slug}?id=${fish.id}`}
              title={fish.scientific_name}
              key={fish.scientific_name}
            />
          );
        })}
      </div>
    </div>
  );
}

function FishLink({ href, title }: { href: string; title: string }) {
  return (
    <div className="border hover:m-3 hover:p-0 overflow-hidden duration-1000 hover:rounded-3xl transition-all border-indigo-700 border-solid p-3">
      <Link href={href} className="w-full flex justify-center">
        {/* <Image alt={title} width={200} height={200} /> */}
        <div className="w-52 h-52 rounded-3xl bg-blue-400 animate-pulse" />
      </Link>
      <h3>{title}</h3>
      <span className="block w-14 h-4 bg-blue-400 animate-pulse" />
    </div>
  );
}

const FAMILY_PAGE_QUERY = `
  query($family: String!) {
    fishCollection(filter: {
      family: {
        eq: $family
      }
    }) {
      edges {
        node {
          scientific_name
          trade_name
          id
        }
      }
    }
  }
`;
