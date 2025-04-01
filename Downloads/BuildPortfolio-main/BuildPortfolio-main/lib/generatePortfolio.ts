import JSZip from "jszip";
import { PortfolioData } from "@/types/portfolio";
import { modernTemplate } from "./templates/modern";
// import { minimalTemplate } from "./templates/minimal";
// import { creativeTemplate } from "./templates/creative";

export async function generatePortfolio(data: PortfolioData) {
  const zip = new JSZip();

  const templates = {
    modern: modernTemplate,
    minimal: modernTemplate,
    creative: modernTemplate,
    // minimal: minimalTemplate,
    // creative: creativeTemplate,
  };

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