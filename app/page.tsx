import LandingHeader from "@/components/LandingHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {/* <LandingHeader /> */}
      <main className="text-center space-y-6">
        <h1 className="text-4xl font-bold">
          Build Your Portfolio in Seconds
        </h1>
        <p className="text-lg text-gray-600">
          No coding required. Create, download, or deploy instantly.
        </p>
        <Link href="/generate">
          <Button size="lg">Get Started</Button>
        </Link>
      </main>
    </div>
  );
}