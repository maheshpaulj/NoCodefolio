import { Timestamp } from 'firebase/firestore';

// More specific union types for better type safety and autocompletion
export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
export type TemplateId = 'modern' | 'minimal' | 'creative' | 'galaxy' | 'neon';

// --- Sub-Interfaces (Largely the same, with minor improvements) ---

export interface WorkExperience {
  title: string;
  company: string;
  duration: string;
  description: string;
}

export interface Skill {
  name: string;
  level: SkillLevel; // Using the union type
  icon?: string;
}

export interface Project {
  title:string;
  image: string;
  githubLink: string;
  liveDemoLink?: string; // Made optional, as not all projects might have a live demo
}

export interface Contact {
  email: string;
  linkedin: string;
  github: string;
  phone?: string; // Made optional, as it's sensitive and not always provided
}

// --- Core Data & Document Structures ---

/**
 * 1. The Core Data Model
 * This represents the actual content of the portfolio that the user edits.
 * It has no IDs or timestamps.
 */
export interface PortfolioData {
  name: string;
  bio: string;
  profileImage: string;
  resumeLink: string;
  aboutText: string;
  workExperience: WorkExperience[];
  skills: Skill[];
  projects: Project[];
  contact: Contact;
  template: TemplateId;
  vercelProjectId?: string;
  vercelDomain?: string;
  favicon?: string;
}

/**
 * 2. The Firestore Document Model
 * This is how the data is shaped in Firestore. It includes server-side
 * metadata like `userId` and Firestore `Timestamp` objects.
 * Use this type ONLY in server-side code (`lib/actions.ts`).
 */
export type PortfolioDocument = PortfolioData & {
  userId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

/**
 * 3. The Serializable Client-Side Model
 * This is the object that is safe to pass from Server Components to Client
 * Components. Timestamps have been converted to ISO date strings.
 * This is the type you'll use in props for components like `EditorClient`.
 */
export type SerializablePortfolio = PortfolioData & {
  id: string; // The document ID from Firestore
  userId: string;
  createdAt: string; // ISO String
  updatedAt: string; // ISO String
};