import { PortfolioData } from "@/types/portfolio";

// Helper to provide default data
function getFinalData(data: PortfolioData): PortfolioData {
  return {
    name: data.name || "Your Name",
    bio: data.bio || "Creative <span className='text-sky-400'>Frontend Developer</span>",
    profileImage: data.profileImage || "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg",
    resumeLink: data.resumeLink || "",
    aboutText: data.aboutText || "I am a passionate developer creating modern web experiences.",
    workExperience: data.workExperience || [],
    skills: data.skills || [],
    projects: data.projects || [],
    contact: {
      email: data.contact?.email || "",
      linkedin: data.contact?.linkedin || "",
      github: data.contact?.github || "",
      phone: data.contact?.phone || "",
    },
    template: "modern",
    favicon: "https://nocodefolio.vercel.app/favicon.ico"
  };
}

// Generates the JSX string for a single section
function generateSection(id: string, title: string, subtitle: string, content: string, className: string = ''): string {
  return `
    <section id="${id}" className="min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-8 py-24 ${className}">
      <div className="text-center mb-12">
        <p className="text-lg text-slate-500">${subtitle}</p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">${title}</h2>
      </div>
      <div className="w-full max-w-5xl">
        ${content}
      </div>
    </section>
  `;
}

export function modernTemplate(data: PortfolioData): Record<string, string> {
  const finalData = getFinalData(data);
  const faviconLink = finalData.favicon || "/favicon.ico"; // Default favicon
  // --- Main Page Content (page.tsx) ---
  const pageContent = `
    'use client';
    import { useState, useEffect } from 'react';
    import { motion } from 'framer-motion';
    import { FiLinkedin, FiGithub, FiMail, FiDownload, FiExternalLink } from 'react-icons/fi';
    import Image from 'next/image';

    function useActiveSection() {
      const [activeSection, setActiveSection] = useState('profile');
      useEffect(() => {
        const handleScroll = () => {
          const sections = ['profile', 'about', 'experience', 'skills', 'projects', 'contact'];
          let currentSection = 'profile';
          for (const sectionId of sections) {
            const sectionEl = document.getElementById(sectionId);
            if (sectionEl && sectionEl.getBoundingClientRect().top < window.innerHeight / 2) {
              currentSection = sectionId;
            }
          }
          setActiveSection(currentSection);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);
      return activeSection;
    }

    const TemplateNavbar = ({ name, activeSection } : {name: string, activeSection: string}) => {
        const navItems = ['about', 'experience', 'skills', 'projects', 'contact'];
        const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return (
            <nav className="sticky top-0 z-50 px-4 sm:px-8 py-4 bg-white/80 backdrop-blur-lg border-b border-slate-200 transition-colors">
                <div className="max-w-5xl mx-auto flex justify-between items-center">
                    <button onClick={() => scrollTo('profile')} className="text-xl font-bold text-slate-800 cursor-pointer">{name}</button>
                    <div className="hidden md:flex items-center gap-6">
                        {navItems.map(item => (
                            <button key={item} onClick={() => scrollTo(item)} className={\`capitalize transition-colors text-sm font-medium cursor-pointer \${activeSection === item ? 'text-sky-500' : 'text-slate-500 hover:text-sky-500'}\`}>{item}</button>
                        ))}
                    </div>
                </div>
            </nav>
        );
    };

    export default function Home() {
      const activeSection = useActiveSection();
      return (
        <main className="bg-white text-slate-700">
          <TemplateNavbar name={"${finalData.name}"} activeSection={activeSection} />

          <section id="profile" className="min-h-screen flex items-center justify-center px-4 sm:px-8 py-24 bg-slate-50">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 max-w-5xl mx-auto">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}>
                <div className="relative w-48 h-48 md:w-64 md:h-64">
                  <Image src="${finalData.profileImage}" alt="Profile" width={256} height={256} className="rounded-full object-cover w-full h-full border-4 border-slate-200 shadow-2xl"/>
                </div>
              </motion.div>
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-2">${finalData.name}</h1>
                <p className="text-xl md:text-2xl text-slate-600 mb-6" dangerouslySetInnerHTML={{ __html: \`${finalData.bio.replace(/`/g, '\\`')}\` }} />
                <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
                  ${finalData.resumeLink ? `<a href="${finalData.resumeLink}" target="_blank" className="inline-flex items-center gap-2 px-6 py-3 bg-sky-500 text-white rounded-lg font-semibold hover:bg-sky-600 transition-colors cursor-pointer"><FiDownload/> Download CV</a>` : ''}
                  <div className="flex gap-4 items-center border-l-2 border-slate-200 pl-4">
                    ${finalData.contact.linkedin ? `<a href="${finalData.contact.linkedin}" target="_blank" rel="noopener noreferrer" className="cursor-pointer"><motion.div whileHover={{scale: 1.2}} className="text-slate-500 hover:text-sky-500"><FiLinkedin size={24}/></motion.div></a>` : ''}
                    ${finalData.contact.github ? `<a href="${finalData.contact.github}" target="_blank" rel="noopener noreferrer" className="cursor-pointer"><motion.div whileHover={{scale: 1.2}} className="text-slate-500 hover:text-sky-500"><FiGithub size={24}/></motion.div></a>` : ''}
                    ${finalData.contact.email ? `<a href="mailto:${finalData.contact.email}" className="cursor-pointer"><motion.div whileHover={{scale: 1.2}} className="text-slate-500 hover:text-sky-500"><FiMail size={24}/></motion.div></a>` : ''}
                  </div>
                </div>
              </div>
            </div>
          </section>

          ${finalData.aboutText ? generateSection('about', 'About Me', 'Get To Know More', `<p className="text-lg text-center max-w-3xl mx-auto leading-relaxed text-slate-600">${finalData.aboutText}</p>`, 'bg-white') : ''}
          ${finalData.workExperience.length > 0 ? generateSection('experience', 'Work Experience', 'My Journey', `<div className="space-y-8">${finalData.workExperience.map(exp => `<motion.div initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ type: 'spring' }} className="p-6 bg-white border border-slate-200 rounded-xl"><h3 className="text-2xl font-bold text-slate-900">${exp.title}</h3><div className="flex items-baseline gap-4 mt-1"><p className="text-lg text-sky-500 font-semibold">${exp.company}</p><p className="text-sm text-slate-500">${exp.duration}</p></div><p className="mt-3 text-slate-600">${exp.description}</p></motion.div>`).join('')}</div>`, 'bg-slate-50') : ''}
          ${finalData.skills.length > 0 ? generateSection('skills', 'Skills', 'My Expertise', `<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">${finalData.skills.map(skill => `<motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ type: 'spring' }} className="flex flex-col items-center p-6 bg-white border border-slate-200 rounded-xl text-center">${skill.icon ? `<img src="${skill.icon}" alt="${skill.name}" className="mb-4 object-contain h-12 w-12"/>` : ''}<h3 className="text-xl font-semibold text-slate-900">${skill.name}</h3><p className="text-slate-500">${skill.level}</p></motion.div>`).join('')}</div>`, 'bg-white') : ''}
          ${finalData.projects.length > 0 ? generateSection('projects', 'Projects', 'Browse My Recent Work', `<div className="grid grid-cols-1 md:grid-cols-2 gap-8">${finalData.projects.map(project => `<motion.div whileHover={{ y: -5 }} className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col"><img src="${project.image || '/placeholder-project.jpg'}" alt="${project.title}" className="w-full h-56 object-cover bg-slate-100"/><div className="p-6 flex flex-col flex-grow"><h3 className="text-2xl font-bold text-slate-900 mb-4">${project.title}</h3><div className="flex-grow"></div><div className="flex gap-4 mt-auto">${project.githubLink ? `<a href="${project.githubLink}" target="_blank" className="flex-1 text-center py-2 px-4 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold transition-colors cursor-pointer"><FiGithub className="inline mr-2"/> GitHub</a>` : ''}${project.liveDemoLink ? `<a href="${project.liveDemoLink}" target="_blank" className="flex-1 text-center py-2 px-4 bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-semibold transition-colors cursor-pointer"><FiExternalLink className="inline mr-2"/> Live Demo</a>` : ''}</div></div></motion.div>`).join('')}</div>`, 'bg-slate-50') : ''}
          ${finalData.contact.email ? generateSection('contact', 'Contact Me', 'Get In Touch', `<div className="max-w-md mx-auto bg-white p-8 rounded-xl border border-slate-200"><div className="space-y-6"><a href="mailto:${finalData.contact.email}" className="flex items-center gap-4 text-slate-600 hover:text-sky-500 transition-colors cursor-pointer"><FiMail size={20}/> <span>${finalData.contact.email}</span></a>${finalData.contact.linkedin ? `<a href="${finalData.contact.linkedin}" target="_blank" className="flex items-center gap-4 text-slate-600 hover:text-sky-500 transition-colors cursor-pointer"><FiLinkedin size={20}/> <span>LinkedIn Profile</span></a>` : ''}${finalData.contact.github ? `<a href="${finalData.contact.github}" target="_blank" className="flex items-center gap-4 text-slate-600 hover:text-sky-500 transition-colors cursor-pointer"><FiGithub size={20}/> <span>GitHub Profile</span></a>` : ''}</div></div>`, 'bg-white') : ''}

          <footer className="py-8 text-center bg-white border-t border-slate-200"><p className="text-sm text-slate-500">Copyright © ${new Date().getFullYear()} ${finalData.name}. All Rights Reserved.</p></footer>
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
      name: finalData.name.toLowerCase().replace(/\s+/g, "-") + "-nocodefolio-modern",
      version: "0.1.0",
      private: true,
      scripts: { dev: "next dev", build: "next build", start: "next start", lint: "next lint" },
      dependencies: {
        "react": "^18", "react-dom": "^18", "next": "14.1.0",
        "framer-motion": "^11.0.8", "react-icons": "^5.0.1"
      },
      devDependencies: {
        "typescript": "^5", "@types/node": "^20", "@types/react": "^18", "@types/react-dom": "^18",
        "autoprefixer": "^10.0.1", "postcss": "^8", "tailwindcss": "^3.3.0", "eslint": "^8", "eslint-config-next": "14.1.0"
      }
    }, null, 2),
    "tailwind.config.js": `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ './app/**/*.{js,ts,jsx,tsx,mdx}' ],
  theme: { extend: { fontFamily: { sans: ['Inter', 'sans-serif'] } } },
  plugins: [],
}`,
    "postcss.config.js": `module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } }`,
    "next.config.js": `/** @type {import('next').NextConfig} */\nconst nextConfig = {images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*", // Allow images from all domains
      },
    ],
  },}\n\nmodule.exports = nextConfig`,
    "tsconfig.json": `{"compilerOptions":{"lib":["dom","dom.iterable","esnext"],"allowJs":true,"skipLibCheck":true,"strict":true,"noEmit":true,"esModuleInterop":true,"module":"esnext","moduleResolution":"bundler","resolveJsonModule":true,"isolatedModules":true,"jsx":"preserve","incremental":true,"plugins":[{"name":"next"}],"paths":{"@/*":["./*"]}},"include":["next-env.d.ts","**/*.ts","**/*.tsx",".next/types/**/*.ts"],"exclude":["node_modules"]}`
  };
}