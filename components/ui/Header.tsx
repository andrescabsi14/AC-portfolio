'use client';

import { motion, useScroll } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [currentLocation] = useState('New York');
  const [isVisible, setIsVisible] = useState(true);
  const [activeSection, setActiveSection] = useState('');
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    // Check if intro animation has played
    const animated = sessionStorage.getItem('intro-animated');
    if (!animated) {
      sessionStorage.setItem('intro-animated', 'true');
    } else {
      setHasAnimated(true);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide header when scrolling
      if (currentScrollY > 300) {
        setIsVisible(false);
      }

      // Clear existing timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      // Show header when scroll stops
      scrollTimeout.current = setTimeout(() => {
        if (currentScrollY > 300) {
          setIsVisible(true);
        }
      }, 150);

      lastScrollY.current = currentScrollY;

      // Check which section is in viewport
      const sections = ['world-experience', 'networking', 'recognition'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const isInViewport = rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
          if (isInViewport) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  const scrollToChat = () => {
    document.getElementById('ai-chat')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Show/hide based on scroll position
  const shouldShow = scrollY.get() < 300 || isVisible;

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{
        y: shouldShow ? 0 : -100,
        opacity: scrollY.get() < 250 ? 0 : 1,
      }}
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
      }}
      className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-black/80 border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-3 flex items-center justify-between">
        {/* Logo/Name */}
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

          {/* Location Badge */}
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
            className={`px-4 py-2 text-sm transition-all font-light rounded-lg ${
              activeSection === 'world-experience'
                ? 'text-white font-semibold bg-white/10'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            Experience
          </a>
          <a
            href="#networking"
            className={`hidden md:block px-4 py-2 text-sm transition-all font-light rounded-lg ${
              activeSection === 'networking'
                ? 'text-white font-semibold bg-white/10'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            Networking
          </a>
          <a
            href="#recognition"
            className={`hidden md:block px-4 py-2 text-sm transition-all font-light rounded-lg ${
              activeSection === 'recognition'
                ? 'text-white font-semibold bg-white/10'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            Recognition
          </a>

          {/* CTA Button with shadCN */}
          <Button
            onClick={scrollToChat}
            className="ml-2"
            variant="default"
          >
            Let&apos;s Talk
          </Button>
        </nav>
      </div>
    </motion.header>
  );
}
