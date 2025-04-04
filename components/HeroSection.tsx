"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link as ScrollLink } from "react-scroll";  // Importing react-scroll

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const heroRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const blinking = document.querySelectorAll('[data-blink="true"]');
    const buttons = document.querySelectorAll(".hero-button");

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

    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 80%",
          end: "bottom top",
          scrub: true,
        },
      }
    );

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
  }, [isClient]);

  return (
    <section
      ref={heroRef}
      className="relative bg-gradient-to-br from-blue-500 to-teal-500 text-white pt-32 pb-44 px-6 min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-yellow-400 opacity-20 blur-3xl rounded-full animate-pulse-slow z-0" />
      <div className="absolute inset-0 bg-black/30 z-0" />
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-start space-y-6">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-md space-y-2">
          <div>Build Your</div>
          <div>
            <span data-blink="true" className="text-white">
              Portfolio
            </span>
          </div>
          <div>Without Any Coding</div>
        </h1>

        <p className="text-lg text-white/90 max-w-xl leading-relaxed">
          Create, customize, and launch your portfolio effortlessly with our
          user-friendly platform. Choose from stunning templates and showcase
          your work to the world in no time.
        </p>

        <div className="z-10 flex gap-6 flex-wrap">
          <Link href="/generate">
            <Button className="hero-button opacity-100 visible bg-yellow-500 text-black hover:bg-yellow-600 transition duration-300 px-8 py-4 rounded-lg text-xl transform hover:scale-105 shadow-md">
              Get Started
            </Button>
          </Link>
          <ScrollLink
            to="how-it-works" // Scroll to HowItWorks section
            smooth={true}
            duration={800} // Duration for scroll effect
            offset={-70} // Adjust to make it appear at the right position
          >
            <Button className="hero-button opacity-100 visible bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 transition duration-300 px-8 py-4 rounded-lg text-xl transform hover:scale-105">
              Learn More
            </Button>
          </ScrollLink>
        </div>
      </div>
    </section>
  );
}
