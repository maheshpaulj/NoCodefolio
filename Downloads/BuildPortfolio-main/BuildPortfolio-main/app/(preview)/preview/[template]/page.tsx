"use client";
import { use } from "react"; // Import use from React
import { PortfolioData } from "@/types/portfolio";
import { ModernTemplate } from "@/lib/templates/modern";
// import { minimalTemplate } from "@/lib/templates/minimal"; // Uncomment when implemented
// import { creativeTemplate } from "@/lib/templates/creative"; // Uncomment when implemented

export default function PreviewPage({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: {
  params: Promise<{ template: string }>; // Type params as a Promise
  searchParams: Promise<{ data?: string }>; // Type searchParams as a Promise
}) {
  // Unwrap params and searchParams with React.use()
  const params = use(paramsPromise);
  const searchParams = use(searchParamsPromise);

  // Parse the portfolio data from the query string, fallback to an empty object if not provided
  const portfolioData: PortfolioData = searchParams.data
    ? JSON.parse(decodeURIComponent(searchParams.data))
    : {
        name: "",
        bio: "",
        profileImage: "",
        resumeLink: "",
        aboutText: "",
        workExperience: [],
        skills: [],
        projects: [],
        contact: { email: "", linkedin: "" },
        template: params.template as "modern" | "minimal" | "creative",
      };

  const renderPreview = () => {
    switch (params.template) {
      case "modern":
        return <ModernTemplate data={portfolioData} />;
      case "minimal":
        // return <MinimalTemplate data={portfolioData} />; // Uncomment when implemented
        return <div>Minimal template not yet implemented</div>;
      case "creative":
        // return <CreativeTemplate data={portfolioData} />; // Uncomment when implemented
        return <div>Creative template not yet implemented</div>;
      default:
        return <div>Template not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {renderPreview()}
    </div>
  );
}