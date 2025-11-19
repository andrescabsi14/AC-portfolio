'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Header() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const { scrollY } = useScroll();

  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.95]);
  const headerBackground = useTransform(
    scrollY,
    [0, 100],
    ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)']
  );

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
              className="text-7xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 mb-4"
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

      {/* Modern Minimalist Header */}
      <motion.header
        style={{
          opacity: headerOpacity,
          backgroundColor: headerBackground,
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          delay: hasAnimated ? 0 : 3.5,
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
          opacity: { duration: 0.6 }
        }}
        className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
          {/* Logo/Name */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: hasAnimated ? 0.1 : 3.7, duration: 0.6 }}
            className="relative"
          >
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all">
                <span className="text-black font-bold text-lg">AC</span>
              </div>
              <div className="hidden md:block">
                <div className="text-white font-semibold text-sm tracking-tight">Andrés Cabrera</div>
                <div className="text-cyan-400 text-xs font-medium">Software Engineer</div>
              </div>
            </a>
          </motion.div>

          {/* Navigation */}
          <nav className="flex items-center gap-1 md:gap-2">
            <motion.a
              href="#projects"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: hasAnimated ? 0.2 : 3.8, duration: 0.5 }}
              className="px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all font-medium"
            >
              Projects
            </motion.a>
            <motion.a
              href="#story"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: hasAnimated ? 0.3 : 3.9, duration: 0.5 }}
              className="px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all font-medium"
            >
              Story
            </motion.a>
            <motion.a
              href="#experience"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: hasAnimated ? 0.4 : 4.0, duration: 0.5 }}
              className="hidden md:block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all font-medium"
            >
              Experience
            </motion.a>

            {/* CTA Button */}
            <motion.button
              onClick={scrollToChat}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: hasAnimated ? 0.5 : 4.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-2 px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/50 transition-all"
            >
              Let&apos;s Talk
            </motion.button>
          </nav>
        </div>
      </motion.header>
    </>
  );
}
