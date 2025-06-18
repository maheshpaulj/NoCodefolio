"use client";

import { useState, useEffect, JSX } from "react";
import {
  PortfolioData,
  WorkExperience,
  Skill,
  Project,
  SerializablePortfolio,
} from "@/types/portfolio";
import { motion } from "framer-motion";
import {
  FiLinkedin,
  FiGithub,
  FiMail,
  FiDownload,
  FiPlus,
  FiTrash2,
  FiExternalLink,
} from "react-icons/fi";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { Input } from "@/components/ui/input";
import Image from "next/image";

// --- Custom Hook for Navbar Active State ---
function useActiveSection() {
  const [activeSection, setActiveSection] = useState("profile");
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "profile",
        "about",
        "experience",
        "skills",
        "projects",
        "contact",
      ];
      let currentSection = "profile";
      for (const sectionId of sections) {
        const sectionEl = document.getElementById(sectionId);
        if (
          sectionEl &&
          sectionEl.getBoundingClientRect().top < window.innerHeight / 2
        ) {
          currentSection = sectionId;
        }
      }
      setActiveSection(currentSection);
    };
    const previewArea = document.querySelector(
      ".flex-grow.bg-white.relative.overflow-hidden > div"
    );
    const scrollContainer = previewArea || window;
    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);
  return activeSection;
}

// --- Props Interface (Simplified) ---
interface ModernTemplateProps {
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
const TemplateNavbar: React.FC<{ name: string; activeSection: string }> = ({
  name,
  activeSection,
}) => {
  const navItems = ["about", "experience", "skills", "projects", "contact"];
  const scrollTo = (id: string) =>
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  return (
    <nav className="sticky top-0 z-50 px-4 sm:px-8 py-4 bg-white/80 backdrop-blur-lg border-b border-slate-200 transition-colors">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <button
          onClick={() => scrollTo("profile")}
          className="text-xl font-bold text-slate-800 cursor-pointer"
        >
          {name}
        </button>
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className={`capitalize transition-colors text-sm font-medium cursor-pointer ${
                activeSection === item
                  ? "text-sky-500"
                  : "text-slate-500 hover:text-sky-500"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};
const Section: React.FC<{
  id: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  className?: string;
}> = ({ id, title, subtitle, children, className = "" }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6 }}
    className={`min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-8 py-24 ${className}`}
  >
    <div className="text-center mb-12">
      <p className="text-lg text-slate-500">{subtitle}</p>
      <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
        {title}
      </h2>
    </div>
    <div className="w-full max-w-5xl">{children}</div>
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
      className={`outline-none focus:ring-2 focus:ring-sky-500 rounded-md transition-all p-1 -m-1 ${
        isEditable
          ? "hover:bg-slate-200/50 border border-dashed border-transparent hover:border-sky-500"
          : ""
      } ${className}`}
    />
  );
};
const WorkExperienceCard: React.FC<{
  exp: WorkExperience;
  index: number;
  isEditable: boolean;
  onUpdate: Function; // eslint-disable-line @typescript-eslint/no-unsafe-function-type
  onDelete?: (index: number) => void;
}> = ({ exp, index, isEditable, onUpdate, onDelete }) => (
  <motion.div
    initial={{ x: -50, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    transition={{ type: "spring" }}
    className="relative group p-6 bg-white border border-slate-200 rounded-xl"
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
      className="text-2xl font-bold text-slate-900"
    />
    <div className="flex items-baseline gap-4 mt-1">
      <Editable
        html={exp.company}
        onChange={(val) => onUpdate("workExperience", index, "company", val)}
        isEditable={isEditable}
        tagName="p"
        className="text-lg text-sky-500 font-semibold"
      />
      <Editable
        html={exp.duration}
        onChange={(val) => onUpdate("workExperience", index, "duration", val)}
        isEditable={isEditable}
        tagName="p"
        className="text-sm text-slate-500"
      />
    </div>
    <Editable
      html={exp.description}
      onChange={(val) => onUpdate("workExperience", index, "description", val)}
      isEditable={isEditable}
      tagName="p"
      className="mt-3 text-slate-600"
    />
  </motion.div>
);
const SkillCard: React.FC<{
  skill: Skill;
  index: number;
  isEditable: boolean;
  onUpdate: Function; // eslint-disable-line @typescript-eslint/no-unsafe-function-type
  onDelete?: (index: number) => void;
}> = ({ skill, index, isEditable, onUpdate, onDelete }) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    transition={{ type: "spring" }}
    className="relative group flex flex-col items-center p-6 bg-white border border-slate-200 rounded-xl text-center"
  >
    {isEditable && onDelete && (
      <button
        onClick={() => onDelete(index)}
        className="absolute -top-2 -right-2 p-1.5 bg-red-500/80 hover:bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
      >
        <FiTrash2 size={14} />
      </button>
    )}
    {skill.icon && (
      <Image
        src={skill.icon}
        alt={skill.name}
        width={48}
        height={48}
        className="mb-4 object-contain h-12"
      />
    )}
    {isEditable && (
      <Input
        type="text"
        placeholder="Icon URL"
        value={skill.icon || ""}
        onChange={(e) => onUpdate("skills", index, "icon", e.target.value)}
        className="w-full text-xs bg-slate-100 border-slate-300 mb-2"
      />
    )}
    <Editable
      html={skill.name}
      onChange={(val) => onUpdate("skills", index, "name", val)}
      isEditable={isEditable}
      tagName="h3"
      className="text-xl font-semibold text-slate-900"
    />
    <Editable
      html={skill.level}
      onChange={(val) => onUpdate("skills", index, "level", val)}
      isEditable={isEditable}
      tagName="p"
      className="text-slate-500"
    />
  </motion.div>
);
const ProjectCard: React.FC<{
  project: Project;
  index: number;
  isEditable: boolean;
  onUpdate: Function; // eslint-disable-line @typescript-eslint/no-unsafe-function-type
  onDelete?: (index: number) => void;
}> = ({ project, index, isEditable, onUpdate, onDelete }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="relative group bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col"
  >
    {isEditable && onDelete && (
      <button
        onClick={() => onDelete(index)}
        className="absolute top-2 right-2 z-10 p-1.5 bg-red-500/80 hover:bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
      >
        <FiTrash2 size={14} />
      </button>
    )}
    <Image
      src={project.image || "/placeholder-project.jpg"}
      alt={project.title}
      width={500}
      height={300}
      className="w-full h-56 object-cover bg-slate-100"
    />
    <div className="p-6 flex flex-col flex-grow">
      <Editable
        html={project.title}
        onChange={(val) => onUpdate("projects", index, "title", val)}
        isEditable={isEditable}
        tagName="h3"
        className="text-2xl font-bold text-slate-900 mb-4"
      />
      <div className="flex-grow"></div>
      <div className="flex gap-4 mt-auto">
        {project.githubLink && (
          <motion.a
            href={project.githubLink}
            target="_blank"
            className="flex-1 text-center py-2 px-4 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold transition-colors cursor-pointer"
          >
            <FiGithub className="inline mr-2" /> GitHub
          </motion.a>
        )}
        {project.liveDemoLink && (
          <motion.a
            href={project.liveDemoLink}
            target="_blank"
            className="flex-1 text-center py-2 px-4 bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-semibold transition-colors cursor-pointer"
          >
            <FiExternalLink className="inline mr-2" /> Live Demo
          </motion.a>
        )}
      </div>
      {isEditable && (
        <div className="mt-4 space-y-2">
          <Input
            type="text"
            placeholder="Image URL"
            value={project.image}
            onChange={(e) =>
              onUpdate("projects", index, "image", e.target.value)
            }
            className="w-full text-xs bg-slate-100 border-slate-300"
          />
          <Input
            type="text"
            placeholder="GitHub Link"
            value={project.githubLink}
            onChange={(e) =>
              onUpdate("projects", index, "githubLink", e.target.value)
            }
            className="w-full text-xs bg-slate-100 border-slate-300"
          />
          <Input
            type="text"
            placeholder="Live Demo Link"
            value={project.liveDemoLink || ""}
            onChange={(e) =>
              onUpdate("projects", index, "liveDemoLink", e.target.value)
            }
            className="w-full text-xs bg-slate-100 border-slate-300"
          />
        </div>
      )}
    </div>
  </motion.div>
);
const ContactItem: React.FC<{
  icon: React.ReactNode;
  isEditable: boolean;
  value?: string;
  href?: string;
  onUpdate: (val: string) => void;
  placeholder?: string;
  hideLink?: boolean;
}> = ({ icon, isEditable, value, href, onUpdate, placeholder, hideLink }) => (
  <div>
    {isEditable ? (
      <div className="flex items-center gap-2">
        <span className="text-slate-500">{icon}</span>
        <Input
          type="text"
          placeholder={placeholder}
          value={value || ""}
          onChange={(e) => onUpdate(e.target.value)}
          className="w-full bg-slate-100 border-slate-300"
        />
      </div>
    ) : (
      value && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center cursor-pointer"
        >
          <motion.div
            whileHover={{ scale: 1.2 }}
            className="flex gap-2 text-slate-500 hover:text-sky-500"
          >
            {icon}
            {!hideLink && value}
          </motion.div>
        </a>
      )
    )}
  </div>
);

// === MAIN TEMPLATE COMPONENT ===
export function ModernTemplate({
  data,
  isEditable = false,
  onUpdate,
  onAddWorkExperience,
  onAddSkill,
  onAddProject,
  onDeleteWorkExperience,
  onDeleteSkill,
  onDeleteProject,
}: ModernTemplateProps) {
  const activeSection = useActiveSection();
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
    <div className="font-sans selection:bg-sky-500/20">
      <div className="min-h-screen bg-white text-slate-700 transition-colors">
        <TemplateNavbar name={data.name} activeSection={activeSection} />
        <section
          id="profile"
          className="min-h-screen flex items-center justify-center px-4 sm:px-8 py-24 bg-slate-50"
        >
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 max-w-5xl mx-auto">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
            >
              <div className="relative w-48 h-48 md:w-64 md:h-64 group">
                <Image
                  src={data.profileImage || "/placeholder-avatar.jpg"}
                  alt="Profile"
                  width={256}
                  height={256}
                  className="rounded-full object-cover w-full h-full border-4 border-slate-200 shadow-2xl"
                />
                {isEditable && (
                  <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Input
                      type="text"
                      placeholder="Image URL"
                      value={data.profileImage || ""}
                      onChange={(e) =>
                        handleUpdate("profileImage", e.target.value)
                      }
                      className="w-10/12 text-xs bg-slate-100 border-slate-300"
                    />
                  </div>
                )}
              </div>
            </motion.div>
            <div className="text-center md:text-left">
              <Editable
                html={data.name || "Your Name"}
                onChange={(val) => handleUpdate("name", val)}
                isEditable={isEditable}
                tagName="h1"
                className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-2"
              />
              <Editable
                html={
                  data.bio ||
                  "Creative <span class='text-sky-400'>Frontend Developer</span>"
                }
                onChange={(val) => handleUpdate("bio", val)}
                isEditable={isEditable}
                tagName="p"
                className="text-xl md:text-2xl text-slate-600 mb-6"
              />
              <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
                <motion.a
                  href={data.resumeLink || "#"}
                  target="_blank"
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-sky-500 text-white rounded-lg font-semibold hover:bg-sky-600 transition-colors cursor-pointer"
                >
                  <FiDownload /> Download CV
                </motion.a>
                {isEditable && (
                  <Input
                    type="text"
                    placeholder="Resume URL"
                    value={data.resumeLink || ""}
                    onChange={(e) => handleUpdate("resumeLink", e.target.value)}
                    className="bg-slate-100 border-slate-300"
                  />
                )}
                <div className="flex gap-4 items-center border-l-2 border-slate-200 pl-4">
                  <ContactItem
                    hideLink={true}
                    icon={<FiLinkedin size={24} />}
                    isEditable={isEditable}
                    value={data.contact?.linkedin}
                    href={data.contact?.linkedin}
                    onUpdate={(val) =>
                      handleNestedUpdate("contact", "linkedin", val)
                    }
                    placeholder="LinkedIn URL"
                  />
                  <ContactItem
                    hideLink={true}
                    icon={<FiGithub size={24} />}
                    isEditable={isEditable}
                    value={data.contact?.github}
                    href={data.contact?.github}
                    onUpdate={(val) =>
                      handleNestedUpdate("contact", "github", val)
                    }
                    placeholder="GitHub URL"
                  />
                  <ContactItem
                    hideLink={true}
                    icon={<FiMail size={24} />}
                    isEditable={isEditable}
                    value={data.contact?.email}
                    href={`mailto:${data.contact?.email}`}
                    onUpdate={(val) =>
                      handleNestedUpdate("contact", "email", val)
                    }
                    placeholder="Email Address"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <Section
          id="about"
          title="About Me"
          subtitle="Get To Know More"
          className="bg-white"
        >
          <Editable
            html={data.aboutText || "Your about text goes here..."}
            onChange={(val) => handleUpdate("aboutText", val)}
            isEditable={isEditable}
            tagName="p"
            className="text-lg text-center max-w-3xl mx-auto leading-relaxed text-slate-600"
          />
        </Section>
        <Section
          id="experience"
          title="Work Experience"
          subtitle="My Journey"
          className="bg-slate-50"
        >
          <div className="space-y-8">
            {data.workExperience.map((exp, index) => (
              <WorkExperienceCard
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
                className="group flex items-center gap-2 mx-auto px-6 py-3 font-semibold text-white bg-sky-500 rounded-lg hover:bg-sky-600 transition-all cursor-pointer"
              >
                <FiPlus /> Add Experience
              </button>
            </div>
          )}
        </Section>
        <Section
          id="skills"
          title="Skills"
          subtitle="My Expertise"
          className="bg-white"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {data.skills.map((skill, index) => (
              <SkillCard
                key={index}
                skill={skill}
                index={index}
                isEditable={isEditable}
                onUpdate={handleArrayUpdate}
                onDelete={onDeleteSkill}
              />
            ))}
          </div>
          {isEditable && onAddSkill && (
            <div className="text-center mt-12">
              <button
                onClick={onAddSkill}
                className="group flex items-center gap-2 mx-auto px-6 py-3 font-semibold text-white bg-sky-500 rounded-lg hover:bg-sky-600 transition-all cursor-pointer"
              >
                <FiPlus /> Add Skill
              </button>
            </div>
          )}
        </Section>
        <Section
          id="projects"
          title="Projects"
          subtitle="Browse My Recent Work"
          className="bg-slate-50"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                className="group flex items-center gap-2 mx-auto px-6 py-3 font-semibold text-white bg-sky-500 rounded-lg hover:bg-sky-600 transition-all cursor-pointer"
              >
                <FiPlus /> Add Project
              </button>
            </div>
          )}
        </Section>
        <Section
          id="contact"
          title="Contact Me"
          subtitle="Get In Touch"
          className="bg-white"
        >
          <div className="max-w-md mx-auto bg-white p-8 rounded-xl border border-slate-200">
            <div className="space-y-6">
              <ContactItem
                icon={<FiMail size={20} />}
                isEditable={isEditable}
                value={data.contact?.email}
                href={`mailto:${data.contact?.email}`}
                onUpdate={(val) => handleNestedUpdate("contact", "email", val)}
                placeholder="Email Address"
              />
              <ContactItem
                icon={<FiLinkedin size={20} />}
                isEditable={isEditable}
                value={data.contact?.linkedin}
                href={data.contact?.linkedin}
                onUpdate={(val) =>
                  handleNestedUpdate("contact", "linkedin", val)
                }
                placeholder="LinkedIn URL"
              />
              <ContactItem
                icon={<FiGithub size={20} />}
                isEditable={isEditable}
                value={data.contact?.github}
                href={data.contact?.github}
                onUpdate={(val) => handleNestedUpdate("contact", "github", val)}
                placeholder="GitHub URL"
              />
            </div>
          </div>
        </Section>
        <footer className="py-8 text-center bg-white border-t border-slate-200">
          <p className="text-sm text-slate-500">
            Copyright © {new Date().getFullYear()} {data.name}. All Rights
            Reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
