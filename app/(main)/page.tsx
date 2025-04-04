import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Link from "next/link";
import HowItWorks from "@/components/Howitworks";

export default function Home() {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />
      <HowItWorks/>
      </div>
  );
}
