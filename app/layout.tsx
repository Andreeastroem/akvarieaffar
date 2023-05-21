import "./globals.css"

import { ClerkProvider } from "@clerk/nextjs/app-beta"

import Header from "./Header"
import MobileMenu from "./MobileMenu"

export const metadata = {
  title: "Bengts akvarieaffär",
  description: "Småskalig butik med gemytlig känsla",
  robots: "noindex",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <ClerkProvider>
        <body className="max-w-7xl mx-auto dark-gradient text-gray-200 p-3 min-h-screen">
          {/** @ts-expect-error Server Component */}
          <Header />
          {children}
          {/** @ts-expect-error Server Component */}
          <MobileMenu />
        </body>
      </ClerkProvider>
    </html>
  )
}
