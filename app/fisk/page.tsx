import Link from "next/link";

const categories = ["Guppy", "Ciklid"];

export default async function FishLandingPage() {
  /**
   * Fetch all categories from database
   * Mocked for now
   *  */
  return (
    <div className="grid md:grid-cols-2 gap-3">
      {categories.map((category) => {
        return (
          <Link
            key={category}
            href={`/fisk/${category}`}
            className="border rounded-3xl hover:rounded-none transition-all duration-1000 border-indigo-700 border-solid flex justify-center items-center min-h-[200px] hover:bg-indigo-500/25"
          >
            {category}
          </Link>
        );
      })}
    </div>
  );
}
