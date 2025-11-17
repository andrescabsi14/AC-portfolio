'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function YLAISection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const titleY = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const subtitleY = useTransform(scrollYProgress, [0.3, 0.7], [100, 0]);
  const subtitleOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <div ref={sectionRef} className="relative h-[200vh] bg-black">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {/* Background Image/Gradient */}
        <motion.div
          style={{ scale: bgScale }}
          className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-red-900"
        >
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 text-center px-8">
          <motion.h2
            style={{ y: titleY, opacity: titleOpacity }}
            className="text-7xl md:text-9xl font-bold text-white mb-8"
          >
            YLAI
          </motion.h2>

          <motion.div
            style={{ y: subtitleY, opacity: subtitleOpacity }}
            className="space-y-6"
          >
            <h3 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              Presidential Trip
            </h3>
            <p className="text-2xl md:text-3xl text-gray-300 max-w-3xl mx-auto">
              From Bogotá to Washington
            </p>
            <p className="text-xl md:text-2xl text-gray-400 italic max-w-2xl mx-auto">
              The untold story of what should never happened
            </p>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"
        />
      </div>
    </div>
  );
}
