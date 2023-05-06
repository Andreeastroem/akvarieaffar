import DBFetch from "@/lib/db/request";
import { Fish } from "@/lib/db/types";
import Link from "next/link";
import { notFound } from "next/navigation";

const categories = ["Guppy", "Ciklid"];

type QueryResponse = {
  fishCollection: {
    edges: Array<{ node: Pick<Fish, "family"> }>;
  };
};

export default async function FishLandingPage() {
  /**
   * Fetch all categories from database
   * Mocked for now
   *  */
  const res = await DBFetch<QueryResponse>({ query: FISH_QUERY });

  if (!res) {
    return notFound();
  }

  const families = res.fishCollection.edges.map((edge) => edge.node.family);

  return (
    <div className="grid md:grid-cols-2 gap-3">
      {families.map((family) => {
        return (
          <Link
            key={family}
            href={`/fisk/${family}`}
            className="border rounded-3xl hover:rounded-none transition-all duration-1000 border-indigo-700 border-solid flex justify-center items-center min-h-[200px] hover:bg-indigo-500/25"
          >
            {family}
          </Link>
        );
      })}
    </div>
  );
}

const FISH_QUERY = `
  query getAllFamilies {
    fishCollection {
      edges {
        node {
          family
        }
      }
    }
  }
`;
