'use client';

import { motion } from 'framer-motion';

// Animation variants for the container to orchestrate the stagger effect
const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // This will make each child animate 0.1s after the previous one
    },
  },
};

export default function AnimatedGrid({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={gridContainerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {children}
    </motion.div>
  );
}