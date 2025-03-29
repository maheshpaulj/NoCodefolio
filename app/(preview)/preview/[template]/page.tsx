import { PortfolioData } from "@/types/portfolio";
import { ModernTemplate } from "@/lib/templates/modern";

export default function PreviewPage({
  params,
  searchParams,
}: {
  params: { template: string };
  searchParams: { data: string };
}) {
  const portfolioData: PortfolioData = JSON.parse(decodeURIComponent(searchParams.data || "{}"));

  const renderPreview = () => {
    switch (params.template) {
      case "modern":
        return <ModernTemplate data={portfolioData} />;
      case "minimal":
        // Replace with MinimalTemplate component when refactored
        return <ModernTemplate data={portfolioData} />;
      case "creative":
        // Replace with CreativeTemplate component when refactored
        return <ModernTemplate data={portfolioData} />;
      default:
        return <div>Template not found</div>;
    }
  };

  return renderPreview();
}