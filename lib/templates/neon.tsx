"use client";

import { JSX } from "react";
import { SerializablePortfolio, PortfolioData } from "@/types/portfolio";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import Image from "next/image";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiExternalLink } from "react-icons/fi";

interface NeonTemplateProps {
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

const Editable: React.FC<{
  html: string;
  onChange: (value: string) => void;
  isEditable: boolean;
  className?: string;
  tagName?: keyof JSX.IntrinsicElements;
}> = ({ html, onChange, isEditable, className, tagName = "div" }) => {
  if (!isEditable) {
    return <div className={className} dangerouslySetInnerHTML={{ __html: html || "" }} />;
  }
  return (
    <ContentEditable
      html={html || ""}
      onChange={(e: ContentEditableEvent) => onChange(e.target.value)}
      tagName={tagName}
      className={`outline-none focus:ring-2 focus:ring-cyan-400 rounded-md transition-all p-1 -m-1 ${
        isEditable ? "hover:bg-cyan-400/10 border border-dashed border-transparent hover:border-cyan-400" : ""
      } ${className}`}
    />
  );
};

export function NeonTemplate({
  data,
  isEditable = false,
  onUpdate,
  onAddWorkExperience,
  onAddSkill,
  onAddProject,
  onDeleteWorkExperience,
  onDeleteSkill,
  onDeleteProject,
}: NeonTemplateProps) {
  const update = (field: keyof PortfolioData, value: any) => {
    if (isEditable && onUpdate) onUpdate({ ...data, [field]: value });
  };
  const updateNested = <T extends object>(
    objKey: keyof PortfolioData,
    field: keyof T,
    value: string
  ) => {
    if (isEditable && onUpdate) {
      const next = { ...(data[objKey] as T), [field]: value };
      onUpdate({ ...data, [objKey]: next });
    }
  };
  const updateArray = <T extends object>(
    arrayKey: keyof PortfolioData,
    index: number,
    field: keyof T,
    value: string
  ) => {
    if (isEditable && onUpdate) {
      const arr = [...(data[arrayKey] as T[])];
      arr[index] = { ...arr[index], [field]: value };
      onUpdate({ ...data, [arrayKey]: arr });
    }
  };

  return (
    <div className="min-h-screen bg-black text-cyan-100 selection:bg-cyan-400/20">
      <div className="fixed inset-0 -z-10 opacity-30" style={{
        background:
          "conic-gradient(from 180deg at 50% 50%, rgba(34,211,238,.25) 0deg, rgba(192,132,252,.2) 120deg, rgba(34,211,238,.25) 240deg, rgba(192,132,252,.2) 360deg)",
      }} />
      {/* HERO */}
      <section id="profile" className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center max-w-3xl">
          <div className="mx-auto mb-6 w-32 h-32 rounded-full ring-4 ring-cyan-400/40 overflow-hidden">
            <Image src={data.profileImage || "/placeholder-avatar.jpg"} alt="Avatar" width={128} height={128} className="w-full h-full object-cover" />
          </div>
          <Editable html={data.name || "Your Name"} onChange={(v) => update("name", v)} isEditable={isEditable} tagName="h1" className="text-6xl md:text-7xl font-black tracking-tight" />
          <Editable html={data.bio || "Your bio"} onChange={(v) => update("bio", v)} isEditable={isEditable} tagName="p" className="mt-3 text-cyan-300" />
          <div className="mt-6 flex items-center justify-center gap-4">
            {isEditable ? (
              <Input type="text" placeholder="Resume URL" value={data.resumeLink || ""} onChange={(e) => update("resumeLink", e.target.value)} className="max-w-sm bg-white/5 border-white/10" />
            ) : (
              data.resumeLink && (
                <a href={data.resumeLink} target="_blank" className="px-5 py-2 rounded-md bg-cyan-500 text-black font-semibold cursor-pointer hover:bg-cyan-400">
                  <FiDownload className="inline -mt-1 mr-2" /> Download CV
                </a>
              )
            )}
            <div className="flex items-center gap-3">
              {isEditable ? (
                <>
                  <Input type="text" placeholder="GitHub URL" value={data.contact?.github || ""} onChange={(e) => updateNested("contact", "github", e.target.value)} className="w-40 bg-white/5 border-white/10 text-xs" />
                  <Input type="text" placeholder="LinkedIn URL" value={data.contact?.linkedin || ""} onChange={(e) => updateNested("contact", "linkedin", e.target.value)} className="w-40 bg-white/5 border-white/10 text-xs" />
                  <Input type="text" placeholder="Email" value={data.contact?.email || ""} onChange={(e) => updateNested("contact", "email", e.target.value)} className="w-40 bg-white/5 border-white/10 text-xs" />
                </>
              ) : (
                <>
                  {data.contact?.github && (
                    <a href={data.contact.github} target="_blank" className="text-cyan-300 hover:text-cyan-100 cursor-pointer"><FiGithub size={20} /></a>
                  )}
                  {data.contact?.linkedin && (
                    <a href={data.contact.linkedin} target="_blank" className="text-cyan-300 hover:text-cyan-100 cursor-pointer"><FiLinkedin size={20} /></a>
                  )}
                  {data.contact?.email && (
                    <a href={`mailto:${data.contact.email}`} className="text-cyan-300 hover:text-cyan-100 cursor-pointer"><FiMail size={20} /></a>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl font-extrabold">About</h2>
          <Editable html={data.aboutText || "About me..."} onChange={(v) => update("aboutText", v)} isEditable={isEditable} tagName="p" className="mt-3 text-cyan-200/80" />
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="py-24 bg-white/5">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-extrabold">Experience</h2>
          <div className="mt-8 space-y-6">
            {data.workExperience.map((exp, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} className="relative group p-6 rounded-xl bg-white/5 border border-white/10">
                {isEditable && (
                  <button onClick={() => onDeleteWorkExperience && onDeleteWorkExperience(i)} className="absolute -top-2 -right-2 px-2 py-1 bg-cyan-500 text-black rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">Delete</button>
                )}
                <Editable html={exp.title} onChange={(v) => updateArray("workExperience", i, "title", v)} isEditable={isEditable} tagName="h3" className="text-xl font-bold" />
                <div className="flex items-center gap-4 text-sm text-fuchsia-300">
                  <Editable html={exp.company} onChange={(v) => updateArray("workExperience", i, "company", v)} isEditable={isEditable} />
                  <span className="text-cyan-400/60">•</span>
                  <Editable html={exp.duration} onChange={(v) => updateArray("workExperience", i, "duration", v)} isEditable={isEditable} />
                </div>
                <Editable html={exp.description} onChange={(v) => updateArray("workExperience", i, "description", v)} isEditable={isEditable} tagName="p" className="mt-2 text-cyan-200/80" />
              </motion.div>
            ))}
          </div>
          {isEditable && onAddWorkExperience && (
            <button onClick={onAddWorkExperience} className="mt-6 px-4 py-2 rounded-lg bg-cyan-500 text-black font-semibold cursor-pointer">Add Experience</button>
          )}
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-extrabold">Skills</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {data.skills.map((s, i) => (
              <div key={i} className="relative group">
                <Editable html={s.name} onChange={(v) => updateArray("skills", i, "name", v)} isEditable={isEditable} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-100" />
                {isEditable && (
                  <Input type="text" placeholder="Icon URL" value={s.icon || ""} onChange={(e) => updateArray("skills", i, "icon", e.target.value)} className="mt-1 w-40 bg-white/5 border-white/10 text-xs" />
                )}
                {isEditable && (
                  <button onClick={() => onDeleteSkill && onDeleteSkill(i)} className="absolute -top-2 -right-2 px-2 py-1 rounded-full bg-cyan-500 text-black text-[10px] opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">x</button>
                )}
              </div>
            ))}
            {isEditable && onAddSkill && (
              <button onClick={onAddSkill} className="px-2 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-100 cursor-pointer">+ Add</button>
            )}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-24 bg-white/5">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-3xl font-extrabold">Projects</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.projects.map((p, i) => (
              <motion.div key={i} whileHover={{ scale: 1.01 }} className="relative group overflow-hidden rounded-xl bg-black/60 border border-white/10">
                {isEditable && (
                  <button onClick={() => onDeleteProject && onDeleteProject(i)} className="absolute top-2 right-2 z-10 px-2 py-1 rounded-full bg-cyan-500 text-black text-xs opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">Delete</button>
                )}
                <Image src={p.image || "/placeholder-project.jpg"} alt={p.title} width={800} height={480} className="w-full h-56 object-cover" />
                <div className="p-6">
                  <Editable html={p.title} onChange={(v) => updateArray("projects", i, "title", v)} isEditable={isEditable} tagName="h3" className="text-xl font-bold" />
                  <div className="mt-3 flex gap-3">
                    {isEditable ? (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full">
                        <Input type="text" placeholder="Image URL" value={p.image || ""} onChange={(e) => updateArray("projects", i, "image", e.target.value)} className="bg-white/5 border-white/10 text-xs" />
                        <Input type="text" placeholder="GitHub Link" value={p.githubLink || ""} onChange={(e) => updateArray("projects", i, "githubLink", e.target.value)} className="bg-white/5 border-white/10 text-xs" />
                        <Input type="text" placeholder="Live Demo Link" value={p.liveDemoLink || ""} onChange={(e) => updateArray("projects", i, "liveDemoLink", e.target.value)} className="bg.white/5 border-white/10 text-xs" />
                      </div>
                    ) : (
                      <>
                        {p.githubLink && (
                          <a href={p.githubLink} target="_blank" className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-cyan-100 cursor-pointer">
                            <FiGithub className="inline mr-1" /> GitHub
                          </a>
                        )}
                        {p.liveDemoLink && (
                          <a href={p.liveDemoLink} target="_blank" className="px-3 py-1.5 rounded-md bg-cyan-500 text-black hover:bg-cyan-400 cursor-pointer">
                            <FiExternalLink className="inline mr-1" /> Live
                          </a>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {isEditable && onAddProject && (
            <button onClick={onAddProject} className="mt-6 px-4 py-2 rounded-lg bg-cyan-500 text-black font-semibold cursor-pointer">Add Project</button>
          )}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold">Get In Touch</h2>
          <Editable html={data.contact?.email || "your@email.com"} onChange={(v) => updateNested("contact", "email", v)} isEditable={isEditable} className="mt-4 inline-block text-cyan-300" />
          {!isEditable && data.contact?.email && (
            <div className="mt-4">
              <a href={`mailto:${data.contact.email}`} className="px-4 py-2 rounded-md bg-cyan-500 text-black inline-flex items-center gap-2 cursor-pointer"><FiMail /> Send Email</a>
            </div>
          )}
        </div>
      </section>

      <footer className="py-8 text-center text-xs text-cyan-300/70 border-t border-white/10">© {new Date().getFullYear()} {data.name}. All Rights Reserved.</footer>
    </div>
  );
}


