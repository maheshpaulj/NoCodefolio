"use client";

import {
  PortfolioData,
  WorkExperience,
  Project,
  SerializablePortfolio,
} from "@/types/portfolio";
import { motion } from "framer-motion";
import {
  FiLinkedin,
  FiGithub,
  FiMail,
  FiPlus,
  FiTrash2,
  FiExternalLink,
} from "react-icons/fi";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { JSX } from "react";

// --- Props Interface ---
interface CreativeTemplateProps {
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

// === HELPER & SUB-COMPONENTS ===
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
      className={`outline-none focus:ring-2 focus:ring-amber-500 rounded-md transition-all p-1 -m-1 ${
        isEditable
          ? "hover:bg-slate-700/50 border border-dashed border-transparent hover:border-amber-500"
          : ""
      } ${className}`}
    />
  );
};
const Section: React.FC<{
  id: string;
  children: React.ReactNode;
  className?: string;
}> = ({ id, children, className }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.8 }}
    className={`min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-8 py-24 ${className}`}
  >
    {children}
  </motion.section>
);
const TimelineItem: React.FC<{
  exp: WorkExperience;
  index: number;
  isEditable: boolean;
  onUpdate: Function; // eslint-disable-line @typescript-eslint/no-unsafe-function-type
  onDelete?: (index: number) => void; 
}> = ({ exp, index, isEditable, onUpdate, onDelete }) => (
  <div className="flex items-center w-full my-6">
    <div
      className={`w-1/2 flex ${
        index % 2 === 0 ? "justify-end pr-8" : "justify-start pl-8 order-3"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="relative group p-6 bg-slate-800 border border-slate-700 rounded-xl w-full max-w-sm"
      >
        {isEditable && onDelete && (
          <button
            onClick={() => onDelete(index)}
            className="absolute -top-2 -right-2 p-1.5 bg-red-500/80 hover:bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          >
            <FiTrash2 size={14} />
          </button>
        )}
        <Editable
          html={exp.title}
          onChange={(val) => onUpdate("workExperience", index, "title", val)}
          isEditable={isEditable}
          tagName="h3"
          className="text-xl font-bold text-white"
        />
        <Editable
          html={exp.company}
          onChange={(val) => onUpdate("workExperience", index, "company", val)}
          isEditable={isEditable}
          tagName="p"
          className="text-amber-400 font-semibold"
        />
        <Editable
          html={exp.description}
          onChange={(val) =>
            onUpdate("workExperience", index, "description", val)
          }
          isEditable={isEditable}
          tagName="p"
          className="mt-2 text-slate-400 text-sm"
        />
      </motion.div>
    </div>
    <div className="w-12 h-12 absolute left-1/2 -translate-x-1/2 flex items-center justify-center bg-amber-500 text-slate-900 rounded-full font-bold shadow-lg z-10">
      <Editable
        html={exp.duration}
        onChange={(val) => onUpdate("workExperience", index, "duration", val)}
        isEditable={isEditable}
        className="text-xs text-center"
      />
    </div>
  </div>
);

// === MAIN TEMPLATE COMPONENT ===
export function CreativeTemplate({
  data,
  isEditable = false,
  onUpdate,
  onAddWorkExperience,
  onAddSkill,
  onAddProject,
  onDeleteWorkExperience,
  onDeleteSkill,
  onDeleteProject,
}: CreativeTemplateProps) {
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

  const animation = {
    initial: { x: -30, opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  return (
    <div className="bg-slate-900 text-slate-300 font-lexend selection:bg-amber-500/20">
      {/* --- HERO SECTION --- */}
      <section
        id="profile"
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-slate-800 [clip-path:polygon(0_0,_100%_0,_60%_100%,_0%_100%)] z-10"></div>
        <Image
          src={data.profileImage || "/placeholder-creative.jpg"}
          alt="Profile Background"
          fill
          className="object-cover opacity-20"
        />
        <div className="container mx-auto px-8 relative z-20">
          <div className="max-w-xl">
            <motion.div
              {...animation}
              transition={{ ...animation.animate.transition, delay: 0.2 }}
            >
              <Editable
                html={data.name}
                onChange={(val) => handleUpdate("name", val)}
                isEditable={isEditable}
                tagName="h1"
                className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter"
              />
            </motion.div>
            <motion.div
              {...animation}
              transition={{ ...animation.animate.transition, delay: 0.4 }}
            >
              <Editable
                html={data.bio}
                onChange={(val) => handleUpdate("bio", val)}
                isEditable={isEditable}
                tagName="p"
                className="text-xl md:text-2xl text-amber-400 mt-2"
              />
            </motion.div>
            <motion.div
              {...animation}
              transition={{ ...animation.animate.transition, delay: 0.6 }}
              className="mt-8 flex items-center gap-4"
            >
              {isEditable ? (
                <Input
                  type="text"
                  placeholder="Resume URL"
                  value={data.resumeLink}
                  onChange={(e) => handleUpdate("resumeLink", e.target.value)}
                  className="bg-slate-800 border-slate-600"
                />
              ) : (
                <a
                  href={data.resumeLink || "#"}
                  target="_blank"
                  className="px-6 py-3 bg-amber-500 text-slate-900 font-bold rounded-full hover:bg-amber-400 transition-colors cursor-pointer"
                >
                  Download CV
                </a>
              )}
              <div className="flex gap-4 items-center">
                <EditableInput
                  icon={<FiGithub size={20} />}
                  isEditable={isEditable}
                  value={data.contact?.github}
                  href={data.contact?.github}
                  onUpdate={(val) =>
                    handleNestedUpdate("contact", "github", val)
                  }
                />
                <EditableInput
                  icon={<FiLinkedin size={20} />}
                  isEditable={isEditable}
                  value={data.contact?.linkedin}
                  href={data.contact?.linkedin}
                  onUpdate={(val) =>
                    handleNestedUpdate("contact", "linkedin", val)
                  }
                />
                <EditableInput
                  icon={<FiMail size={20} />}
                  isEditable={isEditable}
                  value={data.contact?.email}
                  href={`mailto:${data.contact?.email}`}
                  onUpdate={(val) =>
                    handleNestedUpdate("contact", "email", val)
                  }
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <Section id="about" className="bg-slate-800">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
            About Me
          </h2>
          <Editable
            html={data.aboutText}
            onChange={(val) => handleUpdate("aboutText", val)}
            isEditable={isEditable}
            tagName="p"
            className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed"
          />
        </div>
      </Section>

      {/* --- WORK EXPERIENCE SECTION --- */}
      <Section id="experience">
        <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter text-center mb-16">
          Career Timeline
        </h2>
        <div className="relative w-full max-w-4xl mx-auto">
          <div className="absolute left-1/2 top-0 h-full w-0.5 bg-slate-700"></div>
          {data.workExperience.map((exp, index) => (
            <TimelineItem
              key={index}
              exp={exp}
              index={index}
              isEditable={isEditable}
              onUpdate={handleArrayUpdate}
              onDelete={onDeleteWorkExperience}
            />
          ))}
        </div>
        {isEditable && onAddWorkExperience && (
          <div className="text-center mt-12">
            <button
              onClick={onAddWorkExperience}
              className="group flex items-center gap-2 mx-auto px-6 py-3 font-semibold text-slate-900 bg-amber-500 rounded-lg hover:bg-amber-400 transition-all cursor-pointer"
            >
              <FiPlus /> Add Experience
            </button>
          </div>
        )}
      </Section>

      {/* --- SKILLS SECTION (MARQUEE) --- */}
      <section id="skills" className="py-24 overflow-hidden bg-slate-800">
        <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter text-center mb-12">
          My Skills
        </h2>
        <div className="relative flex overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <div className="flex animate-marquee motion-reduce:animate-none">
            {data.skills.concat(data.skills).map((skill, index) => (
              <div
                key={index}
                className="mx-6 flex items-center gap-3 whitespace-nowrap"
              >
                <Image
                  src={skill.icon || ""}
                  alt={skill.name}
                  width={24}
                  height={24}
                />
                <span className="text-lg font-medium text-slate-300">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
          <div className="absolute top-0 flex animate-marquee2 motion-reduce:animate-none">
            {data.skills.concat(data.skills).map((skill, index) => (
              <div
                key={index}
                className="mx-6 flex items-center gap-3 whitespace-nowrap"
              >
                <Image
                  src={skill.icon || ""}
                  alt={skill.name}
                  width={24}
                  height={24}
                />
                <span className="text-lg font-medium text-slate-300">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
        {isEditable && (
          <div className="mt-12 mx-auto max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 p-4 border border-dashed border-slate-600 rounded-lg">
            {data.skills.map((skill, i) => (
              <div key={i} className="relative group p-2 bg-slate-700 rounded">
                <Input
                  type="text"
                  value={skill.name}
                  onChange={(e) =>
                    handleArrayUpdate("skills", i, "name", e.target.value)
                  }
                  className="bg-transparent border-0 text-white w-full"
                />
                <Input
                  type="text"
                  value={skill.icon || ""}
                  onChange={(e) =>
                    handleArrayUpdate("skills", i, "icon", e.target.value)
                  }
                  className="bg-slate-600 border-0 text-slate-400 w-full mt-1 text-xs"
                />
                <button
                  onClick={() => onDeleteSkill && onDeleteSkill(i)}
                  className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <FiTrash2 size={12} />
                </button>
              </div>
            ))}
            {onAddSkill && (
              <button
                onClick={onAddSkill}
                className="flex items-center justify-center p-2 bg-slate-700 hover:bg-slate-600 rounded text-amber-400 cursor-pointer"
              >
                <FiPlus size={20} />
              </button>
            )}
          </div>
        )}
      </section>

      {/* --- PROJECTS SECTION --- */}
      <Section id="projects">
        <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter text-center mb-16">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        </div>
        {isEditable && onAddProject && (
          <div className="text-center mt-12">
            <button
              onClick={onAddProject}
              className="group flex items-center gap-2 mx-auto px-6 py-3 font-semibold text-slate-900 bg-amber-500 rounded-lg hover:bg-amber-400 transition-all cursor-pointer"
            >
              <FiPlus /> Add Project
            </button>
          </div>
        )}
      </Section>

      {/* --- CONTACT SECTION --- */}
      <Section id="contact" className="bg-slate-800">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
            Get In Touch
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Have a project in mind or just want to say hello? My inbox is always
            open.
          </p>
          {isEditable ? (
            <Input
              type="text"
              placeholder="your.email@example.com"
              value={data.contact.email}
              onChange={(e) =>
                handleNestedUpdate("contact", "email", e.target.value)
              }
              className="mt-6 mx-auto max-w-sm bg-slate-700 border-slate-600"
            />
          ) : (
            <a
              href={`mailto:${data.contact.email}`}
              className="mt-8 inline-block text-2xl px-6 py-4 rounded-2xl bg-amber-400 hover:bg-amber-500 hover:scale-[1.05] transition font-bold text-neutral-800 hover:text-black cursor-pointer"
            >
              {data.contact.email}
            </a>
          )}
        </div>
      </Section>

      <footer className="py-8 text-center border-t border-slate-800">
        <p className="text-sm text-slate-500">
          Copyright © {new Date().getFullYear()} {data.name}. All Rights
          Reserved.
        </p>
      </footer>
    </div>
  );
}

// Editable Input for Hero social links
const EditableInput: React.FC<{
  icon: React.ReactNode;
  isEditable: boolean;
  value?: string;
  href?: string;
  onUpdate: (val: string) => void;
}> = ({ icon, isEditable, value, href, onUpdate }) => (
  <div>
    {isEditable ? (
      <div className="flex items-center gap-2">
        <span className="text-slate-500">{icon}</span>
        <Input
          type="text"
          placeholder="URL"
          value={value || ""}
          onChange={(e) => onUpdate(e.target.value)}
          className="w-32 text-xs bg-slate-800 border-slate-600 h-8"
        />
      </div>
    ) : (
      value && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer"
        >
          <motion.div
            whileHover={{ scale: 1.2, color: "#f59e0b" }}
            className="text-slate-400"
          >
            {icon}
          </motion.div>
        </a>
      )
    )}
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
    initial={{ y: 20, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    transition={{ delay: index * 0.1 }}
    className="relative group bg-slate-800 border border-slate-700/50 rounded-xl overflow-hidden"
  >
    {isEditable && onDelete && (
      <button
        onClick={() => onDelete(index)}
        className="absolute top-2 right-2 z-20 p-1.5 bg-red-500/80 hover:bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
      >
        <FiTrash2 size={14} />
      </button>
    )}
    <div className="relative overflow-hidden">
      <Image
        src={project.image || "/placeholder-creative.jpg"}
        alt={project.title}
        width={400}
        height={300}
        className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
    </div>
    <div className="p-6">
      <Editable
        html={project.title}
        onChange={(val) => onUpdate("projects", index, "title", val)}
        isEditable={isEditable}
        tagName="h3"
        className="text-xl font-bold text-white mb-4"
      />
      <div className="flex gap-4">
        {isEditable ? (
          <div className="w-full space-y-2">
            <Input
              type="text"
              placeholder="Image URL"
              value={project.image}
              onChange={(e) =>
                onUpdate("projects", index, "image", e.target.value)
              }
              className="w-full text-xs bg-slate-700 border-slate-600"
            />
            <Input
              type="text"
              placeholder="GitHub Link"
              value={project.githubLink}
              onChange={(e) =>
                onUpdate("projects", index, "githubLink", e.target.value)
              }
              className="w-full text-xs bg-slate-700 border-slate-600"
            />
            <Input
              type="text"
              placeholder="Live Demo Link"
              value={project.liveDemoLink || ""}
              onChange={(e) =>
                onUpdate("projects", "liveDemoLink", e.target.value)
              }
              className="w-full text-xs bg-slate-700 border-slate-600"
            />
          </div>
        ) : (
          <>
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                className="flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
              >
                <FiGithub /> GitHub
              </a>
            )}{" "}
            {project.liveDemoLink && (
              <a
                href={project.liveDemoLink}
                target="_blank"
                className="flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
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
