import { PortfolioData } from "@/types/portfolio";

export function modernTemplate(data: PortfolioData) {
  return {
    "app/layout.tsx": `
      import { Inter } from "next/font/google";
      import "../styles/globals.css";

      const inter = Inter({ subsets: ["latin"] });

      export const metadata = {
        title: "${data.name || "Your Name"} - Portfolio",
        description: "${data.bio || "Portfolio website"}",
      };

      export default function RootLayout({
        children,
      }: {
        children: React.ReactNode;
      }) {
        return (
          <html lang="en">
            <body className={inter.className}>{children}</body>
          </html>
        );
      }
    `,
    "app/page.tsx": `
      export default function Home() {
        return (
          <div className="min-h-screen bg-gray-50 text-gray-800">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20 px-6 text-center">
              <h1 className="text-5xl font-bold mb-4">${data.name || "Your Name"}</h1>
              <p className="text-xl max-w-2xl mx-auto">${data.bio || "Your bio goes here"}</p>
            </section>

            {/* Projects Section */}
            <section className="py-16 px-6 max-w-5xl mx-auto">
              <h2 className="text-3xl font-semibold text-center mb-8">Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                ${
                  data.projects
                    ? data.projects.split(",").map((project, index) => `
                      <div key=${index} className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold">${project.trim()}</h3>
                        <p className="text-gray-600 mt-2">Add your project description here.</p>
                      </div>
                    `).join("")
                    : `<p className="text-gray-600 text-center">No projects added yet.</p>`
                }
              </div>
            </section>

            {/* Experience Section */}
            <section className="py-16 px-6 bg-gray-100 max-w-5xl mx-auto">
              <h2 className="text-3xl font-semibold text-center mb-8">Experience</h2>
              <p className="text-gray-600 text-center">${data.experience || "Your experience goes here"}</p>
            </section>

            {/* Skills Section */}
            <section className="py-16 px-6 max-w-5xl mx-auto">
              <h2 className="text-3xl font-semibold text-center mb-8">Skills</h2>
              <div className="flex flex-wrap justify-center gap-4">
                ${
                  data.skills
                    ? data.skills.split(",").map((skill) => `
                      <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">${skill.trim()}</span>
                    `).join("")
                    : `<p className="text-gray-600">No skills added yet.</p>`
                }
              </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-6 text-center">
              <p>© ${new Date().getFullYear()} ${data.name || "Your Name"}. All rights reserved.</p>
            </footer>
          </div>
        );
      }
    `,
    "styles/globals.css": `
      @tailwind base;
      @tailwind components;
      @tailwind utilities;
    `,
    "package.json": JSON.stringify({
      name: `${data.name.toLowerCase().replace(/\s+/g, "-")}-portfolio`,
      version: "1.0.0",
      private: true,
      scripts: { dev: "next dev", build: "next build", start: "next start" },
      dependencies: {
        "next": "latest",
        "react": "latest",
        "react-dom": "latest",
        "tailwindcss": "^3.4.1",
        "@tailwindcss/typography": "^0.5.10"
      },
      devDependencies: {
        "typescript": "^5.3.3",
        "@types/node": "^20.11.5",
        "@types/react": "^18.2.48"
      }
    }, null, 2),
    "tailwind.config.js": `
      /** @type {import('tailwindcss').Config} */
      module.exports = {
        content: [
          "./app/**/*.{js,ts,jsx,tsx}",
        ],
        theme: {
          extend: {},
        },
        plugins: [require("@tailwindcss/typography")],
      };
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
          "incremental": true
        },
        "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
        "exclude": ["node_modules"]
      }
    `,
    "next.config.js": `module.exports = {};`
  };
}