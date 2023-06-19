import Link from "next/link"
import { notFound } from "next/navigation"

import CMSFetch from "@/lib/cms/request"

type ArticlePreview = {
  title: string
  slug: string
  preamble: string
}

export default async function ArticlePage() {
  const articlePages = await CMSFetch<{
    allArticles: Array<ArticlePreview>
  }>({
    query: ARTICLES_QUERY,
  })
  if (!articlePages) {
    return notFound()
  }
  return (
    <>
      <h1>Artiklar</h1>
      <ul className="flex flex-col gap-4 py-3">
        {articlePages.allArticles.map((article) => {
          return (
            <Link className="bg-blue-50 p-3 flex items-center" href={`/artiklar/${article.slug}`}>
              <li className="transition-all duration-1000 max-w-[80%]">
                <h2 className="text-xl pb-2 truncate">{article.title}</h2>
                <p className="text-sm leading-4 max-w-lg">{article.preamble}</p>
              </li>
              <div className="h-8 w-8 bg-blue-500 mx-auto animate-pulse" />
            </Link>
          )
        })}
      </ul>
    </>
  )
}

const ARTICLES_QUERY = `
  query {
    allArticles {
      title
      slug
      preamble
    }
  }
`
