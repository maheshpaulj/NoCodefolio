import { PortfolioData } from "@/types/portfolio";

function getFinalData(data: PortfolioData): PortfolioData {
  return {
    name: data.name || "Your Name",
    bio: data.bio || "Senior builder focused on outcomes, systems, and product quality.",
    profileImage: data.profileImage || "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg",
    resumeLink: data.resumeLink || "",
    aboutText: data.aboutText || "A concise summary of your work, leadership, and impact.",
    workExperience: data.workExperience || [],
    skills: data.skills || [],
    projects: data.projects || [],
    contact: {
      email: data.contact?.email || "",
      linkedin: data.contact?.linkedin || "",
      github: data.contact?.github || "",
      phone: data.contact?.phone || "",
    },
    template: "executive",
    favicon: data.favicon || "https://nocodefolio.vercel.app/favicon.ico",
  };
}

export function executiveTemplate(data: PortfolioData): Record<string, string> {
  const finalData = getFinalData(data);
  const serialized = JSON.stringify(finalData, null, 2).replace(/</g, "\\u003c");
  const pageContent = `
import Image from 'next/image';
import { FiBriefcase, FiDownload, FiExternalLink, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

const data = ${serialized};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f5ef] text-slate-900">
      <header className="border-b border-slate-300 bg-[#f7f5ef]/95 px-5 py-5 sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6">
          <h1 className="text-2xl font-black tracking-tight">{data.name}</h1>
          <nav className="hidden items-center gap-6 text-sm font-semibold uppercase tracking-wide text-slate-600 md:flex">
            <a href="#profile">Profile</a><a href="#experience">Experience</a><a href="#projects">Projects</a><a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <section id="profile" className="px-5 py-16 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[320px_1fr]">
          <aside>
            <Image src={data.profileImage} alt={data.name} width={360} height={420} className="aspect-[4/5] w-full border border-slate-300 object-cover" />
            <div className="mt-6 space-y-3 border-t border-slate-300 pt-6 text-sm">
              {data.contact.email && <a href={\`mailto:\${data.contact.email}\`} className="flex items-center gap-3 hover:text-slate-600"><FiMail /> {data.contact.email}</a>}
              {data.contact.linkedin && <a href={data.contact.linkedin} target="_blank" className="flex items-center gap-3 hover:text-slate-600"><FiLinkedin /> LinkedIn</a>}
              {data.contact.github && <a href={data.contact.github} target="_blank" className="flex items-center gap-3 hover:text-slate-600"><FiGithub /> GitHub</a>}
            </div>
          </aside>
          <div>
            <p className="mb-3 text-sm font-black uppercase tracking-[0.3em] text-slate-500">Portfolio</p>
            <h2 className="text-5xl font-black leading-none tracking-tight md:text-7xl">{data.name}</h2>
            <p className="mt-6 max-w-3xl text-2xl leading-9 text-slate-700" dangerouslySetInnerHTML={{ __html: data.bio }} />
            <div className="mt-8 flex flex-wrap gap-3">
              {data.resumeLink && <a href={data.resumeLink} target="_blank" className="inline-flex items-center gap-2 bg-slate-900 px-5 py-3 text-sm font-bold uppercase tracking-wide text-white hover:bg-slate-700"><FiDownload /> Resume</a>}
              <a href="#projects" className="inline-flex items-center gap-2 border border-slate-900 px-5 py-3 text-sm font-bold uppercase tracking-wide hover:bg-white"><FiBriefcase /> View Work</a>
            </div>
            <div className="mt-12 border-y border-slate-300 py-8">
              <h3 className="mb-4 text-sm font-black uppercase tracking-[0.25em] text-slate-500">Executive Summary</h3>
              <p className="text-xl leading-9 text-slate-700">{data.aboutText}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="bg-white px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-4xl font-black tracking-tight">Experience</h2>
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {data.workExperience.map((item, index) => (
              <article key={index} className="grid gap-4 py-7 md:grid-cols-[220px_1fr]">
                <p className="text-sm font-bold uppercase tracking-wide text-slate-500">{item.duration}</p>
                <div><h3 className="text-2xl font-black">{item.title}</h3><p className="mt-1 font-semibold text-slate-600">{item.company}</p><p className="mt-4 max-w-3xl leading-7 text-slate-700">{item.description}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[300px_1fr]">
          <div><h2 className="text-4xl font-black tracking-tight">Capabilities</h2></div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {data.skills.map((skill, index) => (
              <div key={index} className="border border-slate-300 bg-white p-5">
                {skill.icon && <Image src={skill.icon} alt={skill.name} width={32} height={32} className="mb-3 h-8 w-8 object-contain" />}
                <h3 className="font-black">{skill.name}</h3><p className="text-sm text-slate-500">{skill.level}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="bg-slate-900 px-5 py-16 text-white sm:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-4xl font-black tracking-tight">Selected Work</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {data.projects.map((project, index) => (
              <article key={index} className="border border-white/15 bg-white/[0.04]">
                <Image src={project.image || '/placeholder-project.jpg'} alt={project.title} width={720} height={420} className="h-56 w-full object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl font-black">{project.title}</h3>
                  <div className="mt-5 flex gap-3">
                    {project.githubLink && <a href={project.githubLink} target="_blank" className="inline-flex items-center gap-2 border border-white/20 px-4 py-2 text-sm"><FiGithub /> Code</a>}
                    {project.liveDemoLink && <a href={project.liveDemoLink} target="_blank" className="inline-flex items-center gap-2 bg-white px-4 py-2 text-sm font-bold text-slate-900"><FiExternalLink /> Live</a>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer id="contact" className="px-5 py-14 text-center sm:px-8">
        <h2 className="text-3xl font-black">Let's Talk</h2>
        <div className="mt-5 flex justify-center gap-5 text-xl">{data.contact.email && <a href={\`mailto:\${data.contact.email}\`}><FiMail /></a>}{data.contact.linkedin && <a href={data.contact.linkedin} target="_blank"><FiLinkedin /></a>}{data.contact.github && <a href={data.contact.github} target="_blank"><FiGithub /></a>}</div>
        <p className="mt-6 text-sm text-slate-500">© {new Date().getFullYear()} {data.name}. Built with NoCodefolio.</p>
      </footer>
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
export const metadata: Metadata = { title: '${finalData.name} | Portfolio', description: 'Personal portfolio of ${finalData.name}' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><head><link rel="icon" href="${finalData.favicon || "/favicon.ico"}" /></head><body className={inter.className}>{children}</body></html>;
}`,
    "app/page.tsx": pageContent,
    "app/globals.css": `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\nhtml { scroll-behavior: smooth; }\nbody { margin: 0; }`,
    "package.json": JSON.stringify({
      name: `${finalData.name.toLowerCase().replace(/\s+/g, "-") || "portfolio"}-nocodefolio-executive`,
      version: "0.1.0",
      private: true,
      scripts: { dev: "next dev", build: "next build", start: "next start", lint: "next lint" },
      dependencies: { react: "^18", "react-dom": "^18", next: "14.1.0", "react-icons": "^5.0.1" },
      devDependencies: {
        typescript: "^5",
        "@types/node": "^20",
        "@types/react": "^18",
        "@types/react-dom": "^18",
        autoprefixer: "^10.0.1",
        postcss: "^8",
        tailwindcss: "^3.3.0",
        eslint: "^8",
        "eslint-config-next": "14.1.0",
      },
    }, null, 2),
    "tailwind.config.js": `module.exports = { content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'], theme: { extend: {} }, plugins: [] }`,
    "postcss.config.js": `module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } }`,
    "next.config.js": `/** @type {import('next').NextConfig} */\nconst nextConfig = { images: { remotePatterns: [{ protocol: 'https', hostname: '*' }] } };\nmodule.exports = nextConfig;`,
    "tsconfig.json": `{"compilerOptions":{"lib":["dom","dom.iterable","esnext"],"allowJs":true,"skipLibCheck":true,"strict":true,"noEmit":true,"esModuleInterop":true,"module":"esnext","moduleResolution":"bundler","resolveJsonModule":true,"isolatedModules":true,"jsx":"preserve","incremental":true,"plugins":[{"name":"next"}],"paths":{"@/*":["./*"]}},"include":["next-env.d.ts","**/*.ts","**/*.tsx",".next/types/**/*.ts"],"exclude":["node_modules"]}`,
  };
}
