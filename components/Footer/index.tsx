"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        },
      }
    );
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative w-full px-6 py-10 text-white text-center bg-white/5 backdrop-blur-md border-t border-white/10"
    >
      <p className="text-white/80 text-sm md:text-base">
        © {new Date().getFullYear()} Portfolio Builder. All rights reserved.
      </p>

      <div className="mt-3 flex justify-center gap-4 text-white/70 text-sm">
        <a href="#" className="hover:text-yellow-300 transition-colors">
          Privacy Policy
        </a>
        <a href="#" className="hover:text-yellow-300 transition-colors">
          Terms of Service
        </a>
      </div>
      <div className="absolute top-[-80px] right-[-60px] w-72 h-72 bg-yellow-400 opacity-10 blur-[100px] rounded-full -z-10" />
    </footer>
  );
}
