import Image from "next/image";
import { Inter, Kavivanar } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });
const kavivanar = Kavivanar({
  style: "normal",
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center p-24 gap-6">
      <h2>
        <Link href={"/fisk"} className="text-blue-400 hover:text-blue-200">
          👉 Link to start of navigation
        </Link>
      </h2>
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
      </ul>
    </main>
  );
}
