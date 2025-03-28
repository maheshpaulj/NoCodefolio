import { PortfolioData } from "@/types/portfolio";

export function modernTemplate(data: PortfolioData) {
  return {
    "app/page.tsx": `
      export default function Home() {
        return (
          <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-4xl font-bold">${data.name}</h1>
            <p className="text-lg mt-2">${data.bio}</p>
            <h2 className="text-2xl mt-6">Projects</h2>
            <p>${data.projects}</p>
            <h2 className="text-2xl mt-6">Experience</h2>
            <p>${data.experience}</p>
            <h2 className="text-2xl mt-6">Skills</h2>
            <p>${data.skills}</p>
          </div>
        );
      }
    `,
    "package.json": JSON.stringify({
      name: `${data.name.toLowerCase()}-portfolio`,
      version: "1.0.0",
      private: true,
      scripts: { dev: "next dev", build: "next build", start: "next start" },
      dependencies: { "next": "latest", "react": "latest", "react-dom": "latest" },
    }, null, 2),
    "next.config.js": `module.exports = {}`,
  };
}