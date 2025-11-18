'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Header() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const { scrollY } = useScroll();

  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.95]);
  const headerBlur = useTransform(scrollY, [0, 100], [0, 10]);

  useEffect(() => {
    // Check if intro animation has played
    const animated = sessionStorage.getItem('intro-animated');
    if (!animated) {
      setHasAnimated(false);
      sessionStorage.setItem('intro-animated', 'true');
    } else {
      setHasAnimated(true);
    }
  }, []);

  return (
    <>
      {/* Intro Animation Overlay */}
      {!hasAnimated && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 3, duration: 1 }}
          className="fixed inset-0 bg-black z-[100] flex items-center justify-center pointer-events-none"
        >
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="text-7xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-4"
            >
              Your Name
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
              className="text-2xl md:text-3xl text-gray-400"
            >
              High Tech Founder & Self-Taught Software Engineer
            </motion.p>
          </div>
        </motion.div>
      )}

      {/* Floating Header */}
      <motion.header
        style={{
          opacity: headerOpacity,
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: hasAnimated ? 0 : 3.5, duration: 0.8, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-40 px-4 md:px-8 py-4 md:py-6"
      >
        <motion.div
          style={{
            backdropFilter: useTransform(headerBlur, (v) => `blur(${v}px)`),
          }}
          className="max-w-7xl mx-auto bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/50 rounded-full px-6 md:px-8 py-3 md:py-4 flex items-center justify-between"
        >
          {/* Logo/Name */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-white font-bold text-lg md:text-xl cursor-pointer bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
          >
            Your Name
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <a
              href="#projects"
              className="relative text-white/70 hover:text-white transition-all text-sm font-medium group"
            >
              <span className="relative z-10">Projects</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300" />
            </a>
            <a
              href="#story"
              className="relative text-white/70 hover:text-white transition-all text-sm font-medium group"
            >
              <span className="relative z-10">My Story</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300" />
            </a>
            <a
              href="#experience"
              className="relative text-white/70 hover:text-white transition-all text-sm font-medium group"
            >
              <span className="relative z-10">Experience</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300" />
            </a>
          </nav>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(34, 211, 238, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block px-6 py-2.5 bg-gradient-to-r from-cyan-400 via-blue-400 to-blue-500 text-black font-semibold rounded-full text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/50 transition-shadow"
          >
            Get in Touch
          </motion.button>
        </motion.div>
      </motion.header>
    </>
  );
}
