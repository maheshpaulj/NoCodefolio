'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { SerializablePortfolio } from '@/types/portfolio';
import LivePreview from './LivePreview';
import ConfirmationModal from './ConfirmationModal';
import { saveVercelData, updatePortfolio } from '@/lib/actions';
import { motion, AnimatePresence } from 'framer-motion';

import JSZip from "jszip";
import toast from 'react-hot-toast';
import { saveAs } from "file-saver";
import {
  FiSave, FiLoader, FiChevronsLeft, FiMaximize, FiMinimize,
  FiDownload, FiExternalLink, FiTrash
} from 'react-icons/fi';
import { MdOpenInNew } from "react-icons/md";

import { modernTemplate } from "@/lib/templates/modernGenerator";
import { minimalTemplate } from '@/lib/templates/minimalGenerator';
import { creativeTemplate } from '@/lib/templates/creativeGenerator';
import { galaxyTemplate } from '@/lib/templates/galaxyGenerator';
import { neonTemplate } from '@/lib/templates/neonGenerator';


type EditorClientProps = {
  initialData: SerializablePortfolio;
};

export default function EditorClient({ initialData }: EditorClientProps) {
  const [data, setData] = useState<SerializablePortfolio>(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [viewMode, setViewMode] = useState<'full' | 'fit'>('fit');
  const [isDeploying, setIsDeploying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessingModal, setIsProcessingModal] = useState(false);

  // useEffect and handleUpdate are unchanged...
  useEffect(() => {
    if (JSON.stringify(data) !== JSON.stringify(initialData)) {
      setHasUnsavedChanges(true);
    } else {
      setHasUnsavedChanges(false);
    }
  }, [data, initialData]);

  const handleUpdate = (newData: SerializablePortfolio) => {
    setData(newData);
  };
  
  const handleSave = async () => {
    if (!hasUnsavedChanges) return;
    setIsSaving(true);
    
    const { id, userId, createdAt, ...updateData } = data; // eslint-disable-line @typescript-eslint/no-unused-vars
    const result = await updatePortfolio(initialData.id, updateData);

    setIsSaving(false);
    if (result.success) {
      toast.success(result.message);
      setHasUnsavedChanges(false);
      // This is a more robust way to sync initialData after saving
      // to prevent the "unsaved changes" flag from reappearing incorrectly.
      // But for simplicity, we'll rely on the revalidation from the server action.
    } else {
      toast.error(result.message);
    }
  };
  
  // --- Download and Deploy logic now lives here ---
  const downloadPortfolio = async () => {
    toast.loading('Zipping your files...', { id: 'zip' });
    const zip = new JSZip();
    // You'll need to expand this logic for other templates
    let files: Record<string, string> = {};
    switch (data.template) {
      case "modern":
        files = modernTemplate(data);
        break;
      case "minimal":
        files = minimalTemplate(data);
        break;
      case "creative":
        files = creativeTemplate(data);
        break;
      case "galaxy":
        files = galaxyTemplate(data);
        break;
      case "neon":
        files = neonTemplate(data);
        break;
    }
    
    Object.entries(files).forEach(([filePath, content]) => {
      zip.file(filePath, content);
    });

    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, `${data.name.toLowerCase().replace(/\s+/g, "-") + " " + "NoCodefolio" || "portfolio"}.zip`);
    toast.success('Download starting!', { id: 'zip' });
  };


  // =================================================================
  // === CRITICAL LOGIC UPDATE: deployToVercel with name change check ===
  // =================================================================
  const deployToVercel = async () => {
    setIsDeploying(true);
    let currentData = { ...data };

    try {
      // Your logic is correct. We just need to check against the real domain.
      const hasDeployedBefore = !!initialData.vercelDomain;
      const nameHasChanged = initialData.name !== currentData.name;

      if (hasDeployedBefore && nameHasChanged) {
        toast.loading('Project name changed. Re-creating deployment...', { id: 're-deploy' });
        
        const deleteResponse = await fetch("/api/deploy", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ projectId: currentData.vercelProjectId }),
        });
        if (!deleteResponse.ok) throw new Error("Failed to delete old deployment.");
        
        currentData = { ...currentData, vercelProjectId: undefined, vercelDomain: undefined };
        toast.success('Old deployment removed.', { id: 're-deploy' });
      }
      
      const toastId = toast.loading('Deploying to Vercel...');
      const deployResponse = await fetch("/api/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ portfolioData: currentData }),
      });
      const result = await deployResponse.json();
      if (!deployResponse.ok) throw new Error(result.error || 'Deployment failed.');
      
      await saveVercelData(currentData.id, {
        vercelProjectId: result.projectId,
        vercelDomain: result.url,
      });

      setData(prev => ({ ...prev, vercelProjectId: result.projectId, vercelDomain: result.url }));
      toast.success(`Site is live!`, { id: toastId });

    } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
      toast.error(error.message, { id: 'deploy' });
      toast.error(error.message, { id: 're-deploy' });
    } finally {
      setIsDeploying(false);
    }
  };

  const handleConfirmUndeploy = async () => {
    if (!data.vercelProjectId) return;
    setIsProcessingModal(true);

    try {
      const response = await fetch("/api/deploy", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: data.vercelProjectId }),
      });
      if (!response.ok) throw new Error((await response.json()).error || "Failed to delete.");
      
      await saveVercelData(data.id, { vercelProjectId: '', vercelDomain: '' });
      setData(prev => ({ ...prev, vercelProjectId: undefined, vercelDomain: undefined }));
      toast.success("Deployment removed from Vercel.");
      setIsModalOpen(false);
    } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
      toast.error(error.message);
    } finally {
      setIsProcessingModal(false);
    }
  };

  const handleAddWorkExperience = () => {
    setData(prev => ({ ...prev, workExperience: [...prev.workExperience, { title: "New Role", company: "Company", duration: "YYYY-Present", description: "Description" }]}));
  };
  const handleDeleteWorkExperience = (index: number) => {
    setData(prev => ({ ...prev, workExperience: prev.workExperience.filter((_, i) => i !== index) }));
  };

  const handleAddSkill = () => {
    setData(prev => ({ ...prev, skills: [...prev.skills, { name: "New Skill", level: "Beginner", icon: "" }]}));
  };
  const handleDeleteSkill = (index: number) => {
    setData(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== index) }));
  };

  const handleAddProject = () => {
    setData(prev => ({ ...prev, projects: [...prev.projects, { title: "New Project", image: "", githubLink: "", liveDemoLink: "" }]}));
  };
  const handleDeleteProject = (index: number) => {
    setData(prev => ({ ...prev, projects: prev.projects.filter((_, i) => i !== index) }));
  };


  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center pt-24 pb-8">
      {/* ======================================= */}
      {/* === UPGRADE: Animated Header & Layout === */}
      {/* ======================================= */}
      <header className="w-[90%] max-w-7xl bg-slate-900/60 backdrop-blur-lg border rounded-2xl px-4 py-2 border-slate-700 h-auto">
        <div className="w-full h-full flex justify-between items-center">
          <motion.div whileHover={{ x: -3 }} transition={{ type: 'spring', stiffness: 400 }}>
            <Link href="/my-generations" className="flex items-center gap-2 text-slate-300 hover:text-sky-400 transition-colors">
              <FiChevronsLeft />
              <span className="hidden sm:inline">Back to Creations</span>
            </Link>
          </motion.div>
          
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex items-center bg-slate-800 p-1 rounded-full">
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setViewMode('full')} className="relative px-3 py-1 rounded-full text-sm flex items-center gap-1.5 transition-colors cursor-pointer z-10">
                {viewMode === 'full' && <motion.div layoutId="view-mode-pill" className="absolute inset-0 bg-sky-500 rounded-full" transition={{ type: 'spring', stiffness: 300, damping: 15 }} />}
                <span className={`relative transition-colors ${viewMode === 'full' ? 'text-white' : 'text-slate-400'}`}><FiMinimize size={14}/></span>
                <span className={`relative hidden sm:inline transition-colors ${viewMode === 'full' ? 'text-white' : 'text-slate-400'}`}>Fit</span>
              </motion.button>
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setViewMode('fit')} className="relative px-3 py-1 rounded-full text-sm flex items-center gap-1.5 transition-colors cursor-pointer z-10">
                {viewMode === 'fit' && <motion.div layoutId="view-mode-pill" className="absolute inset-0 bg-sky-500 rounded-full" transition={{ type: 'spring', stiffness: 300, damping: 15 }} />}
                <span className={`relative transition-colors ${viewMode === 'fit' ? 'text-white' : 'text-slate-400'}`}><FiMaximize size={14}/></span>
                <span className={`relative hidden sm:inline transition-colors ${viewMode === 'fit' ? 'text-white' : 'text-slate-400'}`}>Full</span>
              </motion.button>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <motion.button whileHover={{ y: -2, scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={downloadPortfolio} transition={{ type: 'spring', stiffness: 300 }} className="p-2 cursor-pointer sm:px-4 sm:py-2 text-sm flex items-center gap-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white"><FiDownload/><span className="hidden sm:inline">Download</span></motion.button>
              <motion.button onClick={deployToVercel} disabled={isDeploying || isProcessingModal} whileHover={{ y: -2, scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: 'spring', stiffness: 300 }} className="p-2 cursor-pointer sm:px-4 sm:py-2 text-sm flex items-center gap-2 bg-black hover:bg-black/80 rounded-lg text-white disabled:opacity-50">
                <Image src="/vercel.svg" alt="Vercel" width={16} height={16} />
                <span className="hidden sm:inline">{isDeploying ? "Deploying..." : (data.vercelProjectId ? "Update Site" : "Deploy")}</span>
              </motion.button>
              {!data.vercelProjectId && (
                <motion.a href={`/preview/${data.id}`} target='_blank' whileHover={{ y: -2, scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: 'spring', stiffness: 300 }} className="p-2 cursor-pointer sm:px-4 sm:py-2 text-sm flex items-center gap-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white"><MdOpenInNew/><span className="hidden sm:inline">View Preview</span></motion.a>
              )}
              <AnimatePresence mode="wait">
                {data.vercelDomain ? (
                  <motion.div key="deployed-controls" initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }} exit={{ opacity: 0, width: 0 }} className="flex items-center gap-2">
                    <motion.a href={data.vercelDomain} target="_blank" rel="noopener noreferrer" whileHover={{ y: -2, scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: 'spring', stiffness: 300 }} className="p-2 sm:px-4 sm:py-2 text-sm flex items-center gap-2 bg-green-600/80 text-white rounded-lg">
                      <FiExternalLink />
                      <span className="hidden sm:inline">Live Site</span>
                    </motion.a>
                    <motion.button onClick={() => setIsModalOpen(true)} disabled={isProcessingModal} whileHover={{ y: -2, scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: 'spring', stiffness: 300 }} className="flex items-center text-sm cursor-pointer gap-2 p-2.5 bg-red-900/50 text-red-400 hover:bg-red-900/80 hover:text-red-300 rounded-lg disabled:opacity-50">
                      <FiTrash /> Delete Deployment
                    </motion.button>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      {/* Main Preview Area */}
      <main className="flex-grow w-full flex items-center justify-center overflow-hidden p-4 sm:p-6 md:p-8">
        <motion.div layout transition={{ type: "spring", stiffness: 300, damping: 30 }} className={`w-full ${viewMode === 'full' ? 'max-w-6xl h-[75vh]' : 'h-full'}`}>
          <div className="w-full h-full bg-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col border border-slate-700">
            {/* ... Mock Browser Chrome ... */}
            <div className="flex-shrink-0 flex items-center gap-1.5 p-3 bg-slate-900/50 border-b border-slate-700">
              <div className="w-3 h-3 rounded-full bg-slate-700"></div>
              <div className="w-3 h-3 rounded-full bg-slate-700"></div>
              <div className="w-3 h-3 rounded-full bg-slate-700"></div>
              <div className="ml-2 flex-grow bg-slate-800 h-6 rounded-full text-xs text-slate-500 flex items-center px-3">
                <span className="truncate">{data.vercelDomain || `https://${data.name.toLowerCase().replace(/\s+/g, "-") || "preview"}.vercel.app`}</span>
              </div>
            </div>
            <div className="flex-grow bg-white relative overflow-hidden">
              <LivePreview 
                portfolioData={data} 
                onUpdate={handleUpdate}
                onAddWorkExperience={handleAddWorkExperience}
                onDeleteWorkExperience={handleDeleteWorkExperience}
                onAddSkill={handleAddSkill}
                onDeleteSkill={handleDeleteSkill}
                onAddProject={handleAddProject}
                onDeleteProject={handleDeleteProject}
              />
            </div>
          </div>
        </motion.div>
      </main>

      {/* Floating Save Button */}
      <AnimatePresence>
        {hasUnsavedChanges && (
          <motion.button
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.05 }}
            onClick={handleSave}
            disabled={isSaving}
            className="fixed z-50 bottom-8 right-8 flex items-center justify-center gap-3 px-6 py-4 font-semibold text-white bg-sky-500 rounded-full shadow-2xl shadow-sky-900/50 hover:bg-sky-600 transition-colors disabled:bg-slate-500 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSaving ? <FiLoader className="animate-spin" size={20} /> : <FiSave size={20} />}
            <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
          </motion.button>
        )}
      </AnimatePresence>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmUndeploy}
        isProcessing={isProcessingModal}
        title="Undeploy Site"
        message="This will remove your live site from Vercel, but your portfolio data will not be affected. Are you sure?"
        confirmText="Yes, Undeploy"
        confirmButtonClass="bg-red-600 hover:bg-red-700 disabled:bg-red-800"
      />
    </div>
  );
}