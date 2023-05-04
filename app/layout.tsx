import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs/app-beta";

export const metadata = {
  title: "Bengts akvarieaffär",
  description: "Småskalig butik med gemytlig känsla",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv">
      <ClerkProvider>
        <body className="max-w-7xl mx-auto dark-gradient text-gray-200 p-3 min-h-screen">
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}
