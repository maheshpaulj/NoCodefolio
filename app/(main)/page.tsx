import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-white">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Build Your Portfolio in Seconds
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        No coding required. Create, download, or deploy instantly.
      </p>
      <Link href="/generate">
        <Button
          size="lg"
          className="bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          Get Started
        </Button>
      </Link>
    </div>
  );
}