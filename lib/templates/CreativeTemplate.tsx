"use client";

import { PortfolioData, WorkExperience, Skill, Project, Contact } from "@/types/portfolio";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaPlus } from "react-icons/fa";
import ContentEditable from "react-contenteditable";
import { Input } from "@/components/ui/input";

interface CreativeTemplateProps {
  data: PortfolioData;
  isEditable?: boolean;
  onUpdate?: (data: PortfolioData) => void;
  onAddWorkExperience?: () => void;
  onAddSkill?: () => void;
  onAddProject?: () => void;
}

export function CreativeTemplate({
  data,
  isEditable = false,
  onUpdate,
  onAddWorkExperience,
  onAddSkill,
  onAddProject,
}: CreativeTemplateProps) {
  const handleChange = (field: keyof PortfolioData, value: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    if (isEditable && onUpdate) {
      const newData = { ...data, [field]: value };
      onUpdate(newData);
    }
  };

  const updateWorkExperience = (index: number, key: keyof WorkExperience, value: string) => {
    if (isEditable && onUpdate) {
      const newExperience = [...data.workExperience];
      if (index >= 0 && index < newExperience.length) {
        newExperience[index] = { ...newExperience[index], [key]: value };
        handleChange("workExperience", newExperience);
      }
    }
  };

  const updateSkill = (index: number, key: keyof Skill, value: string) => {
    if (isEditable && onUpdate) {
      const newSkills = [...data.skills];
      if (index >= 0 && index < newSkills.length) {
        newSkills[index] = { ...newSkills[index], [key]: value };
        handleChange("skills", newSkills);
      }
    }
  };

  const updateProject = (index: number, key: keyof Project, value: string) => {
    if (isEditable && onUpdate) {
      const newProjects = [...data.projects];
      if (index >= 0 && index < newProjects.length) {
        newProjects[index] = { ...newProjects[index], [key]: value };
        handleChange("projects", newProjects);
      }
    }
  };

  const updateContact = (key: keyof Contact, value: string) => {
    if (isEditable && onUpdate) {
      const newContact = { ...data.contact, [key]: value };
      handleChange("contact", newContact);
    }
  };

  const noop = () => {};

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-poppins">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className={`bg-gradient-to-r from-teal-500 to-blue-500 shadow-lg p-6 flex justify-between items-center ${isEditable ? "" : "fixed top-0 left-0 right-0 z-50"}`}
      >
        {isEditable ? (
          <ContentEditable
            html={data.name || "Your Name"}
            onChange={(e) => handleChange("name", e.target.value)}
            className="text-3xl font-bold text-white border-2 border-dashed border-yellow-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        ) : (
          <a
            href="#profile"
            className="text-3xl font-bold text-white cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#profile")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {data.name || "Your Name"}
          </a>
        )}
        <ul className="flex gap-8 text-xl">
          {["about", "experience", "skills", "projects", "contact"]
            .filter((section) => {
              if (section === "about" && !data.aboutText) return false;
              if (section === "experience" && (!data.workExperience || data.workExperience.length === 0)) return false;
              if (section === "skills" && (!data.skills || data.skills.length === 0)) return false;
              if (section === "projects" && (!data.projects || data.projects.length === 0)) return false;
              if (
                section === "contact" &&
                (!data.contact?.email && !data.contact?.linkedin && !data.contact?.github && !data.contact?.phone)
              )
                return false;
              return true;
            })
            .map((section) => (
              <motion.li key={section} whileHover={{ scale: 1.1, color: "#ffb72d" }} transition={{ type: "spring", stiffness: 300 }}>
                <a
                  href={`#${section}`}
                  className="text-white hover:text-yellow-500 transition-colors capitalize"
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

      {/* Profile Section */}
      <motion.section
        id="profile"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen flex flex-col md:flex-row items-center justify-center pt-24 px-8 bg-gradient-to-r from-green-400 to-teal-500"
      >
        <motion.div whileHover={{ scale: 1.1 }} className="w-64 h-64 md:w-80 md:h-80">
          <img //eslint-disable-line @next/next/no-img-element
            src={data.profileImage || "https://via.placeholder.com/300"}
            alt="Profile"
            className="w-full h-full object-cover rounded-full shadow-xl border-4 border-white"
          />
          {isEditable && (
            <Input
              type="text"
              placeholder="Profile Image URL"
              value={data.profileImage || ""}
              onChange={(e) => handleChange("profileImage", e.target.value)}
              className="mt-4 text-sm border-2 border-dashed border-yellow-300"
            />
          )}
        </motion.div>
        <div className="text-center md:text-left md:ml-12 mt-8 md:mt-0 flex-1 max-w-lg">
          <p className="text-lg text-gray-200">Hello, I&apos;m</p>
          {isEditable ? (
            <ContentEditable
              html={data.name || "Your Name"}
              onChange={(e) => handleChange("name", e.target.value)}
              className="text-5xl font-extrabold text-yellow-100 mb-4 border-2 border-dashed border-yellow-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          ) : (
            <h1 className="text-5xl font-extrabold text-yellow-100 mb-4">{data.name || "Your Name"}</h1>
          )}
          {data.bio && (
            isEditable ? (
              <ContentEditable
                html={data.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
                className="text-xl text-yellow-200 mb-6 border-2 border-dashed border-yellow-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            ) : (
              <p
                className="text-xl text-yellow-200 mb-6"
                dangerouslySetInnerHTML={{ __html: data.bio }}
              />
            )
          )}
          {data.resumeLink && (
            <>
              <motion.a
                href={data.resumeLink}
                whileHover={{ scale: 1.1 }}
                className="inline-block px-6 py-3 bg-yellow-600 text-white rounded-full hover:bg-yellow-700 transition-colors text-lg font-medium"
              >
                Download CV
              </motion.a>
              {isEditable && (
                <Input
                  type="text"
                  placeholder="Resume URL"
                  value={data.resumeLink || ""}
                  onChange={(e) => handleChange("resumeLink", e.target.value)}
                  className="mt-4 text-sm border-2 border-dashed border-yellow-300"
                />
              )}
            </>
          )}
        </div>
      </motion.section>

      {/* About Section */}
      {data.aboutText && (
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
          {isEditable ? (
            <ContentEditable
              html={data.aboutText}
              onChange={(e) => handleChange("aboutText", e.target.value)}
              className="text-lg text-gray-700 max-w-3xl text-center leading-relaxed border-2 border-dashed border-yellow-300 p-4 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          ) : (
            <p className="text-lg text-gray-700 max-w-3xl text-center leading-relaxed">{data.aboutText}</p>
          )}
        </motion.section>
      )}

      {/* Work Experience Section */}
      {data.workExperience && data.workExperience.length > 0 && (
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
            <div className="space-y-12">
              {data.workExperience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="flex flex-col md:flex-row items-start gap-6 bg-white p-6 rounded-lg shadow-md"
                >
                  {exp.duration && (
                    <div className="md:w-1/3 text-center md:text-right">
                      {isEditable ? (
                        <ContentEditable
                          html={exp.duration}
                          onChange={(e) => updateWorkExperience(index, "duration", e.target.value)}
                          className="text-lg text-gray-600 border-2 border-dashed border-yellow-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                      ) : (
                        <p className="text-lg text-gray-600">{exp.duration}</p>
                      )}
                    </div>
                  )}
                  <div className="md:w-2/3 text-center md:text-left">
                    {exp.title && (
                      isEditable ? (
                        <ContentEditable
                          html={exp.title}
                          onChange={(e) => updateWorkExperience(index, "title", e.target.value)}
                          className="text-2xl font-semibold text-gray-900 border-2 border-dashed border-yellow-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                      ) : (
                        <h2 className="text-2xl font-semibold text-gray-900">{exp.title}</h2>
                      )
                    )}
                    {exp.company && (
                      isEditable ? (
                        <ContentEditable
                          html={exp.company}
                          onChange={(e) => updateWorkExperience(index, "company", e.target.value)}
                          className="text-lg text-blue-600 border-2 border-dashed border-yellow-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                      ) : (
                        <p className="text-lg text-blue-600">{exp.company}</p>
                      )
                    )}
                    {exp.description && (
                      isEditable ? (
                        <ContentEditable
                          html={exp.description}
                          onChange={(e) => updateWorkExperience(index, "description", e.target.value)}
                          className="text-gray-700 mt-2 border-2 border-dashed border-yellow-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                      ) : (
                        <p className="text-gray-700 mt-2">{exp.description}</p>
                      )
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
            {isEditable && onAddWorkExperience && (
              <button
                onClick={onAddWorkExperience}
                className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-full text-lg"
              >
                <FaPlus className="inline mr-2" /> Add Experience
              </button>
            )}
          </div>
        </motion.section>
      )}

      {/* Skills Section */}
      {data.skills && data.skills.length > 0 && (
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
            {data.skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 bg-gray-50 rounded-lg shadow-md text-center"
              >
                {skill.icon && (
                  <img src={skill.icon} alt={skill.name} className="w-12 h-12 mx-auto mb-4 object-contain" /> // eslint-disable-line @next/next/no-img-element
                )}
                {isEditable && (
                  <Input
                    type="text"
                    placeholder="Skill Icon URL (optional)"
                    value={skill.icon || ""}
                    onChange={(e) => updateSkill(index, "icon", e.target.value)}
                    className="mb-4 text-sm border-2 border-dashed border-yellow-300"
                  />
                )}
                {skill.name && (
                  isEditable ? (
                    <ContentEditable
                      html={skill.name}
                      onChange={(e) => updateSkill(index, "name", e.target.value)}
                      className="text-xl font-semibold text-gray-900 border-2 border-dashed border-yellow-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  ) : (
                    <h2 className="text-xl font-semibold text-gray-900">{skill.name}</h2>
                  )
                )}
                {skill.level && (
                  isEditable ? (
                    <ContentEditable
                      html={skill.level}
                      onChange={(e) => updateSkill(index, "level", e.target.value)}
                      className="text-gray-600 border-2 border-dashed border-yellow-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  ) : (
                    <p className="text-gray-600">{skill.level}</p>
                  )
                )}
              </motion.div>
            ))}
            {isEditable && onAddSkill && (
              <button
                onClick={onAddSkill}
                className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-full text-lg"
              >
                <FaPlus className="inline mr-2" /> Add Skill
              </button>
            )}
          </div>
        </motion.section>
      )}

      {/* Projects Section */}
      {data.projects && data.projects.length > 0 && (
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
            {data.projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                {project.image && (
                  <img // eslint-disable-line @next/next/no-img-element
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-contain rounded-md mb-4"
                  />
                )}
                {isEditable && (
                  <Input
                    type="text"
                    placeholder="Project Image URL"
                    value={project.image || ""}
                    onChange={(e) => updateProject(index, "image", e.target.value)}
                    className="mb-4 text-sm border-2 border-dashed border-yellow-300"
                  />
                )}
                {project.title && (
                  isEditable ? (
                    <ContentEditable
                      html={project.title}
                      onChange={(e) => updateProject(index, "title", e.target.value)}
                      className="text-2xl font-semibold text-gray-900 mb-2 border-2 border-dashed border-yellow-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  ) : (
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">{project.title}</h2>
                  )
                )}
                {(project.githubLink || project.liveDemoLink || isEditable) && (
                  <div className="flex flex-col gap-4 mt-4">
                    {isEditable ? (
                      <>
                        <Input
                          type="text"
                          placeholder="Github Link"
                          value={project.githubLink || ""}
                          onChange={(e) => updateProject(index, "githubLink", e.target.value)}
                          className="text-sm border-2 border-dashed border-yellow-300"
                        />
                        <Input
                          type="text"
                          placeholder="Live Demo Link"
                          value={project.liveDemoLink || ""}
                          onChange={(e) => updateProject(index, "liveDemoLink", e.target.value)}
                          className="text-sm border-2 border-dashed border-yellow-300"
                        />
                      </>
                    ) : (
                      <div className="flex gap-4 justify-center">
                        {project.githubLink && (
                          <a
                            href={project.githubLink}
                            className="px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-900 transition-colors"
                          >
                            Github
                          </a>
                        )}
                        {project.liveDemoLink && (
                          <a
                            href={project.liveDemoLink}
                            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                          >
                            Live Demo
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
            {isEditable && onAddProject && (
              <button
                onClick={onAddProject}
                className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-full text-lg"
              >
                <FaPlus className="inline mr-2" /> Add Project
              </button>
            )}
          </div>
        </motion.section>
      )}

      {/* Contact Section */}
      {(data.contact?.email || data.contact?.linkedin || data.contact?.github || data.contact?.phone) && (
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
              {data.contact.email && (
                <div className="flex items-center gap-4 justify-center">
                  <FaEnvelope className="w-6 h-6 text-gray-700" />
                  {isEditable ? (
                    <ContentEditable
                      html={data.contact.email}
                      onChange={(e) => updateContact("email", e.target.value)}
                      className="text-lg text-gray-800 border-2 border-dashed border-yellow-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  ) : (
                    <a href={`mailto:${data.contact.email}`} className="text-lg text-gray-800">
                      {data.contact.email}
                    </a>
                  )}
                </div>
              )}
              {data.contact.linkedin && (
                <div className="flex items-center gap-4 justify-center">
                  <FaLinkedin className="w-6 h-6 text-blue-700" />
                  {isEditable ? (
                    <ContentEditable
                      html={data.contact.linkedin}
                      onChange={(e) => updateContact("linkedin", e.target.value)}
                      className="text-lg text-gray-800 border-2 border-dashed border-yellow-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  ) : (
                    <a href={data.contact.linkedin} className="text-lg text-gray-800">
                      {data.contact.linkedin}
                    </a>
                  )}
                </div>
              )}
              {data.contact.github && (
                <div className="flex items-center gap-4 justify-center">
                  <FaGithub className="w-6 h-6 text-gray-800" />
                  {isEditable ? (
                    <ContentEditable
                      html={data.contact.github}
                      onChange={(e) => updateContact("github", e.target.value)}
                      className="text-lg text-gray-800 border-2 border-dashed border-yellow-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  ) : (
                    <a href={data.contact.github} className="text-lg text-gray-800">
                      {data.contact.github}
                    </a>
                  )}
                </div>
              )}
              {data.contact.phone && (
                <div className="flex items-center gap-4 justify-center">
                  <FaPhone className="w-6 h-6 text-gray-700" />
                  {isEditable ? (
                    <ContentEditable
                      html={data.contact.phone}
                      onChange={(e) => updateContact("phone", e.target.value)}
                      className="text-lg text-gray-800 border-2 border-dashed border-yellow-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  ) : (
                    <a href={`tel:${data.contact.phone}`} className="text-lg text-gray-800">
                      {data.contact.phone}
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.section>
      )}

      {/* Footer */}
      <footer className="py-8 text-center bg-gray-900 text-white">
        <p className="text-sm">Copyright © {new Date().getFullYear()} {data.name || "Your Name"}. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
