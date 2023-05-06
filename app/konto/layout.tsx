export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col items-center justify-center">
      {children}
    </main>
  );
}
