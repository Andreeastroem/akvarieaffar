import Image from "next/image"
import { notFound } from "next/navigation"
import { StructuredTextDocument } from "react-datocms"

import Notification from "@/components/Notification"
import { RichText } from "@/components/RichText"
import CMSFetch from "@/lib/cms/request"

type Props = {
  params: {
    slug: string
  }
}

type Data = {
  title: string
  slug: string
  coverImage: {
    url: string
    alt: string
    title: string
  }
  content: {
    links: Array<string>
    value: StructuredTextDocument
  }
  freeFormContent: Array<{
    title: string
    color: {
      hex: string
    }
    textColor: {
      hex?: string
    }
    content: StructuredTextDocument
  } | null>
}

export default async function ArticlePage({ params: { slug } }: Props) {
  const pageData = await CMSFetch<{ article: Data }>({
    query: ARTICLE_PAGE_QUERY,
    variables: { slug },
  })

  if (!pageData || !pageData.article) {
    return notFound()
  }

  const article = pageData.article

  return (
    <div className="max-w-default md:mx-auto grid gap-5">
      <div className="relative w-full aspect-[3/1]">
        <Image
          className="object-cover"
          src={pageData.article.coverImage.url}
          alt={pageData.article.coverImage.alt}
          sizes="(max-width: 600px) 100vw, 600px"
          fill
        />
      </div>
      <h1>{article.title}</h1>
      <RichText content={article.content.value} />
      {article.freeFormContent.length > 0 && (
        <Notification>
          <div className="grid gap-3">
            {article.freeFormContent.map((content) => {
              if (!content) return null
              return (
                <div
                  style={{
                    backgroundColor: content.color.hex,
                    color: content.textColor?.hex ?? "black",
                  }}
                  className="p-5 rounded-xl"
                >
                  <h1>{content.title}</h1>
                  <RichText content={content.content} />
                </div>
              )
            })}
          </div>
        </Notification>
      )}
    </div>
  )
}

const ARTICLE_PAGE_QUERY = `
query($slug: String!) {
    article(filter: {slug: {eq: $slug}}) {
      title
      slug
      coverImage {
        url
        alt
        title
      }
      content {
        links
        value
      }
      freeFormContent {
        title
        color {
          hex
        }
        textColor {
          hex
        }
        content {
          value
        }
      }
    }
}
`
