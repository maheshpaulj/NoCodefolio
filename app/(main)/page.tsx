import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Link from "next/link";
import HowItWorks from "@/components/Howitworks";
import Footer from "@/components/Footer/index";
import ExploreTemplates from "@/components/ExploreTemplates";

export default function Home() {
  return (
    <div>
      <Navbar />

      <HeroSection />
      <HowItWorks/>
      <ExploreTemplates />
      <Footer/>
      </div>
  );
}
