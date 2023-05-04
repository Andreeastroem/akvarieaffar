import Image from "next/image";
import { Inter, Kavivanar } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const kavivanar = Kavivanar({
  style: "normal",
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className={`${kavivanar.className}`}>TODO for this webpage</h1>
      <ul className={`${inter.className} list-disc`}>
        <li>OAuth (maybe via google?)</li>
        <li>Stripe payment</li>
        <li>
          <span>Database (maybe vercel database?)</span>
          <ul className="list-decimal pl-4">
            <li>What products</li>
            <li>Product status (number in stock?)</li>
            <li>Product information (PIM?)</li>
          </ul>
        </li>
        <li>CMS - what is needed?</li>
      </ul>
    </main>
  );
}
