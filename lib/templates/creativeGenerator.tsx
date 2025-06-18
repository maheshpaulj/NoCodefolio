import { PortfolioData } from "@/types/portfolio";

// Helper to provide default data
function getFinalData(data: PortfolioData): PortfolioData {
  return {
    name: data.name || "Your Name",
    bio: data.bio || "A Creative Developer with a passion for unique interfaces.",
    profileImage: data.profileImage || "/placeholder-creative.jpg",
    resumeLink: data.resumeLink || "#",
    aboutText: data.aboutText || "I thrive on crafting visually stunning and interactive web experiences that leave a lasting impression. My goal is to blend artistry with technology.",
    workExperience: data.workExperience || [],
    skills: data.skills || [],
    projects: data.projects || [],
    contact: {
      email: data.contact?.email || "hello@example.com",
      linkedin: data.contact?.linkedin || "#",
      github: data.contact?.github || "#",
      phone: data.contact?.phone || "",
    },
    template: "creative",
    favicon: "https://nocodefolio.vercel.app/favicon.ico"
  };
}

export function creativeTemplate(data: PortfolioData): Record<string, string> {
  const finalData = getFinalData(data);
  const faviconLink = finalData.favicon || "/favicon.ico"; // Default favicon

  // Main Page Content (page.tsx)
  const pageContent = `
    'use client';
    import { motion } from 'framer-motion';
    import { FiLinkedin, FiGithub, FiMail, FiExternalLink } from 'react-icons/fi';
    import Image from 'next/image';

    export default function Home() {
      const animation = { initial: { x: -30, opacity: 0 }, animate: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 20 }}};
      
      const skills = ${JSON.stringify(finalData.skills)};
      const projects = ${JSON.stringify(finalData.projects)};
      const experiences = ${JSON.stringify(finalData.workExperience)};

      return (
        <main className="bg-slate-900 text-slate-300 font-lexend selection:bg-amber-500/20">
          <section id="profile" className="relative min-h-screen flex items-center overflow-hidden">
            <div className="absolute inset-0 bg-slate-800 [clip-path:polygon(0_0,_100%_0,_60%_100%,_0%_100%)] z-10"></div>
            <Image src="${finalData.profileImage}" alt="Profile Background" fill className="object-cover opacity-20"/>
            <div className="container mx-auto px-8 relative z-20">
              <div className="max-w-xl">
                <motion.div {...animation} transition={{...animation.animate.transition, delay: 0.2}}>
                  <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter">${finalData.name}</h1>
                </motion.div>
                <motion.div {...animation} transition={{...animation.animate.transition, delay: 0.4}}>
                  <p className="text-xl md:text-2xl text-amber-400 mt-2" dangerouslySetInnerHTML={{ __html: \`${finalData.bio.replace(/`/g, '\\`')}\` }}/>
                </motion.div>
                <motion.div {...animation} transition={{...animation.animate.transition, delay: 0.6}} className="mt-8 flex items-center gap-4">
                  <a href="${finalData.resumeLink}" target="_blank" className="px-6 py-3 bg-amber-500 text-slate-900 font-bold rounded-full hover:bg-amber-400 transition-colors cursor-pointer">Download CV</a>
                  <div className="flex gap-4 items-center">
                    <a href="${finalData.contact.github}" target="_blank" rel="noopener noreferrer"><motion.div whileHover={{scale: 1.2, color: '#f59e0b'}} className="text-slate-400"><FiGithub size={20}/></motion.div></a>
                    <a href="${finalData.contact.linkedin}" target="_blank" rel="noopener noreferrer"><motion.div whileHover={{scale: 1.2, color: '#f59e0b'}} className="text-slate-400"><FiLinkedin size={20}/></motion.div></a>
                    <a href="mailto:${finalData.contact.email}"><motion.div whileHover={{scale: 1.2, color: '#f59e0b'}} className="text-slate-400"><FiMail size={20}/></motion.div></a>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          <section id="about" className="py-24 bg-slate-800 flex items-center justify-center">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">About Me</h2>
              <p className="text-lg text-slate-400 leading-relaxed">${finalData.aboutText}</p>
            </div>
          </section>

          <section id="experience" className="py-24">
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter text-center mb-16">Career Timeline</h2>
            <div className="relative w-full max-w-4xl mx-auto">
              <div className="absolute left-1/2 top-0 h-full w-0.5 bg-slate-700"></div>
              {experiences.map((exp, index) => (
                <div key={index} className="flex items-center w-full my-6">
                  <div className={\`w-1/2 flex \${index % 2 === 0 ? 'justify-end pr-8' : 'justify-start pl-8 order-3'}\`}>
                    <motion.div initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="p-6 bg-slate-800 border border-slate-700 rounded-xl w-full max-w-sm">
                      <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                      <p className="text-amber-400 font-semibold">{exp.company}</p>
                      <p className="mt-2 text-slate-400 text-sm">{exp.description}</p>
                    </motion.div>
                  </div>
                  <div className="w-12 h-12 absolute left-1/2 -translate-x-1/2 flex items-center justify-center bg-amber-500 text-slate-900 rounded-full font-bold shadow-lg z-10">
                    <p className="text-xs text-center">{exp.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          <section id="skills" className="py-24 overflow-hidden bg-slate-800">
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter text-center mb-12">My Skills</h2>
            <div className="relative flex overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
              <div className="flex animate-marquee motion-reduce:animate-none">{skills.concat(skills).map((skill, index) => <div key={index} className="mx-6 flex items-center gap-3 whitespace-nowrap"><Image src={skill.icon || ''} alt={skill.name} width={24} height={24}/><span className="text-lg font-medium text-slate-300">{skill.name}</span></div>)}</div>
              <div className="absolute top-0 flex animate-marquee2 motion-reduce:animate-none">{skills.concat(skills).map((skill, index) => <div key={index} className="mx-6 flex items-center gap-3 whitespace-nowrap"><Image src={skill.icon || ''} alt={skill.name} width={24} height={24}/><span className="text-lg font-medium text-slate-300">{skill.name}</span></div>)}</div>
            </div>
          </section>

          <section id="projects" className="py-24">
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter text-center mb-16">Featured Projects</h2>
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div key={index} initial={{y: 20, opacity: 0}} whileInView={{y: 0, opacity: 1}} transition={{delay: index * 0.1}} className="group bg-slate-800 border border-slate-700/50 rounded-xl overflow-hidden">
                  <div className="relative overflow-hidden">
                    <Image src={project.image || '/placeholder-creative.jpg'} alt={project.title} width={400} height={300} className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-4">{project.title}</h3>
                    <div className="flex gap-4">
                      {project.githubLink && <a href={project.githubLink} target="_blank" className="flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"><FiGithub/> GitHub</a>}
                      {project.liveDemoLink && <a href={project.liveDemoLink} target="_blank" className="flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"><FiExternalLink/> Demo</a>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <section id="contact" className="py-24 bg-slate-800">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">Get In Touch</h2>
              <p className="mt-4 text-lg text-slate-400">Have a project in mind or just want to say hello? My inbox is always open.</p>
              <a href="mailto:${finalData.contact.email}" className="mt-8 inline-block text-2xl px-6 py-4 rounded-2xl bg-amber-400 hover:bg-amber-500 hover:scale-[1.05] transition font-bold text-neutral-800 hover:text-black cursor-pointer">${finalData.contact.email}</a>
            </div>
          </section>
          
          <footer className="py-8 text-center border-t border-slate-800"><p className="text-sm text-slate-500">Copyright © ${new Date().getFullYear()} ${finalData.name}. All Rights Reserved.</p></footer>
        </main>
      );
    }
  `;

  // Configuration Files
  return {
    "app/layout.tsx": `
      import type { Metadata } from 'next';
      import { Lexend } from 'next/font/google';
      import './globals.css';
      const lexend = Lexend({ subsets: ['latin'] });
      export const metadata: Metadata = {
        title: '${finalData.name} | Creative Portfolio',
        description: 'Personal portfolio of ${finalData.name}',
      };
      export default function RootLayout({ children }: { children: React.ReactNode }) {
        return (
          <html lang="en">
          <head>
            <link rel="icon" href="${faviconLink}" />
          </head>
            <body className={lexend.className}>{children}</body>
          </html>
        );
      }`,
    "app/page.tsx": pageContent,
    "app/globals.css": `
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Lexend:wght@400;700;900&display=swap');

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
`,
    "package.json": JSON.stringify({
      name: finalData.name.toLowerCase().replace(/\s+/g, "-") + "-nocodefolio-creative",
      version: "0.1.0",
      private: true,
      scripts: { dev: "next dev", build: "next build", start: "next start", lint: "next lint" },
      dependencies: {
        "react": "^18", "react-dom": "^18", "next": "14.1.0",
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
  theme: {
    extend: {
      fontFamily: {
        lexend: ['Lexend', 'sans-serif'],
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        marquee2: 'marquee2 40s linear infinite',
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0%)' }, '100%': { transform: 'translateX(-100%)' } },
        marquee2: { '0%': { transform: 'translateX(100%)' }, '100%': { transform: 'translateX(0%)' } },
      },
    },
  },
  plugins: [],
}`,
    "postcss.config.js": `module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } }`,
    "next.config.js": `/** @type {import('next').NextConfig} */\nconst nextConfig = { images: { remotePatterns: [{ protocol: 'https', hostname: '**' }] } }\n\nmodule.exports = nextConfig`,
    "tsconfig.json": `{"compilerOptions":{"lib":["dom","dom.iterable","esnext"],"allowJs":true,"skipLibCheck":true,"strict":true,"noEmit":true,"esModuleInterop":true,"module":"esnext","moduleResolution":"bundler","resolveJsonModule":true,"isolatedModules":true,"jsx":"preserve","incremental":true,"plugins":[{"name":"next"}],"paths":{"@/*":["./*"]}},"include":["next-env.d.ts","**/*.ts","**/*.tsx",".next/types/**/*.ts"],"exclude":["node_modules"]}`
  };
}