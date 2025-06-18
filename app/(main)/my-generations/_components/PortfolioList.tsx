'use client';

import { useState, useMemo } from 'react';
import { SerializablePortfolio } from '@/types/portfolio';
import { motion, AnimatePresence } from 'framer-motion';
import PortfolioCard from './PortfolioCard';
import ConfirmationModal from '@/components/ConfirmationModal';
import { deletePortfolio } from '@/lib/actions';
import toast from 'react-hot-toast';
import { FiArrowDown, FiArrowUp } from 'react-icons/fi';

type SortKey = 'updatedAt' | 'createdAt' | 'name';
type SortOption = {
  key: SortKey;
  label: string;
};

interface PortfolioListProps {
  initialPortfolios: SerializablePortfolio[];
}

// Define sort options here for cleaner code
const sortOptions: SortOption[] = [
  { key: 'updatedAt', label: 'Updated' },
  { key: 'createdAt', label: 'Created' },
  { key: 'name', label: 'Name' },
];

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export default function PortfolioList({ initialPortfolios }: PortfolioListProps) {
  const [portfolios, setPortfolios] = useState<SerializablePortfolio[]>(initialPortfolios);
  const [sortKey, setSortKey] = useState<SortKey>('updatedAt');
  const [sortAsc, setSortAsc] = useState(false);
  const [modalState, setModalState] = useState<{ isOpen: boolean; portfolio: SerializablePortfolio | null }>({ isOpen: false, portfolio: null });
  const [isDeleting, setIsDeleting] = useState(false);

  // The sorting and modal logic is perfect, no changes needed here.
  const sortedPortfolios = useMemo(() => {
    return [...portfolios].sort((a, b) => {
      let comparison = 0;
      if (sortKey === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else {
        comparison = new Date(b[sortKey]).getTime() - new Date(a[sortKey]).getTime();
      }
      return sortAsc ? -comparison : comparison;
    });
  }, [portfolios, sortKey, sortAsc]);
  
  const handleOpenDeleteModal = (portfolio: SerializablePortfolio) => {
    setModalState({ isOpen: true, portfolio });
  };

  const handleConfirmDelete = async () => {
    // ...
    if (!modalState.portfolio) return;
    setIsDeleting(true);

    const result = await deletePortfolio(modalState.portfolio.id);
    if (result.success) {
      toast.success(result.message);
      setPortfolios(current => current.filter(p => p.id !== modalState.portfolio!.id));
      setModalState({ isOpen: false, portfolio: null });
    } else {
      toast.error(result.message);
    }
    setIsDeleting(false);
  };

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) {
        setSortAsc(prev => !prev);
    } else {
        setSortKey(key);
        setSortAsc(false);
    }
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-xl text-slate-400">
          <AnimatePresence mode="wait">
            <motion.span
              key={portfolios.length}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              {portfolios.length} Creation{portfolios.length !== 1 && 's'}
            </motion.span>
          </AnimatePresence>
        </h2>

        {/* === UPGRADED SORT BAR === */}
        <div className="flex items-center gap-2 p-1 bg-slate-800 rounded-full text-sm">
          {sortOptions.map((option) => (
             <motion.button
                key={option.key}
                onClick={() => toggleSort(option.key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                // The 'relative' class is crucial for positioning the animated pill
                className={`relative px-4 py-1.5 rounded-full transition-colors flex items-center gap-1.5 cursor-pointer`}
             >
                {/* 1. The Animated "Pill" 
                    It only renders inside the active button, but layoutId allows it to animate
                    from its old position (in the previously active button) to its new one.
                */}
                {sortKey === option.key && (
                  <motion.div
                    layoutId="sort-pill"
                    className="absolute inset-0 bg-sky-500 rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}

                {/* 2. The Button Content
                    The 'relative' class ensures this content appears on top of the pill.
                */}
                <span className={`relative transition-colors duration-300 ${sortKey === option.key ? 'text-white' : 'text-slate-400'}`}>
                    {option.label}
                </span>
                {sortKey === option.key && (
                    <motion.span 
                        key={sortAsc ? 'asc' : 'desc'}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative text-white"
                    >
                        {sortAsc ? <FiArrowUp size={14}/> : <FiArrowDown size={14}/>}
                    </motion.span>
                )}
             </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {/* The grid animation logic is great, no changes needed */}
        <motion.div
          key={sortKey + (sortAsc ? 'asc' : 'desc')}
          variants={gridVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {sortedPortfolios.map(p => (
            <PortfolioCard key={p.id} portfolio={p} onDeleteClick={handleOpenDeleteModal} />
          ))}
        </motion.div>
      </AnimatePresence>

      <ConfirmationModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, portfolio: null })}
        onConfirm={handleConfirmDelete}
        isProcessing={isDeleting}
        title="Delete Portfolio"
        message={
          <p>
            Are you sure you want to delete <span className="font-bold text-white">{modalState.portfolio?.name}</span>?
            <br />
            This will also delete its live deployment. This action cannot be undone.
          </p>
        }
        confirmText="Yes, Delete Everything"
      />
    </>
  );
}