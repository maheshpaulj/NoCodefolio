"use client";

import { useState } from "react";
import LivePreview from "@/components/LivePreview";
import { PortfolioData } from "@/types/portfolio";

export default function GeneratePage() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    name: "Jane Doe",
    bio: "Creative <span class='text-blue-500'>Frontend Developer</span>",
    profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    resumeLink: "https://example.com/resume.pdf",
    aboutText: "Passionate about crafting beautiful and functional web experiences with a focus on modern JavaScript frameworks.",
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
        image: "https://via.placeholder.com/150",
        githubLink: "https://github.com/janedoe/portfolio-builder",
        liveDemoLink: "https://janedoe.dev/portfolio-builder",
      },
    ],
    contact: {
      email: "jane.doe@example.com",
      linkedin: "https://www.linkedin.com/in/janedoe",
    },
    template: "modern",
  });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <LivePreview portfolioData={portfolioData} onUpdate={setPortfolioData} />
    </div>
  );
}