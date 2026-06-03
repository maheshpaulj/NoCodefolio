"use client";

import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import type { JSX } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FiDownload,
  FiExternalLink,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";
import { Input } from "@/components/ui/input";
import { PortfolioData, SerializablePortfolio } from "@/types/portfolio";

interface AuroraTemplateProps {
  data: SerializablePortfolio;
  isEditable?: boolean;
  onUpdate?: (data: SerializablePortfolio) => void;
  onAddWorkExperience?: () => void;
  onAddSkill?: () => void;
  onAddProject?: () => void;
  onDeleteWorkExperience?: (index: number) => void;
  onDeleteSkill?: (index: number) => void;
  onDeleteProject?: (index: number) => void;
}

const Editable = ({
  html,
  onChange,
  isEditable,
  className = "",
  tagName = "div",
}: {
  html: string;
  onChange: (value: string) => void;
  isEditable: boolean;
  className?: string;
  tagName?: keyof JSX.IntrinsicElements;
}) => {
  if (!isEditable) {
    const Tag = tagName as keyof JSX.IntrinsicElements;
    return <Tag className={className} dangerouslySetInnerHTML={{ __html: html || "" }} />;
  }

  return (
    <ContentEditable
      html={html || ""}
      onChange={(event: ContentEditableEvent) => onChange(event.target.value)}
      tagName={tagName}
      className={`outline-none rounded-md transition-all focus:ring-2 focus:ring-teal-300 hover:bg-white/10 border border-transparent hover:border-white/20 px-1 -mx-1 ${className}`}
    />
  );
};

export function AuroraTemplate({
  data,
  isEditable = false,
  onUpdate,
  onAddWorkExperience,
  onAddSkill,
  onAddProject,
  onDeleteWorkExperience,
  onDeleteSkill,
  onDeleteProject,
}: AuroraTemplateProps) {
  const handleUpdate = (field: keyof PortfolioData, value: unknown) => {
    if (isEditable && onUpdate) onUpdate({ ...data, [field]: value });
  };

  const handleNestedUpdate = <T extends object>(
    objKey: keyof PortfolioData,
    field: keyof T,
    value: string
  ) => {
    if (!isEditable || !onUpdate) return;
    onUpdate({ ...data, [objKey]: { ...(data[objKey] as T), [field]: value } });
  };

  const handleArrayUpdate = <T extends object>(
    arrayKey: keyof PortfolioData,
    index: number,
    field: keyof T,
    value: string
  ) => {
    if (!isEditable || !onUpdate) return;
    const nextArray = [...(data[arrayKey] as T[])];
    nextArray[index] = { ...nextArray[index], [field]: value };
    onUpdate({ ...data, [arrayKey]: nextArray });
  };

  return (
    <main className="min-h-screen bg-[#08111f] text-slate-100 selection:bg-teal-300/30">
      <section className="relative overflow-hidden px-5 py-20 sm:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(20,184,166,0.35),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(14,165,233,0.28),transparent_32%),linear-gradient(135deg,#08111f_0%,#14213d_55%,#04111a_100%)]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1fr_360px]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-5 inline-flex rounded-full border border-teal-300/30 bg-white/10 px-4 py-2 text-sm text-teal-100">
              Open to thoughtful, high-impact work
            </div>
            <Editable
              html={data.name || "Your Name"}
              onChange={(value) => handleUpdate("name", value)}
              isEditable={isEditable}
              tagName="h1"
              className="max-w-3xl text-5xl font-black leading-tight text-white md:text-7xl"
            />
            <Editable
              html={data.bio || "Product-minded developer building polished web experiences."}
              onChange={(value) => handleUpdate("bio", value)}
              isEditable={isEditable}
              tagName="p"
              className="mt-6 max-w-2xl text-xl leading-8 text-slate-300"
            />
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={data.resumeLink || "#"} target="_blank" className="inline-flex items-center gap-2 rounded-lg bg-teal-300 px-5 py-3 font-semibold text-slate-950 hover:bg-teal-200">
                <FiDownload /> Resume
              </a>
              <a href={data.contact?.github || "#"} target="_blank" className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-3 text-slate-200 hover:bg-white/10">
                <FiGithub /> GitHub
              </a>
              <a href={`mailto:${data.contact?.email || ""}`} className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-3 text-slate-200 hover:bg-white/10">
                <FiMail /> Email
              </a>
            </div>
            {isEditable && (
              <div className="mt-5 grid gap-2 rounded-lg border border-white/10 bg-white/10 p-3 sm:grid-cols-2">
                <Input value={data.profileImage || ""} onChange={(event) => handleUpdate("profileImage", event.target.value)} placeholder="Profile image URL" className="bg-white text-slate-900" />
                <Input value={data.resumeLink || ""} onChange={(event) => handleUpdate("resumeLink", event.target.value)} placeholder="Resume URL" className="bg-white text-slate-900" />
              </div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-teal-300/40 to-sky-400/30 blur-2xl" />
            <Image src={data.profileImage || "/placeholder-avatar.jpg"} alt={data.name || "Profile"} width={420} height={520} className="relative aspect-[4/5] w-full rounded-[1.5rem] border border-white/15 object-cover shadow-2xl" />
          </motion.div>
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-20 text-slate-900 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-teal-700">About</p>
          <Editable html={data.aboutText || "Tell your story here."} onChange={(value) => handleUpdate("aboutText", value)} isEditable={isEditable} tagName="p" className="mt-4 text-2xl leading-10 text-slate-700" />
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-center justify-between gap-4">
            <h2 className="text-3xl font-black text-white">Experience</h2>
            {isEditable && onAddWorkExperience && <button onClick={onAddWorkExperience} className="inline-flex items-center gap-2 rounded-lg bg-teal-300 px-4 py-2 text-sm font-semibold text-slate-950"><FiPlus /> Add</button>}
          </div>
          <div className="grid gap-5">
            {data.workExperience.map((item, index) => (
              <div key={index} className="group relative rounded-xl border border-white/10 bg-white/[0.06] p-6">
                {isEditable && onDeleteWorkExperience && <button onClick={() => onDeleteWorkExperience(index)} className="absolute right-3 top-3 rounded-full bg-red-500 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100"><FiTrash2 size={14} /></button>}
                <Editable html={item.title} onChange={(value) => handleArrayUpdate("workExperience", index, "title", value)} isEditable={isEditable} tagName="h3" className="text-2xl font-bold text-white" />
                <div className="mt-2 flex flex-wrap gap-3 text-teal-200">
                  <Editable html={item.company} onChange={(value) => handleArrayUpdate("workExperience", index, "company", value)} isEditable={isEditable} tagName="p" className="font-semibold" />
                  <Editable html={item.duration} onChange={(value) => handleArrayUpdate("workExperience", index, "duration", value)} isEditable={isEditable} tagName="p" className="text-slate-300" />
                </div>
                <Editable html={item.description} onChange={(value) => handleArrayUpdate("workExperience", index, "description", value)} isEditable={isEditable} tagName="p" className="mt-4 text-slate-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 text-slate-900 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="text-3xl font-black">Skills</h2>
            <p className="mt-3 text-slate-600">A quick read on the tools and strengths behind the work.</p>
            {isEditable && onAddSkill && <button onClick={onAddSkill} className="mt-5 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"><FiPlus /> Add skill</button>}
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {data.skills.map((skill, index) => (
              <div key={index} className="group relative rounded-xl border border-slate-200 p-5 shadow-sm">
                {isEditable && onDeleteSkill && <button onClick={() => onDeleteSkill(index)} className="absolute right-2 top-2 rounded-full bg-red-500 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100"><FiTrash2 size={12} /></button>}
                {skill.icon && <Image src={skill.icon} alt={skill.name} width={36} height={36} className="mb-3 h-9 w-9 object-contain" />}
                {isEditable && <Input value={skill.icon || ""} onChange={(event) => handleArrayUpdate("skills", index, "icon", event.target.value)} placeholder="Icon URL" className="mb-2 text-xs" />}
                <Editable html={skill.name} onChange={(value) => handleArrayUpdate("skills", index, "name", value)} isEditable={isEditable} tagName="h3" className="font-bold" />
                <Editable html={skill.level} onChange={(value) => handleArrayUpdate("skills", index, "level", value)} isEditable={isEditable} tagName="p" className="text-sm text-slate-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-center justify-between gap-4">
            <h2 className="text-3xl font-black text-white">Selected Projects</h2>
            {isEditable && onAddProject && <button onClick={onAddProject} className="inline-flex items-center gap-2 rounded-lg bg-teal-300 px-4 py-2 text-sm font-semibold text-slate-950"><FiPlus /> Add</button>}
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {data.projects.map((project, index) => (
              <article key={index} className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.06]">
                {isEditable && onDeleteProject && <button onClick={() => onDeleteProject(index)} className="absolute right-3 top-3 z-10 rounded-full bg-red-500 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100"><FiTrash2 size={14} /></button>}
                <Image src={project.image || "/placeholder-project.jpg"} alt={project.title} width={720} height={420} className="h-56 w-full object-cover" />
                <div className="p-6">
                  {isEditable && <Input value={project.image || ""} onChange={(event) => handleArrayUpdate("projects", index, "image", event.target.value)} placeholder="Project image URL" className="mb-3 bg-white text-slate-900" />}
                  <Editable html={project.title} onChange={(value) => handleArrayUpdate("projects", index, "title", value)} isEditable={isEditable} tagName="h3" className="text-2xl font-bold text-white" />
                  <div className="mt-5 flex gap-3">
                    <a href={project.githubLink || "#"} target="_blank" className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm text-slate-200"><FiGithub /> Code</a>
                    <a href={project.liveDemoLink || "#"} target="_blank" className="inline-flex items-center gap-2 rounded-lg bg-teal-300 px-4 py-2 text-sm font-semibold text-slate-950"><FiExternalLink /> Live</a>
                  </div>
                  {isEditable && (
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      <Input value={project.githubLink || ""} onChange={(event) => handleArrayUpdate("projects", index, "githubLink", event.target.value)} placeholder="GitHub URL" className="bg-white text-slate-900" />
                      <Input value={project.liveDemoLink || ""} onChange={(event) => handleArrayUpdate("projects", index, "liveDemoLink", event.target.value)} placeholder="Live URL" className="bg-white text-slate-900" />
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 px-5 py-12 text-center text-slate-300">
        <div className="flex justify-center gap-5">
          <a href={data.contact?.linkedin || "#"} target="_blank" className="hover:text-teal-200"><FiLinkedin size={22} /></a>
          <a href={data.contact?.github || "#"} target="_blank" className="hover:text-teal-200"><FiGithub size={22} /></a>
          <a href={`mailto:${data.contact?.email || ""}`} className="hover:text-teal-200"><FiMail size={22} /></a>
        </div>
        {isEditable && (
          <div className="mx-auto mt-5 grid max-w-2xl gap-2 sm:grid-cols-3">
            <Input value={data.contact?.email || ""} onChange={(event) => handleNestedUpdate("contact", "email", event.target.value)} placeholder="Email" className="bg-white text-slate-900" />
            <Input value={data.contact?.linkedin || ""} onChange={(event) => handleNestedUpdate("contact", "linkedin", event.target.value)} placeholder="LinkedIn" className="bg-white text-slate-900" />
            <Input value={data.contact?.github || ""} onChange={(event) => handleNestedUpdate("contact", "github", event.target.value)} placeholder="GitHub" className="bg-white text-slate-900" />
          </div>
        )}
        <p className="mt-6 text-sm">© {new Date().getFullYear()} {data.name}. Built with NoCodefolio.</p>
      </footer>
    </main>
  );
}
