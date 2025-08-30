import { NextRequest, NextResponse } from "next/server";
import { SerializablePortfolio, TemplateId } from "@/types/portfolio";
import { deleteVercelProject } from "@/lib/vercel";
import { generateVercelProjectName } from "@/lib/utils";

// 1. Import all your template generator functions
import { modernTemplate } from "@/lib/templates/modernGenerator";
import { minimalTemplate } from "@/lib/templates/minimalGenerator";
import { creativeTemplate } from "@/lib/templates/creativeGenerator";
import { galaxyTemplate } from "@/lib/templates/galaxyGenerator";
import { neonTemplate } from "@/lib/templates/neonGenerator";

// --- POST Handler (Create & Update Deployments) ---
export async function POST(req: NextRequest) {
  try {
    const { portfolioData }: { portfolioData: SerializablePortfolio } = await req.json();

    // 2. Create a map of template IDs to their generator functions
    // This makes the code scalable. To add a new template, just add it here.
    const generatorMap: Record<TemplateId, (data: SerializablePortfolio) => Record<string, string>> = {
      modern: modernTemplate,
      minimal: minimalTemplate,
      creative: creativeTemplate,
      galaxy: galaxyTemplate,
      neon: neonTemplate,
    };

    // 3. Select the correct generator based on the portfolio data, with a safe fallback
    const selectedGenerator = generatorMap[portfolioData.template] || modernTemplate;

    // 4. Generate the files using the dynamically selected generator
    const files = selectedGenerator(portfolioData);

    // The rest of your logic remains the same, as it's already generic!
    const vercelFiles = Object.entries(files).map(([filePath, content]) => ({
      file: filePath,
      data: content,
    }));

    const uniqueProjectName = generateVercelProjectName(portfolioData.name, portfolioData.id);
    const apiUrl = `https://api.vercel.com/v13/deployments${portfolioData.vercelProjectId ? `?projectId=${portfolioData.vercelProjectId}` : ''}`;

    const body = {
      name: uniqueProjectName,
      files: vercelFiles,
      projectSettings: { framework: "nextjs" },
      target: "production" as const,
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Vercel API Error:", result.error);
      return NextResponse.json({ error: result.error.message || "Deployment failed." }, { status: response.status });
    }

    // Return the URL based on the name we generated, which is the most reliable source.
    return NextResponse.json({
      url: `https://${uniqueProjectName}.vercel.app`,
      projectId: result.projectId,
    });

  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}

// --- DELETE Handler (No changes needed) ---
export async function DELETE(req: NextRequest) {
    try {
        const { projectId } = await req.json();

        if (!projectId) {
          return NextResponse.json({ error: "Project ID is required." }, { status: 400 });
        }
    
        await deleteVercelProject(projectId);
    
        return new NextResponse(null, { status: 204 });
    
      } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
        console.error("Internal Server Error:", error);
        return NextResponse.json({ error: error.message || "An unexpected error occurred." }, { status: 500 });
      }
}