"use client";

import { useState } from "react";
import FormSection from "@/components/FormSection";
import LivePreview from "@/components/LivePreview";
import GeneratedOutput from "@/components/GeneratedOutput";
import { Button } from "@/components/ui/button";
import { PortfolioData } from "@/types/portfolio";

export default function GeneratePage() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    name: "",
    bio: "",
    projects: [],
    experience: [],
    skills: [],
    contact: { email: "" },
    template: "modern",
  });

  const handleViewInNewTab = () => {
    const url = `/preview/${portfolioData.template}?data=${encodeURIComponent(JSON.stringify(portfolioData))}`;
    window.open(url, "_blank");
  };

  return (
    <div className="p-8 bg-white">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Create Your Portfolio</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <FormSection onChange={setPortfolioData} portfolioData={portfolioData} />
          {portfolioData.name && (
            <Button
              onClick={handleViewInNewTab}
              className="bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            >
              View in New Tab
            </Button>
          )}
        </div>
        <div>
          <LivePreview portfolioData={portfolioData} />
          {portfolioData.name && <GeneratedOutput portfolioData={portfolioData} />}
        </div>
      </div>
    </div>
  );
}