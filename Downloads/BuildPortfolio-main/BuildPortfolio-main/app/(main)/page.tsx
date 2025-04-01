import Navbar from "@/components/Navbar";  // Import the Navbar
import HeroSection from "@/components/Herosection";  // Import the HeroSection
import FeaturesSection from "@/components/FeaturesSection";  // Import the FeaturesSection
import CreativePortfolioSection from "@/components/CreativePortfolioSection";  // Import the CreativePortfolioSection
import PortfolioStepsSection from "@/components/PortfolioStepsSection";  // Import the PortfolioStepsSection

export default function Home() {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Creative Portfolio Section */}
      <CreativePortfolioSection />

      {/* Portfolio Steps Section */}
      <PortfolioStepsSection />
    </div>
  );
}
