import JSZip from "jszip";
import { PortfolioData } from "@/types/portfolio";
import { modernTemplate } from "./templates/modernGenerator";
import { minimalTemplate } from "./templates/minimalGenerator";
import { creativeTemplate } from "./templates/creativeGenerator";
import { galaxyTemplate } from "./templates/galaxyGenerator";
import { neonTemplate } from "./templates/neonGenerator";

export async function generatePortfolio(data: PortfolioData) {
  const zip = new JSZip();

  const templates = {
    modern: modernTemplate,
    minimal: minimalTemplate,
    creative: creativeTemplate,
    galaxy: galaxyTemplate,
    neon: neonTemplate,
  } as const;

  const selectedTemplate = templates[data.template] || modernTemplate;
  const projectFiles = selectedTemplate(data);

  for (const [path, content] of Object.entries(projectFiles)) {
    zip.file(path, content);
  }

  return {
    download: (filename: string) => {
      zip.generateAsync({ type: "blob" }).then((content) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(content);
        link.download = filename;
        link.click();
      });
    },
  };
}