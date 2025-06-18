"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiGithub, FiHeart } from 'react-icons/fi';
import { SiNextdotjs, SiTailwindcss, SiFirebase, SiVercel, SiTypescript } from 'react-icons/si';
import AnimatedDiv from '@/components/AnimatedDiv'; // Assuming you have the animated wrapper from before

// Creator data for easy updates
const creators = [
  {
    name: 'Mahesh Paul',
    githubUsername: 'maheshpaulj',
    avatarUrl: 'https://github.com/maheshpaulj.png',
  },
  {
    name: 'Aryan Sharma',
    githubUsername: 'aryansharma1305', // Replace with actual username
    avatarUrl: 'https://github.com/aryansharma1305.png', // Replace with actual username
  },
];

const techStack = [
    { name: 'Next.js', icon: <SiNextdotjs /> },
    { name: 'TypeScript', icon: <SiTypescript /> },
    { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
    { name: 'Firebase', icon: <SiFirebase /> },
    { name: 'Vercel', icon: <SiVercel /> },
];

export default function AboutPage() {
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
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 pb-4 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-cyan-300">
            Empowering Creatives
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
            Our mission is to give every developer and designer the power to create a stunning, professional online presence—effortlessly and for free.
          </p>
        </AnimatedDiv>

        {/* The "Why" Section */}
        <AnimatedDiv
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto mt-24 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Why We Built This</h2>
          <p className="text-slate-400 leading-relaxed">
            Building a portfolio is often the first step in a developer&apos;s career, but it can also be a time-consuming distraction from what really matters: honing your skills and building great projects. We wanted to bridge that gap. NoCodefolio is a no-code tool that generates clean, production-ready code, giving you a beautiful portfolio you can host anywhere, with full ownership and control.
          </p>
        </AnimatedDiv>

        {/* Meet the Creators Section */}
        <div className="max-w-4xl mx-auto mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">Meet the Creators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {creators.map((creator, index) => (
              <AnimatedDiv
                key={creator.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
              >
                <a
                  href={`https://github.com/${creator.githubUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-slate-800/70 backdrop-blur-sm p-6 rounded-xl border border-slate-700 hover:border-sky-500/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-5">
                    <img src={creator.avatarUrl} alt={creator.name} className="w-20 h-20 rounded-full border-2 border-slate-600 group-hover:border-sky-400 transition-colors" /> {/* eslint-disable-line @next/next/no-img-element*/ }
                    <div>
                      <h3 className="text-2xl font-bold text-white">{creator.name}</h3>
                      <div className="flex items-center gap-2 mt-1 text-sky-400">
                        <FiGithub />
                        <span>@{creator.githubUsername}</span>
                      </div>
                    </div>
                  </div>
                </a>
              </AnimatedDiv>
            ))}
          </div>
        </div>

        {/* Open Source & Contribution Section */}
        <AnimatedDiv
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col items-center justify-center max-w-4xl mx-auto mt-24 text-center bg-slate-800 border border-slate-700 rounded-2xl p-10"
        >
          <FiHeart className="text-sky-400 text-5xl mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">This Project is Open Source</h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-8">
            We believe in the power of community. NoCodefolio is open source, and we welcome contributions of all kinds. The best way to help is by creating and sharing new templates!
          </p>
          <motion.div className='w-64' whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Link 
              href="https://github.com/maheshpaulj/NoCodefolio" // Replace with your actual repo link
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-3 font-semibold text-white bg-slate-700 hover:bg-slate-600 rounded-lg shadow-lg"
            >
              <FiGithub /> Contribute on GitHub
            </Link>
          </motion.div>
        </AnimatedDiv>
        
        {/* Tech Stack */}
         <div className="max-w-4xl mx-auto mt-24">
            <h2 className="text-3xl font-bold text-center mb-8">Built With Modern Tools</h2>
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6">
                {techStack.map(tech => (
                    <div key={tech.name} className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors text-lg">
                        {tech.icon}
                        <span>{tech.name}</span>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}