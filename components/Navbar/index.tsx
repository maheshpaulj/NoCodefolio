import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md p-4 flex justify-between items-center z-50">
      <Link href="/" className="text-2xl font-bold text-gray-800">
        Portfolio Builder
      </Link>
      <div className="flex items-center space-x-6">
        <Link href="/" className="text-gray-600 hover:text-blue-500 transition-colors">
          Home
        </Link>
        <Link href="/generate" className="text-gray-600 hover:text-blue-500 transition-colors">
          Generate
        </Link>
        <Link href="/templates" className="text-gray-600 hover:text-blue-500 transition-colors">
          Templates
        </Link>
        <Button
          asChild
          className="bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          <Link href="/generate">Get Started</Link>
        </Button>
      </div>
    </nav>
  );
}