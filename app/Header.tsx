import { UserButton } from "@clerk/nextjs/app-beta";

export default async function Header() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 relative">
      <h1 className="text-center col-span-1 md:col-start-2">Akvarieaffären</h1>
      <div className="flex w-full justify-end md:static absolute">
        <UserButton userProfileUrl="/konto" />
      </div>
    </div>
  );
}
