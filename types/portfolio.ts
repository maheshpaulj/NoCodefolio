export interface Project {
  title: string;
  description: string;
  time: string; // e.g., "Jan 2023 - Mar 2023"
  link?: string;
  image?: string; // Base64 or URL (for simplicity, we'll assume URL in this example)
}

export interface Experience {
  title: string;
  description: string;
  time: string;
  link?: string;
  image?: string;
}

export interface Skill {
  name: string;
  image?: string; // Optional image URL
}

export interface Contact {
  email: string;
  phone?: string;
  linkedin?: string;
  github?: string;
}

export interface PortfolioData {
  name: string;
  bio: string;
  projects: Project[];
  experience: Experience[];
  skills: Skill[];
  contact: Contact;
  template: "modern" | "minimal" | "creative";
}