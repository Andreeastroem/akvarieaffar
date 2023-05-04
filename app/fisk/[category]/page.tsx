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
      Category page for {category}
      <Link href={`/fisk/${category}/slumpad-fisk`}>Random link</Link>
    </div>
  );
}
