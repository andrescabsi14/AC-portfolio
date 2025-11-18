'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function VideoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const videoOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3], [0.8, 0.4]);

  const titleY = useTransform(scrollYProgress, [0.3, 0.7], [100, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

  const paragraphY = useTransform(scrollYProgress, [0.5, 0.9], [50, 0]);
  const paragraphOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);

  return (
    <div ref={sectionRef} className="relative h-[200vh] bg-black">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Video Background */}
        <motion.div
          style={{ opacity: videoOpacity }}
          className="absolute inset-0"
        >
          {/* Placeholder for video - using gradient animation instead */}
          <div className="w-full h-full bg-gradient-to-br from-purple-900 via-blue-900 to-teal-900">
            <motion.div
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)] bg-[length:50px_50px]"
            />
          </div>
        </motion.div>

        {/* Dark Overlay */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-black"
        />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-8">
          {/* Title sliding up */}
          <motion.h2
            style={{
              y: titleY,
              opacity: titleOpacity,
            }}
            className="text-6xl md:text-8xl font-bold text-white mb-8 text-center"
          >
            2016: <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              AI to Cure Diseases
            </span>
          </motion.h2>

          {/* Paragraph fading in */}
          <motion.p
            style={{
              y: paragraphY,
              opacity: paragraphOpacity,
            }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl text-center leading-relaxed"
          >
            When artificial intelligence was still a distant dream for most, I was already exploring
            how machine learning could revolutionize healthcare and save lives. This was the beginning
            of a journey that would take me across continents and into the heart of innovation.
          </motion.p>
        </div>
      </div>
    </div>
  );
}
