type Props = {
  params: {
    category: string;
    fish: string;
  };
};

export default async function FishPage({ params: { category, fish } }: Props) {
  return (
    <div>
      Page for fish {fish} in category {category}
    </div>
  );
}
