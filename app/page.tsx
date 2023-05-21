import Link from "next/link"

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center p-24 gap-6">
      <h2>
        <Link href={"/fisk"} className="text-blue-400 hover:text-blue-200">
          👉 Link to start of navigation
        </Link>
      </h2>
      <h2>
        <Link href={"/om-affaren"} className="text-blue-400 hover:text-blue-200">
          👉 Om affären
        </Link>
      </h2>
    </main>
  )
}
