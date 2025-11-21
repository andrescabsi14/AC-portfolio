'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface IntroSectionProps {
  onAnimationComplete?: () => void;
}

export default function IntroSection({ onAnimationComplete }: IntroSectionProps) {
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
    if (hasAnimated || !onAnimationComplete) return;

    // Animation completes after header appears (4.3s delay + 0.5s duration + 0.2s buffer)
    const timer = setTimeout(() => {
      setHasAnimated(true);
      onAnimationComplete();
    }, 5000);

    return () => clearTimeout(timer);
  }, [hasAnimated, onAnimationComplete]);

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
    <motion.section
      ref={sectionRef}
      className="relative h-screen min-h-screen w-full overflow-hidden bg-black"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black z-10" />
        {/* Placeholder for video - will add actual video */}
        <div className="w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-900" />
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-6">
        {/* Name with GSAP parallax - Grouped A|C and full name container */}
        <div ref={nameRef} className="text-center mb-8 relative">
          {/* Grouped animation container for A|C and full name overlap */}
          <motion.div className="relative h-0">
            {/* Phase 2: Full Andrés Cabrera name - overlaps A|C position with floating */}
            <motion.h1
              initial={hasAnimated ? false : { opacity: 0, scale: 0.9, y: 0 }}
              animate={hasAnimated ? false : {
                opacity: [0, 0, 1],
                y: [0, 0, -20],
              }}
              transition={{
                opacity: {
                  duration: 0.8,
                  delay: 4,
                  ease: 'easeOut'
                },
                y: {
                  duration: 2.0,
                  delay: 2.5,
                  ease: 'easeOut'
                }
              }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 absolute left-1/2 -translate-x-1/2 whitespace-nowrap"
              style={{
                letterSpacing: '-0.02em',
                textShadow: '0 0 80px rgba(255,255,255,0.1)',
              }}
            >
              Andrés Cabrera
            </motion.h1>
            {/* Phase 1: Centered A, line, and C vertically stacked - static position */}
            <motion.div
              initial={hasAnimated ? false : { opacity: 1 }}
              animate={hasAnimated ? false : { opacity: 0 }}
              transition={{ duration: 0.4, delay: 3.5, ease: 'easeInOut' }}
              className="flex flex-col items-center justify-center gap-0"
            >
              {/* A */}
              <motion.span
                className="text-8xl md:text-9xl lg:text-9xl font-bold text-white leading-none"
                initial={hasAnimated ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
                animate={hasAnimated ? { opacity: 0, scale: 1 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 2.3, ease: 'easeOut' }}
                style={{
                  letterSpacing: '-0.02em',
                  textShadow: '0 0 80px rgba(255,255,255,0.2)',
                }}
              >
                A
              </motion.span>

              {/* Line - grows from left to right */}
              <motion.div
                className="h-1 bg-gradient-to-r from-white via-white to-gray-400 my-4"
                initial={hasAnimated ? false : { width: 0 }}
                animate={hasAnimated ? { opacity: [0,1,1] } : { width: '120px' }}
                transition={{ duration: 0.8, delay: 1.0, ease: 'easeInOut' }}
              />

              {/* C */}
              <motion.span
                className="text-8xl md:text-9xl lg:text-9xl font-bold text-white leading-none"
                initial={hasAnimated ? false : { opacity: 0, scale: 0.8 }}
                animate={hasAnimated ? { opacity: 0, scale: 1 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 2.5, ease: 'easeOut' }}
                style={{
                  letterSpacing: '-0.02em',
                  textShadow: '0 0 80px rgba(255,255,255,0.2)',
                }}
              >
                C
              </motion.span>
            </motion.div>


          </motion.div>
        </div>

        {/* AI First Experiences - positioned below name - stays visible */}
        <motion.div
          ref={taglineRef}
          className="text-center max-w-5xl mx-auto"
          initial={hasAnimated ? false : { opacity: 0 }}
          animate={hasAnimated ? false : { opacity: 1, y: [0, 40, 40], }}
          transition={{ duration: 0.4, delay: 5, ease: 'easeOut', y: {
                    duration: 2.0,
                    delay: 5,
                    ease: 'easeOut'
                  } }}
        >
          <motion.p
            initial={hasAnimated ? false : { opacity: 0, y: 30 }}
            animate={hasAnimated ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 5, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-500 mb-6"
          >
            AI First
          </motion.p>
          <motion.p
            initial={hasAnimated ? false : { opacity: 0, y: 30 }}
            animate={hasAnimated ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 5.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl lg:text-2xl font-light text-gray-400 max-w-3xl mx-auto"
          >
            Transform your business into an AI-first company. Stay ahead of the competition.
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        ref={scrollIndicatorRef}
        initial={{ opacity: 1 }}
        animate={{
          opacity: hasAnimated ? 1 : (scrollIndicatorVisible ? 1 : 0),
        }}
        transition={{ duration: 0.4, delay: hasAnimated ? 0 : 1.3, ease: 'easeInOut' }}
        className={`${
          scrollIndicatorFixed
            ? 'fixed bottom-8 left-1/2 -translate-x-1/2'
            : 'absolute bottom-12 left-1/2 -translate-x-1/2'
        } z-30 cursor-pointer`}
        onClick={handleScrollIndicatorClick}
      >
        <motion.div
          animate={{ y: [0, 10, 0], opacity: [0, 1] }}
          transition={{
            y: { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 4 },
            opacity: { duration: 2, delay: 4, ease: 'easeInOut' }
          }}
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
    </motion.section>
  );
}
