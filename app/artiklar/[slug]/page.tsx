import { notFound } from "next/navigation"
import { StructuredTextDocument } from "react-datocms"

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
  preamble: string
  content: {
    links: Array<string>
    value: StructuredTextDocument
  }
  freeFormContent: Array<{
    title: string
    color: {
      hex: string
    }
    content: StructuredTextDocument
  }>
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
    <div>
      <RichText content={article.content.value} />
      {article.freeFormContent.map((content) => {
        return (
          <div style={{ backgroundColor: content.color.hex }} className="text-black">
            <h2>{content.title}</h2>
            <RichText content={content.content} />
          </div>
        )
      })}
    </div>
  )
}

const ARTICLE_PAGE_QUERY = `
query($slug: String!) {
    article(filter: {slug: {eq: $slug}}) {
      title
      slug
      preamble
      content {
        links
        value
      }
      freeFormContent {
        title
        color {
          hex
        }
        content {
          value
        }
      }
    }
}
`
