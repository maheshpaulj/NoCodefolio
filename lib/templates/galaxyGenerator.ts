import { PortfolioData } from "@/types/portfolio";

function getFinalData(data: PortfolioData): PortfolioData {
  return {
    name: data.name || "Your Name",
    bio: data.bio || "Build cosmic experiences.",
    profileImage: data.profileImage || "",
    resumeLink: data.resumeLink || "",
    aboutText: data.aboutText || "Tell your story",
    workExperience: data.workExperience || [],
    skills: data.skills || [],
    projects: data.projects || [],
    contact: {
      email: data.contact?.email || "",
      linkedin: data.contact?.linkedin || "",
      github: data.contact?.github || "",
      phone: data.contact?.phone || "",
    },
    template: "galaxy",
    vercelProjectId: data.vercelProjectId,
    vercelDomain: data.vercelDomain,
    favicon: data.favicon || "https://nocodefolio.vercel.app/favicon.ico",
  };
}

export function galaxyTemplate(data: PortfolioData): Record<string, string> {
  const d = getFinalData(data);
  const safeBio = JSON.stringify(d.bio);

  const page = `
'use client';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 font-lexend">
      <section id="profile" className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center max-w-3xl">
          <div className="mx-auto mb-6 w-32 h-32 rounded-full ring-4 ring-fuchsia-500/40 overflow-hidden">
            <Image src="${d.profileImage}" alt="Avatar" width={128} height={128} className="w-full h-full object-cover" />
          </div>
          <h1 className="text-6xl md:text-7xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-cyan-300 to-emerald-300">${d.name}</h1>
          <p className="mt-3 text-slate-300" dangerouslySetInnerHTML={{ __html: ${safeBio} }} />
        </div>
      </section>
    </main>
  );
}
`;

  return {
    "app/layout.tsx": `
import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: '${d.name} | Portfolio', description: 'Portfolio of ${d.name}' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><link rel="icon" href="${d.favicon}" /></head>
      <body>{children}</body>
    </html>
  );
}
`,
    "app/page.tsx": page,
    "app/globals.css": `@tailwind base;\n@tailwind components;\n@tailwind utilities;` ,
    "package.json": JSON.stringify({
      name: d.name.toLowerCase().replace(/\s+/g, "-") + "-nocodefolio-galaxy",
      private: true,
      version: "0.1.0",
      scripts: { dev: "next dev", build: "next build", start: "next start" },
      dependencies: { next: "14.1.3", react: "^18.2.0", "react-dom": "^18.2.0" }
    }, null, 2),
    "tailwind.config.js": `module.exports = { content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'], theme: { extend: {} }, plugins: [] }`,
    "postcss.config.js": `module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } }`,
    "next.config.js": `module.exports = { images: { remotePatterns: [{ protocol: 'https', hostname: '**' }] } }`,
    "tsconfig.json": `{"compilerOptions":{"lib":["dom","esnext"],"skipLibCheck":true,"strict":true,"noEmit":true,"module":"esnext","moduleResolution":"bundler","resolveJsonModule":true,"jsx":"preserve"},"include":["next-env.d.ts","**/*.ts","**/*.tsx",".next/types/**/*.ts"],"exclude":["node_modules"]}`
  };
}


