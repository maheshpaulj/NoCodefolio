"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PortfolioData } from "@/types/portfolio";

interface FormSectionProps {
  onSubmit: (data: PortfolioData) => void;
}

export default function FormSection({ onSubmit }: FormSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    projects: "",
    experience: "",
    skills: "",
    template: "modern",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as PortfolioData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Your Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <Input
        placeholder="Bio"
        value={formData.bio}
        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
      />
      <Input
        placeholder="Projects (comma-separated)"
        value={formData.projects}
        onChange={(e) => setFormData({ ...formData, projects: e.target.value })}
      />
      <Input
        placeholder="Experience"
        value={formData.experience}
        onChange={(e) =>
          setFormData({ ...formData, experience: e.target.value })
        }
      />
      <Input
        placeholder="Skills (comma-separated)"
        value={formData.skills}
        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
      />
      <select
        value={formData.template}
        onChange={(e) =>
          setFormData({ ...formData, template: e.target.value })
        }
        className="w-full p-2 border rounded"
      >
        <option value="modern">Modern</option>
        <option value="minimal">Minimal</option>
        <option value="creative">Creative</option>
      </select>
      <Button type="submit">Generate Portfolio</Button>
    </form>
  );
}