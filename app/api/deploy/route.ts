import { NextRequest, NextResponse } from "next/server";
import { modernTemplate } from "@/lib/templates/modernGenerator"; // Updated import

export async function POST(req: NextRequest) {
  const { portfolioData } = await req.json();

  // Generate the file structure using modernTemplate
  const files = modernTemplate(portfolioData);

  // Convert files into Vercel API format (array of { file, data })
  const vercelFiles = Object.entries(files).map(([filePath, content]) => ({
    file: filePath,
    data: Buffer.from(content).toString(), // Base64 encode the file content
  }));

  // Deploy to Vercel
  const response = await fetch("https://api.vercel.com/v13/deployments", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: `${portfolioData.name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
      files: vercelFiles, // Send individual files, not a ZIP
      projectSettings: {
        framework: "nextjs", // Tell Vercel this is a Next.js project
      },
    }),
  });

  const result = await response.json();
  if (!response.ok) {
    return NextResponse.json({ error: result.error }, { status: response.status });
  }

  return NextResponse.json({ url: result.url });
}