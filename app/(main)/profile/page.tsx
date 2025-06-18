'use client';

import { useSession, signOut, signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiLoader, FiLogIn, FiLogOut, FiArrowRight } from 'react-icons/fi';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  // 1. A clean, animated loading state
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <FiLoader className="animate-spin text-sky-400 text-4xl" />
      </div>
    );
  }

  // 2. A user-friendly "unauthenticated" state instead of a jarring redirect
  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center bg-slate-800 border border-slate-700 rounded-xl p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-slate-400 mb-6">You must be signed in to view this page.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => signIn('google', { callbackUrl: '/profile' })}
            className="flex items-center gap-2 mx-auto px-6 py-3 font-semibold text-white bg-sky-500 rounded-lg shadow-lg shadow-sky-500/20 hover:bg-sky-600 transition-all"
          >
            <FiLogIn /> Sign In
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // 3. The main, authenticated profile view
  return (
    <div className="min-h-screen bg-slate-900 pt-32 pb-12">
      {/* Background Grid */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid-slate-700/[0.05] -z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-md mx-auto"
        >
          {/* Main Profile Card */}
          <div className="bg-slate-800/70 backdrop-blur-lg border border-slate-700 rounded-xl shadow-2xl shadow-sky-900/10 overflow-hidden">
            <div className="p-8 flex flex-col items-center text-center">
              {session?.user?.image && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}>
                  <Image
                    src={session.user.image}
                    alt="Profile Picture"
                    width={100}
                    height={100}
                    className="rounded-full border-4 border-slate-700 shadow-lg"
                  />
                </motion.div>
              )}
              <h1 className="text-3xl font-extrabold text-white mt-6">{session?.user?.name}</h1>
              <p className="text-slate-400 mt-1">{session?.user?.email}</p>
            </div>

            {/* Actions Section */}
            <div className="p-6 bg-slate-900/50 border-t border-slate-700 flex flex-col gap-4">
              <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
                <Link 
                  href="/my-generations" 
                  className="group flex items-center justify-between w-full px-5 py-4 text-lg font-semibold text-white bg-gradient-to-r from-sky-500 to-cyan-400 rounded-lg shadow-lg shadow-sky-500/20 hover:shadow-sky-500/30 transition-shadow"
                >
                  My Creations
                  <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => signOut({ callbackUrl: '/' })}
                className="group flex cursor-pointer items-center justify-between w-full px-5 py-3 text-md font-semibold bg-red-500 hover:bg-red-600/80 text-slate-100 hover:text-white rounded-lg transition-colors"
              >
                <span>Sign Out</span>
                <FiLogOut className="text-slate-200 group-hover:text-white transition-colors" />
              </motion.button>
            </div>
          </div>
          
          {/* Optional: A subtle footer or other info */}
          <p className="text-center text-xs text-slate-600 mt-6">
            Signed in as {session?.user?.name}.
          </p>

        </motion.div>
      </div>
    </div>
  );
}