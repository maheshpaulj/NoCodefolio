"use client";

import { useState } from "react";
import LivePreview from "@/components/LivePreview";
import { PortfolioData } from "@/types/portfolio";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

// Available templates
const availableTemplates = [
  {
    id: "modern",
    name: "Modern",
    description: "A sleek, animated portfolio with a modern design.",
    previewImage: "/assets/modernTemplate.png",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "A clean, minimalist portfolio template.",
    previewImage: "/assets/minimalTemplate.png",
  },
  {
    id: "creative",
    name: "Creative",
    description: "A bold and vibrant creative design portfolio.",
    previewImage: "/assets/creativeTemplate.png",  // Make sure you add the creative template preview image
  },
  // Add more as needed
];

export default function GeneratePage() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    name: "Your Name",
    bio: "Creative <span class='text-blue-500'>Frontend Developer</span>",
    profileImage:
      "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg",
    resumeLink: "https://example.com/resume.pdf",
    aboutText:
      "Passionate about crafting beautiful and functional web experiences with a focus on modern JavaScript frameworks.",
    workExperience: [
      {
        title: "Frontend Developer",
        company: "Tech Innovate",
        duration: "2022-Present",
        description: "Led development of responsive web applications using React and Tailwind CSS.",
      },
      {
        title: "Junior Web Developer",
        company: "Creative Solutions",
        duration: "2020-2022",
        description: "Assisted in building client websites with HTML, CSS, and JavaScript.",
      },
    ],
    skills: [
      { name: "React", level: "Advanced", icon: "https://cdn.svgporn.com/logos/react.svg" },
      { name: "Tailwind CSS", level: "Experienced", icon: "https://cdn.svgporn.com/logos/tailwindcss-icon.svg" },
      { name: "JavaScript", level: "Intermediate" },
    ],
    projects: [
      {
        title: "Portfolio Builder",
        image:
          "https://static.vecteezy.com/system/resources/thumbnails/008/695/917/small_2x/no-image-available-icon-simple-two-colors-template-for-no-image-or-picture-coming-soon-and-placeholder-illustration-isolated-on-white-background-vector.jpg",
        githubLink: "https://github.com/yourname/portfolio-builder",
        liveDemoLink: "https://yourname.dev/portfolio-builder",
      },
    ],
    contact: {
      email: "yourname@example.com",
      linkedin: "https://www.linkedin.com/",
      github: "https://github.com",
      phone: "+91 1122334455",
    },
    template: "modern", // Default template is "modern"
  });

  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  // Handle template selection
  const handleTemplateSelect = (templateId: "modern" | "minimal" | "creative") => {
    setPortfolioData((prev) => ({
      ...prev,
      template: templateId,
    }));
    setSelectedTemplate(templateId);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {!selectedTemplate ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-5xl"
        >
          <h1 className="text-3xl font-bold text-center mb-8">Choose a Template</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableTemplates.map((template) => (
              <motion.div
                key={template.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
                onClick={() => handleTemplateSelect(template.id as "modern" | "minimal" | "creative")}
              >
                <img
                  src={template.previewImage}
                  alt={`${template.name} Preview`}
                  className="w-full h-56 object-contain"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold">{template.name}</h2>
                  <p className="text-gray-600 mt-2">{template.description}</p>
                  <Button
                    className="mt-4 w-full bg-blue-500 hover:bg-blue-600"
                    onClick={() => handleTemplateSelect(template.id as "modern" | "minimal" | "creative")}
                  >
                    Select
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : (
        <LivePreview portfolioData={portfolioData} onUpdate={setPortfolioData} />
      )}
    </div>
  );
}
