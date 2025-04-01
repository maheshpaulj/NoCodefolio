"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-r from-blue-500 to-teal-500 text-white py-20 px-8 min-h-screen flex items-center justify-center">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black opacity-30"></div>

      {/* Content Wrapper */}
      <div className="relative z-10 flex items-center justify-between max-w-screen-xl mx-auto">
        {/* Left Section */}
        <div className="max-w-2xl space-y-6">
          <h1 className="text-5xl font-extrabold leading-tight text-white animate__animated animate__fadeIn animate__delay-1s">
            Build Your Portfolio Without Any Coding
          </h1>
          <p className="text-lg text-gray-100 mb-6">
            Create, customize, and launch your portfolio effortlessly with our user-friendly platform. Choose from stunning templates and showcase your work to the world in no time.
          </p>
          <div className="flex gap-6">
            <Link href="/generate">
              <Button className="bg-yellow-500 text-black hover:bg-yellow-600 transition duration-300 px-8 py-4 rounded-lg text-xl transform hover:scale-105">
                Get Started
              </Button>
            </Link>
            <Link href="/learn-more">
              <Button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-500 transition duration-300 px-8 py-4 rounded-lg text-xl transform hover:scale-105">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
