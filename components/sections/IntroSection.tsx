'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollIndicator from '@/components/ui/ScrollIndicator';
import MembershipSection from './MembershipSection';

gsap.registerPlugin(ScrollTrigger);

interface IntroSectionProps {
  onAnimationComplete?: () => void;
}

export default function IntroSection({ onAnimationComplete }: IntroSectionProps) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const nameRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

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

    // GSAP Parallax effect for tagline (slower movement, no fade)
    gsap.to(taglineRef.current, {
      y: -50, // Reduced movement so text stays more visible
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });

  }, []);

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
        <motion.div
          ref={nameRef}
          className="text-center relative"
          initial={{ marginBottom: hasAnimated ? '4rem' : '2rem' }}
          animate={{ marginBottom: '4rem' }}
          transition={{
            duration: hasAnimated ? 0 : 2.0,
            delay: hasAnimated ? 0 : 4.5,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
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
                animate={hasAnimated ? { opacity: [0, 1, 1] } : { width: '120px' }}
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
        </motion.div>

        {/* <span className="aifirst">AI-First</span> Experiences - positioned below name - stays visible */}
        <motion.div
          ref={taglineRef}
          className="text-center max-w-5xl mx-auto"
          initial={hasAnimated ? { opacity: 1, y: 40 } : { opacity: 0 }}
          animate={{ opacity: 1, y: hasAnimated ? 40 : [0, 40, 40] }}
          transition={{
            duration: hasAnimated ? 0 : 0.4,
            delay: hasAnimated ? 0 : 5,
            ease: 'easeOut',
            y: {
              duration: hasAnimated ? 0 : 2.0,
              delay: hasAnimated ? 0 : 5,
              ease: 'easeOut'
            }
          }}
        >
          <motion.p
            initial={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: hasAnimated ? 0 : 1.2, delay: hasAnimated ? 0 : 5, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-500 mb-6"
          >
            Self-taught Software Engineer & AI Architect.
          </motion.p>
          <motion.p
            initial={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: hasAnimated ? 0 : 1.2, delay: hasAnimated ? 0 : 5.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl lg:text-2xl font-light text-gray-400 max-w-3xl mx-auto"
          >
            Author of <span className="aifirst">AI-First</span>.
            <br />
            <span className="text-sm md:text-base opacity-70 mt-4 block">
              Building intelligent systems for global businesses across 4 continents.
            </span>
          </motion.p>
        </motion.div>
      </div>


      {/* Scroll Indicator */}
      <ScrollIndicator sectionRef={sectionRef} initialDelay={hasAnimated ? 0 : 1.3} />
    </motion.section >
  );
}
