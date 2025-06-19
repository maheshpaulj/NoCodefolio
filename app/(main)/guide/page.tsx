import Link from 'next/link';
import { FiCode, FiMousePointer, FiZap, FiArrowRight } from 'react-icons/fi';
import AnimatedDiv from '@/components/AnimatedDiv'; // We'll use our safe animation wrapper

// Data for the step-by-step guide for easy updating
const guideSteps = [
  {
    step: "01",
    title: "Choose Your Canvas",
    description: "Start by selecting a template that matches your style. Whether you prefer a modern, minimal, or creative look, we have a professionally designed foundation ready for you.",
    image: "/assets/guide_01.png"
  },
  {
    step: "02",
    title: "Bring It to Life",
    description: "This is where your vision takes shape. Click on any text to edit it directly. Update images, add your work experience, showcase your skills, and list your projects. The live preview updates instantly.",
    image: "/assets/guide_02.png"
  },
  {
    step: "03",
    title: "Launch Your Story",
    description: "With a single click, deploy your new portfolio to the web via Vercel. Or, download the clean, production-ready source code to host it yourself. The ownership is all yours.",
    image: "/assets/guide_03.png"
  },
];

// Data for the feature highlights
const features = [
  {
    icon: <FiMousePointer />,
    title: "Intuitive Live Editing",
    description: "No more guessing. Edit text, images, and links directly on the page and see your changes in real-time."
  },
  {
    icon: <FiCode />,
    title: "Full Code Ownership",
    description: "We believe in empowerment. Download the complete Next.js and Tailwind CSS source code for your portfolio at any time, for free."
  },
  {
    icon: <FiZap />,
    title: "One-Click Deployment",
    description: "Go from editor to a live, globally-hosted website in seconds with our seamless Vercel integration."
  }
];

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white pt-32 pb-24">
      <div className="absolute top-0 left-0 w-full h-full bg-grid-slate-700/[0.05] -z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* === HERO SECTION WITH VIDEO PLACEHOLDER === */}
        <AnimatedDiv
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 pb-6 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-cyan-300">
            From Zero to Deployed
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-12">
            Follow these simple steps to launch your stunning, professional portfolio in just a few minutes.
          </p>
          
          {/* Video Placeholder */}
          <div className="relative aspect-video max-w-3xl mx-auto bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl shadow-sky-900/20 flex items-center justify-center overflow-hidden">
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
        </AnimatedDiv>

        {/* === STEP-BY-STEP GUIDE === */}
        <div className="max-w-5xl mx-auto mt-28 grid grid-cols-1 md:grid-cols-3 gap-12">
          {guideSteps.map((step, index) => (
            <AnimatedDiv
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="text-center"
            >
              <div className="relative mb-4">
                <span className="text-8xl font-black text-slate-800">{step.step}</span>
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-sky-400">{step.step}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
              <p className="text-slate-400">{step.description}</p>
              
              {/* Image Placeholder */}
              <div className="mt-6 aspect-video w-full bg-slate-800 border border-dashed border-slate-700 rounded-xl">
                <img src={step.image} alt={step.title} className="w-full h-full object-cover rounded-xl" /> {/* eslint-disable-line @next/next/no-img-element*/ }
              </div>
            </AnimatedDiv>
          ))}
        </div>
        
        {/* === FEATURE HIGHLIGHTS === */}
        <AnimatedDiv
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto mt-28 p-10 bg-slate-800/70 backdrop-blur-sm border border-slate-700 rounded-2xl"
        >
          <h2 className="text-3xl font-bold text-center mb-10">No Limits, Just Possibilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-sky-500/10 border-2 border-sky-500/30 text-sky-400 mb-4">
                  <span className="text-3xl">{feature.icon}</span>
                </div>
                <h4 className="text-xl font-semibold text-white mb-1">{feature.title}</h4>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </AnimatedDiv>
        
        {/* === FINAL CALL TO ACTION === */}
        <AnimatedDiv
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center justify-center max-w-4xl mx-auto mt-28 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Ready to Create Yours?</h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            Your next portfolio is just a few clicks away. Start building for free and share your story with the world.
          </p>
          <AnimatedDiv className='w-72' whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Link 
              href="/generate"
              className="inline-flex items-center gap-3 px-10 py-4 font-bold text-lg text-white bg-gradient-to-r from-sky-500 to-cyan-400 rounded-lg shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50 transition-all"
            >
              Start Building Now <FiArrowRight />
            </Link>
          </AnimatedDiv>
        </AnimatedDiv>
      </div>
    </div>
  );
}