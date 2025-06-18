'use client';

import { SerializablePortfolio } from '@/types/portfolio';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiEdit, FiTrash2, FiEye, FiClock, FiFileText } from 'react-icons/fi';

interface PortfolioCardProps {
  portfolio: SerializablePortfolio;
  onDeleteClick: (portfolio: SerializablePortfolio) => void;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function PortfolioCard({ portfolio, onDeleteClick }: PortfolioCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6, boxShadow: '0 20px 25px -5px rgb(2 132 199 / 0.1), 0 8px 10px -6px rgb(2 132 199 / 0.1)' }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="group bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden flex flex-col"
    >
      <div className="p-6 flex-grow">
        <h2 className="text-xl font-bold text-white mb-2 truncate">{portfolio.name || "Untitled Portfolio"}</h2>
        <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
            <div className="flex items-center gap-1.5"><FiFileText /> <span className="capitalize">{portfolio.template}</span></div>
            <div className="flex items-center gap-1.5"><FiClock /> {new Date(portfolio.updatedAt).toLocaleDateString()}</div>
        </div>
        <p className="text-sm text-slate-400 line-clamp-2">{portfolio.aboutText || "No description provided."}</p>
      </div>
      <div className="flex items-center justify-between gap-2 p-4 border-t border-slate-700 bg-slate-800/50">
        {portfolio.vercelDomain ? (
          <a href={portfolio.vercelDomain} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors">
            <FiEye /> View Live
          </a>
        ) : <div className="text-xs text-slate-500">Not Deployed</div>}

        <div className="flex items-center gap-2">
          <Link href={`/editor/${portfolio.id}`} className="flex gap-2 px-3 py-1.5 text-sm font-semibold bg-slate-700 hover:bg-slate-600 text-white rounded-md transition-colors">
            <FiEdit size={18} /> Edit
          </Link>
          <button onClick={() => onDeleteClick(portfolio)} className="p-2 rounded-md text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-colors cursor-pointer">
            <FiTrash2 size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}