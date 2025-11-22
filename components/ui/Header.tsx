'use client';

import Link from 'next/link';
import { motion, useScroll } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems: {
  id: string;
  label: string;
  href?: string;
  hiddenOnMobile?: boolean;
}[] = [
  { id: 'about', label: 'About', href: '/about' },
  { id: 'world-experience', label: 'Experience' },
  { id: 'ai-first', label: 'AI First', href: '/ai-first' },
];

interface HeaderProps {
  showAnimation?: boolean;
}

export default function Header({ showAnimation = true }: HeaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [activeSection, setActiveSection] = useState('');
  const [isNameHovered, setIsNameHovered] = useState(false);
  const [hoveredNavItem, setHoveredNavItem] = useState<string | null>(null);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const lastScrollY = useRef(0);
  const scrollPositionRef = useRef(0);
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const isAboutPage = pathname === '/about';

  useEffect(() => {
    // Set active section based on current page
    if (isAboutPage) {
      setActiveSection('about');
      return;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide header when scrolling past threshold
      if (currentScrollY > 300) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      const SHOW_DELAY_MS = 400;
      scrollTimeout.current = setTimeout(() => {
        if (window.scrollY === currentScrollY && currentScrollY > 300) {
          setIsVisible(true);
        }
      }, SHOW_DELAY_MS);

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
  }, [isAboutPage]);

  const scrollToChat = () => {
    document.getElementById('ai-chat')?.scrollIntoView({ behavior: 'smooth' });
  };

  const shouldShow = scrollY.get() < 300 || isVisible;

  return (
    <motion.header
      initial={{ opacity: showAnimation ? 0 : 1, y: showAnimation ? -50 : 0 }}
      animate={{
        y: isAboutPage ? 0 : shouldShow ? 0 : -100,
        opacity: 1,
      }}
      transition={{
        duration: 0.8,
        ease: 'easeOut',
        delay: showAnimation ? 2 : 0,
      }}
      className="fixed inset-x-0 top-0 z-50 bg-secondary/80 backdrop-blur-sm"
    >
      <div className="mx-auto max-w-7xl flex h-16 items-center justify-between px-8">
        {/* Brand/Name */}
        <motion.div
          initial={showAnimation ? { opacity: 0 } : { opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: showAnimation ? 2 : 0 }}
        >
          <Link
            href="/"
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
        </motion.div>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          {navItems.map((item) => (
            <div
              key={item.id}
              className={cn('relative', item.hiddenOnMobile ? 'hidden md:block' : 'block')}
              onMouseEnter={() => setHoveredNavItem(item.id)}
              onMouseLeave={() => setHoveredNavItem(null)}
            >
              <Link
                href={item.href || `#${item.id}`}
                className={cn(
                  'text-xs font-medium tracking-widest uppercase transition-all duration-300',
                  activeSection === item.id
                    ? 'text-secondary-foreground'
                    : 'text-secondary-foreground/70 hover:text-secondary-foreground'
                )}
              >
                {item.label}
              </Link>
              <motion.div
                className="absolute bottom-0 left-0 h-px bg-white"
                initial={{ width: 0 }}
                animate={{
                  width: activeSection === item.id || hoveredNavItem === item.id ? '100%' : 0
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              />
            </div>
          ))}

          <Link href="/contact">
            <Button
              variant="outline"
              className="ml-4 h-auto border border-secondary-foreground/30 px-6 py-2.5 text-xs font-medium tracking-widest uppercase text-secondary-foreground hover:bg-secondary-foreground/10"
            >
              Get Started
            </Button>
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}
