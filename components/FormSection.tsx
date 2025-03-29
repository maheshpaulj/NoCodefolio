"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PortfolioData, Project, Experience, Skill, Contact } from "@/types/portfolio";

interface FormSectionProps {
  onChange: (data: PortfolioData) => void;
  portfolioData: PortfolioData;
}

export default function FormSection({ onChange, portfolioData }: FormSectionProps) {
  const [step, setStep] = useState(1);

  // Initialize with empty arrays/objects if not present
  const initialData: PortfolioData = {
    name: portfolioData.name || "",
    bio: portfolioData.bio || "",
    projects: portfolioData.projects || [],
    experience: portfolioData.experience || [],
    skills: portfolioData.skills || [],
    contact: portfolioData.contact || { email: "" },
    template: portfolioData.template || "modern",
  };

  const [formData, setFormData] = useState<PortfolioData>(initialData);

  const handleChange = (field: keyof PortfolioData, value: any) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onChange(newData);
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const addItem = (field: "projects" | "experience" | "skills") => {
    if (field === "projects") {
      handleChange("projects", [...formData.projects, { title: "", description: "", time: "" }]);
    } else if (field === "experience") {
      handleChange("experience", [...formData.experience, { title: "", description: "", time: "" }]);
    } else if (field === "skills") {
      handleChange("skills", [...formData.skills, { name: "" }]);
    }
  };

  const updateItem = (
    field: "projects" | "experience" | "skills",
    index: number,
    key: string,
    value: string
  ) => {
    const updatedItems = [...formData[field]] as any[];
    updatedItems[index][key] = value;
    handleChange(field, updatedItems);
  };

  const renderStep = () => {
    switch (step) {
      case 1: // Personal Details
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Personal Details</h2>
            <Input
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full"
            />
            <Input
              placeholder="Your Bio"
              value={formData.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              className="w-full"
            />
            <Button onClick={nextStep} className="w-full bg-blue-500 text-white hover:bg-blue-600">
              Next: Projects
            </Button>
          </div>
        );
      case 2: // Projects
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Projects</h2>
            {formData.projects.map((project, index) => (
              <div key={index} className="space-y-2 p-4 bg-gray-50 rounded-lg">
                <Input
                  placeholder="Project Title"
                  value={project.title}
                  onChange={(e) => updateItem("projects", index, "title", e.target.value)}
                />
                <Input
                  placeholder="Description"
                  value={project.description}
                  onChange={(e) => updateItem("projects", index, "description", e.target.value)}
                />
                <Input
                  placeholder="Time (e.g., Jan 2023 - Mar 2023)"
                  value={project.time}
                  onChange={(e) => updateItem("projects", index, "time", e.target.value)}
                />
                <Input
                  placeholder="Link (optional)"
                  value={project.link || ""}
                  onChange={(e) => updateItem("projects", index, "link", e.target.value)}
                />
                <Input
                  placeholder="Image URL (optional)"
                  value={project.image || ""}
                  onChange={(e) => updateItem("projects", index, "image", e.target.value)}
                />
              </div>
            ))}
            <Button onClick={() => addItem("projects")} variant="outline">
              Add Project
            </Button>
            <div className="flex space-x-4">
              <Button onClick={prevStep} variant="outline">
                Back
              </Button>
              <Button onClick={nextStep} className="bg-blue-500 text-white hover:bg-blue-600">
                Next: Experience
              </Button>
            </div>
          </div>
        );
      case 3: // Experience
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Experience</h2>
            {formData.experience.map((exp, index) => (
              <div key={index} className="space-y-2 p-4 bg-gray-50 rounded-lg">
                <Input
                  placeholder="Experience Title"
                  value={exp.title}
                  onChange={(e) => updateItem("experience", index, "title", e.target.value)}
                />
                <Input
                  placeholder="Description"
                  value={exp.description}
                  onChange={(e) => updateItem("experience", index, "description", e.target.value)}
                />
                <Input
                  placeholder="Time (e.g., Jan 2023 - Mar 2023)"
                  value={exp.time}
                  onChange={(e) => updateItem("experience", index, "time", e.target.value)}
                />
                <Input
                  placeholder="Link (optional)"
                  value={exp.link || ""}
                  onChange={(e) => updateItem("experience", index, "link", e.target.value)}
                />
                <Input
                  placeholder="Image URL (optional)"
                  value={exp.image || ""}
                  onChange={(e) => updateItem("experience", index, "image", e.target.value)}
                />
              </div>
            ))}
            <Button onClick={() => addItem("experience")} variant="outline">
              Add Experience
            </Button>
            <div className="flex space-x-4">
              <Button onClick={prevStep} variant="outline">
                Back
              </Button>
              <Button onClick={nextStep} className="bg-blue-500 text-white hover:bg-blue-600">
                Next: Skills
              </Button>
            </div>
          </div>
        );
      case 4: // Skills
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Skills</h2>
            {formData.skills.map((skill, index) => (
              <div key={index} className="space-y-2 p-4 bg-gray-50 rounded-lg">
                <Input
                  placeholder="Skill Name"
                  value={skill.name}
                  onChange={(e) => updateItem("skills", index, "name", e.target.value)}
                />
                <Input
                  placeholder="Image URL (optional)"
                  value={skill.image || ""}
                  onChange={(e) => updateItem("skills", index, "image", e.target.value)}
                />
              </div>
            ))}
            <Button onClick={() => addItem("skills")} variant="outline">
              Add Skill
            </Button>
            <div className="flex space-x-4">
              <Button onClick={prevStep} variant="outline">
                Back
              </Button>
              <Button onClick={nextStep} className="bg-blue-500 text-white hover:bg-blue-600">
                Next: Contact
              </Button>
            </div>
          </div>
        );
      case 5: // Contact
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Contact</h2>
            <Input
              placeholder="Email"
              value={formData.contact.email}
              onChange={(e) => handleChange("contact", { ...formData.contact, email: e.target.value })}
            />
            <Input
              placeholder="Phone (optional)"
              value={formData.contact.phone || ""}
              onChange={(e) => handleChange("contact", { ...formData.contact, phone: e.target.value })}
            />
            <Input
              placeholder="LinkedIn (optional)"
              value={formData.contact.linkedin || ""}
              onChange={(e) => handleChange("contact", { ...formData.contact, linkedin: e.target.value })}
            />
            <Input
              placeholder="GitHub (optional)"
              value={formData.contact.github || ""}
              onChange={(e) => handleChange("contact", { ...formData.contact, github: e.target.value })}
            />
            <div className="flex space-x-4">
              <Button onClick={prevStep} variant="outline">
                Back
              </Button>
              <Button onClick={() => alert("Form completed!")} className="bg-blue-500 text-white hover:bg-blue-600">
                Finish
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto">
      <div className="flex justify-between mb-4">
        {[1, 2, 3, 4, 5].map((s) => (
          <div
            key={s}
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              s === step ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            {s}
          </div>
        ))}
      </div>
      {renderStep()}
    </div>
  );
}