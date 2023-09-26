"use client"

import { StructuredText, StructuredTextDocument } from "react-datocms/structured-text"

export default function StructuredTextClientWrapper({ data }: { data: StructuredTextDocument }) {
  return <StructuredText data={data} />
}
