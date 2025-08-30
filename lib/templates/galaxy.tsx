"use client";

import { JSX } from "react";
import { SerializablePortfolio, PortfolioData } from "@/types/portfolio";
import { motion } from "framer-motion";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiExternalLink } from "react-icons/fi";

interface GalaxyTemplateProps {
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
    return (
      <div className={className} dangerouslySetInnerHTML={{ __html: html || "" }} />
    );
  }
  return (
    <ContentEditable
      html={html || ""}
      onChange={(e: ContentEditableEvent) => onChange(e.target.value)}
      tagName={tagName}
      className={`outline-none focus:ring-2 focus:ring-fuchsia-500 rounded-md transition-all p-1 -m-1 ${
        isEditable
          ? "hover:bg-fuchsia-500/10 border border-dashed border-transparent hover:border-fuchsia-500"
          : ""
      } ${className}`}
    />
  );
};

export function GalaxyTemplate({
  data,
  isEditable = false,
  onUpdate,
  onAddWorkExperience,
  onAddSkill,
  onAddProject,
  onDeleteWorkExperience,
  onDeleteSkill,
  onDeleteProject,
}: GalaxyTemplateProps) {
  const handleUpdate = (field: keyof PortfolioData, value: any) => {
    if (isEditable && onUpdate) onUpdate({ ...data, [field]: value });
  };
  const handleNestedUpdate = <T extends object>(
    objKey: keyof PortfolioData,
    field: keyof T,
    value: string
  ) => {
    if (isEditable && onUpdate) {
      const newObject = { ...(data[objKey] as T), [field]: value };
      onUpdate({ ...data, [objKey]: newObject });
    }
  };
  const handleArrayUpdate = <T extends object>(
    arrayKey: keyof PortfolioData,
    index: number,
    field: keyof T,
    value: string
  ) => {
    if (isEditable && onUpdate) {
      const newArray = [...(data[arrayKey] as T[])];
      newArray[index] = { ...newArray[index], [field]: value };
      onUpdate({ ...data, [arrayKey]: newArray });
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-lexend selection:bg-fuchsia-500/20">
      <div className="pointer-events-none absolute inset-0 opacity-30" style={{
        background:
          "radial-gradient(600px circle at 0% 0%, rgba(217, 70, 239, 0.25), transparent 40%), radial-gradient(800px circle at 100% 0%, rgba(59, 130, 246, 0.2), transparent 40%), radial-gradient(600px circle at 100% 100%, rgba(16, 185, 129, 0.2), transparent 40%)",
      }} />
      <main className="relative">
        {/* NAVBAR */}
        <nav className="sticky top-0 z-40 px-6 py-3 bg-slate-950/80 backdrop-blur border-b border-slate-800">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <button onClick={() => document.getElementById("profile")?.scrollIntoView({ behavior: "smooth" })} className="text-sm font-semibold cursor-pointer">
              {data.name || "Galaxy"}
            </button>
            <div className="hidden md:flex items-center gap-4 text-xs">
              {[
                { id: "about", label: "About" },
                { id: "experience", label: "Experience" },
                { id: "skills", label: "Skills" },
                { id: "projects", label: "Projects" },
                { id: "contact", label: "Contact" },
              ].map((item) => (
                <button key={item.id} onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })} className="cursor-pointer text-slate-300 hover:text-fuchsia-400">
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </nav>
        {/* HERO */}
        <section id="profile" className="min-h-screen flex items-center justify-center px-6 py-24">
          <div className="max-w-4xl w-full text-center">
            <div className="mx-auto mb-8 w-36 h-36 rounded-full ring-4 ring-fuchsia-500/40 overflow-hidden">
              <Image src={data.profileImage || "/placeholder-avatar.jpg"} alt="Avatar" width={144} height={144} className="w-full h-full object-cover" />
            </div>
            <Editable html={data.name || "Your Name"} onChange={(v) => handleUpdate("name", v)} isEditable={isEditable} tagName="h1" className="text-5xl md:text-7xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-cyan-300 to-emerald-300" />
            <Editable html={data.bio || "Build cosmic experiences."} onChange={(v) => handleUpdate("bio", v)} isEditable={isEditable} tagName="p" className="mt-4 text-lg md:text-xl text-slate-300" />

            <div className="mt-6 flex items-center justify-center gap-4">
              {isEditable ? (
                <Input
                  type="text"
                  placeholder="Resume URL"
                  value={data.resumeLink || ""}
                  onChange={(e) => handleUpdate("resumeLink", e.target.value)}
                  className="max-w-sm bg-slate-900 border-slate-700"
                />
              ) : (
                data.resumeLink && (
                  <a href={data.resumeLink} target="_blank" className="px-5 py-2 rounded-lg bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-semibold cursor-pointer">
                    <FiDownload className="inline -mt-1 mr-2" /> Download CV
                  </a>
                )
              )}
              <div className="flex items-center gap-3">
                {isEditable ? (
                  <>
                    <Input type="text" placeholder="GitHub URL" value={data.contact?.github || ""} onChange={(e) => handleNestedUpdate("contact", "github", e.target.value)} className="w-40 bg-slate-900 border-slate-700 text-xs" />
                    <Input type="text" placeholder="LinkedIn URL" value={data.contact?.linkedin || ""} onChange={(e) => handleNestedUpdate("contact", "linkedin", e.target.value)} className="w-40 bg-slate-900 border-slate-700 text-xs" />
                    <Input type="text" placeholder="Email" value={data.contact?.email || ""} onChange={(e) => handleNestedUpdate("contact", "email", e.target.value)} className="w-40 bg-slate-900 border-slate-700 text-xs" />
                  </>
                ) : (
                  <>
                    {data.contact?.github && (
                      <a href={data.contact.github} target="_blank" className="text-slate-400 hover:text-fuchsia-400 cursor-pointer">
                        <FiGithub size={20} />
                      </a>
                    )}
                    {data.contact?.linkedin && (
                      <a href={data.contact.linkedin} target="_blank" className="text-slate-400 hover:text-fuchsia-400 cursor-pointer">
                        <FiLinkedin size={20} />
                      </a>
                    )}
                    {data.contact?.email && (
                      <a href={`mailto:${data.contact.email}`} className="text-slate-400 hover:text-fuchsia-400 cursor-pointer">
                        <FiMail size={20} />
                      </a>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="py-24">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-3xl font-extrabold">About</h2>
            <Editable html={data.aboutText || "Tell your story"} onChange={(v) => handleUpdate("aboutText", v)} isEditable={isEditable} tagName="p" className="mt-4 text-slate-300 leading-relaxed" />
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="py-24 bg-slate-900/50">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-3xl font-extrabold">Experience</h2>
            <div className="mt-8 space-y-6">
              {data.workExperience.map((exp, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} className="relative group p-6 bg-slate-900 border border-slate-800 rounded-xl">
                  {isEditable && (
                    <button onClick={() => onDeleteWorkExperience && onDeleteWorkExperience(i)} className="absolute -top-2 -right-2 px-2 py-1 rounded-full bg-fuchsia-600 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">Delete</button>
                  )}
                  <Editable html={exp.title} onChange={(v) => handleArrayUpdate("workExperience", i, "title", v)} isEditable={isEditable} tagName="h3" className="text-xl font-bold" />
                  <div className="flex items-center gap-4 text-sm text-fuchsia-300">
                    <Editable html={exp.company} onChange={(v) => handleArrayUpdate("workExperience", i, "company", v)} isEditable={isEditable} />
                    <span className="text-slate-500">•</span>
                    <Editable html={exp.duration} onChange={(v) => handleArrayUpdate("workExperience", i, "duration", v)} isEditable={isEditable} />
                  </div>
                  <Editable html={exp.description} onChange={(v) => handleArrayUpdate("workExperience", i, "description", v)} isEditable={isEditable} tagName="p" className="mt-2 text-slate-400" />
                </motion.div>
              ))}
            </div>
            {isEditable && onAddWorkExperience && (
              <button onClick={onAddWorkExperience} className="mt-6 px-4 py-2 rounded-lg bg-fuchsia-600 text-white cursor-pointer">Add Experience</button>
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
                  <Editable html={s.name} onChange={(v) => handleArrayUpdate("skills", i, "name", v)} isEditable={isEditable} className="bg-slate-900 border border-slate-800 rounded-full px-3 py-1 text-slate-300" />
                  {isEditable && (
                    <Input type="text" placeholder="Icon URL" value={s.icon || ""} onChange={(e) => handleArrayUpdate("skills", i, "icon", e.target.value)} className="mt-1 w-40 bg-slate-900 border-slate-800 text-xs" />
                  )}
                  {isEditable && (
                    <button onClick={() => onDeleteSkill && onDeleteSkill(i)} className="absolute -top-2 -right-2 px-2 py-1 rounded-full bg-fuchsia-600 text-white text-[10px] opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">x</button>
                  )}
                </div>
              ))}
              {isEditable && onAddSkill && (
                <button onClick={onAddSkill} className="px-2 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 cursor-pointer">+ Add</button>
              )}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="py-24 bg-slate-900/50">
          <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="text-3xl font-extrabold">Projects</h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.projects.map((p, i) => (
                <motion.div key={i} whileHover={{ y: -4 }} className="relative group overflow-hidden rounded-xl border border-slate-800">
                  {isEditable && (
                    <button onClick={() => onDeleteProject && onDeleteProject(i)} className="absolute top-2 right-2 z-10 px-2 py-1 rounded-full bg-fuchsia-600 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">Delete</button>
                  )}
                  <Image src={p.image || "/placeholder-project.jpg"} alt={p.title} width={800} height={480} className="w-full h-56 object-cover" />
                  <div className="p-6 bg-slate-900/80">
                    <Editable html={p.title} onChange={(v) => handleArrayUpdate("projects", i, "title", v)} isEditable={isEditable} tagName="h3" className="text-xl font-bold" />
                    <div className="mt-3 flex gap-3">
                      {isEditable ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full">
                          <Input type="text" placeholder="Image URL" value={p.image || ""} onChange={(e) => handleArrayUpdate("projects", i, "image", e.target.value)} className="bg-slate-900 border-slate-700 text-xs" />
                          <Input type="text" placeholder="GitHub Link" value={p.githubLink || ""} onChange={(e) => handleArrayUpdate("projects", i, "githubLink", e.target.value)} className="bg-slate-900 border-slate-700 text-xs" />
                          <Input type="text" placeholder="Live Demo Link" value={p.liveDemoLink || ""} onChange={(e) => handleArrayUpdate("projects", i, "liveDemoLink", e.target.value)} className="bg-slate-900 border-slate-700 text-xs" />
                        </div>
                      ) : (
                        <>
                          {p.githubLink && (
                            <a href={p.githubLink} target="_blank" className="px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer">
                              <FiGithub className="inline mr-1" /> GitHub
                            </a>
                          )}
                          {p.liveDemoLink && (
                            <a href={p.liveDemoLink} target="_blank" className="px-3 py-1.5 rounded-md bg-fuchsia-600 hover:bg-fuchsia-500 text-white cursor-pointer">
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
              <button onClick={onAddProject} className="mt-6 px-4 py-2 rounded-lg bg-fuchsia-600 text-white cursor-pointer">Add Project</button>
            )}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-24">
          <div className="container mx-auto px-6 max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold">Get In Touch</h2>
            <Editable html={data.contact?.email || "your@email.com"} onChange={(v) => handleNestedUpdate("contact", "email", v)} isEditable={isEditable} className="mt-4 inline-block text-fuchsia-300" />
          </div>
        </section>

        <footer className="py-8 text-center text-sm text-slate-500 border-t border-slate-800">© {new Date().getFullYear()} {data.name}. All Rights Reserved.</footer>
      </main>
    </div>
  );
}


