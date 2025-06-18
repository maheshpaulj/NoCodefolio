'use client';

import { motion, MotionProps } from 'framer-motion';

// We can extend MotionProps to accept all the standard framer-motion props
interface AnimatedDivProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
}

export default function AnimatedDiv({ children, className, ...props }: AnimatedDivProps) {
  return (
    <motion.div className={className} {...props}>
      {children}
    </motion.div>
  );
}