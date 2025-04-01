export interface WorkExperience {
  title: string;
  company: string;
  duration: string;
  description: string;
}

export interface Skill {
  name: string;
  level: string; // e.g., "Experienced", "Intermediate", "Basic"
  icon?: string; // Optional image URL for skill icon
}

export interface Project {
  title: string;
  image: string;
  githubLink: string;
  liveDemoLink: string;
}

export interface Contact {
  email: string;
  linkedin: string;
}

export interface PortfolioData {
  name: string;
  bio: string; // Supports HTML for styled text
  profileImage: string; // Profile picture URL
  resumeLink: string; // URL to resume PDF
  aboutText: string;
  workExperience: WorkExperience[];
  skills: Skill[];
  projects: Project[];
  contact: Contact;
  template: "modern" | "minimal" | "creative";
}