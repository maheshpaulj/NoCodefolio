"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link as ScrollLink } from "react-scroll";
import { Typewriter } from "react-simple-typewriter";



gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const heroRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (!isClient) return;
  
    const blinking = document.querySelectorAll('[data-blink="true"]');
    const buttons = document.querySelectorAll(".hero-button");
  
    // Blinking animation
    if (blinking.length > 0) {
      gsap.to(blinking, {
        color: "#facc15",
        duration: 0.3,
        stagger: {
          each: 0.05,
          repeat: -1,
          yoyo: true,
        },
        ease: "power2.inOut",
      });
    }
  
    // Hero fade-in
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
      }
    );
  
    // Buttons fade-in
    if (buttons.length > 0) {
      gsap.from(buttons, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power2.out",
        delay: 1.2,
        stagger: 0.2,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 80%",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  
    // ✅ Parallax Blobs animation (moved here inside isClient check)
    gsap.utils.toArray(".parallax-blob").forEach((el: any, i) => {
      gsap.to(el, {
        y: i % 2 === 0 ? 60 : -60,
        scrollTrigger: {
          trigger: heroRef.current,
          scrub: true,
          start: "top bottom",
          end: "bottom top",
        },
        ease: "power2.out",
      });
    });
  
  }, [isClient]);
  
  

  return (
    <section
      ref={heroRef}
      className="relative bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white pt-36 pb-52 px-6 min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute w-[600px] h-[600px] bg-pink-500 rounded-full blur-[160px] opacity-30 top-[-200px] left-[-150px] z-0 animate-pulse-slow" />
      <div className="absolute w-[400px] h-[400px] bg-blue-400 rounded-full blur-[120px] opacity-20 bottom-[-100px] right-[-100px] z-0 animate-pulse-slower" />
      <div className="absolute inset-0 bg-black/20 z-0 backdrop-blur-sm" />
      <div className="relative z-10 w-full max-w-5xl text-center space-y-8">
      <h1 className="text-5xl md:text-6xl font-bold leading-tight space-y-1 fade-up">
  <div>Build Your</div>
  <div>
    <span className="text-yellow-400">
      <Typewriter
        words={[
          "Portfolio ✨",
          "Design Site 🎨",
          "Freelancer Page 🚀",
        ]}
        loop={true}
        cursor
        cursorStyle="|"
        typeSpeed={80}
        deleteSpeed={50}
        delaySpeed={2000}
      />
    </span>
  </div>
  <div>Without Any Coding</div>
</h1>


        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto fade-up">
          Select a template, customize it visually, and launch your site in
          minutes. Whether you're a designer, developer, or freelancer — we've got you.
        </p>

        <div className="flex justify-center gap-6 flex-wrap mt-6 fade-up">
          <Link href="/generate">
          <Button className="relative group bg-yellow-400 text-black px-8 py-4 rounded-xl text-lg font-semibold shadow-lg transition-transform duration-300 hover:scale-105 overflow-hidden">
  <span className="relative z-10">Get Started</span>
  <span className="absolute inset-0 bg-yellow-300 blur-xl opacity-0 group-hover:opacity-40 transition-all duration-500 rounded-xl"></span>
</Button>

          </Link>

          <ScrollLink
            to="how-it-works"
            smooth={true}
            duration={800}
            offset={-70}
          >
            <Button className="hero-button bg-white/10 border border-white/30 text-white hover:bg-white/20 backdrop-blur-md px-8 py-4 rounded-xl text-lg transition-all duration-300 hover:scale-105 shadow-md">
              Learn More
            </Button>
          </ScrollLink>
        </div>
      </div>
<div className="absolute parallax-blob w-80 h-80 bg-purple-500 opacity-10 blur-[120px] top-[10%] left-[10%] rounded-full z-0" />
<div className="absolute parallax-blob w-72 h-72 bg-cyan-400 opacity-10 blur-[100px] bottom-[15%] right-[15%] rounded-full z-0" />

    </section>
  );
}
