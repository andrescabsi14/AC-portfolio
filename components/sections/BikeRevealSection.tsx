'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function BikeRevealSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // White point expands to fill screen
  const whitePointScale = useTransform(scrollYProgress, [0, 0.3], [1, 100]);

  // Image reveal
  const imageOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const imageScale = useTransform(scrollYProgress, [0.3, 0.5], [1.2, 1]);

  // Text animations
  const textOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.6, 0.8], [50, 0]);

  return (
    <div ref={sectionRef} className="relative h-[200vh] bg-black">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Expanding white point */}
        <motion.div
          style={{ scale: whitePointScale }}
          className="absolute inset-0 flex items-center justify-center bg-white"
        >
          <div className="w-4 h-4 bg-white rounded-full" />
        </motion.div>

        {/* Bike and Calle 85 Image (Andy Warhol Style) */}
        <motion.div
          style={{
            opacity: imageOpacity,
            scale: imageScale,
          }}
          className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400"
        >
          {/* Placeholder for bike and street facade - will use grid pattern for pop art effect */}
          <div className="w-full h-full relative flex items-center justify-center">
            {/* Pop Art Style Filter */}
            <div className="absolute inset-0 opacity-30 bg-[repeating-linear-gradient(0deg,#000_0px,#000_2px,transparent_2px,transparent_4px),repeating-linear-gradient(90deg,#000_0px,#000_2px,transparent_2px,transparent_4px)]" />

            {/* Bike Silhouette Placeholder */}
            <div className="relative z-10 text-center">
              <div className="w-64 h-64 md:w-96 md:h-96 mx-auto mb-8 bg-black/20 rounded-lg flex items-center justify-center">
                <span className="text-6xl md:text-8xl">🏍️</span>
              </div>
              <div className="text-4xl md:text-6xl font-bold text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                CALLE 85
              </div>
              <div className="text-xl md:text-2xl text-white/80 mt-2">
                BOGOTÁ
              </div>
            </div>
          </div>
        </motion.div>

        {/* Journey Text */}
        <motion.div
          style={{
            opacity: textOpacity,
            y: textY,
          }}
          className="absolute bottom-20 left-0 right-0 text-center px-8 z-20"
        >
          <p className="text-2xl md:text-4xl font-light text-white max-w-4xl mx-auto leading-relaxed">
            My journey started <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">12 years ago</span> in Bogotá, Colombia
          </p>
        </motion.div>
      </div>
    </div>
  );
}
