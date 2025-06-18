import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { getUserPortfolios } from '@/lib/actions';
import Link from 'next/link';
import { FiPlus } from 'react-icons/fi';
import { authOptions } from '@/lib/authOptions';
import PortfolioList from './_components/PortfolioList';
import AnimatedDiv from '@/components/AnimatedDiv'; // <-- Import our new safe wrapper

export default async function MyGenerationsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) { 
    redirect('/api/auth/signin?callbackUrl=/my-generations');
  }

  const portfolios = await getUserPortfolios(session.user.email);

  return (
    <div className="min-h-screen bg-slate-900 text-white py-24">
      <div className="absolute top-0 left-0 w-full h-full bg-grid-slate-700/[0.05] -z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Use the AnimatedDiv wrapper */}
        <AnimatedDiv 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="flex justify-between items-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-slate-200 to-slate-500">
              My Creations
            </h1>
            {/* The animation for the Link can be wrapped too */}
            <AnimatedDiv 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }} 
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Link href="/generate" className="flex items-center gap-2 px-5 py-3 font-semibold text-white bg-sky-500 rounded-lg shadow-lg shadow-sky-500/20 hover:bg-sky-600 transition-all">
                <FiPlus /> Create New
              </Link>
            </AnimatedDiv>
          </div>
        </AnimatedDiv>
        
        {portfolios.length > 0 ? (
          <PortfolioList initialPortfolios={portfolios} />
        ) : (
          <AnimatedDiv 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center py-20 border-2 border-dashed border-slate-700 rounded-xl bg-slate-800/30"
          >
            <h2 className="text-2xl font-semibold text-slate-300">Your canvas is empty!</h2>
            <p className="text-slate-400 mt-2 mb-6">Let&apos;s craft your first stunning portfolio.</p>
            {/* Wrap the final button */}
            <AnimatedDiv whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
              <Link href="/generate" className="px-8 py-3 font-semibold text-white bg-sky-500 rounded-lg shadow-lg shadow-sky-500/20 hover:bg-sky-600 transition-all">
                  Create a New Portfolio
              </Link>
            </AnimatedDiv>
          </AnimatedDiv>
        )}
      </div>
    </div>
  );
}