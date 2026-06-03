"use client";

import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import type { JSX } from "react";
import Image from "next/image";
import {
  FiBriefcase,
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

interface ExecutiveTemplateProps {
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
      className={`outline-none rounded-sm border border-transparent px-1 -mx-1 transition-all hover:border-slate-300 hover:bg-slate-100 focus:ring-2 focus:ring-slate-500 ${className}`}
    />
  );
};

export function ExecutiveTemplate({
  data,
  isEditable = false,
  onUpdate,
  onAddWorkExperience,
  onAddSkill,
  onAddProject,
  onDeleteWorkExperience,
  onDeleteSkill,
  onDeleteProject,
}: ExecutiveTemplateProps) {
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
    <main className="min-h-screen bg-[#f7f5ef] text-slate-900">
      <header className="border-b border-slate-300 bg-[#f7f5ef]/95 px-5 py-5 sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6">
          <Editable html={data.name || "Your Name"} onChange={(value) => handleUpdate("name", value)} isEditable={isEditable} tagName="h1" className="text-2xl font-black tracking-tight" />
          <nav className="hidden items-center gap-6 text-sm font-semibold uppercase tracking-wide text-slate-600 md:flex">
            <a href="#profile">Profile</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <section id="profile" className="px-5 py-16 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[320px_1fr]">
          <aside>
            <Image src={data.profileImage || "/placeholder-avatar.jpg"} alt={data.name || "Profile"} width={360} height={420} className="aspect-[4/5] w-full border border-slate-300 object-cover" />
            {isEditable && (
              <div className="mt-3 space-y-2">
                <Input value={data.profileImage || ""} onChange={(event) => handleUpdate("profileImage", event.target.value)} placeholder="Profile image URL" className="bg-white" />
                <Input value={data.resumeLink || ""} onChange={(event) => handleUpdate("resumeLink", event.target.value)} placeholder="Resume URL" className="bg-white" />
              </div>
            )}
            <div className="mt-6 space-y-3 border-t border-slate-300 pt-6 text-sm">
              <a href={`mailto:${data.contact?.email || ""}`} className="flex items-center gap-3 hover:text-slate-600"><FiMail /> {data.contact?.email || "email@example.com"}</a>
              <a href={data.contact?.linkedin || "#"} target="_blank" className="flex items-center gap-3 hover:text-slate-600"><FiLinkedin /> LinkedIn</a>
              <a href={data.contact?.github || "#"} target="_blank" className="flex items-center gap-3 hover:text-slate-600"><FiGithub /> GitHub</a>
            </div>
          </aside>

          <div>
            <p className="mb-3 text-sm font-black uppercase tracking-[0.3em] text-slate-500">Portfolio</p>
            <Editable html={data.name || "Your Name"} onChange={(value) => handleUpdate("name", value)} isEditable={isEditable} tagName="h2" className="text-5xl font-black leading-none tracking-tight md:text-7xl" />
            <Editable html={data.bio || "Senior builder focused on outcomes, systems, and product quality."} onChange={(value) => handleUpdate("bio", value)} isEditable={isEditable} tagName="p" className="mt-6 max-w-3xl text-2xl leading-9 text-slate-700" />
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={data.resumeLink || "#"} target="_blank" className="inline-flex items-center gap-2 bg-slate-900 px-5 py-3 text-sm font-bold uppercase tracking-wide text-white hover:bg-slate-700"><FiDownload /> Resume</a>
              <a href="#projects" className="inline-flex items-center gap-2 border border-slate-900 px-5 py-3 text-sm font-bold uppercase tracking-wide hover:bg-white"><FiBriefcase /> View Work</a>
            </div>
            <div className="mt-12 border-y border-slate-300 py-8">
              <h3 className="mb-4 text-sm font-black uppercase tracking-[0.25em] text-slate-500">Executive Summary</h3>
              <Editable html={data.aboutText || "A concise summary of your work, leadership, and impact."} onChange={(value) => handleUpdate("aboutText", value)} isEditable={isEditable} tagName="p" className="text-xl leading-9 text-slate-700" />
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="bg-white px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-4xl font-black tracking-tight">Experience</h2>
            {isEditable && onAddWorkExperience && <button onClick={onAddWorkExperience} className="inline-flex items-center gap-2 bg-slate-900 px-4 py-2 text-sm font-bold text-white"><FiPlus /> Add</button>}
          </div>
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {data.workExperience.map((item, index) => (
              <article key={index} className="group relative grid gap-4 py-7 md:grid-cols-[220px_1fr]">
                {isEditable && onDeleteWorkExperience && <button onClick={() => onDeleteWorkExperience(index)} className="absolute right-0 top-5 bg-red-600 p-2 text-white opacity-0 group-hover:opacity-100"><FiTrash2 size={14} /></button>}
                <Editable html={item.duration} onChange={(value) => handleArrayUpdate("workExperience", index, "duration", value)} isEditable={isEditable} tagName="p" className="text-sm font-bold uppercase tracking-wide text-slate-500" />
                <div>
                  <Editable html={item.title} onChange={(value) => handleArrayUpdate("workExperience", index, "title", value)} isEditable={isEditable} tagName="h3" className="text-2xl font-black" />
                  <Editable html={item.company} onChange={(value) => handleArrayUpdate("workExperience", index, "company", value)} isEditable={isEditable} tagName="p" className="mt-1 font-semibold text-slate-600" />
                  <Editable html={item.description} onChange={(value) => handleArrayUpdate("workExperience", index, "description", value)} isEditable={isEditable} tagName="p" className="mt-4 max-w-3xl leading-7 text-slate-700" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[300px_1fr]">
          <div>
            <h2 className="text-4xl font-black tracking-tight">Capabilities</h2>
            {isEditable && onAddSkill && <button onClick={onAddSkill} className="mt-5 inline-flex items-center gap-2 bg-slate-900 px-4 py-2 text-sm font-bold text-white"><FiPlus /> Add skill</button>}
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {data.skills.map((skill, index) => (
              <div key={index} className="group relative border border-slate-300 bg-white p-5">
                {isEditable && onDeleteSkill && <button onClick={() => onDeleteSkill(index)} className="absolute right-2 top-2 bg-red-600 p-1.5 text-white opacity-0 group-hover:opacity-100"><FiTrash2 size={12} /></button>}
                {skill.icon && <Image src={skill.icon} alt={skill.name} width={32} height={32} className="mb-3 h-8 w-8 object-contain" />}
                {isEditable && <Input value={skill.icon || ""} onChange={(event) => handleArrayUpdate("skills", index, "icon", event.target.value)} placeholder="Icon URL" className="mb-2" />}
                <Editable html={skill.name} onChange={(value) => handleArrayUpdate("skills", index, "name", value)} isEditable={isEditable} tagName="h3" className="font-black" />
                <Editable html={skill.level} onChange={(value) => handleArrayUpdate("skills", index, "level", value)} isEditable={isEditable} tagName="p" className="text-sm text-slate-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="bg-slate-900 px-5 py-16 text-white sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-4xl font-black tracking-tight">Selected Work</h2>
            {isEditable && onAddProject && <button onClick={onAddProject} className="inline-flex items-center gap-2 bg-white px-4 py-2 text-sm font-bold text-slate-900"><FiPlus /> Add</button>}
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {data.projects.map((project, index) => (
              <article key={index} className="group relative border border-white/15 bg-white/[0.04]">
                {isEditable && onDeleteProject && <button onClick={() => onDeleteProject(index)} className="absolute right-3 top-3 z-10 bg-red-600 p-2 text-white opacity-0 group-hover:opacity-100"><FiTrash2 size={14} /></button>}
                <Image src={project.image || "/placeholder-project.jpg"} alt={project.title} width={720} height={420} className="h-56 w-full object-cover" />
                <div className="p-6">
                  {isEditable && <Input value={project.image || ""} onChange={(event) => handleArrayUpdate("projects", index, "image", event.target.value)} placeholder="Project image URL" className="mb-3 bg-white text-slate-900" />}
                  <Editable html={project.title} onChange={(value) => handleArrayUpdate("projects", index, "title", value)} isEditable={isEditable} tagName="h3" className="text-2xl font-black" />
                  <div className="mt-5 flex gap-3">
                    <a href={project.githubLink || "#"} target="_blank" className="inline-flex items-center gap-2 border border-white/20 px-4 py-2 text-sm"><FiGithub /> Code</a>
                    <a href={project.liveDemoLink || "#"} target="_blank" className="inline-flex items-center gap-2 bg-white px-4 py-2 text-sm font-bold text-slate-900"><FiExternalLink /> Live</a>
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

      <footer id="contact" className="px-5 py-14 text-center sm:px-8">
        <h2 className="text-3xl font-black">Let’s Talk</h2>
        <div className="mt-5 flex justify-center gap-5 text-xl">
          <a href={`mailto:${data.contact?.email || ""}`}><FiMail /></a>
          <a href={data.contact?.linkedin || "#"} target="_blank"><FiLinkedin /></a>
          <a href={data.contact?.github || "#"} target="_blank"><FiGithub /></a>
        </div>
        {isEditable && (
          <div className="mx-auto mt-5 grid max-w-2xl gap-2 sm:grid-cols-3">
            <Input value={data.contact?.email || ""} onChange={(event) => handleNestedUpdate("contact", "email", event.target.value)} placeholder="Email" className="bg-white" />
            <Input value={data.contact?.linkedin || ""} onChange={(event) => handleNestedUpdate("contact", "linkedin", event.target.value)} placeholder="LinkedIn" className="bg-white" />
            <Input value={data.contact?.github || ""} onChange={(event) => handleNestedUpdate("contact", "github", event.target.value)} placeholder="GitHub" className="bg-white" />
          </div>
        )}
        <p className="mt-6 text-sm text-slate-500">© {new Date().getFullYear()} {data.name}. Built with NoCodefolio.</p>
      </footer>
    </main>
  );
}
