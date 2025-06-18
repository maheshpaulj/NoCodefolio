'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertTriangle, FiLoader } from 'react-icons/fi';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isProcessing: boolean;
  title: string;
  message: React.ReactNode; // Can be string or JSX
  confirmText?: string;
  confirmButtonClass?: string;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  isProcessing,
  title,
  message,
  confirmText = 'Confirm',
  confirmButtonClass = 'bg-red-600 hover:bg-red-700 disabled:bg-red-800',
}: ConfirmationModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 5 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md p-6 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-red-500/10">
                <FiAlertTriangle className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <div className="mt-1 text-slate-400">{message}</div>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={onClose} disabled={isProcessing} className="px-5 py-2 text-sm font-semibold text-slate-300 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors cursor-pointer disabled:opacity-50">
                Cancel
              </button>
              <button onClick={onConfirm} disabled={isProcessing} className={`px-5 py-2 text-sm font-semibold text-white rounded-lg transition-colors flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed ${confirmButtonClass}`}>
                {isProcessing ? <FiLoader className="animate-spin" /> : null}
                {isProcessing ? 'Processing...' : confirmText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}