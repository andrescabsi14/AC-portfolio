'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface IntroSectionProps {
  onNameAnimationComplete?: () => void;
}

export default function IntroSection({ onNameAnimationComplete }: IntroSectionProps) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [scrollIndicatorVisible, setScrollIndicatorVisible] = useState(true);
  const [scrollIndicatorFixed, setScrollIndicatorFixed] = useState(false);
  const nameRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if intro animation has played
    const animated = sessionStorage.getItem('intro-animated');
    if (animated) {
      setHasAnimated(true);
    }
  }, []);

  useEffect(() => {
    if (hasAnimated || !onNameAnimationComplete) return;

    const timer = setTimeout(() => {
      setHasAnimated(true);
      onNameAnimationComplete();
    }, 5000);

    return () => clearTimeout(timer);
  }, [hasAnimated, onNameAnimationComplete]);

  useEffect(() => {
    if (!nameRef.current || !taglineRef.current || !sectionRef.current) return;

    // GSAP Parallax effect for name
    gsap.to(nameRef.current, {
      y: -200,
      opacity: 0.5,
      scale: 0.8,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
      },
    });

    // GSAP Parallax effect for tagline (slower movement)
    gsap.to(taglineRef.current, {
      y: -100,
      opacity: 0,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });

    // Scroll indicator behavior
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sectionHeight = sectionRef.current?.offsetHeight || 0;

      if (scrollY > 50 && scrollY < sectionHeight - 100) {
        // Fade out when scrolling starts
        setScrollIndicatorVisible(false);
        setScrollIndicatorFixed(false);
      } else if (scrollY >= sectionHeight - 100) {
        // Fade in with fixed position after first section
        setScrollIndicatorVisible(true);
        setScrollIndicatorFixed(true);
      } else {
        // Show in original position when at top
        setScrollIndicatorVisible(true);
        setScrollIndicatorFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollIndicatorClick = () => {
    const sectionHeight = sectionRef.current?.offsetHeight || 0;
    window.scrollTo({
      top: sectionHeight,
      behavior: 'smooth',
    });
  };

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-black">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black z-10" />
        {/* Placeholder for video - will add actual video */}
        <div className="w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-900" />
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-6">
        {/* Name with GSAP parallax */}
        <div ref={nameRef} className="text-center mb-8">
          <motion.h1
            initial={hasAnimated ? false : { opacity: 0, y: 50, scale: 0.9 }}
            animate={hasAnimated ? false : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400"
            style={{
              letterSpacing: '-0.02em',
              textShadow: '0 0 80px rgba(255,255,255,0.1)',
            }}
          >
            Andrés Cabrera
          </motion.h1>
        </div>

        {/* AI First Experiences - positioned below name */}
        <div ref={taglineRef} className="text-center max-w-5xl mx-auto">
          <motion.p
            initial={hasAnimated ? false : { opacity: 0, y: 30 }}
            animate={hasAnimated ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 2, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-500 mb-6"
          >
            AI First
          </motion.p>
          <motion.p
            initial={hasAnimated ? false : { opacity: 0, y: 30 }}
            animate={hasAnimated ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 2.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl lg:text-2xl font-light text-gray-400 max-w-3xl mx-auto"
          >
            Transform your business into an AI-first company. Stay ahead of the competition.
          </motion.p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        ref={scrollIndicatorRef}
        initial={{ opacity: 0 }}
        animate={{
          opacity: scrollIndicatorVisible ? 1 : 0,
        }}
        transition={{ duration: 0.5 }}
        className={`${
          scrollIndicatorFixed
            ? 'fixed bottom-8 left-1/2 -translate-x-1/2'
            : 'absolute bottom-12 left-1/2 -translate-x-1/2'
        } z-30 cursor-pointer`}
        onClick={handleScrollIndicatorClick}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-gray-400 text-sm flex flex-col items-center gap-2 hover:text-gray-200 transition-colors"
        >
          <span className="text-xs font-light tracking-widest uppercase">Scroll</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
