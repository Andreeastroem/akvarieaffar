import Image from "next/image";
import Link from "next/link";

type Props = {
  params: {
    category: string;
  };
};

export default async function FishCategoryLandingPage({
  params: { category },
}: Props) {
  return (
    <div>
      <h2>{category}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4">
        <FishLink
          href={`/fisk/${category}/blå${category}`}
          title={`blå${category}`}
        />
      </div>
    </div>
  );
}

function FishLink({ href, title }) {
  return (
    <div className="border hover:m-3 hover:p-0 duration-1000 hover:rounded-3xl transition-all border-indigo-700 border-solid p-3">
      <Link href={href} className="w-full flex justify-center">
        {/* <Image alt={title} width={200} height={200} /> */}
        <div className="w-52 h-52 rounded-3xl bg-blue-400 animate-pulse" />
      </Link>
      <h3>{title}</h3>
      <span className="block w-14 h-4 bg-blue-400 animate-pulse" />
    </div>
  );
}
