"use client";

import {
  PortfolioData,
  WorkExperience,
  Skill,
  Project,
  SerializablePortfolio,
} from "@/types/portfolio";
import { motion } from "framer-motion";
import {
  FiMail,
  FiPlus,
  FiTrash2,
  FiExternalLink,
  FiGithub,
  FiLinkedin,
} from "react-icons/fi";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { JSX } from "react";

// --- Props Interface ---
interface MinimalTemplateProps {
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

// === SUB-COMPONENTS ===
const Section: React.FC<{
  id: string;
  title: string;
  children: React.ReactNode;
}> = ({ id, title, children }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6 }}
    className="w-full max-w-3xl mx-auto py-16 md:py-24"
  >
    <h2 className="text-2xl font-bold text-slate-800 mb-8">{title}</h2>
    {children}
  </motion.section>
);
const Editable: React.FC<{
  html: string;
  onChange: (value: string) => void;
  isEditable: boolean;
  className?: string;
  tagName?: keyof JSX.IntrinsicElements;
}> = ({ html, onChange, isEditable, className, tagName = "div" }) => {
  if (!isEditable) {
    return (
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: html || "" }}
      />
    );
  }
  return (
    <ContentEditable
      html={html || ""}
      onChange={(e: ContentEditableEvent) => onChange(e.target.value)}
      tagName={tagName}
      className={`outline-none focus:ring-1 focus:ring-slate-400 rounded-sm transition-all p-1 -m-1 ${
        isEditable
          ? "hover:bg-slate-100 border border-dashed border-transparent hover:border-slate-300"
          : ""
      } ${className}`}
    />
  );
};
const WorkExperienceItem: React.FC<{
  exp: WorkExperience;
  index: number;
  isEditable: boolean;
  onUpdate: Function; // eslint-disable-line @typescript-eslint/no-unsafe-function-type
  onDelete?: (index: number) => void;
}> = ({ exp, index, isEditable, onUpdate, onDelete }) => (
  <div className="relative group flex flex-col sm:flex-row gap-4 py-6 border-b border-slate-200">
    {isEditable && onDelete && (
      <button
        onClick={() => onDelete(index)}
        className="absolute top-4 right-0 p-1.5 bg-red-100 text-red-500 hover:bg-red-500 hover:text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
      >
        <FiTrash2 size={14} />
      </button>
    )}
    <div className="w-full sm:w-1/3 text-slate-500 text-sm">
      <Editable
        html={exp.duration}
        onChange={(val) => onUpdate("workExperience", index, "duration", val)}
        isEditable={isEditable}
      />
    </div>
    <div className="w-full sm:w-2/3">
      <Editable
        html={exp.title}
        onChange={(val) => onUpdate("workExperience", index, "title", val)}
        isEditable={isEditable}
        tagName="h3"
        className="font-bold text-slate-800"
      />
      <Editable
        html={exp.company}
        onChange={(val) => onUpdate("workExperience", index, "company", val)}
        isEditable={isEditable}
        tagName="p"
        className="text-slate-600"
      />
      <Editable
        html={exp.description}
        onChange={(val) =>
          onUpdate("workExperience", index, "description", val)
        }
        isEditable={isEditable}
        tagName="p"
        className="mt-2 text-slate-500 text-sm"
      />
    </div>
  </div>
);
const ProjectCard: React.FC<{
  project: Project;
  index: number;
  isEditable: boolean;
  onUpdate: Function; // eslint-disable-line @typescript-eslint/no-unsafe-function-type
  onDelete?: (index: number) => void;
}> = ({ project, index, isEditable, onUpdate, onDelete }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="relative group flex flex-col gap-4 py-6 border-b border-slate-200"
  >
    {isEditable && onDelete && (
      <button
        onClick={() => onDelete(index)}
        className="absolute top-4 right-0 p-1.5 bg-red-100 text-red-500 hover:bg-red-500 hover:text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
      >
        <FiTrash2 size={14} />
      </button>
    )}
    <Image
      src={project.image || "/placeholder-project.jpg"}
      alt={project.title}
      width={200}
      height={120}
      className="w-full sm:w-48 h-28 object-cover rounded-md bg-slate-100"
    />
    {isEditable && (
      <Input
        type="text"
        placeholder="Image URL"
        value={project.image}
        onChange={(e) => onUpdate("projects", index, "image", e.target.value)}
        className="text-xs"
      />
    )}
    <div className="flex-grow">
      <Editable
        html={project.title}
        onChange={(val) => onUpdate("projects", index, "title", val)}
        isEditable={isEditable}
        tagName="h3"
        className="font-bold text-slate-800"
      />
      <div className="flex gap-4 mt-2">
        {isEditable ? (
          <div className="w-full space-y-2">
            <Input
              type="text"
              placeholder="GitHub Link"
              value={project.githubLink}
              onChange={(e) =>
                onUpdate("projects", index, "githubLink", e.target.value)
              }
              className="w-full text-xs"
            />
            <Input
              type="text"
              placeholder="Live Demo Link"
              value={project.liveDemoLink || ""}
              onChange={(e) =>
                onUpdate("projects", index, "liveDemoLink", e.target.value)
              }
              className="w-full text-xs"
            />
          </div>
        ) : (
          <>
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <FiGithub /> GitHub
              </a>
            )}{" "}
            {project.liveDemoLink && (
              <a
                href={project.liveDemoLink}
                target="_blank"
                className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <FiExternalLink /> Demo
              </a>
            )}
          </>
        )}
      </div>
    </div>
  </motion.div>
);
const SkillTag: React.FC<{
  skill: Skill;
  index: number;
  isEditable: boolean;
  onUpdate: Function; // eslint-disable-line @typescript-eslint/no-unsafe-function-type
  onDelete?: (index: number) => void;
}> = ({ skill, index, isEditable, onUpdate, onDelete }) => (
  <div className="relative group inline-block">
    <Editable
      html={skill.name}
      onChange={(val) => onUpdate("skills", index, "name", val)}
      isEditable={isEditable}
      className="block bg-slate-100 px-3 py-1 rounded-full text-slate-600"
    />
    {isEditable && onDelete && (
      <button
        onClick={() => onDelete(index)}
        className="absolute -top-2 -right-2 p-1 bg-red-100 text-red-500 hover:bg-red-500 hover:text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
      >
        <FiTrash2 size={10} />
      </button>
    )}
  </div>
);

// === MAIN TEMPLATE COMPONENT ===
export function MinimalTemplate({
  data,
  isEditable = false,
  onUpdate,
  onAddWorkExperience,
  onAddSkill,
  onAddProject,
  onDeleteWorkExperience,
  onDeleteSkill,
  onDeleteProject,
}: MinimalTemplateProps) {
  const handleUpdate = (field: keyof PortfolioData, value: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
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
    <div className="font-inter bg-white text-slate-800 selection:bg-slate-200">
      <div className="min-h-screen container mx-auto px-4 sm:px-8">
        {/* --- HERO SECTION --- */}
        <section
          id="profile"
          className="min-h-screen flex flex-col items-center justify-center text-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Editable
              html={data.name}
              onChange={(val) => handleUpdate("name", val)}
              isEditable={isEditable}
              tagName="h1"
              className="text-5xl md:text-7xl font-bold text-slate-900"
            />
            <Editable
              html={data.bio}
              onChange={(val) => handleUpdate("bio", val)}
              isEditable={isEditable}
              tagName="p"
              className="mt-4 text-lg md:text-xl text-slate-500 max-w-2xl mx-auto"
            />
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 flex items-center gap-6"
          >
            <a
              href={`mailto:${data.contact?.email}`}
              className="text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <FiMail size={20} />
            </a>
            <a
              href={data.contact?.github || "#"}
              target="_blank"
              className="text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <FiGithub size={20} />
            </a>
            <a
              href={data.contact?.linkedin || "#"}
              target="_blank"
              className="text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <FiLinkedin size={20} />
            </a>
            {isEditable ? (
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Email"
                  value={data.contact?.email}
                  onChange={(e) =>
                    handleNestedUpdate("contact", "email", e.target.value)
                  }
                  className="w-32 text-xs"
                />
                <Input
                  type="text"
                  placeholder="GitHub URL"
                  value={data.contact?.github}
                  onChange={(e) =>
                    handleNestedUpdate("contact", "github", e.target.value)
                  }
                  className="w-32 text-xs"
                />
                <Input
                  type="text"
                  placeholder="LinkedIn URL"
                  value={data.contact?.linkedin}
                  onChange={(e) =>
                    handleNestedUpdate("contact", "linkedin", e.target.value)
                  }
                  className="w-32 text-xs"
                />
              </div>
            ) : (
              data.resumeLink && (
                <a
                  href={data.resumeLink}
                  target="_blank"
                  className="px-4 py-2 text-sm border border-slate-300 text-slate-600 rounded-full hover:bg-slate-100 hover:border-slate-400 transition-colors cursor-pointer"
                >
                  View Resume
                </a>
              )
            )}
          </motion.div>
        </section>
        <hr className="border-slate-200" />

        {/* --- ABOUT SECTION --- */}
        <Section id="about" title="About">
          <Editable
            html={data.aboutText}
            onChange={(val) => handleUpdate("aboutText", val)}
            isEditable={isEditable}
            tagName="p"
            className="text-slate-600 leading-relaxed"
          />
        </Section>
        <hr className="border-slate-200" />

        {/* --- WORK EXPERIENCE SECTION --- */}
        <Section id="experience" title="Work Experience">
          <div className="flex flex-col">
            {data.workExperience.map((exp, index) => (
              <WorkExperienceItem
                key={index}
                exp={exp}
                index={index}
                isEditable={isEditable}
                onUpdate={handleArrayUpdate}
                onDelete={onDeleteWorkExperience}
              />
            ))}
            {isEditable && onAddWorkExperience && (
              <button
                onClick={onAddWorkExperience}
                className="mt-6 flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <FiPlus /> Add Experience
              </button>
            )}
          </div>
        </Section>
        <hr className="border-slate-200" />

        {/* --- PROJECTS SECTION --- */}
        <Section id="projects" title="Projects">
          <div className="flex flex-col">
            {data.projects.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                index={index}
                isEditable={isEditable}
                onUpdate={handleArrayUpdate}
                onDelete={onDeleteProject}
              />
            ))}
            {isEditable && onAddProject && (
              <button
                onClick={onAddProject}
                className="mt-6 flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <FiPlus /> Add Project
              </button>
            )}
          </div>
        </Section>
        <hr className="border-slate-200" />

        {/* --- SKILLS SECTION --- */}
        <Section id="skills" title="Skills">
          <div className="flex flex-wrap gap-3">
            {data.skills.map((skill, index) => (
              <SkillTag
                key={index}
                skill={skill}
                index={index}
                isEditable={isEditable}
                onUpdate={handleArrayUpdate}
                onDelete={onDeleteSkill}
              />
            ))}
            {isEditable && onAddSkill && (
              <button
                onClick={onAddSkill}
                className="flex items-center justify-center p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 cursor-pointer"
              >
                <FiPlus size={16} />
              </button>
            )}
          </div>
        </Section>

        <footer className="py-12 text-center">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} {data.name}. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
