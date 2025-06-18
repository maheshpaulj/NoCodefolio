'use client'; // Footer is a client component for animations

import Link from 'next/link';
import Image from 'next/image';
import { FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { FiMail, FiGithub as FiGithubDev } from 'react-icons/fi';

// 1. === THE FIX: Define strict types for our data ===
interface FooterLink {
  name: string;
  href: string;
  icon?: React.ReactNode; // Optional property
  target?: string;       // Optional property
}

interface LinkColumn {
  title: string;
  links: FooterLink[];
}
// ======================================================

// Variants for orchestrating the footer animation
const footerContainerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const footerItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};

export default function Footer() {
  // Apply the new, strict type to our data array
  const linkCols: LinkColumn[] = [
    { 
      title: 'Product', 
      links: [ 
        { name: 'Guide', href: '/guide' }, 
        { name: 'Generate', href: '/generate' },
        { name: 'Templates', href: '/templates' }
      ] 
    },
    { 
      title: 'Company', 
      links: [ 
        { name: 'About Us', href: '/about' }, 
        { name: 'Contact', href: '/contact' } 
      ] 
    },
    { 
      title: 'Developers', 
      links: [ 
        { name: 'Mail Us', href: 'mailto:mahesh.paul.j@gmail.com', icon: <FiMail /> }, 
        { name: 'GitHub Repo', href: 'https://github.com/maheshpaulj/NoCodefolio', icon: <FiGithubDev />, target: '_blank' } 
      ] 
    },
  ];
  
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <motion.div 
        variants={footerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="container mx-auto px-4 py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <motion.div variants={footerItemVariants} className="lg:col-span-2">
             <Link href="/" className="flex items-center text-2xl font-bold mb-4">
                <motion.div whileHover={{ rotate: -15 }}><Image src={"/assets/icon.png"} alt='logo' width={32} height={32} /> </motion.div>
                <span className="text-white">NoCode</span><span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-cyan-300">folio</span>
            </Link>
            <p className="text-slate-400 max-w-xs">The ultimate no-code portfolio builder for developers and creatives.</p>
            <div className="flex gap-4 mt-6">
              {/* <motion.a whileHover={{ y: -3, scale: 1.1 }} href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-sky-400 transition-colors"><FaTwitter size={20} /></motion.a> */}
              <motion.a whileHover={{ y: -3, scale: 1.1 }} href="https://github.com/maheshpaulj/NoCodefolio" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-sky-400 transition-colors"><FaGithub size={20} /></motion.a>
              {/* <motion.a whileHover={{ y: -3, scale: 1.1 }} href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-sky-400 transition-colors"><FaLinkedin size={20} /></motion.a> */}
            </div>
          </motion.div>

          {/* Link Columns */}
          {linkCols.map(col => (
            <motion.div variants={footerItemVariants} key={col.title}>
              <h3 className="font-semibold text-white mb-4 tracking-wide">{col.title}</h3>
              <ul className="space-y-3">
                {col.links.map(link => {
                  const isExternal = link.target === '_blank' || link.href.startsWith('mailto:');
                  
                  const linkContent = (
                    <motion.span whileHover={{ x: link.icon ? 2 : 4 }} className="group-hover:text-sky-400 transition-colors flex items-center gap-2">
                      {link.icon && <span className="transition-colors">{link.icon}</span>}
                      {link.name}
                    </motion.span>
                  );

                  return (
                    <li key={link.name}>
                      {/* 2. === THE FIX: Use <Link> for internal pages and <a> for external */}
                      {isExternal ? (
                        <a href={link.href} target={link.target} rel="noopener noreferrer" className="text-slate-400 group">
                          {linkContent}
                        </a>
                      ) : (
                        <Link href={link.href} className="text-slate-400 group">
                          {linkContent}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-16 pt-8 border-t border-slate-800 text-center text-sm text-slate-500"
        >
          <p>© {new Date().getFullYear()} NoCodefolio. All rights reserved.</p>
        </motion.div>
      </motion.div>
    </footer>
  );
};