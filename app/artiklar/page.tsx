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
      <ul className="flex flex-col gap-2 py-3 text-blue-50">
        {articlePages.allArticles.map((article) => {
          return (
            <Link className="" href={`/artiklar/${article.slug}`}>
              <li className="shadow-emerald-700 shadow-sm rounded-lg p-2 hover:shadow-none transition-all duration-1000">
                <span className="border-b border-solid border-white">{article.title}</span>
                <p className="text-[0.675rem] leading-4">{article.preamble}</p>
              </li>
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
