import { useMemo } from "react";

export default function FiskLandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const year = useMemo(
    () =>
      new Intl.DateTimeFormat("sv", { dateStyle: "short" })
        .formatToParts(new Date())
        .filter((p) => p.type === "year")[0].value,
    []
  );
  return (
    <div className="flex flex-col gap-8 h-full">
      <header>
        <h1 className="text-center">Fiskar</h1>
        <p className="text-center">Våra olika fisksorter</p>
      </header>
      <main>{children}</main>
      <footer>© 2023{year === "2023" ? "" : `-${year}`}</footer>
    </div>
  );
}
