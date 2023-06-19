import { notFound } from "next/navigation"
import { StructuredText, StructuredTextDocument } from "react-datocms"

import CMSRequest from "../../lib/cms/request"

type TAboutPage = {
  historyPage: {
    title: string
    content: {
      value: StructuredTextDocument
    }
    author: {
      firstname: string
      lastname: string
      image?: {
        url: string
      }
    }
  }
}

export default async function AboutPage() {
  const data = await CMSRequest<TAboutPage>({ query: CMS_QUERY })

  if (!data) {
    return notFound()
  }

  const { historyPage: page } = data

  return (
    <div className="flex flex-col gap-5 pt-8">
      <h1 className="">{page.title}</h1>
      <StructuredText data={page.content} />
      <div className="w-full justify-center flex gap-1 text-gray-400/75">
        <span>Skrivet av</span>
        <span>{page.author.firstname}</span>
        <span>{page.author.lastname}</span>
      </div>
    </div>
  )
}

const CMS_QUERY = `
  query {
    historyPage {
      title 
      content {
        value
      }
      author {
        firstname
        lastname
        image {
          url
        }
      }
    }
  }
`
