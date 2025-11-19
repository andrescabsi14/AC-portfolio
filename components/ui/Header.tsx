'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Header() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [currentLocation] = useState('New York');
  const { scrollY } = useScroll();

  const headerOpacity = useTransform(scrollY, [250, 350], [0, 1]);
  const headerY = useTransform(scrollY, [250, 350], [-100, 0]);

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
    <motion.header
      style={{
        opacity: headerOpacity,
        y: headerY,
      }}
      className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-black/80 border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-3 flex items-center justify-between">
        {/* Logo/Name - Receives animated name from intro */}
        <div className="flex items-center gap-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative"
          >
            <a href="#" className="flex items-center gap-3 group">
              <div className="text-white font-semibold text-lg tracking-tight">
                Andrés Cabrera
              </div>
            </a>
          </motion.div>

          {/* Mission Impossible Style Location */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-white/5 rounded-md border border-white/10">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-mono text-green-400 uppercase tracking-wider">Live</span>
            </div>
            <div className="w-px h-3 bg-white/20" />
            <div className="flex items-center gap-1.5">
              <svg
                className="w-3 h-3 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-xs font-medium text-gray-300">{currentLocation}</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-1 md:gap-2">
          <a
            href="#world-experience"
            className="px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all font-light"
          >
            Experience
          </a>
          <a
            href="#networking"
            className="hidden md:block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all font-light"
          >
            Networking
          </a>
          <a
            href="#recognition"
            className="hidden md:block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all font-light"
          >
            Recognition
          </a>

          {/* CTA Button */}
          <motion.button
            onClick={scrollToChat}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="ml-2 px-5 py-2 bg-white text-black font-medium rounded-md text-sm hover:bg-gray-100 transition-all"
          >
            Let&apos;s Talk
          </motion.button>
        </nav>
      </div>
    </motion.header>
  );
}
