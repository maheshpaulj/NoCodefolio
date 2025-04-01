"use client";

import { useState } from "react";
import ContentEditable from "react-contenteditable";
import { PortfolioData, Project, Contact, WorkExperience, Skill } from "@/types/portfolio";
import { ModernTemplate } from "@/lib/templates/modern";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaLinkedin, FaGithub, FaEnvelope, FaPlus, FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { modernTemplate } from "@/lib/templates/modern";

interface LivePreviewProps {
  portfolioData: PortfolioData;
  onUpdate: (data: PortfolioData) => void;
}

export default function LivePreview({ portfolioData, onUpdate }: LivePreviewProps) {
  const [data, setData] = useState(portfolioData);

  const handleChange = (field: keyof PortfolioData, value: any) => {
    const newData = { ...data, [field]: value };
    setData(newData);
    onUpdate(newData);
  };

  const updateWorkExperience = (index: number, key: keyof WorkExperience, value: string) => {
    const newExperience = [...data.workExperience];
    if (index >= 0 && index < newExperience.length) {
      newExperience[index] = { ...newExperience[index], [key]: value };
      handleChange("workExperience", newExperience);
    }
  };

  const updateSkill = (index: number, key: keyof Skill, value: string) => {
    const newSkills = [...data.skills];
    if (index >= 0 && index < newSkills.length) {
      newSkills[index] = { ...newSkills[index], [key]: value };
      handleChange("skills", newSkills);
    }
  };

  const updateProject = (index: number, key: keyof Project, value: string) => {
    const newProjects = [...data.projects];
    if (index >= 0 && index < newProjects.length) {
      newProjects[index] = { ...newProjects[index], [key]: value };
      handleChange("projects", newProjects);
    }
  };

  const updateContact = (key: keyof Contact, value: string) => {
    const newContact = { ...data.contact, [key]: value };
    handleChange("contact", newContact);
  };

  const addWorkExperience = () => {
    handleChange("workExperience", [
      ...data.workExperience,
      { title: "New Role", company: "Company", duration: "YYYY-Present", description: "Description" },
    ]);
  };

  const addSkill = () => {
    handleChange("skills", [...data.skills, { name: "New Skill", level: "Basic", icon: "" }]);
  };

  const addProject = () => {
    handleChange("projects", [...data.projects, { title: "New Project", image: "", githubLink: "", liveDemoLink: "" }]);
  };

  const viewInNewTab = () => {
    const encodedData = encodeURIComponent(JSON.stringify(data));
    const previewUrl = `/preview/${data.template}?data=${encodedData}`;
    window.open(previewUrl, "_blank");
  };

  const downloadPortfolio = async () => {
    const zip = new JSZip();
    const files = modernTemplate(data);
    Object.entries(files).forEach(([filePath, content]) => {
      zip.file(filePath, content);
    });
    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, `${data.name.toLowerCase().replace(/\s+/g, "-") || "portfolio"}-portfolio.zip`);
  };

  const noop = () => {};

  const renderEditableTemplate = () => (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-poppins">
      {/* Temporary Navbar for LivePreview */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="bg-white shadow-lg p-6 flex justify-between items-center" // Removed fixed positioning
      >
        <ContentEditable
          html={data.name || "John Doe"}
          onChange={(e) => handleChange("name", e.target.value)}
          className="text-2xl font-bold text-gray-900 border-2 border-dashed border-blue-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <ul className="flex gap-8 text-lg">
          {["about", "experience", "skills", "projects", "contact"].map((section) => (
            <motion.li
              key={section}
              whileHover={{ scale: 1.1, color: "#3b82f6" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <a
                href={`#${section}`}
                className="text-gray-700 hover:text-blue-500 transition-colors capitalize"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(`#${section}`)?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {section}
              </a>
            </motion.li>
          ))}
        </ul>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        id="profile"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen flex flex-col md:flex-row items-center justify-center px-8 bg-gradient-to-br from-blue-50 to-gray-100"
      >
        <motion.div whileHover={{ scale: 1.05 }} className="w-64 h-64 md:w-80 md:h-80">
          <img
            src={data.profileImage || "https://via.placeholder.com/300"}
            alt="Profile"
            className="w-full h-full object-cover rounded-full shadow-xl border-4 border-white"
          />
          <Input
            type="text"
            placeholder="Profile Image URL"
            value={data.profileImage || ""}
            onChange={(e) => handleChange("profileImage", e.target.value)}
            className="mt-4 text-sm border-2 border-dashed border-blue-300"
          />
        </motion.div>
        <div className="text-center md:text-left md:ml-12 mt-8 md:mt-0 flex-1 max-w-lg">
          <ContentEditable
            html="Hello, I'm"
            disabled
            onChange={noop}
            className="text-lg text-gray-600"
          />
          <ContentEditable
            html={data.name || "John Doe"}
            onChange={(e) => handleChange("name", e.target.value)}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 border-2 border-dashed border-blue-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <ContentEditable
            html={data.bio || "Frontend <span class='text-blue-500'>Developer</span>"}
            onChange={(e) => handleChange("bio", e.target.value)}
            className="text-xl md:text-2xl text-gray-700 mb-6 border-2 border-dashed border-blue-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <motion.a
              href={data.resumeLink || "#"}
              whileHover={{ scale: 1.1 }}
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors text-lg font-medium"
            >
              Download CV
            </motion.a>
            <Input
              type="text"
              placeholder="Resume URL"
              value={data.resumeLink || ""}
              onChange={(e) => handleChange("resumeLink", e.target.value)}
              className="mt-4 md:mt-0 text-sm border-2 border-dashed border-blue-300"
            />
          </div>
          <div className="flex gap-6 justify-center md:justify-start mt-6">
            <motion.a whileHover={{ scale: 1.2 }} href={data.contact.linkedin || "https://linkedin.com"}>
              <FaLinkedin className="w-8 h-8 text-blue-700" />
            </motion.a>
            <motion.a whileHover={{ scale: 1.2 }} href="https://github.com">
              <FaGithub className="w-8 h-8 text-gray-800" />
            </motion.a>
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        id="about"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen flex flex-col items-center justify-center px-8 py-16 bg-white"
      >
        <ContentEditable
          html="Get To Know More"
          disabled
          onChange={noop}
          className="text-lg text-gray-600"
        />
        <ContentEditable
          html="About Me"
          disabled
          onChange={noop}
          className="text-4xl font-bold text-gray-900 mb-8"
        />
        <ContentEditable
          html={data.aboutText || "Lorem ipsum dolor sit amet consectetur adipisicing elit."}
          onChange={(e) => handleChange("aboutText", e.target.value)}
          className="text-lg text-gray-700 max-w-3xl text-center leading-relaxed border-2 border-dashed border-blue-300 p-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </motion.section>

      {/* Work Experience Section */}
      <motion.section
        id="experience"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen flex flex-col items-center justify-center px-8 py-16 bg-gray-50"
      >
        <ContentEditable
          html="My Journey"
          disabled
          onChange={noop}
          className="text-lg text-gray-600"
        />
        <ContentEditable
          html="Work Experience"
          disabled
          onChange={noop}
          className="text-4xl font-bold text-gray-900 mb-12"
        />
        <div className="max-w-4xl w-full">
          {data.workExperience && data.workExperience.length > 0 ? (
            <div className="space-y-12">
              {data.workExperience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="flex flex-col md:flex-row items-start gap-6 bg-white p-6 rounded-lg shadow-md"
                >
                  <div className="md:w-1/3 text-center md:text-right">
                    <ContentEditable
                      html={exp.duration || "YYYY-Present"}
                      onChange={(e) => updateWorkExperience(index, "duration", e.target.value)}
                      className="text-lg text-gray-600 border-2 border-dashed border-blue-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="md:w-2/3 text-center md:text-left">
                    <ContentEditable
                      html={exp.title || "Job Title"}
                      onChange={(e) => updateWorkExperience(index, "title", e.target.value)}
                      className="text-2xl font-semibold text-gray-900 border-2 border-dashed border-blue-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ContentEditable
                      html={exp.company || "Company"}
                      onChange={(e) => updateWorkExperience(index, "company", e.target.value)}
                      className="text-lg text-blue-600 border-2 border-dashed border-blue-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ContentEditable
                      html={exp.description || "Description"}
                      onChange={(e) => updateWorkExperience(index, "description", e.target.value)}
                      className="text-gray-700 mt-2 border-2 border-dashed border-blue-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-lg text-gray-600 text-center">No work experience added yet.</p>
          )}
          <Button onClick={addWorkExperience} className="mt-6 bg-blue-500 hover:bg-blue-600 text-lg">
            <FaPlus className="mr-2" /> Add Experience
          </Button>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        id="skills"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen flex flex-col items-center justify-center px-8 py-16 bg-white"
      >
        <ContentEditable
          html="My Expertise"
          disabled
          onChange={noop}
          className="text-lg text-gray-600"
        />
        <ContentEditable
          html="Skills"
          disabled
          onChange={noop}
          className="text-4xl font-bold text-gray-900 mb-12"
        />
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.skills && data.skills.length > 0 ? (
            data.skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 bg-gray-50 rounded-lg shadow-md text-center"
              >
                {skill.icon && (
                  <img src={skill.icon} alt={skill.name} className="w-12 h-12 mx-auto mb-4 object-contain" />
                )}
                <Input
                  type="text"
                  placeholder="Skill Icon URL (optional)"
                  value={skill.icon || ""}
                  onChange={(e) => updateSkill(index, "icon", e.target.value)}
                  className="mb-4 text-sm border-2 border-dashed border-blue-300"
                />
                <ContentEditable
                  html={skill.name || "Skill"}
                  onChange={(e) => updateSkill(index, "name", e.target.value)}
                  className="text-xl font-semibold text-gray-900 border-2 border-dashed border-blue-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ContentEditable
                  html={skill.level || "Level"}
                  onChange={(e) => updateSkill(index, "level", e.target.value)}
                  className="text-gray-600 border-2 border-dashed border-blue-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </motion.div>
            ))
          ) : (
            <p className="text-lg text-gray-600 text-center col-span-full">No skills added yet.</p>
          )}
          <Button onClick={addSkill} className="mt-6 bg-blue-500 hover:bg-blue-600 text-lg">
            <FaPlus className="mr-2" /> Add Skill
          </Button>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen flex flex-col items-center justify-center px-8 py-16 bg-gray-50"
      >
        <ContentEditable
          html="Browse My Recent"
          disabled
          onChange={noop}
          className="text-lg text-gray-600"
        />
        <ContentEditable
          html="Projects"
          disabled
          onChange={noop}
          className="text-4xl font-bold text-gray-900 mb-12"
        />
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.projects && data.projects.length > 0 ? (
            data.projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <img
                  src={project.image || "https://via.placeholder.com/300"}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <Input
                  type="text"
                  placeholder="Project Image URL"
                  value={project.image || ""}
                  onChange={(e) => updateProject(index, "image", e.target.value)}
                  className="mb-4 text-sm border-2 border-dashed border-blue-300"
                />
                <ContentEditable
                  html={project.title || "Project Title"}
                  onChange={(e) => updateProject(index, "title", e.target.value)}
                  className="text-2xl font-semibold text-gray-900 mb-2 border-2 border-dashed border-blue-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex flex-col gap-4 mt-4">
                  <Input
                    type="text"
                    placeholder="Github Link"
                    value={project.githubLink || ""}
                    onChange={(e) => updateProject(index, "githubLink", e.target.value)}
                    className="text-sm border-2 border-dashed border-blue-300"
                  />
                  <Input
                    type="text"
                    placeholder="Live Demo Link"
                    value={project.liveDemoLink || ""}
                    onChange={(e) => updateProject(index, "liveDemoLink", e.target.value)}
                    className="text-sm border-2 border-dashed border-blue-300"
                  />
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-lg text-gray-600 text-center col-span-full">No projects added yet.</p>
          )}
          <Button onClick={addProject} className="mt-6 bg-blue-500 hover:bg-blue-600 text-lg">
            <FaPlus className="mr-2" /> Add Project
          </Button>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen flex flex-col items-center justify-center px-8 py-16 bg-white"
      >
        <ContentEditable
          html="Get in Touch"
          disabled
          onChange={noop}
          className="text-lg text-gray-600"
        />
        <ContentEditable
          html="Contact Me"
          disabled
          onChange={noop}
          className="text-4xl font-bold text-gray-900 mb-12"
        />
        <div className="max-w-lg w-full bg-gray-50 p-8 rounded-lg shadow-md text-center">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 justify-center">
              <FaEnvelope className="w-6 h-6 text-gray-700" />
              <ContentEditable
                html={data.contact.email || "example@gmail.com"}
                onChange={(e) => updateContact("email", e.target.value)}
                className="text-lg text-gray-800 border-2 border-dashed border-blue-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-4 justify-center">
              <FaLinkedin className="w-6 h-6 text-blue-700" />
              <ContentEditable
                html={data.contact.linkedin || "https://linkedin.com"}
                onChange={(e) => updateContact("linkedin", e.target.value)}
                className="text-lg text-gray-800 border-2 border-dashed border-blue-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-8 text-center bg-gray-900 text-white">
        <p className="text-sm">Copyright © {new Date().getFullYear()} {data.name || "John Doe"}. All Rights Reserved.</p>
      </footer>
    </div>
  );

  return (
    <div className="w-full my-8 bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 flex justify-between items-center bg-gray-50 border-b border-gray-200">
        <h2 className="text-lg font-bold">Live Preview</h2>
        <div className="flex gap-2">
          <Button onClick={viewInNewTab} className="bg-blue-500 hover:bg-blue-600 text-sm">
            <FaExternalLinkAlt className="mr-1" /> View in New Tab
          </Button>
          <Button onClick={downloadPortfolio} className="bg-green-500 hover:bg-green-600 text-sm">
            Download
          </Button>
          <Button onClick={() => alert("Deploy TBD")} className="bg-purple-500 hover:bg-purple-600 text-sm">
            Deploy
          </Button>
        </div>
      </div>
      <div className="max-h-[70vh] overflow-y-auto">
        {portfolioData.template === "modern" ? renderEditableTemplate() : <ModernTemplate data={data} />}
      </div>
    </div>
  );
}