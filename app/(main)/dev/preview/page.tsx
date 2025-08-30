"use client";

import { useEffect, useMemo, useState } from "react";
import LivePreview from "@/components/LivePreview";
import { SerializablePortfolio, TemplateId } from "@/types/portfolio";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";

const starterData: Omit<SerializablePortfolio, "id" | "userId" | "createdAt" | "updatedAt"> = {
  name: "Alex Galaxy",
  bio: "Creative <span class='text-sky-400'>Frontend Developer</span>",
  profileImage:
    "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg",
  resumeLink: "#",
  aboutText:
    "I craft delightful, performant interfaces with React, TypeScript, and motion.",
  workExperience: [
    {
      title: "Senior Frontend Engineer",
      company: "Nova Labs",
      duration: "2022 — Present",
      description: "Leading UI platform work and component systems.",
    },
  ],
  skills: [
    { name: "React", level: "Expert", icon: "" },
    { name: "TypeScript", level: "Advanced", icon: "" },
    { name: "Tailwind CSS", level: "Advanced", icon: "" },
  ],
  projects: [
    {
      title: "Portfolio Engine",
      image:
        "https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=1960&auto=format&fit=crop",
      githubLink: "https://github.com",
      liveDemoLink: "https://example.com",
    },
  ],
  contact: {
    email: "dev@example.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    phone: "",
  },
  template: "galaxy",
  vercelProjectId: undefined,
  vercelDomain: undefined,
  favicon: "https://nocodefolio.vercel.app/favicon.ico",
};

const allTemplates: TemplateId[] = ["galaxy", "neon"];

export default function DevPreviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [template, setTemplate] = useState<TemplateId>("galaxy");
  const [data, setData] = useState<SerializablePortfolio>(() => ({
    ...starterData,
    id: "dev-id",
    userId: "dev-user",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));

  const selectable = useMemo(() => allTemplates, []);

  // Initialize from URL (?t=galaxy|neon)
  useEffect(() => {
    const t = (searchParams.get("t") || "galaxy") as TemplateId;
    const next = selectable.includes(t) ? t : "galaxy";
    setTemplate(next);
    setData((prev) => ({ ...prev, template: next }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Keep URL in sync when template changes (no full reload)
  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("t") !== template) {
      url.searchParams.set("t", template);
      router.replace(url.pathname + "?" + url.searchParams.toString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [template]);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col gap-6 p-6">
      <header className="max-w-7xl w-full mx-auto flex flex-col sm:flex-row sm:items-center gap-4 justify-between relative z-50">
        <div>
          <h1 className="text-2xl font-bold">Template Playground</h1>
          <p className="text-slate-400 text-sm">
            Dev-only preview. No login required. Data is local and not saved.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {selectable.map((t) => (
            <motion.button
              key={t}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setTemplate(t);
                setData((prev) => ({ ...prev, template: t }));
              }}
              className={`px-3 py-1.5 rounded-full border text-sm cursor-pointer ${
                template === t
                  ? "bg-sky-500 border-sky-400 text-white"
                  : "bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"
              }`}
            >
              {t}
            </motion.button>
          ))}
          {/* Anchor links as hard fallback (work even if JS click handlers fail) */}
          <nav className="ml-2 hidden sm:flex items-center gap-2 text-xs">
            {selectable.map((t) => (
              <a
                key={`a-${t}`}
                href={`?t=${t}`}
                className={`px-2 py-1 rounded-md border ${
                  template === t
                    ? "bg-sky-600/20 border-sky-500 text-sky-300"
                    : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {t}
              </a>
            ))}
          </nav>
          {/* Fallback dropdown in case buttons are not clickable due to browser extensions/overlays */}
          <select
            value={template}
            onChange={(e) => {
              const t = e.target.value as TemplateId;
              setTemplate(t);
              setData((prev) => ({ ...prev, template: t }));
            }}
            className="ml-2 px-2 py-1 rounded-md bg-slate-800 border border-slate-700 text-sm"
            aria-label="Select template"
          >
            {selectable.map((t) => (
              <option key={t} value={t} className="bg-slate-900">
                {t}
              </option>
            ))}
          </select>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto rounded-xl overflow-hidden border border-slate-800 bg-slate-800/40">
        <div className="flex-shrink-0 flex items-center gap-1.5 p-3 bg-slate-900/50 border-b border-slate-700">
          <div className="w-3 h-3 rounded-full bg-slate-700" />
          <div className="w-3 h-3 rounded-full bg-slate-700" />
          <div className="w-3 h-3 rounded-full bg-slate-700" />
          <div className="ml-2 flex-grow bg-slate-800 h-6 rounded-full text-xs text-slate-400 flex items-center px-3">
            <span className="truncate">dev-preview • {template}</span>
          </div>
        </div>
        <div className="h-[80vh] bg-white">
          <LivePreview
            portfolioData={data}
            onUpdate={(newData) => setData(newData)}
            onAddWorkExperience={() =>
              setData((prev) => ({
                ...prev,
                workExperience: [
                  ...prev.workExperience,
                  {
                    title: "New Role",
                    company: "Company",
                    duration: "2024 — Present",
                    description: "Description",
                  },
                ],
              }))
            }
            onDeleteWorkExperience={(index) =>
              setData((prev) => ({
                ...prev,
                workExperience: prev.workExperience.filter((_, i) => i !== index),
              }))
            }
            onAddSkill={() =>
              setData((prev) => ({
                ...prev,
                skills: [...prev.skills, { name: "New Skill", level: "Beginner", icon: "" }],
              }))
            }
            onDeleteSkill={(index) =>
              setData((prev) => ({
                ...prev,
                skills: prev.skills.filter((_, i) => i !== index),
              }))
            }
            onAddProject={() =>
              setData((prev) => ({
                ...prev,
                projects: [
                  ...prev.projects,
                  {
                    title: "New Project",
                    image: "",
                    githubLink: "",
                    liveDemoLink: "",
                  },
                ],
              }))
            }
            onDeleteProject={(index) =>
              setData((prev) => ({
                ...prev,
                projects: prev.projects.filter((_, i) => i !== index),
              }))
            }
          />
        </div>
      </main>
    </div>
  );
}


