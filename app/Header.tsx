import { UserButton } from "@clerk/nextjs/app-beta"
import Link from "next/link"
import { notFound } from "next/navigation"

import CMSFetch from "@/lib/cms/request"

export default async function Header() {
  const response = await CMSFetch<NavigationQueryResponse>({ query: NAVIGATION_LINKS_QUERY })

  if (!response) {
    return notFound()
  }

  return (
    <header className="grid grid-cols-1 md:grid-cols-3 relative bg-blue-500 text-gray-200 py-6">
      <Link className="text-center col-span-1 md:col-start-2" href={"/"}>
        <h1 className="p-2">Akvarieaffären</h1>
      </Link>
      <div className="flex w-full justify-end md:static absolute">
        <UserButton userProfileUrl="/konto" />
      </div>
      <nav className="hidden md:block md:col-span-3">
        <ul className="flex justify-center w-full max-w-3xl mx-auto tracking-widest gap-2">
          {response.navigation.links.map((link) => (
            <Link className="py-2 px-3 hover:underline" href={link.slug}>
              <li className="uppercase text-sm">{link.title}</li>
            </Link>
          ))}
        </ul>
      </nav>
    </header>
  )
}

type NavigationQueryResponse = {
  navigation: {
    links: {
      title: string
      slug: string
    }[]
  }
}

const NAVIGATION_LINKS_QUERY = `
  query NavigationLinks {
    navigation {
      links {
        title
        slug
      }
    }
  }
`
