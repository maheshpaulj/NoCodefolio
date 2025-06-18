"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiGithub, FiMail, FiArrowRight } from 'react-icons/fi';
import AnimatedDiv from '@/components/AnimatedDiv';

// Configuration for easy updates
const GITHUB_REPO_URL = 'https://github.com/maheshpaulj/NoCodefolio'; // Replace with your actual repo link
const CONTACT_EMAIL = 'mahesh.paul.j@gmail.com'; // Replace with your preferred contact email

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 150, damping: 20 } },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white pt-32 pb-24">
      {/* Background Grid */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid-slate-700/[0.05] -z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Hero Section */}
        <AnimatedDiv
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-cyan-300">
            Let&apos;s Connect
          </h1>
          <p className="text-lg md:text-xl text-slate-300">
            Whether you&apos;ve found a bug, have a feature idea, or just want to say hello, we&apos;d love to hear from you.
          </p>
        </AnimatedDiv>
        
        {/* Contact Cards Grid */}
        <AnimatedDiv 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.2 }}
          className="max-w-4xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* GitHub Card */}
          <motion.div variants={cardVariants} whileHover={{ y: -8, scale: 1.02 }}>
            <Link
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group h-full flex flex-col p-8 bg-slate-800/70 backdrop-blur-sm border border-slate-700 rounded-2xl hover:border-sky-500/50 transition-all duration-300"
            >
              <FiGithub className="w-12 h-12 text-sky-400 mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Contribute on GitHub</h2>
              <p className="text-slate-400 flex-grow">
                The best place for bug reports, feature requests, and code contributions. Browse the issues or open a pull request.
              </p>
              <div className="mt-6 flex items-center font-semibold text-sky-400">
                <span>View Repository</span>
                <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </motion.div>

          {/* Email Card */}
          <motion.div variants={cardVariants} whileHover={{ y: -8, scale: 1.02 }}>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="group h-full flex flex-col p-8 bg-slate-800/70 backdrop-blur-sm border border-slate-700 rounded-2xl hover:border-cyan-500/50 transition-all duration-300"
            >
              <FiMail className="w-12 h-12 text-cyan-400 mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Send us an Email</h2>
              <p className="text-slate-400 flex-grow">
                For general inquiries, partnership opportunities, or other questions, feel free to send us a direct message.
              </p>
              <div className="mt-6 flex items-center font-semibold text-cyan-400">
                <span>Mail the Devs</span>
                <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </a>
          </motion.div>
        </AnimatedDiv>
      </div>
    </div>
  );
}