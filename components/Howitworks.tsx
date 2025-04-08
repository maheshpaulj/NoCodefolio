"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: "Choose a Template",
    description:
      "Pick from stunning, responsive templates crafted for portfolios. Designed to impress, built to perform.",
    icon: "🧩",
  },
  {
    title: "Customize Visually",
    description:
      "Edit content, change colors, and manage sections using our intuitive visual builder — no coding needed.",
    icon: "🎨",
  },
  {
    title: "Launch Instantly",
    description:
      "Deploy with a single click. Get a live URL, share your portfolio, and grow your presence online.",
    icon: "🚀",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = gsap.utils.toArray(".how-card");

    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom top",
        },
      }
    );

    cards.forEach((card: any, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          delay: i * 0.2,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        }
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative mt-[-1px] py-28 px-6 bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white overflow-hidden"
    >
      {/* Blurred blobs for parallax consistency */}
      <div className="absolute w-[500px] h-[500px] bg-yellow-400 rounded-full blur-[150px] opacity-10 top-[-100px] left-[-150px] z-0 animate-pulse-slow" />
      <div className="absolute w-[400px] h-[400px] bg-blue-400 rounded-full blur-[100px] opacity-10 bottom-[-100px] right-[-100px] z-0 animate-pulse-slower" />

      <div className="relative z-10 max-w-6xl mx-auto text-center space-y-6">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight drop-shadow-md">
          How It Works
        </h2>
        <p className="text-lg max-w-2xl mx-auto text-white/80">
          From choosing a template to going live — the entire process is built for simplicity and speed.
        </p>

        {/* Steps */}
        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className="how-card bg-white/40 backdrop-blur-md rounded-3xl shadow-xl hover:shadow-xl transition-transform duration-300 hover:-translate-y-2 px-8 py-12"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {typeof step.icon === "string" ? (
                <img
                  src={step.icon}
                  alt={step.title}
                  className="w-16 h-16 mx-auto mb-6"
                />
              ) : (
                step.icon
              )}
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                {step.title}
              </h3>
              <p className="text-white/70">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
