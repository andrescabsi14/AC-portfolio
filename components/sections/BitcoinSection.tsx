'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function BitcoinSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Coin rotation - flips as you scroll
  const rotateY = useTransform(scrollYProgress, [0, 0.5], [0, 1080]); // 3 full rotations
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1.5, 1.5, 1]);

  // Light flare effect
  const flareOpacity = useTransform(scrollYProgress, [0.5, 0.6, 0.7], [0, 1, 0]);
  const flareScale = useTransform(scrollYProgress, [0.5, 0.7], [0, 3]);

  // Principal Engineer title
  const titleOpacity = useTransform(scrollYProgress, [0.7, 0.85], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.7, 0.85], [50, 0]);

  return (
    <div ref={sectionRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {/* Bitcoin Coin */}
        <div className="relative">
          <motion.div
            style={{
              rotateY,
              scale,
            }}
            className="relative w-64 h-64 md:w-96 md:h-96"
          >
            {/* Coin */}
            <div className="w-full h-full rounded-full bg-gradient-to-br from-orange-400 via-yellow-500 to-orange-600 shadow-2xl shadow-orange-500/50 flex items-center justify-center border-8 border-orange-300">
              <span className="text-9xl">₿</span>
            </div>

            {/* Coin edge effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </motion.div>

          {/* Light Flare */}
          <motion.div
            style={{
              opacity: flareOpacity,
              scale: flareScale,
            }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="w-full h-full rounded-full bg-white/80 blur-3xl" />
          </motion.div>
        </div>

        {/* Principal Engineer Title */}
        <motion.div
          style={{
            opacity: titleOpacity,
            y: titleY,
          }}
          className="absolute bottom-20 left-0 right-0 text-center"
        >
          <h2 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500">
            Principal Engineer
          </h2>
          <p className="text-2xl md:text-3xl text-gray-400 mt-4">
            Building the Future of Finance
          </p>
        </motion.div>
      </div>
    </div>
  );
}
