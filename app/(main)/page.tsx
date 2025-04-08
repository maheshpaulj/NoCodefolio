import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/Howitworks";
import Footer from "@/components/Footer/index";
import ExploreTemplates from "@/components/ExploreTemplates";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <HowItWorks/>
      <ExploreTemplates/>
      </div>
  );
}
