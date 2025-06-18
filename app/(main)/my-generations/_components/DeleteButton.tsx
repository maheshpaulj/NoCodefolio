'use client';

import { useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { deletePortfolio } from '@/lib/actions';
import toast from 'react-hot-toast';
import ConfirmationModal from '@/components/ConfirmationModal'; // Import our new flexible modal

export default function DeletePortfolioButton({ portfolioId }: { portfolioId: string }) {
  // State to control the modal's visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // State to track the deletion process for showing a loader
  const [isDeleting, setIsDeleting] = useState(false);

  // This function will be passed to the modal's "onConfirm" prop
  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    
    const result = await deletePortfolio(portfolioId);
    
    // The server action revalidates the path, so the UI will update automatically on success.
    if (result.success) {
      toast.success(result.message);
      setIsModalOpen(false); // Close the modal
    } else {
      toast.error(result.message);
    }
    
    // Ensure the loading state is turned off, even if there's an error
    setIsDeleting(false);
  };

  return (
    // We return a Fragment because we're rendering two things: the button and the (initially hidden) modal
    <>
      {/* 1. The visible button that triggers the modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        disabled={isDeleting}
        className="p-2 rounded-md text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-colors disabled:opacity-50"
        aria-label="Delete portfolio"
      >
        <FiTrash2 size={18} />
      </button>

      {/* 2. The Confirmation Modal itself */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        isProcessing={isDeleting}
        title="Delete Portfolio Permanently"
        message={
          <p>
            This will delete your portfolio data <span className="font-bold text-white">and</span> its live deployment on Vercel. 
            <br />
            This action cannot be undone.
          </p>
        }
        confirmText="Yes, Delete Everything"
        // The default confirmButtonClass is red, which is perfect for this.
      />
    </>
  );
}