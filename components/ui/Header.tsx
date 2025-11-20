'use client';

import Link from 'next/link';
import { motion, useScroll } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems: {
  id: string;
  label: string;
  hiddenOnMobile?: boolean;
}[] = [
  { id: 'world-experience', label: 'Experience' },
  { id: 'networking', label: 'Networking', hiddenOnMobile: true },
  { id: 'recognition', label: 'Recognition', hiddenOnMobile: true },
];

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [activeSection, setActiveSection] = useState('');
  const [isNameHovered, setIsNameHovered] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const lastScrollY = useRef(0);
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY.current;

      // Show header when scrolling down, hide when scrolling up
      if (currentScrollY > 300) {
        if (isScrollingDown) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      // Auto-hide after 3 seconds of no scroll if scrolled past threshold while scrolling up
      scrollTimeout.current = setTimeout(() => {
        if (currentScrollY > 300 && !isScrollingDown) {
          setIsVisible(false);
        }
      }, 3000);

      const sections = ['world-experience', 'networking', 'recognition'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const isInViewport =
            rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
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
      className="fixed inset-x-0 top-0 z-50 bg-secondary/80 backdrop-blur-sm"
    >
      <div className="mx-auto max-w-7xl flex h-16 items-center justify-between px-8">
        {/* Brand/Name */}
        <Link
          href="#"
          className="flex flex-col items-start py-1 cursor-pointer"
          onMouseEnter={() => setIsNameHovered(true)}
          onMouseLeave={() => setIsNameHovered(false)}
        >
          {/* Andrés */}
          <div className="overflow-hidden h-6">
            <motion.span
              className="text-sm font-medium tracking-widest uppercase leading-none inline-block"
              style={{ letterSpacing: '0.2em' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <span className="text-white">A</span><motion.span initial={{opacity: 0}} animate={{opacity: isNameHovered ? 1: 0}} className="text-gray-300">ndrés</motion.span>
            </motion.span>
          </div>

          <motion.span initial={{width: 20, x: -5}} animate={{width: isNameHovered ? '110%' : 20, x: isNameHovered ? -4 : -5}} transition={{duration: 0.3, ease: 'easeInOut', delay: 0}} className="w-full h-px bg-white my-0.5" />

          {/* Cabrera */}
          <div className="overflow-hidden h-6">
            <motion.span
              className="text-sm font-medium tracking-widest uppercase leading-none inline-block"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <span className="text-white">C</span><motion.span initial={{opacity: 0}} animate={{opacity: isNameHovered ? 1: 0}} transition={{duration: 0.3, ease: 'easeInOut', delay: 0}} className="text-gray-300">abrera</motion.span>
            </motion.span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                'text-xs font-medium tracking-widest uppercase transition-all duration-300',
                item.hiddenOnMobile ? 'hidden md:inline-flex' : 'inline-flex',
                activeSection === item.id
                  ? 'text-secondary-foreground'
                  : 'text-secondary-foreground/70 hover:text-secondary-foreground'
              )}
            >
              {item.label}
            </Link>
          ))}

          <Button
            variant="outline"
            className="ml-4 h-auto border border-secondary-foreground/30 px-6 py-2.5 text-xs font-medium tracking-widest uppercase text-secondary-foreground hover:bg-secondary-foreground/10"
          >
            Contact
          </Button>
        </nav>
      </div>
    </motion.header>
  );
}
