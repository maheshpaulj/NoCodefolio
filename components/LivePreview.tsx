import { PortfolioData } from "@/types/portfolio";
import { ModernTemplate } from "@/lib/templates/modern";

interface LivePreviewProps {
  portfolioData: PortfolioData;
}

export default function LivePreview({ portfolioData }: LivePreviewProps) {
  const renderPreview = () => {
    switch (portfolioData.template) {
      case "modern":
        return <ModernTemplate data={portfolioData} />;
      case "minimal":
        // Replace with MinimalTemplate component when refactored
        return <ModernTemplate data={portfolioData} />;
      case "creative":
        // Replace with CreativeTemplate component when refactored
        return <ModernTemplate data={portfolioData} />;
      default:
        return null;
    }
  };

  return (
    <div className="border border-gray-200 rounded p-4 bg-white shadow-sm max-h-[500px] overflow-y-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-2">Live Preview</h2>
      {renderPreview()}
    </div>
  );
}