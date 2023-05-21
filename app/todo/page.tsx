import { Inter, Kavivanar } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })
const kavivanar = Kavivanar({
  style: "normal",
  subsets: ["latin"],
  weight: "400",
})

export default async function TodoPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 pt-8">
      <h2 className={`${kavivanar.className}`}>TODO for this webpage</h2>
      <ul className={`${inter.className} list-disc`}>
        <li>✅ OAuth (maybe via google?)</li>
        <li>Stripe payment</li>
        <li>
          <span>🏗️Database (maybe vercel database?)</span>
          <ul className="list-decimal pl-4">
            <li>What products</li>
            <li>Product status (number in stock?)</li>
            <li>Product information (PIM?)</li>
          </ul>
        </li>
        <li>
          <span>CMS - what is needed?</span>
          <ul>
            <li>Advice pages</li>
            <li>Information pages</li>
            <li>✅ About page</li>
          </ul>
        </li>
        <li>
          Navigation?
          <ul className="list-decimal pl-4">
            <li>mobile</li>
            <li>desktop</li>
          </ul>
        </li>
      </ul>
    </div>
  )
}
