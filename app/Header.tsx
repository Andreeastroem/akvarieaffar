import { UserButton } from "@clerk/nextjs/app-beta";
import Link from "next/link";

export default async function Header() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 relative">
      <Link className="text-center col-span-1 md:col-start-2" href={"/"}>
        <h1 className="">Akvarieaffären</h1>
      </Link>
      <div className="flex w-full justify-end md:static absolute">
        <UserButton userProfileUrl="/konto" />
      </div>
    </div>
  );
}
