import { PortfolioData } from "@/types/portfolio";
import { motion } from "framer-motion";

interface CleanfolioTemplateProps {
  data: PortfolioData;
  isEditable?: boolean;
  onUpdate?: (data: PortfolioData) => void;
}

export function CleanfolioTemplate({ data }: CleanfolioTemplateProps) {
  return (
    <div className="font-sans bg-white text-gray-900">
      <header className="py-16 text-center bg-gray-50">
        <h1 className="text-5xl font-bold">{data.name || "Your Name"}</h1>
        <p className="text-xl text-gray-600 mt-4" dangerouslySetInnerHTML={{ __html: data.bio || "" }} />
        {data.resumeLink && (
          <a
            href={data.resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 px-6 py-2 border border-gray-900 hover:bg-gray-900 hover:text-white transition rounded"
          >
            Download CV
          </a>
        )}
      </header>

      {data.aboutText && (
        <section className="py-20 px-6 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">About Me</h2>
          <p className="text-lg text-gray-700">{data.aboutText}</p>
        </section>
      )}

      {data.skills?.length > 0 && (
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-semibold text-center mb-8">Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {data.skills.map((skill, i) => (
                <div key={i} className="text-center">
                  {skill.icon && <img src={skill.icon} alt={skill.name} className="w-12 h-12 mx-auto mb-2" />}
                  <p className="font-medium">{skill.name}</p>
                  <p className="text-sm text-gray-500">{skill.level}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {data.projects?.length > 0 && (
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-semibold text-center mb-12">Projects</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {data.projects.map((project, i) => (
                <div key={i} className="border p-6 rounded-lg shadow-sm hover:shadow-lg transition">
                  {project.image && <img src={project.image} alt={project.title} className="mb-4 rounded" />}
                  <h3 className="text-2xl font-bold">{project.title}</h3>
                  <div className="mt-4 flex gap-4">
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" className="text-blue-600 hover:underline">GitHub</a>
                    )}
                    {project.liveDemoLink && (
                      <a href={project.liveDemoLink} target="_blank" className="text-blue-600 hover:underline">Live</a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer className="text-center py-10 border-t">
        <p>&copy; {new Date().getFullYear()} {data.name || "Your Name"}. All rights reserved.</p>
      </footer>
    </div>
  );
}

export function cleanfolioTemplate(data: PortfolioData) {
  return {
    "app/page.tsx": `
      "use client";
      export default function Page() {
        return (
          <main className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold">${data.name}</h1>
            <p className="mt-4 text-gray-600">${data.bio}</p>
          </main>
        );
      }
    `,
    "package.json": JSON.stringify({
      name: data.name.toLowerCase().replace(/\s+/g, "-") + "-portfolio",
      version: "1.0.0",
      scripts: {
        dev: "next dev",
        build: "next build",
        start: "next start",
      },
      dependencies: {
        next: "latest",
        react: "latest",
        "react-dom": "latest",
        tailwindcss: "^3.4.1"
      }
    }, null, 2),
    "tailwind.config.js": `
      module.exports = {
        content: [
          "./app/**/*.{js,ts,jsx,tsx}",
          "./pages/**/*.{js,ts,jsx,tsx}",
          "./components/**/*.{js,ts,jsx,tsx}"
        ],
        theme: {
          extend: {
            fontFamily: {
              sans: ['Poppins', 'sans-serif'],
            },
          },
        },
        plugins: [],
      };
    `,
    "postcss.config.js": `
      module.exports = {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      };
    `,
    "styles/globals.css": `
      @tailwind base;
      @tailwind components;
      @tailwind utilities;

      html, body {
        margin: 0;
        padding: 0;
        font-family: 'Poppins', sans-serif;
        background-color: #f9f9f9;
      }

      .font-sans {
        font-family: 'Poppins', sans-serif;
      }
    `,
    "tsconfig.json": `
      {
        "compilerOptions": {
          "target": "es5",
          "lib": ["dom", "dom.iterable", "esnext"],
          "allowJs": true,
          "skipLibCheck": true,
          "strict": true,
          "forceConsistentCasingInFileNames": true,
          "noEmit": true,
          "esModuleInterop": true,
          "module": "esnext",
          "moduleResolution": "node",
          "resolveJsonModule": true,
          "isolatedModules": true,
          "jsx": "preserve",
          "incremental": true,
          "baseUrl": "."
        },
        "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
        "exclude": ["node_modules"]
      }
    `,
    "next.config.js": `
      /** @type {import('next').NextConfig} */
      const nextConfig = {
        reactStrictMode: true,
      };
      module.exports = nextConfig;
    `,
  };
}
  