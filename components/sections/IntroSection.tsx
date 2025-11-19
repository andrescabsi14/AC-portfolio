'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

interface IntroSectionProps {
  onNameAnimationComplete?: () => void;
}

export default function IntroSection({ onNameAnimationComplete }: IntroSectionProps) {
  const { scrollY } = useScroll();
  const [hasAnimated, setHasAnimated] = useState(false);

  // Name animation transforms
  const nameScale = useTransform(scrollY, [0, 300], [1, 0.4]);
  const nameY = useTransform(scrollY, [0, 300], [0, -350]);
  const nameX = useTransform(scrollY, [0, 300], [0, -600]);
  const nameOpacity = useTransform(scrollY, [0, 100, 300], [1, 1, 0]);

  // AI first experiences text
  const aiTextOpacity = useTransform(scrollY, [0, 200], [1, 0]);
  const aiTextY = useTransform(scrollY, [0, 200], [0, -100]);

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
    }, 3500);

    return () => clearTimeout(timer);
  }, [hasAnimated, onNameAnimationComplete]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black z-10" />
        {/* Placeholder for video - will add actual video */}
        <div className="w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-900" />
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-6">
        {/* Name with animation to header */}
        <motion.div
          style={{
            scale: nameScale,
            y: nameY,
            x: nameX,
            opacity: nameOpacity,
          }}
          className="absolute"
        >
          <motion.h1
            initial={hasAnimated ? false : { opacity: 0, y: 50, scale: 0.9 }}
            animate={hasAnimated ? false : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-7xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400"
            style={{
              letterSpacing: '-0.02em',
              textShadow: '0 0 80px rgba(255,255,255,0.1)',
            }}
          >
            Andrés Cabrera
          </motion.h1>
        </motion.div>

        {/* AI First Experiences */}
        <motion.div
          style={{
            opacity: aiTextOpacity,
            y: aiTextY,
          }}
          className="mt-64"
        >
          <motion.p
            initial={hasAnimated ? false : { opacity: 0, y: 30 }}
            animate={hasAnimated ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 2, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl md:text-4xl font-light tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-500"
          >
            AI first experiences
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: hasAnimated ? 0 : 3, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-gray-400 text-sm flex flex-col items-center gap-2"
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
