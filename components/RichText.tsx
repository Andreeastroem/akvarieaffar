import { isList } from "datocms-structured-text-utils"
import {
  renderNodeRule,
  StructuredText,
  StructuredTextDocument,
} from "react-datocms/structured-text"

export function RichText({ content }: { content: StructuredTextDocument }) {
  return (
    <StructuredText
      customNodeRules={[
        renderNodeRule(isList, ({ node, children }) => {
          console.log(node.style)
          switch (node.style) {
            case "numbered":
              return <ol></ol>
            case "bulleted":
              return <ul className="list-disc ml-5">{children}</ul>
          }
        }),
      ]}
      data={content}
    />
  )
}
