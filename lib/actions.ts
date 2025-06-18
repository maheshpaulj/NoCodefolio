'use server';

import { collection, addDoc, getDocs, query, where, doc, getDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from './firebase';
// Import all the new types from the central file
import {
  PortfolioData,
  PortfolioDocument,
  SerializablePortfolio,
  TemplateId,
} from '@/types/portfolio';
import { deleteVercelProject } from './vercel';

// Helper function to serialize a Firestore document for the client
function serializeDocument(docId: string, data: PortfolioDocument): SerializablePortfolio {
  return {
    id: docId,
    ...data,
    // Safely handle potential null timestamps during creation race conditions
    createdAt: data.createdAt?.toDate().toISOString() || new Date().toISOString(),
    updatedAt: data.updatedAt?.toDate().toISOString() || new Date().toISOString(),
  };
}

/**
 * Creates a new portfolio document in Firestore.
 */
export async function createPortfolio(userId: string, templateId: TemplateId) {
  // ... (Your defaultData logic is excellent and doesn't need changes)
  // In /lib/actions.ts, inside the createPortfolio function

const defaultData: Omit<PortfolioData, 'template'> = {
  // --- Hero Section ---
  name: "Alex Doe",
  bio: "Creative <span class='text-sky-500'>Full-Stack Developer</span> & UI/UX Enthusiast",
  profileImage: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=2940&auto=format&fit=crop", // A high-quality, free-to-use placeholder image

  // --- Call to Action / Resume ---
  resumeLink: "", // Keep this empty so users are prompted to add their own

  // --- About Section ---
  aboutText: "I'm a passionate developer with a knack for creating beautiful, intuitive, and high-performance web applications. With a background in both design and engineering, I bridge the gap between aesthetics and functionality. My goal is to always build products that not only look great but are also a joy to use. When I'm not coding, you can find me exploring new technologies or contributing to open-source projects.",

  // --- Work Experience Section ---
  workExperience: [
    {
      title: "Senior Frontend Developer",
      company: "Innovate Inc.",
      duration: "2021 - Present",
      description: "Led the development of the main user-facing dashboard using React and TypeScript. Collaborated with UI/UX designers to translate complex requirements into interactive features. Mentored junior developers and improved code quality by 30%."
    },
    {
      title: "Web Developer",
      company: "Digital Solutions",
      duration: "2019 - 2021",
      description: "Built and maintained responsive marketing websites for various clients using modern JavaScript frameworks. Optimized site performance, achieving a 50% reduction in load times."
    }
  ],

  // --- Skills Section ---
  skills: [
    { name: "React", level: "Expert", icon: "https://cdn.svgporn.com/logos/react.svg" },
    { name: "Next.js", level: "Expert", icon: "https://cdn.svgporn.com/logos/nextjs-icon.svg" },
    { name: "TypeScript", level: "Advanced", icon: "https://cdn.svgporn.com/logos/typescript-icon.svg" },
    { name: "Node.js", level: "Advanced", icon: "https://cdn.svgporn.com/logos/nodejs-icon.svg" },
    { name: "Tailwind CSS", level: "Expert", icon: "https://cdn.svgporn.com/logos/tailwindcss-icon.svg" },
    { name: "Figma", level: "Intermediate", icon: "https://cdn.svgporn.com/logos/figma.svg" },
  ],

  // --- Projects Section ---
  projects: [
    {
      title: "Project Phoenix",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop", // Placeholder project image
      githubLink: "https://github.com",
      liveDemoLink: "#"
    },
    {
      title: "EcoTracker App",
      image: "https://images.unsplash.com/photo-1599307690923-8ffea24780e0?q=80&w=2232&auto=format&fit=crop", // Placeholder project image
      githubLink: "https://github.com",
      liveDemoLink: "#"
    },
    {
      title: "DataViz Dashboard",
      image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?q=80&w=1974&auto=format&fit=crop", // Placeholder project image
      githubLink: "https://github.com",
      liveDemoLink: "" // Example of a project with no live demo
    }
  ],

  // --- Contact Section ---
  contact: {
    email: "alex.doe@example.com",
    linkedin: "https://linkedin.com/in/alex-doe",
    github: "https://github.com/alex-doe",
    phone: "+1 (555) 123-4567" // Optional field, good to have a placeholder
  }
};

  let docId = null;

  try {
    const docRef = await addDoc(collection(db, 'portfolios'), {
      userId,
      template: templateId,
      ...defaultData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    docId = docRef.id;
    revalidatePath('/my-generations');

  } catch (e) {
    console.error("Error creating portfolio in Firestore: ", e);
    // Return a value instead of throwing, consistent with other functions
    return { success: false, message: 'Failed to create portfolio.' };
  }

  // Redirect is a side-effect that should happen on success
  if (docId) {
    redirect(`/editor/${docId}`);
  }
}

/**
 * Fetches all portfolio documents for a user.
 */
export async function getUserPortfolios(userId: string): Promise<SerializablePortfolio[]> {
  try {
    const q = query(collection(db, "portfolios"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    const portfolios = querySnapshot.docs.map(doc => {
      const data = doc.data() as PortfolioDocument;
      return serializeDocument(doc.id, data);
    });
    return portfolios;
  } catch (error) {
    console.error("Error fetching user portfolios: ", error);
    return [];
  }
}

/**
 * Fetches a single portfolio by ID.
 */
export async function getPortfolioById(portfolioId: string): Promise<SerializablePortfolio | null> {
  try {
    const docRef = doc(db, 'portfolios', portfolioId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data() as PortfolioDocument;
      return serializeDocument(docSnap.id, data);
    } else {
      return null;
    }
  } catch(error) {
    console.error("Error fetching portfolio by ID: ", error);
    return null;
  }
}

/**
 * Updates the content of a specific portfolio document.
 * It correctly accepts `Partial<PortfolioData>` because you only want
 * to update the editable content, not the metadata.
 */
export async function updatePortfolio(portfolioId: string, data: Partial<PortfolioData>) {
  const docRef = doc(db, 'portfolios', portfolioId);
  try {
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
    revalidatePath(`/editor/${portfolioId}`);
    revalidatePath(`/preview/${portfolioId}`); // Good that you're revalidating the public page too
    return { success: true, message: "Portfolio saved successfully!" };
  } catch (error) {
    console.error("Error updating portfolio: ", error);
    return { success: false, message: "Failed to save portfolio." };
  }
}

/**
 * Deletes a portfolio document from Firestore AND its associated Vercel deployment.
 */
export async function deletePortfolio(portfolioId: string) {
  if (!portfolioId) {
    return { success: false, message: "Portfolio ID is missing." };
  }

  const docRef = doc(db, "portfolios", portfolioId);

  try {
    // 1. Fetch the document first to see if it has a Vercel project
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return { success: false, message: "Portfolio not found." };
    }

    const portfolioData = docSnap.data();
    const vercelProjectId = portfolioData.vercelProjectId;

    // 2. If a Vercel project ID exists, delete it on Vercel
    if (vercelProjectId) {
      console.log(`Portfolio has a Vercel deployment. Deleting project ${vercelProjectId}...`);
      await deleteVercelProject(vercelProjectId);
    } else {
      console.log("Portfolio has no Vercel deployment. Skipping Vercel deletion.");
    }

    // 3. Once Vercel cleanup is done (or skipped), delete the Firestore document
    console.log(`Deleting Firestore document ${portfolioId}...`);
    await deleteDoc(docRef);

    // 4. Revalidate paths to update the UI
    revalidatePath('/my-generations');

    return { success: true, message: "Portfolio and any associated deployment deleted." };

  } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
    console.error("Error during portfolio deletion process: ", error);
    // Provide a more specific error message if it's a Vercel issue
    if (error.message.includes("Vercel")) {
      return { success: false, message: `Failed to delete Vercel deployment. Please try again or delete manually on Vercel. Error: ${error.message}` };
    }
    return { success: false, message: "Failed to delete portfolio." };
  }
}

/**
 * Updates a portfolio document with Vercel deployment metadata.
 */
export async function saveVercelData(portfolioId: string, data: { vercelProjectId: string; vercelDomain: string }) {
  const docRef = doc(db, 'portfolios', portfolioId);
  try {
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(), // Also update the timestamp
    });
    revalidatePath(`/editor/${portfolioId}`);
    return { success: true, message: "Deployment info saved." };
  } catch (error) {
    console.error("Error saving Vercel data: ", error);
    return { success: false, message: "Failed to save deployment info." };
  }
}