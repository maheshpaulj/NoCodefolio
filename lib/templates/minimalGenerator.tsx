import { PortfolioData } from "@/types/portfolio";

function getFinalData(data: PortfolioData): PortfolioData {
  return {
    name: data.name || "Your Name",
    bio: data.bio || "A passionate developer building clean and modern web applications.",
    profileImage: data.profileImage || "", // Not used in this template, but good to have
    resumeLink: data.resumeLink || "#",
    aboutText: data.aboutText || "I focus on writing clean, elegant, and efficient code. I enjoy turning complex problems into simple, beautiful, and intuitive designs.",
    workExperience: data.workExperience || [],
    skills: data.skills || [],
    projects: data.projects || [],
    contact: {
      email: data.contact?.email || "hello@example.com",
      linkedin: data.contact?.linkedin || "#",
      github: data.contact?.github || "#",
      phone: data.contact?.phone || "",
    },
    template: "minimal",
    favicon: "https://nocodefolio.vercel.app/favicon.ico"
  };
}

export function minimalTemplate(data: PortfolioData): Record<string, string> {
  const finalData = getFinalData(data);
  const faviconLink = finalData.favicon || "/favicon.ico"; // Default favicon

  const pageContent = `
    'use client';
    import { motion } from 'framer-motion';
    import { FiMail, FiGithub, FiLinkedin, FiExternalLink } from 'react-icons/fi';
    import Image from 'next/image';

    export default function Home() {
      const projects = ${JSON.stringify(finalData.projects)};
      const experiences = ${JSON.stringify(finalData.workExperience)};
      const skills = ${JSON.stringify(finalData.skills)};

      return (
        <main className="font-inter bg-white text-slate-800">
          <div className="min-h-screen container mx-auto px-4 sm:px-8">

            <section id="profile" className="min-h-screen flex flex-col items-center justify-center text-center">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }}>
                    <h1 className="text-5xl md:text-7xl font-bold text-slate-900">${finalData.name}</h1>
                    <p className="mt-4 text-lg md:text-xl text-slate-500 max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: \`${finalData.bio.replace(/`/g, '\\`')}\` }}/>
                </motion.div>
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="mt-8 flex items-center gap-6">
                    <a href="mailto:${finalData.contact.email}" className="text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"><FiMail size={20}/></a>
                    <a href="${finalData.contact.github}" target="_blank" className="text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"><FiGithub size={20}/></a>
                    <a href="${finalData.contact.linkedin}" target="_blank" className="text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"><FiLinkedin size={20}/></a>
                    ${finalData.resumeLink.length > 10 ? `<a href="${finalData.resumeLink}" target="_blank" className="px-4 py-2 text-sm border border-slate-300 text-slate-600 rounded-full hover:bg-slate-100 hover:border-slate-400 transition-colors cursor-pointer">View Resume</a>` : ''}
                </motion.div>
            </section>
            <hr className="border-slate-200"/>

            <section id="about" className="w-full max-w-3xl mx-auto py-16 md:py-24">
              <h2 className="text-2xl font-bold text-slate-800 mb-8">About</h2>
              <p className="text-slate-600 leading-relaxed">${finalData.aboutText}</p>
            </section>
            <hr className="border-slate-200"/>

            <section id="experience" className="w-full max-w-3xl mx-auto py-16 md:py-24">
              <h2 className="text-2xl font-bold text-slate-800 mb-8">Work Experience</h2>
              <div className="flex flex-col">
                {experiences.map(exp => 
                  <div className="flex flex-col sm:flex-row gap-4 py-6 border-b border-slate-200">
                    <div className="w-full sm:w-1/3 text-slate-500 text-sm">{exp.duration}</div>
                    <div className="w-full sm:w-2/3">
                      <h3 className="font-bold text-slate-800">{exp.title}</h3>
                      <p className="text-slate-600">{exp.company}</p>
                      <p className="mt-2 text-slate-500 text-sm">{exp.description}</p>
                    </div>
                  </div>
                )}
              </div>
            </section>
            <hr className="border-slate-200"/>
            
            <section id="projects" className="w-full max-w-3xl mx-auto py-16 md:py-24">
              <h2 className="text-2xl font-bold text-slate-800 mb-8">Projects</h2>
              <div className="flex flex-col">
                {projects.map(project => 
                  <div className="flex flex-col sm:flex-row gap-4 py-6 border-b border-slate-200">
                    <Image src={project.image || '/placeholder-project.jpg'} alt={project.title} width={200} height={120} className="w-full sm:w-48 h-28 object-cover rounded-md bg-slate-100"/>
                    <div className="flex-grow">
                      <h3 className="font-bold text-slate-800">{project.title}</h3>
                      <div className="flex gap-4 mt-2">
                        {project.githubLink ? <a href={project.githubLink} target="_blank" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"><FiGithub/> GitHub</a> : ''}
                        {project.liveDemoLink ? <a href={project.liveDemoLink} target="_blank" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"><FiExternalLink/> Demo</a> : ''}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>
            <hr className="border-slate-200"/>

            <section id="skills" className="w-full max-w-3xl mx-auto py-16 md:py-24">
              <h2 className="text-2xl font-bold text-slate-800 mb-8">Skills</h2>
              <div className="flex flex-wrap gap-3">
                {skills.map(skill => <div className="bg-slate-100 px-3 py-1 rounded-full text-slate-600">{skill.name}</div>)}
              </div>
            </section>

            <footer className="py-12 text-center"><p className="text-sm text-slate-400">© ${new Date().getFullYear()} ${finalData.name}. All rights reserved.</p></footer>
          </div>
        </main>
      );
    }
  `;

  return {
    "app/layout.tsx": `
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
  title: '${finalData.name} | Portfolio',
  description: 'Personal portfolio of ${finalData.name}',
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="${faviconLink}" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}`,
    "app/page.tsx": pageContent,
    "app/globals.css": `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\nhtml { scroll-behavior: smooth; }`,
    "package.json": JSON.stringify({
      name: finalData.name.toLowerCase().replace(/\s+/g, "-") + "-nocodefolio-minimal",
      version: "0.1.0",
      private: true,
      scripts: { dev: "next dev", build: "next build", start: "next start", lint: "next lint" },
      dependencies: {
        "react": "^18.2.0", "react-dom": "^18.2.0", "next": "14.1.3",
        "framer-motion": "^11.0.8", "react-icons": "^5.0.1"
      },
      devDependencies: {
        "typescript": "^5", "@types/node": "^20", "@types/react": "^18", "@types/react-dom": "^18",
        "autoprefixer": "^10.0.1", "postcss": "^8", "tailwindcss": "^3.3.0", "eslint": "^8", "eslint-config-next": "14.1.3"
      }
    }, null, 2),
    "tailwind.config.js": `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ './app/**/*.{js,ts,jsx,tsx,mdx}' ],
  theme: { extend: { fontFamily: { sans: ['Inter', 'sans-serif'] } } },
  plugins: [],
}`,
    "postcss.config.js": `module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } }`,
    "next.config.js": `/** @type {import('next').NextConfig} */\nconst nextConfig = { images: { remotePatterns: [{ protocol: 'https', hostname: '**' }] } }\n\nmodule.exports = nextConfig`,
    "tsconfig.json": `{"compilerOptions":{"lib":["dom","dom.iterable","esnext"],"allowJs":true,"skipLibCheck":true,"strict":true,"noEmit":true,"esModuleInterop":true,"module":"esnext","moduleResolution":"bundler","resolveJsonModule":true,"isolatedModules":true,"jsx":"preserve","incremental":true,"plugins":[{"name":"next"}],"paths":{"@/*":["./*"]}},"include":["next-env.d.ts","**/*.ts","**/*.tsx",".next/types/**/*.ts"],"exclude":["node_modules"]}`
  };
}