import { PortfolioData } from "@/types/portfolio";

export function ModernTemplate({ data }: { data: PortfolioData }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md p-4 z-50">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">{data.name || "Your Name"}</h1>
          <div className="space-x-6">
            <a href="#hero" className="text-gray-600 hover:text-blue-500">Home</a>
            <a href="#projects" className="text-gray-600 hover:text-blue-500">Projects</a>
            <a href="#experience" className="text-gray-600 hover:text-blue-500">Experience</a>
            <a href="#skills" className="text-gray-600 hover:text-blue-500">Skills</a>
            <a href="#contact" className="text-gray-600 hover:text-blue-500">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20 px-6 text-center pt-24">
        <h1 className="text-5xl font-bold mb-4">{data.name || "Your Name"}</h1>
        <p className="text-xl max-w-2xl mx-auto">{data.bio || "Your bio goes here"}</p>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-8">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.projects.length > 0 ? (
            data.projects.map((project, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                {project.image && (
                  <img src={project.image} alt={project.title} className="w-full h-40 object-cover rounded-md mb-4" />
                )}
                <h3 className="text-xl font-bold">{project.title}</h3>
                <p className="text-gray-600 mt-2">{project.description}</p>
                <p className="text-gray-500 mt-1 text-sm">{project.time}</p>
                {project.link && (
                  <a href={project.link} className="text-blue-500 hover:underline mt-2 block">View Project</a>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center">No projects added yet.</p>
          )}
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 px-6 bg-gray-100 max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-8">Experience</h2>
        {data.experience.length > 0 ? (
          data.experience.map((exp, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md mb-6">
              {exp.image && (
                <img src={exp.image} alt={exp.title} className="w-full h-40 object-cover rounded-md mb-4" />
              )}
              <h3 className="text-xl font-bold">{exp.title}</h3>
              <p className="text-gray-600 mt-2">{exp.description}</p>
              <p className="text-gray-500 mt-1 text-sm">{exp.time}</p>
              {exp.link && (
                <a href={exp.link} className="text-blue-500 hover:underline mt-2 block">Learn More</a>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center">No experience added yet.</p>
        )}
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-8">Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {data.skills.length > 0 ? (
            data.skills.map((skill, index) => (
              <div key={index} className="flex items-center space-x-2 bg-blue-100 p-3 rounded-lg">
                {skill.image && (
                  <img src={skill.image} alt={skill.name} className="w-8 h-8 object-cover rounded-full" />
                )}
                <span className="text-blue-800 font-medium">{skill.name}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-full">No skills added yet.</p>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-6 bg-gray-100 max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-8">Contact</h2>
        <div className="space-y-4 text-center">
          <p className="text-gray-600">Email: {data.contact.email || "Not provided"}</p>
          {data.contact.phone && <p className="text-gray-600">Phone: {data.contact.phone}</p>}
          {data.contact.linkedin && (
            <p>
              <a href={data.contact.linkedin} className="text-blue-500 hover:underline">LinkedIn</a>
            </p>
          )}
          {data.contact.github && (
            <p>
              <a href={data.contact.github} className="text-blue-500 hover:underline">GitHub</a>
            </p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 text-center">
        <p>© {new Date().getFullYear()} {data.name || "Your Name"}. All rights reserved.</p>
      </footer>
    </div>
  );
}

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
            <nav className="fixed top-0 left-0 w-full bg-white shadow-md p-4 z-50">
              <div className="max-w-5xl mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">${data.name || "Your Name"}</h1>
                <div className="space-x-6">
                  <a href="#hero" className="text-gray-600 hover:text-blue-500">Home</a>
                  <a href="#projects" className="text-gray-600 hover:text-blue-500">Projects</a>
                  <a href="#experience" className="text-gray-600 hover:text-blue-500">Experience</a>
                  <a href="#skills" className="text-gray-600 hover:text-blue-500">Skills</a>
                  <a href="#contact" className="text-gray-600 hover:text-blue-500">Contact</a>
                </div>
              </div>
            </nav>
            <section id="hero" className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20 px-6 text-center pt-24">
              <h1 className="text-5xl font-bold mb-4">${data.name || "Your Name"}</h1>
              <p className="text-xl max-w-2xl mx-auto">${data.bio || "Your bio goes here"}</p>
            </section>
            <section id="projects" className="py-16 px-6 max-w-5xl mx-auto">
              <h2 className="text-3xl font-semibold text-center mb-8">Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                ${
                  data.projects.length > 0
                    ? data.projects.map((project, index) => `
                      <div key=${index} className="bg-white p-6 rounded-lg shadow-md">
                        ${project.image ? `<img src="${project.image}" alt="${project.title}" className="w-full h-40 object-cover rounded-md mb-4" />` : ""}
                        <h3 className="text-xl font-bold">${project.title}</h3>
                        <p className="text-gray-600 mt-2">${project.description}</p>
                        <p className="text-gray-500 mt-1 text-sm">${project.time}</p>
                        ${project.link ? `<a href="${project.link}" className="text-blue-500 hover:underline mt-2 block">View Project</a>` : ""}
                      </div>
                    `).join("")
                    : `<p className="text-gray-600 text-center">No projects added yet.</p>`
                }
              </div>
            </section>
            <section id="experience" className="py-16 px-6 bg-gray-100 max-w-5xl mx-auto">
              <h2 className="text-3xl font-semibold text-center mb-8">Experience</h2>
              ${
                data.experience.length > 0
                  ? data.experience.map((exp, index) => `
                      <div key=${index} className="bg-white p-6 rounded-lg shadow-md mb-6">
                        ${exp.image ? `<img src="${exp.image}" alt="${exp.title}" className="w-full h-40 object-cover rounded-md mb-4" />` : ""}
                        <h3 className="text-xl font-bold">${exp.title}</h3>
                        <p className="text-gray-600 mt-2">${exp.description}</p>
                        <p className="text-gray-500 mt-1 text-sm">${exp.time}</p>
                        ${exp.link ? `<a href="${exp.link}" className="text-blue-500 hover:underline mt-2 block">Learn More</a>` : ""}
                      </div>
                    `).join("")
                  : `<p className="text-gray-600 text-center">No experience added yet.</p>`
              }
            </section>
            <section id="skills" className="py-16 px-6 max-w-5xl mx-auto">
              <h2 className="text-3xl font-semibold text-center mb-8">Skills</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                ${
                  data.skills.length > 0
                    ? data.skills.map((skill, index) => `
                      <div key=${index} className="flex items-center space-x-2 bg-blue-100 p-3 rounded-lg">
                        ${skill.image ? `<img src="${skill.image}" alt="${skill.name}" className="w-8 h-8 object-cover rounded-full" />` : ""}
                        <span className="text-blue-800 font-medium">${skill.name}</span>
                      </div>
                    `).join("")
                    : `<p className="text-gray-600 text-center col-span-full">No skills added yet.</p>`
                }
              </div>
            </section>
            <section id="contact" className="py-16 px-6 bg-gray-100 max-w-5xl mx-auto">
              <h2 className="text-3xl font-semibold text-center mb-8">Contact</h2>
              <div className="space-y-4 text-center">
                <p className="text-gray-600">Email: ${data.contact.email || "Not provided"}</p>
                ${data.contact.phone ? `<p className="text-gray-600">Phone: ${data.contact.phone}</p>` : ""}
                ${data.contact.linkedin ? `<p><a href="${data.contact.linkedin}" className="text-blue-500 hover:underline">LinkedIn</a></p>` : ""}
                ${data.contact.github ? `<p><a href="${data.contact.github}" className="text-blue-500 hover:underline">GitHub</a></p>` : ""}
              </div>
            </section>
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