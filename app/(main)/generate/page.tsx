// /pages/generate.tsx or /app/generate/page.tsx
"use client";
import { motion } from "framer-motion";
import { FiArrowRight, FiLogIn } from "react-icons/fi";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createPortfolio } from "@/lib/actions";

// Same available templates data
const availableTemplates = [
  {
    id: "modern",
    name: "Modern",
    description: "A sleek, animated portfolio with a modern, dark-mode design.",
    previewImage: "/assets/modernTemplate.png",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "A clean, minimalist portfolio that puts your work front and center.",
    previewImage: "/assets/minimalTemplate.png",
  },
  {
    id: "creative",
    name: "Creative",
    description: "A bold and vibrant design for creatives who want to stand out.",
    previewImage: "/assets/creativeTemplate.png",
  },
  {
    id: "galaxy",
    name: "Galaxy",
    description: "Cosmic gradient vibes with bold type and motion.",
    previewImage: "/assets/thumbnail.png",
  },
  {
    id: "neon",
    name: "Neon",
    description: "High-contrast neon style with cyber glow touches.",
    previewImage: "/assets/thumbnail.png",
  },
];

// NOTE: You would need to pass a function to LivePreview to allow the user
// to come back to this selection screen. For example:
// <LivePreview portfolioData={portfolioData} onUpdate={setPortfolioData} onBack={() => setSelectedTemplate(null)} />
// This is a recommendation for better UX.

export default function GeneratePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleTemplateSelect = async (templateId: "modern" | "minimal" | "creative" | "galaxy" | "neon") => {
    if (status === 'authenticated' && session.user?.email) {
      try {
        // This server action will handle creation and redirection
        await createPortfolio(session.user?.email!, templateId); // eslint-disable-line @typescript-eslint/no-non-null-asserted-optional-chain
      } catch (error) {
        console.error(error);
        // Handle error (e.g., show a toast notification)
      }
    } else {
      // If user is not logged in, redirect them to sign in
      router.push('/api/auth/signin');
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-900 text-white flex items-center justify-center py-24 px-4">
       {/* Background Grid */}
       <div className="absolute top-0 left-0 w-full h-full bg-grid-slate-700/[0.05]"></div>
        {status === 'authenticated' && <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-6xl z-10"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4">
            Select Your{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-cyan-300">
              Canvas
            </span>
          </h1>
          <p className="text-lg text-slate-400 text-center max-w-2xl mx-auto mb-16">
            Every great portfolio starts with a strong foundation. Pick a style to begin — you can customize everything later.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {availableTemplates.map((template) => (
              <motion.div
                key={template.id}
                whileHover={{ 
                    y: -8, 
                    boxShadow: '0 20px 25px -5px rgb(2 132 199 / 0.2), 0 8px 10px -6px rgb(2 132 199 / 0.2)' 
                }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="group bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden cursor-pointer flex flex-col"
                onClick={() => handleTemplateSelect(template.id as "modern" | "minimal" | "creative" | "galaxy" | "neon")}
              >
                {/* Mock Browser Chrome */}
                <div className="p-2 border-b border-slate-700 flex items-center gap-1.5 bg-slate-900/50">
                    <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                </div>

                <div className="bg-slate-900 h-56 overflow-hidden">
                    <img src={template.previewImage} alt={`${template.name} Preview`} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" /> {/* eslint-disable-line @next/next/no-img-element*/ }
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h2 className="text-2xl font-bold text-white">{template.name}</h2>
                  <p className="text-slate-400 mt-2 flex-grow">{template.description}</p>
                  <div
                    className="mt-6 w-full text-center font-semibold text-sky-400 flex items-center justify-center gap-2"
                  >
                    Use Template
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform"/>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>}
        {/* Add a prompt for unauthenticated users */}
        {status === 'unauthenticated' && (
          <div className="text-center mt-12 p-6 bg-slate-800/50 rounded-lg border border-slate-700 max-w-lg mx-auto z-10">
              <h3 className="text-xl font-semibold text-white">Ready to Start?</h3>
              <p className="text-slate-400 mt-2 mb-4">Please sign in to save your creations and start building.</p>
              <button
                  onClick={() => router.push('/api/auth/signin')}
                  className="cursor-pointer px-6 py-2 font-semibold text-white bg-sky-500 rounded-lg shadow-lg shadow-sky-500/20 hover:bg-sky-600 transition-all "
              >
                  <FiLogIn className="inline-block mr-2"/>
                  Sign In with Google
              </button>
          </div>
        )}
    </div>
  );
}