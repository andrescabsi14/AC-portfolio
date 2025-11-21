'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { RefObject } from 'react';

interface ScrollIndicatorProps {
  sectionRef: RefObject<HTMLElement | null>;
  label?: string;
  initialDelay?: number;
}

const SCROLL_START_OFFSET = 50;
const SECTION_BOTTOM_OFFSET = 100;
const FOOTER_THRESHOLD = 80;

export default function ScrollIndicator({
  sectionRef,
  label = 'Scroll',
  initialDelay = 0,
}: ScrollIndicatorProps) {
  const [visible, setVisible] = useState(true);
  const [fixed, setFixed] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sectionHeight = sectionRef.current?.offsetHeight ?? 0;

      if (scrollY > SCROLL_START_OFFSET && scrollY < sectionHeight - SECTION_BOTTOM_OFFSET) {
        setVisible(false);
        setFixed(false);
      } else if (scrollY >= sectionHeight - SECTION_BOTTOM_OFFSET) {
        setVisible(true);
        setFixed(true);
      } else {
        setVisible(true);
        setFixed(false);
      }

      const footer = document.querySelector('footer');
      if (footer) {
        const footerTop = footer.getBoundingClientRect().top + window.scrollY;
        const windowBottom = scrollY + window.innerHeight;
        setNearFooter(windowBottom >= footerTop - FOOTER_THRESHOLD);
      } else {
        setNearFooter(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionRef]);

  const handleClick = () => {
    const sectionHeight = sectionRef.current?.offsetHeight ?? 0;
    window.scrollTo({
      top: sectionHeight,
      behavior: 'smooth',
    });
  };

  const opacity = nearFooter ? 0 : visible ? 1 : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity }}
      transition={{ duration: 0.4, delay: initialDelay, ease: 'easeInOut' }}
      className={`${
        fixed
          ? 'fixed bottom-8 left-1/2 -translate-x-1/2'
          : 'absolute bottom-12 left-1/2 -translate-x-1/2'
      } z-30 cursor-pointer`}
      onClick={handleClick}
      aria-label="Scroll to next section"
      role="button"
      style={{ pointerEvents: nearFooter ? 'none' : 'auto' }}
    >
      <motion.div
        animate={{ y: [0, 10, 0], opacity: [0.2, 1, 0.2] }}
        transition={{
          y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
          opacity: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="text-gray-400 text-sm flex flex-col items-center gap-2 hover:text-gray-200 transition-colors"
      >
        <span className="text-xs font-light tracking-widest uppercase">{label}</span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </motion.div>
    </motion.div>
  );
}
