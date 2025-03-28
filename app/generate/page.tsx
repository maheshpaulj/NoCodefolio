"use client";

import { useState } from "react";
import FormSection from "@/components/FormSection";
import GeneratedOutput from "@/components/GeneratedOutput";
import { PortfolioData } from "@/types/portfolio";

export default function GeneratePage() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Create Your Portfolio</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FormSection onSubmit={setPortfolioData} />
        {portfolioData && <GeneratedOutput portfolioData={portfolioData} />}
      </div>
    </div>
  );
}