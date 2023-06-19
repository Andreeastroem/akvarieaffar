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
        <body className="max-w-7xl mx-auto relative dark-gradient text-gray-200 min-h-screen flex flex-col">
          <div className="bg-red-300/75 px-3 py-2 whitespace-nowrap overflow-x-hidden">
            <span className="w-full animate-marquee inline-block">
              Hemsidan är under uppbyggnad 👷‍♂️
            </span>
            <span className="w-full animate-marquee inline-block">
              Hemsidan är under uppbyggnad 👷‍♂️
            </span>
          </div>
          {/** @ts-expect-error Server Component */}
          <Header />
          <div className="flex-grow px-3">{children}</div>
          <MobileMenu />
        </body>
      </ClerkProvider>
    </html>
  )
}
