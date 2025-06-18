'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { FiMenu, FiX, FiUser, FiLogOut, FiLayout, FiLoader } from 'react-icons/fi';
import { usePathname } from 'next/navigation';

// Variants for staggering mobile menu items
const mobileLinkVariants = {
  initial: { y: -20, opacity: 0 },
  open: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 25 } }
};

const mobileMenuVariants = {
  initial: { opacity: 0 },
  open: { opacity: 1, transition: { staggerChildren: 0.07 } }
};


export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const { data: session, status } = useSession();
  
  // 2. Get the current URL path
  const pathname = usePathname();

  // On-scroll effect logic (unchanged)
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 10);
  });

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Guide', href: '/guide' }, 
    { name: 'Contact', href: '/contact' }, 
    { name: 'Generate', href: '/generate' },
  ];

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);
  };

  return (
    <motion.nav 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${isScrolled ? 'bg-slate-900/80 backdrop-blur-lg border-b border-slate-700/50' : 'bg-transparent border-b border-transparent'}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" onClick={closeMenus} className="flex items-center text-2xl font-bold">
            <motion.div whileHover={{ rotate: -15 }}><Image src={"/assets/icon.png"} alt='logo' width={32} height={32} /> </motion.div>
            <span className="text-white">NoCode</span><span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-cyan-300">folio</span>
          </Link>

          {/* === UPGRADED Desktop Navigation === */}
          {/* The onMouseLeave now correctly clears the hover state */}
          <div className="hidden md:flex items-center gap-8" onMouseLeave={() => setHoveredLink(null)}>
            {navLinks.map((link) => {
              // 3. Check if the current link is the active one
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className="relative text-slate-300 hover:text-white transition-colors duration-300"
                  onMouseEnter={() => setHoveredLink(link.name)}
                >
                  <span className={isActive ? 'text-white font-semibold' : ''}>{link.name}</span>

                  {/* 4. New Underline Logic */}
                  {/* Show if hovered, OR if it's the active link AND nothing else is hovered */}
                  {(hoveredLink === link.name || (isActive && hoveredLink === null)) && (
                    <motion.div 
                      layoutId="navbar-underline"
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-sky-400"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center gap-4">
            {status === 'loading' && <FiLoader className="animate-spin text-slate-400" />}

            {status === 'unauthenticated' && (
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => signIn('google')}
                className="px-5 py-2 font-semibold text-white bg-sky-500 rounded-lg cursor-pointer shadow-md shadow-sky-500/20 hover:bg-sky-600 transition-all"
              >
                Sign In
              </motion.button>
            )}

            {status === 'authenticated' && session.user && (
              <div className="flex items-center gap-4">
                {/* <Link href="/my-generations">
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                  >
                    My Creations <FiArrowRight size={14} />
                  </motion.button>
                </Link> */}
                <div className="relative" ref={profileMenuRef}>
                  <motion.button whileTap={{ scale: 0.9 }} onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} className='cursor-pointer'>
                    <Image src={session.user.image || `https://avatar.vercel.sh/${session.user.name}.png`} alt={session.user.name || 'User'} width={40} height={40} className="rounded-full border-2 border-slate-600 hover:border-sky-400 transition-colors"/>
                  </motion.button>
                  <AnimatePresence>
                    {isProfileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden"
                    >
                      <div className="p-2">
                        <Link href="/profile" onClick={closeMenus} className="flex items-center gap-3 w-full px-3 py-2 text-sm text-slate-200 rounded-md hover:bg-slate-700">
                          <FiUser /> Profile
                        </Link>
                        <Link href="/my-generations" onClick={closeMenus} className="flex items-center gap-3 w-full px-3 py-2 text-sm text-slate-200 rounded-md hover:bg-slate-700">
                          <FiLayout /> My Creations
                        </Link>
                        <div className="border-t border-slate-700 my-1"></div>
                        <button onClick={() => signOut()} className="flex items-center gap-3 w-full px-3 py-2 text-sm text-red-400 rounded-md hover:bg-slate-700 cursor-pointer">
                          <FiLogOut /> Log Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-200">
              <AnimatePresence mode="wait">
                <motion.div key={isMobileMenuOpen ? 'x' : 'menu'} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* === UPGRADED Staggered Mobile Menu === */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants} initial="initial" animate="open" exit="initial"
            className="md:hidden bg-slate-900/95 backdrop-blur-lg overflow-hidden"
          >
            <div className="container mx-auto px-4 pt-4 pb-8 flex flex-col gap-2">
              {/* Added My Creations to the mobile menu */}
              {[...navLinks, {name: 'My Creations', href: '/my-generations'}].map((link) => {
                // 5. Check for active state in mobile menu as well
                const isActive = pathname === link.href;
                return (
                  <motion.div key={link.name} variants={mobileLinkVariants}>
                    <Link 
                      href={link.href} 
                      onClick={closeMenus} 
                      // Apply active styles
                      className={`block text-lg transition-colors text-center py-3 rounded-md ${
                        isActive 
                        ? 'font-bold text-sky-400 bg-slate-800' 
                        : 'text-slate-200 hover:text-sky-400 hover:bg-slate-800'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
              <div className="w-full border-t border-slate-700 my-2"></div>
              {status === 'authenticated' ? (
                <motion.div variants={mobileLinkVariants}>
                   <button onClick={() => { closeMenus(); signOut(); }} className="flex items-center gap-3 w-full justify-center py-3 text-lg text-red-400 rounded-md hover:bg-slate-700">
                      <FiLogOut /> Log Out
                    </button>
                </motion.div>
              ) : (
                <motion.div variants={mobileLinkVariants}>
                  <button onClick={() => { closeMenus(); signIn('google'); }} className="w-full text-center py-3 font-semibold text-white bg-sky-500 rounded-lg">
                    Sign In
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};