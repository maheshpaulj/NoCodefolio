"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Link as ScrollLink } from "react-scroll"; 

export default function Navbar() {

  return (
    <nav
      className={`fixed top-0 left-0 w-full bg-gradient-to-r from-blue-500 to-teal-600 shadow-2xl p-4 flex justify-between items-center z-50 backdrop-blur-lg`}
    >
      {/* Brand Name */}
      <Link href="/" className="text-4xl font-extrabold text-white hover:text-yellow-400 transition-colors ease-in-out duration-300">
        Portfolio Builder
      </Link>

      {/* Navigation Links */}
      <ul className="flex items-center space-x-12 text-lg text-white font-semibold">
        <li className="group">
          <Link
            href="/"
            aria-label="Home"
            className="relative px-3 py-1 transition-all group-hover:text-yellow-400 ease-in-out duration-300"
          >
            Home
            <span className="absolute inset-x-0 bottom-0 h-1 bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-all ease-in-out duration-300"></span>
          </Link>
        </li>
        <li className="group">
          <Link
            href="/generate"
            aria-label="Generate"
            className="relative px-3 py-1 transition-all group-hover:text-yellow-400 ease-in-out duration-300"
          >
            Generate
            <span className="absolute inset-x-0 bottom-0 h-1 bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-all ease-in-out duration-300"></span>
          </Link>
        </li>
        <li className="group">
          <Link
            href="/templates"
            aria-label="Templates"
            className="relative px-3 py-1 transition-all group-hover:text-yellow-400 ease-in-out duration-300"
          >
            Templates
            <span className="absolute inset-x-0 bottom-0 h-1 bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-all ease-in-out duration-300"></span>
          </Link>
        </li>
        <li className="group">
          {/* ScrollLink to the "How It Works" section */}
          <ScrollLink
            to="how-it-works"  // Scroll to HowItWorks section
            smooth={true}
            duration={800}  // Duration for scroll effect
            offset={-70}    // Adjust to make it appear at the right position
            className="relative px-3 py-1 transition-all group-hover:text-yellow-400 ease-in-out duration-300"
          >
            How It Works
            <span className="absolute inset-x-0 bottom-0 h-1 bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-all ease-in-out duration-300"></span>
          </ScrollLink>
        </li>
        <li className="group">
          <Link
            href="/faq"
            aria-label="FAQ"
            className="relative px-3 py-1 transition-all group-hover:text-yellow-400 ease-in-out duration-300"
          >
            FAQ
            <span className="absolute inset-x-0 bottom-0 h-1 bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-all ease-in-out duration-300"></span>
          </Link>
        </li>
        <li>
          <Button
            asChild
            className="bg-yellow-500 text-black hover:bg-yellow-600 transition-all hover:scale-105 ease-in-out duration-300 shadow-xl rounded-full px-8 py-3"
          >
            <Link href="/generate" aria-label="Get Started">Get Started</Link>
          </Button>
        </li>
      </ul>
    </nav>
  );
}
