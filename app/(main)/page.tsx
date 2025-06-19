"use client";
import type { NextPage } from 'next';
import Link from 'next/link';
import { FiArrowRight, FiLayers, FiZap, FiCloud, FiMail } from 'react-icons/fi';
import { motion } from 'framer-motion';

// Animation variants for easy reuse
const fadeIn = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

const LandingPage: NextPage = () => {
  return (
    <div className="bg-slate-900 text-white font-sans overflow-hidden">
      
      {/* ===== HERO SECTION ===== */}
      <section className="relative pt-40 pb-24 md:pt-48 md:pb-32 text-center">
        <div className="absolute inset-0 bg-grid-slate-700/[0.07]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[120%] bg-gradient-radial from-slate-800/50 via-slate-900 to-slate-900 -z-10"></div>

        <motion.div initial="initial" animate="animate" variants={staggerContainer} className="container mx-auto px-4 relative z-10">
          <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-extrabold mb-4 pb-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 leading-tight">
            Go From Zero to a
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-cyan-300">
              Live Portfolio in Minutes.
            </span>
          </motion.h1>
          <motion.p variants={fadeIn} className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10">
            The quickest way to build and host a stunning, professional portfolio on the internet. No code, no complexity, no cost.
          </motion.p>
          <motion.div variants={fadeIn}>
            <Link href="/generate">
               <motion.button
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="group cursor-pointer inline-flex items-center gap-3 px-8 py-4 font-bold text-lg text-white bg-sky-500 rounded-lg shadow-2xl shadow-sky-500/30 hover:bg-sky-600"
              >
                  Start Building for Free <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </motion.button>
            </Link>
          </motion.div>

          {/* BROWSER MOCKUP */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.4 }}
            className="relative mt-20 mx-auto w-full max-w-5xl"
          >
            <div className="relative bg-slate-800/70 backdrop-blur-xl rounded-xl shadow-2xl shadow-sky-900/50 border border-slate-700 p-2">
              <div className="flex items-center gap-1.5 p-2 border-b border-slate-700">
                <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                <div className="w-3 h-3 rounded-full bg-slate-700"></div>
              </div>
              <div className="aspect-video relative bg-muted">
                <video 
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  src="/assets/demo.mp4"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ===== HOW IT WORKS / VALUE PROPS SECTION ===== */}
      <section className="py-24 bg-slate-800/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">Effortless Process, Professional Results.</h2>
            <p className="text-lg text-slate-400 mt-4">We&apos;ve simplified the entire workflow so you can focus on showcasing your work.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { icon: <FiLayers/>, title: "Pick a Template", description: "Start with a clean, professional design that's fully responsive." },
              { icon: <FiZap/>, title: "Customize Instantly", description: "Click and edit anything you see. Your changes appear live." },
              { icon: <FiCloud/>, title: "Host for Free", description: "Deploy your site to the internet with one click. It's that simple." }
            ].map((step, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, y: -20}}
                viewport={{ once: true, amount: 0.5 }} 
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className="bg-slate-800 p-8 rounded-xl border border-slate-700"
              >
                <div className="text-3xl text-sky-400 mb-4">{step.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-slate-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS SECTION (MOCKUP) ===== */}
      {/* <section className="py-24">
         <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white">Join Creators Who Got Their Portfolios Live in a Day</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: 'Sarah L.', role: 'Frontend Developer', quote: 'This saved me an entire weekend of setup. I went from zero to a deployed, beautiful portfolio in less than an hour.' },
                { name: 'Mike R.', role: 'UX Designer', quote: 'Finally, a builder that gives me code I\'m not ashamed of. The templates are gorgeous and the exported code is pristine.' },
                { name: 'Jessica T.', role: 'Full-Stack Engineer', quote: 'The perfect tool to quickly spin up a professional site when I\'m job searching. It lets me focus on interview prep.' },
              ].map((testimonial, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ delay: i * 0.1 }} className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                  <div className="flex text-amber-400 mb-4">{[...Array(5)].map((_, i) => <FiStar key={i} />)}</div>
                  <p className="text-slate-300 mb-4">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-4 pt-4 border-t border-slate-700">
                    <div className="w-12 h-12 bg-slate-700 rounded-full"></div>
                    <div>
                      <p className="font-bold text-white">{testimonial.name}</p>
                      <p className="text-sm text-slate-400">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
         </div>
      </section> */}

      {/* ===== SHARE YOUR STORY SECTION (MAILTO) ===== */}
      <section className="py-24 bg-slate-800/30">
        <div className="container mx-auto px-4">
          <div className="relative max-w-4xl mx-auto text-center bg-slate-800 border border-slate-700 rounded-2xl p-10 md:p-20 overflow-hidden">
            
            {/* ===== NEW: ANIMATED BACKGROUND ===== */}
            <div className="absolute inset-0 z-10">
              <div className="absolute bg-gradient-to-r from-red-400 via-blue-400 to-indigo-400 opacity-30 blur-3xl w-[100%] h-[100%] animated-gradient" style={{ backgroundSize: '200% 200%' }}></div>
            </div>
            
            {/* Your existing content wrapper, now with z-index to ensure it's on top */}
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Built Something You Love?
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto mb-8">
                We&apos;re a new project and thrive on feedback from our community. If you&apos;ve created a portfolio you&apos;re proud of, we&apos;d be honored to see it and hear your story!
              </p>
              
              <motion.a 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                href="mailto:mahesh.paul.j@gmail.com?subject=My NoCodefolio Creation & Feedback!"
                className="group inline-flex items-center gap-3 px-6 py-3 font-semibold text-white bg-slate-700 hover:bg-slate-600 rounded-lg shadow-lg transition-colors cursor-pointer"
              >
                <FiMail className='transition-transform group-hover:rotate-[-15deg]' /> 
                Share Your Story
              </motion.a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-32 text-center">
        <div className="container mx-auto px-4">
          <div className="relative inline-block">
            <div className="absolute -inset-2 bg-gradient-to-r from-sky-500 to-cyan-400 rounded-full blur-xl opacity-50 animate-pulse-slow"></div>
            <h2 className="relative text-5xl md:text-6xl font-extrabold text-white">Build it. Host it. For Free.</h2>
          </div>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto my-8">
            Your next portfolio is just a few clicks away. Get started now and share your work with the world.
          </p>
          <Link href="/generate">
             <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className="group inline-flex items-center gap-3 px-10 py-5 font-bold text-lg text-white bg-gradient-to-r from-sky-500 to-cyan-400 rounded-lg shadow-2xl shadow-sky-500/30 cursor-pointer"
            >
                Create Your Portfolio Now <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;