"use client";

import { useState } from "react";
import { PortfolioData } from "@/types/portfolio";
import { Button } from "@/components/ui/button";
import { FaExternalLinkAlt } from "react-icons/fa";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { ModernTemplate } from "@/lib/templates/modern";
import { modernTemplate } from "@/lib/templates/modern"; // Add the minimal template
import { CreativeTemplate } from "@/lib/templates/CreativeTemplate"; // Add the creative template
import { creativeTemplate } from "@/lib/templates/CreativeTemplate"; // Add the creative template

interface LivePreviewProps {
  portfolioData: PortfolioData;
  onUpdate: (data: PortfolioData) => void;
}

export default function LivePreview({ portfolioData, onUpdate }: LivePreviewProps) {
  const [data, setData] = useState(portfolioData);

  const handleUpdate = (newData: PortfolioData) => {
    setData(newData);
    onUpdate(newData);
  };

  const addWorkExperience = () => {
    const newData = {
      ...data,
      workExperience: [
        ...data.workExperience,
        { title: "New Role", company: "Company", duration: "YYYY-Present", description: "Description" },
      ],
    };
    setData(newData);
    onUpdate(newData);
  };

  const addSkill = () => {
    const newData = {
      ...data,
      skills: [...data.skills, { name: "New Skill", level: "Basic", icon: "" }],
    };
    setData(newData);
    onUpdate(newData);
  };

  const addProject = () => {
    const newData = {
      ...data,
      projects: [...data.projects, { title: "New Project", image: "", githubLink: "", liveDemoLink: "" }],
    };
    setData(newData);
    onUpdate(newData);
  };

  const viewInNewTab = () => {
    const encodedData = encodeURIComponent(JSON.stringify(data));
    const previewUrl = `/preview/${data.template}?data=${encodedData}`;
    window.open(previewUrl, "_blank");
  };

  const downloadPortfolio = async () => {
    const zip = new JSZip();
    const files: Record<string, string> =
      data.template === "modern"
        ? modernTemplate(data)
        : data.template === "creative"
        ? creativeTemplate(data)
        : {};
    Object.entries(files).forEach(([filePath, content]) => {
      zip.file(filePath, content);
    });
    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, `${data.name.toLowerCase().replace(/\s+/g, "-") || "portfolio"}-portfolio.zip`);
  };

  const templateComponents: Record<string, React.ComponentType<any>> = {
    modern: ModernTemplate,
    creative: CreativeTemplate, // Added creative template
  };

  const SelectedTemplate = templateComponents[data.template] || ModernTemplate;

  return (
    <div className="w-full my-8 bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 flex justify-between items-center bg-gray-50 border-b border-gray-200">
        <h2 className="text-lg font-bold">
          Live Preview - {data.template.charAt(0).toUpperCase() + data.template.slice(1) || "Unknown"}
        </h2>
        <div className="flex gap-2">
          <Button onClick={viewInNewTab} className="bg-blue-500 hover:bg-blue-600 text-sm">
            <FaExternalLinkAlt className="mr-1" /> View in New Tab
          </Button>
          <Button onClick={downloadPortfolio} className="bg-green-500 hover:bg-green-600 text-sm">
            Download
          </Button>
          <Button onClick={() => alert("Deploy TBD")} className="bg-purple-500 hover:bg-purple-600 text-sm">
            Deploy
          </Button>
        </div>
      </div>
      <div className="max-h-[70vh] overflow-y-auto">
        <SelectedTemplate
          data={data}
          isEditable={true}
          onUpdate={handleUpdate}
          onAddWorkExperience={addWorkExperience}
          onAddSkill={addSkill}
          onAddProject={addProject}
        />
      </div>
    </div>
  );
}
