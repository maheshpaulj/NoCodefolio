"use client";

import { Button } from "@/components/ui/button";
import { generatePortfolio } from "@/lib/generatePortfolio";
import { vercelDeploy } from "@/lib/vercelDeploy";
import { PortfolioData } from "@/types/portfolio";

interface GeneratedOutputProps {
  portfolioData: PortfolioData;
}

export default function GeneratedOutput({ portfolioData }: GeneratedOutputProps) {
  const handleDownload = async () => {
    const zip = await generatePortfolio(portfolioData);
    zip.download("portfolio.zip");
  };

  const handleDeploy = async () => {
    const url = await vercelDeploy(portfolioData);
    window.open(url, "_blank");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Your Portfolio is Ready!</h2>
      <Button onClick={handleDownload}>Download as ZIP</Button>
      <Button onClick={handleDeploy}>Deploy to Vercel</Button>
    </div>
  );
}