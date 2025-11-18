'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Header() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const { scrollY } = useScroll();

  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.98]);
  const headerBlur = useTransform(scrollY, [0, 100], [8, 16]);
  const headerBorderOpacity = useTransform(scrollY, [0, 100], [0.2, 0.4]);

  useEffect(() => {
    // Check if intro animation has played
    const animated = sessionStorage.getItem('intro-animated');
    if (!animated) {
      sessionStorage.setItem('intro-animated', 'true');
    } else {
      setHasAnimated(true);
    }
  }, []);

  const scrollToChat = () => {
    document.getElementById('ai-chat')?.scrollIntoView({ behavior: 'smooth' });
  };

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
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-7xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-4"
            >
              Andrés Cabrera
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          delay: hasAnimated ? 0 : 3.5,
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
          opacity: { duration: 0.6 }
        }}
        className="fixed top-0 left-0 right-0 z-40 px-4 md:px-8 py-4 md:py-6"
      >
        <motion.div
          style={{
            backdropFilter: useTransform(headerBlur, (v) => `blur(${v}px) saturate(180%)`),
            borderColor: useTransform(headerBorderOpacity, (v) => `rgba(255, 255, 255, ${v})`),
          }}
          className="max-w-7xl mx-auto bg-gradient-to-r from-white/5 via-white/[0.02] to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/50 rounded-full px-6 md:px-8 py-3 md:py-4 flex items-center justify-between relative overflow-hidden"
        >
          {/* Gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 rounded-full" />

          {/* Logo/Name */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: hasAnimated ? 0.1 : 3.7, duration: 0.6 }}
            className="relative text-white font-bold text-lg md:text-xl cursor-pointer bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
          >
            ACabrera
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 relative">
            <motion.a
              href="#projects"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: hasAnimated ? 0.2 : 3.8, duration: 0.5 }}
              className="relative text-white/70 hover:text-white transition-all text-sm font-medium group"
            >
              <span className="relative z-10">Projects</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300" />
            </motion.a>
            <motion.a
              href="#story"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: hasAnimated ? 0.3 : 3.9, duration: 0.5 }}
              className="relative text-white/70 hover:text-white transition-all text-sm font-medium group"
            >
              <span className="relative z-10">My Story</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300" />
            </motion.a>
            <motion.a
              href="#experience"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: hasAnimated ? 0.4 : 4.0, duration: 0.5 }}
              className="relative text-white/70 hover:text-white transition-all text-sm font-medium group"
            >
              <span className="relative z-10">Experience</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300" />
            </motion.a>
          </nav>

          {/* CTA Button */}
          <motion.button
            onClick={scrollToChat}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: hasAnimated ? 0.5 : 4.1, duration: 0.5 }}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 30px rgba(8, 145, 178, 0.6)',
            }}
            whileTap={{ scale: 0.95 }}
            className="relative hidden md:block px-6 py-2.5 bg-gradient-to-r from-cyan-500 via-[#0891b2] to-blue-500 text-white font-semibold rounded-full text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/50 transition-all overflow-hidden group"
          >
            <span className="relative z-10">Let&apos;s Talk</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-[#0891b2] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
        </motion.div>
      </motion.header>
    </>
  );
}
