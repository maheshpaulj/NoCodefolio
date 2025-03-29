"use client";

import { Input } from "@/components/ui/input";
import { PortfolioData } from "@/types/portfolio";

interface FormSectionProps {
  onChange: (data: PortfolioData) => void;
  portfolioData: PortfolioData;
}

export default function FormSection({ onChange, portfolioData }: FormSectionProps) {
  const handleChange = (field: keyof PortfolioData, value: string) => {
    onChange({ ...portfolioData, [field]: value });
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="Your Name"
        value={portfolioData.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />
      <Input
        placeholder="Bio"
        value={portfolioData.bio}
        onChange={(e) => handleChange("bio", e.target.value)}
      />
      <Input
        placeholder="Projects (comma-separated)"
        value={portfolioData.projects}
        onChange={(e) => handleChange("projects", e.target.value)}
      />
      <Input
        placeholder="Experience"
        value={portfolioData.experience}
        onChange={(e) => handleChange("experience", e.target.value)}
      />
      <Input
        placeholder="Skills (comma-separated)"
        value={portfolioData.skills}
        onChange={(e) => handleChange("skills", e.target.value)}
      />
      <select
        value={portfolioData.template}
        onChange={(e) => handleChange("template", e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="modern">Modern</option>
        <option value="minimal">Minimal</option>
        <option value="creative">Creative</option>
      </select>
    </div>
  );
}