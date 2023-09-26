import "./globals.css"

import { ClerkProvider } from "@clerk/nextjs/app-beta"
import { useMemo } from "react"

import Header from "./Header"
import MobileMenu from "./MobileMenu"

export const metadata = {
  title: "Bengts akvarieaffär",
  description: "Småskalig butik med gemytlig känsla",
  robots: "noindex",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const yearText = useMemo(() => {
    const year = new Intl.DateTimeFormat("sv", { dateStyle: "short" })
      .formatToParts(new Date())
      .filter((p) => p.type === "year")[0].value

    return `© 2023 ${year === "2023" ? "" : `-${year}`}`
  }, [])
  return (
    <html lang="sv">
      <ClerkProvider>
        <body className="max-w-7xl mx-auto text-blue-950 relative min-h-screen flex flex-col">
          <div className="bg-red-300/75 px-3 py-2 whitespace-nowrap overflow-x-hidden">
            <span className="w-full animate-marquee inline-block">
              Hemsidan är under uppbyggnad 👷‍♂️
            </span>
            <span className="w-full animate-marquee inline-block">
              Hemsidan är under uppbyggnad 👷‍♂️
            </span>
          </div>
          <Header />
          <div className="flex-grow px-3 py-4">{children}</div>
          <footer>{yearText}</footer>
          <MobileMenu />
        </body>
      </ClerkProvider>
    </html>
  )
}
