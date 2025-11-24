'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollIndicator from '@/components/ui/ScrollIndicator';

gsap.registerPlugin(ScrollTrigger);

interface AboutUsIntroSectionProps {
  onIntroAnimationComplete?: () => void;
}

export default function AboutUsIntroSection({ onIntroAnimationComplete }: AboutUsIntroSectionProps) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const nameRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if intro animation has played
    const animated = sessionStorage.getItem('about-us-intro-animated');
    if (animated) {
      setHasAnimated(true);
    }
  }, []);

  useEffect(() => {
    if (hasAnimated || !onIntroAnimationComplete) return;

    const timer = setTimeout(() => {
      setHasAnimated(true);
      onIntroAnimationComplete();
    }, 5000);

    return () => clearTimeout(timer);
  }, [hasAnimated, onIntroAnimationComplete]);

  useEffect(() => {
    if (!nameRef.current || !taglineRef.current || !sectionRef.current) return;

    // GSAP Parallax effect for name (smooth scroll without fade)
    gsap.to(nameRef.current, {
      y: -150,
      scale: 0.9,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom 30%',
        scrub: 1.5,
      },
    });

    // GSAP Parallax effect for tagline (slower movement, no fade)
    gsap.to(taglineRef.current, {
      y: -100,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom 30%',
        scrub: 1,
      },
    });

  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-visible bg-black flex flex-col justify-center" style={{ minHeight: '100vh' }}>
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black z-10" />
        {/* Placeholder for video - will add actual video */}
        <div className="w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-900" />
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center px-6">
        {/* Name with GSAP parallax */}
        <div ref={nameRef} className="text-center mb-8">
          <motion.h1
            initial={hasAnimated ? false : { opacity: 0, y: 50, scale: 0.95 }}
            animate={hasAnimated ? false : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400"
            style={{
              letterSpacing: '-0.02em',
              textShadow: '0 0 70px rgba(255,255,255,0.1)',
            }}
          >
            Andres Cabrera
          </motion.h1>
        </div>

        {/* <span className="aifirst">AI-First</span> Experiences - positioned below name */}
        <div ref={taglineRef} className="text-center">
          <motion.p
            initial={hasAnimated ? false : { opacity: 0, y: 30 }}
            animate={hasAnimated ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 2, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl md:text-2xl lg:text-3xl font-light tracking-[0.3em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-500 drop-shadow-md"
          >
            Where curiosity meets craftsmanship
          </motion.p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator sectionRef={sectionRef} />
    </section>
  );
}
