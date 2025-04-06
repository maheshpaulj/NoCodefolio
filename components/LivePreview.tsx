"use client";

import { useState } from "react";
import { PortfolioData } from "@/types/portfolio";
import { Button } from "@/components/ui/button";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { ModernTemplate } from "@/lib/templates/modern";
import { modernTemplate } from "@/lib/templates/modernGenerator";
import { CreativeTemplate } from "@/lib/templates/CreativeTemplate";
import { FaDownload, FaExternalLinkAlt, FaLink } from "react-icons/fa";
import Image from "next/image";

interface LivePreviewProps {
  portfolioData: PortfolioData;
  onUpdate: (data: PortfolioData) => void;
}

export default function LivePreview({ portfolioData, onUpdate }: LivePreviewProps) {
  const [data, setData] = useState(portfolioData);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployStatus, setDeployStatus] = useState<null | string>(null);
  const [deployUrl, setDeployUrl] = useState<string | null>(null);

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
      data.template === "modern" ? modernTemplate(data) : {};
    Object.entries(files).forEach(([filePath, content]) => {
      zip.file(filePath, content);
    });
    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, `${data.name.toLowerCase().replace(/\s+/g, "-") || "portfolio"}-portfolio.zip`);
  };

  const cleanVercelUrl = (url: string) => {
    try {
      const parsed = new URL(/^https?:\/\//.test(url) ? url : `https://${url}`);
      const parts = parsed.hostname.split(".");
      const subdomain = parts[0]; // e.g., nigesh-kumar-1743930086022-ayk2hsmwk-buildportfolios-projects
      const cleanSub = subdomain.split("-").slice(0, 3).join("-"); // nigesh-kumar-1743930086022
      return `https://${cleanSub}.vercel.app/`;
    } catch (err) {
      console.error("Error parsing URL:", err);
      return url; // fallback if malformed
    }
  };
  

  const deployToVercel = async () => {
    setIsDeploying(true);
    setDeployStatus(null);
    setDeployUrl(null);

    try {
      const response = await fetch("/api/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ portfolioData: data }),
      });

      if (!response.ok) {
        throw new Error("Deployment failed");
      }

      const { url } = await response.json();
      const cleanedUrl = cleanVercelUrl(url);

      setTimeout(() => {
        setIsDeploying(false);
        setDeployStatus("✅ Successfully deployed!");
        setDeployUrl(cleanedUrl);
      }, 60000); // 1 min delay to simulate deployment time
    } catch (err) {
      console.error("Deployment failed. error msg:", err);
      setTimeout(() => {
        setIsDeploying(false);
        setDeployStatus("❌ Deployment failed. Please try again.");
      }, 60000);
    }
  };

  const templateComponents: Record<string, React.ComponentType<any>> = { // eslint-disable-line @typescript-eslint/no-explicit-any
    modern: ModernTemplate,
    creative: CreativeTemplate,
  };

  const SelectedTemplate = templateComponents[data.template] || ModernTemplate;

  // If deploying or deployment completed, show only status
  if (isDeploying || deployStatus) {
    return (
      <div className="w-full my-8 flex flex-col items-center justify-center py-20 gap-4">
        {isDeploying ? (
          <>
            <img //eslint-disable-line @next/next/no-img-element
              src="/vercel.svg"
              alt="Deploying..."
              className="w-24 h-24 animate-bounce bg-black p-4 rounded-2xl"
            />
            <p className="text-sm text-gray-600">Deploying to Vercel... hang tight 🕐</p>
          </>
        ) : (
          <>
            <p className="text-lg font-semibold">{deployStatus}</p>
            {deployUrl && (
              <a
                href={deployUrl.startsWith("http") ? deployUrl : `https://${deployUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white"
              >
                <FaLink className="mr-2" /> Visit Portfolio
              </a>
            )}
          </>
        )}
      </div>
    );
  }

  // Otherwise, show the live preview container
  return (
    <div className="w-full my-8 bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 flex justify-between items-center bg-gray-50 border-b border-gray-200">
        <h2 className="text-lg font-bold">
          Live Preview - {data.template.charAt(0).toUpperCase() + data.template.slice(1) || "Unknown"}
        </h2>
        <div className="flex gap-2 items-center">
          <Button onClick={viewInNewTab} className="bg-blue-500 hover:bg-blue-600 text-sm cursor-pointer">
            <FaExternalLinkAlt className="mr-1" /> View in New Tab
          </Button>
          <Button onClick={downloadPortfolio} className="bg-green-500 hover:bg-green-600 text-sm cursor-pointer">
            <FaDownload className="mr-1" /> Download
          </Button>
          <Button onClick={deployToVercel} className="bg-black hover:bg-black/80 text-sm flex items-center gap-2 cursor-pointer">
            <Image src="/vercel.svg" alt="Vercel" className="w-4 h-4" width={16} height={16} />
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