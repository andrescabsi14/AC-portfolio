'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function DenmarkSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.3], [100, 0]);

  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.2, 1]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <div ref={sectionRef} className="relative h-[200vh] bg-black">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background */}
        <motion.div
          style={{
            scale: imageScale,
            opacity: imageOpacity,
          }}
          className="absolute inset-0 bg-gradient-to-br from-red-900 via-white to-red-900"
        >
          {/* Danish flag colors */}
          <div className="absolute inset-0 opacity-30">
            <div className="w-full h-full bg-[linear-gradient(to_right,#C8102E_35%,white_35%,white_42%,#C8102E_42%),linear-gradient(to_bottom,#C8102E_42%,white_42%,white_58%,#C8102E_58%)]" />
          </div>
        </motion.div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-8 text-center">
          <motion.div
            style={{
              opacity: titleOpacity,
              y: titleY,
            }}
          >
            <h2 className="text-6xl md:text-8xl font-bold text-white mb-12">
              Denmark
            </h2>

            <div className="max-w-5xl mx-auto space-y-8">
              {/* Young Influencer */}
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
              >
                <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-4">
                  Young Influencer
                </div>
                <p className="text-xl text-gray-300">
                  Recognized as a voice for innovation and change
                </p>
              </motion.div>

              {/* DTU University */}
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
              >
                <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400 mb-4">
                  DTU University Recognition
                </div>
                <p className="text-xl text-gray-300">
                  Technical University of Denmark
                </p>
              </motion.div>

              {/* C40 */}
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
              >
                <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 mb-4">
                  C40 World Mayors Summit
                </div>
                <p className="text-xl text-gray-300">
                  Global climate leadership initiative
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-10 right-10 w-32 h-32 border-4 border-white/20 rounded-full"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute bottom-10 left-10 w-24 h-24 border-4 border-white/20 rounded-full"
        />
      </div>
    </div>
  );
}
