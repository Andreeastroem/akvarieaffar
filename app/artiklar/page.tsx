import gql from "graphql-tag"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import CMSFetch from "@/lib/cms/request"

type ArticlePreview = {
  title: string
  slug: string
  preamble: string
  coverImage: {
    alt: string
    title: string
    url: string
    responsiveImage: {
      src: string
      alt: string
      sizes: string
    }
  }
}

export default async function ArticlePage() {
  const articlePages = await CMSFetch<{
    allArticles: Array<ArticlePreview>
  }>({
    query: ARTICLES_QUERY,
    variables: {
      sizes: "(max-width: 375px) 340px, (max-width: 600px) 100vw, 600px",
    },
  })
  if (!articlePages) {
    return notFound()
  }
  return (
    <div className="max-w-default md:mx-auto">
      <h1>Artiklar</h1>
      <ul className="flex flex-col gap-4 py-3">
        {articlePages.allArticles.map((article) => {
          return (
            <Link
              className="p-3 text-white mix-blend-multiply overflow-hidden hover:translate-x-3 hover:rounded-xl hover:drop-shadow-xl hover:shadow-black transition-all duration-700 flex relative items-center justify-between"
              href={`/artiklar/${article.slug}`}
            >
              <Image
                alt={article.coverImage.responsiveImage.alt}
                src={article.coverImage.responsiveImage.src}
                title={article.coverImage.title}
                fill
                className="-z-10"
                sizes={article.coverImage.responsiveImage.sizes}
                style={{
                  objectFit: "cover",
                }}
              />
              <li className="transition-all duration-1000 max-w-[80%] bg-gray-700/50 p-2">
                <h2 className="text-xl pb-2 truncate">{article.title}</h2>
                <p className="text-sm leading-4 max-w-lg">{article.preamble}</p>
              </li>
            </Link>
          )
        })}
      </ul>
    </div>
  )
}

const ARTICLES_QUERY = gql`
  query ($sizes: String!) {
    allArticles {
      title
      slug
      preamble
      coverImage {
        alt
        title
        url
        responsiveImage(imgixParams: { ar: "3:1" }, sizes: $sizes) {
          src
          sizes
          alt
        }
      }
    }
  }
`
