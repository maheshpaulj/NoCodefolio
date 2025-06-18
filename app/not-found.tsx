import Link from 'next/link';
import { FiHome, FiArrowRight } from 'react-icons/fi';
import AnimatedDiv from '@/components/AnimatedDiv'; // Use our safe animation wrapper
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function NotFoundPage() {
  return (
    <>
    <Navbar />
    <div className="h-screen bg-slate-900 text-white flex items-center justify-center">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-slate-700/[0.05] -z-0"></div>
      
      {/* Spotlight Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-sky-500/10 via-sky-500/5 to-transparent -z-10 blur-3xl pointer-events-none"></div>

      <AnimatedDiv
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 text-center"
        >
        {/* The Glitchy 404 Text */}
        <h1 
          className="relative inline-block text-9xl md:text-[180px] font-black text-white leading-none tracking-tighter"
          >
          <span className="relative block">
            <span className="absolute inset-0 text-sky-400 blur-sm">404</span>
            <span className="relative">404</span>
          </span>
          <span className="absolute inset-0 text-red-500/80 mix-blend-screen animate-glitch" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 30%, 0 30%)' }}>404</span>
          <span className="absolute inset-0 text-sky-400/80 mix-blend-screen animate-glitch" style={{ clipPath: 'polygon(0 70%, 100% 70%, 100% 100%, 0 100%)', animationDelay: '0.05s', animationDirection: 'reverse' }}>404</span>
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-bold text-white mt-8">
          Lost in the Code
        </h2>
        <p className="text-lg text-slate-400 mt-2 max-w-md mx-auto">
          It seems you&apos;ve found a glitch in the matrix. The page you&apos;re looking for might have been moved, deleted, or never existed.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <AnimatedDiv whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Link
              href="/"
              className="inline-flex items-center gap-3 px-8 py-4 font-bold text-lg text-slate-900 bg-white rounded-lg shadow-lg hover:bg-slate-200 transition-all"
              >
              <FiHome /> Go Back Home
            </Link>
          </AnimatedDiv>
          
          <AnimatedDiv whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Link
              href="/my-creations"
              className="group inline-flex items-center gap-3 px-6 py-3 font-semibold text-white/80 hover:text-white transition-colors"
              >
              View My Creations <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </AnimatedDiv>
        </div>
      </AnimatedDiv>
    </div>
    <Footer />
    </>
  );
}