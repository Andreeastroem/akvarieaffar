import SearchIcon from "@/icons/Search";
import { Menu } from "@/icons";

export default async function MobileMenu() {
  return (
    <div className="grid grid-cols-3 md:hidden fixed bottom-0 left-0 right-0 p-4 bg-blue-950 rounded-t-3xl">
      <MenuButton />
      <MenuSearch />
      <MenuButton icon={<Menu />} />
    </div>
  );
}

function MenuSearch() {
  return <SearchIcon />;
}

function MenuButton({
  onClick,
  icon,
}: {
  onClick?: () => void;
  icon?: JSX.Element;
}) {
  return (
    <div onClick={onClick} className="flex flex-col w-full items-center">
      {icon ? icon : <div className="w-6 h-6 animate-pulse bg-blue-300" />}
    </div>
  );
}
