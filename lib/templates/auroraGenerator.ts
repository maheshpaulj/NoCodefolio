import { PortfolioData } from "@/types/portfolio";

function getFinalData(data: PortfolioData): PortfolioData {
  return {
    name: data.name || "Your Name",
    bio: data.bio || "Product-minded developer building polished web experiences.",
    profileImage: data.profileImage || "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg",
    resumeLink: data.resumeLink || "",
    aboutText: data.aboutText || "I craft delightful, performant interfaces with strong attention to product detail.",
    workExperience: data.workExperience || [],
    skills: data.skills || [],
    projects: data.projects || [],
    contact: {
      email: data.contact?.email || "",
      linkedin: data.contact?.linkedin || "",
      github: data.contact?.github || "",
      phone: data.contact?.phone || "",
    },
    template: "aurora",
    favicon: data.favicon || "https://nocodefolio.vercel.app/favicon.ico",
  };
}

function baseFiles(name: string, favicon: string | undefined, pageContent: string) {
  return {
    "app/layout.tsx": `
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
  title: '${name} | Portfolio',
  description: 'Personal portfolio of ${name}',
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><link rel="icon" href="${favicon || "/favicon.ico"}" /></head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}`,
    "app/page.tsx": pageContent,
    "app/globals.css": `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\nhtml { scroll-behavior: smooth; }\nbody { margin: 0; }`,
    "package.json": JSON.stringify({
      name: `${name.toLowerCase().replace(/\s+/g, "-") || "portfolio"}-nocodefolio-aurora`,
      version: "0.1.0",
      private: true,
      scripts: { dev: "next dev", build: "next build", start: "next start", lint: "next lint" },
      dependencies: {
        react: "^18",
        "react-dom": "^18",
        next: "14.1.0",
        "react-icons": "^5.0.1",
      },
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

export function auroraTemplate(data: PortfolioData): Record<string, string> {
  const finalData = getFinalData(data);
  const serialized = JSON.stringify(finalData, null, 2).replace(/</g, "\\u003c");
  const pageContent = `
import Image from 'next/image';
import { FiDownload, FiExternalLink, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

const data = ${serialized};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#08111f] text-slate-100">
      <section className="relative overflow-hidden px-5 py-20 sm:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(20,184,166,0.35),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(14,165,233,0.28),transparent_32%),linear-gradient(135deg,#08111f_0%,#14213d_55%,#04111a_100%)]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1fr_360px]">
          <div>
            <div className="mb-5 inline-flex rounded-full border border-teal-300/30 bg-white/10 px-4 py-2 text-sm text-teal-100">Open to thoughtful, high-impact work</div>
            <h1 className="max-w-3xl text-5xl font-black leading-tight text-white md:text-7xl">{data.name}</h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-slate-300" dangerouslySetInnerHTML={{ __html: data.bio }} />
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {data.resumeLink && <a href={data.resumeLink} target="_blank" className="inline-flex items-center gap-2 rounded-lg bg-teal-300 px-5 py-3 font-semibold text-slate-950 hover:bg-teal-200"><FiDownload /> Resume</a>}
              {data.contact.github && <a href={data.contact.github} target="_blank" className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-3 text-slate-200 hover:bg-white/10"><FiGithub /> GitHub</a>}
              {data.contact.email && <a href={\`mailto:\${data.contact.email}\`} className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-3 text-slate-200 hover:bg-white/10"><FiMail /> Email</a>}
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-teal-300/40 to-sky-400/30 blur-2xl" />
            <Image src={data.profileImage} alt={data.name} width={420} height={520} className="relative aspect-[4/5] w-full rounded-[1.5rem] border border-white/15 object-cover shadow-2xl" />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-20 text-slate-900 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-teal-700">About</p>
          <p className="mt-4 text-2xl leading-10 text-slate-700">{data.aboutText}</p>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-3xl font-black text-white">Experience</h2>
          <div className="grid gap-5">
            {data.workExperience.map((item, index) => (
              <article key={index} className="rounded-xl border border-white/10 bg-white/[0.06] p-6">
                <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                <div className="mt-2 flex flex-wrap gap-3 text-teal-200"><p className="font-semibold">{item.company}</p><p className="text-slate-300">{item.duration}</p></div>
                <p className="mt-4 text-slate-300">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 text-slate-900 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div><h2 className="text-3xl font-black">Skills</h2><p className="mt-3 text-slate-600">A quick read on the tools and strengths behind the work.</p></div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {data.skills.map((skill, index) => (
              <div key={index} className="rounded-xl border border-slate-200 p-5 shadow-sm">
                {skill.icon && <Image src={skill.icon} alt={skill.name} width={36} height={36} className="mb-3 h-9 w-9 object-contain" />}
                <h3 className="font-bold">{skill.name}</h3><p className="text-sm text-slate-500">{skill.level}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-3xl font-black text-white">Selected Projects</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {data.projects.map((project, index) => (
              <article key={index} className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.06]">
                <Image src={project.image || '/placeholder-project.jpg'} alt={project.title} width={720} height={420} className="h-56 w-full object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                  <div className="mt-5 flex gap-3">
                    {project.githubLink && <a href={project.githubLink} target="_blank" className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm text-slate-200"><FiGithub /> Code</a>}
                    {project.liveDemoLink && <a href={project.liveDemoLink} target="_blank" className="inline-flex items-center gap-2 rounded-lg bg-teal-300 px-4 py-2 text-sm font-semibold text-slate-950"><FiExternalLink /> Live</a>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 px-5 py-12 text-center text-slate-300">
        <div className="flex justify-center gap-5">{data.contact.linkedin && <a href={data.contact.linkedin} target="_blank"><FiLinkedin size={22} /></a>}{data.contact.github && <a href={data.contact.github} target="_blank"><FiGithub size={22} /></a>}{data.contact.email && <a href={\`mailto:\${data.contact.email}\`}><FiMail size={22} /></a>}</div>
        <p className="mt-6 text-sm">© {new Date().getFullYear()} {data.name}. Built with NoCodefolio.</p>
      </footer>
    </main>
  );
}
`;

  return baseFiles(finalData.name, finalData.favicon, pageContent);
}
