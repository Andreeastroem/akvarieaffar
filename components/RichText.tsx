import { isHeading, isList, isListItem } from "datocms-structured-text-utils"
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
          switch (node.style) {
            case "numbered":
              return (
                <ol className="list-decimal grid gap-3 italic max-w-xl mx-auto py-6">{children}</ol>
              )
            case "bulleted":
              return <ul className="list-disc grid gap-3 italic max-w-xl mx-auto">{children}</ul>
          }
        }),
        renderNodeRule(isListItem, ({ node, children, key }) => {
          console.log("node", node.type)
          return (
            <li className="" key={key}>
              {children}
            </li>
          )
        }),
        renderNodeRule(isHeading, ({ node, children }) => {
          switch (node.level) {
            case 1:
              return <h1 className="text-3xl font-bold">{children}</h1>
            case 2:
              return <h2 className="text-2xl font-bold">{children}</h2>
            case 3:
              return <h3 className="text-xl font-bold">{children}</h3>
            case 4:
              return <h4 className="text-lg font-bold">{children}</h4>
            case 5:
              return <h5 className="text-base font-bold">{children}</h5>
            case 6:
              return <h6 className="text-sm font-bold">{children}</h6>
          }
        }),
      ]}
      data={content}
    />
  )
}
