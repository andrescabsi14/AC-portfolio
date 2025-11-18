'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface NameLoaderProps {
  onLoadingComplete: () => void;
}

export default function NameLoader({ onLoadingComplete }: NameLoaderProps) {
  const [isComplete, setIsComplete] = useState(false);

  const firstName = 'ANDRES';
  const lastName = 'CABRERA';

  useEffect(() => {
    // Complete the animation after 3.5 seconds
    const timer = setTimeout(() => {
      setIsComplete(true);
      // Call the callback after fade out animation
      setTimeout(() => {
        onLoadingComplete();
      }, 800);
    }, 3500);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      filter: 'blur(10px)',
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
    glow: (i: number) => ({
      textShadow: [
        '0 0 20px rgba(139, 92, 246, 0.3)',
        '0 0 40px rgba(139, 92, 246, 0.6)',
        '0 0 60px rgba(139, 92, 246, 0.4)',
        '0 0 40px rgba(139, 92, 246, 0.6)',
        '0 0 20px rgba(139, 92, 246, 0.3)',
      ],
      transition: {
        delay: i * 0.1 + 0.8,
        duration: 2,
        ease: 'easeInOut' as const,
      },
    }),
  };

  const containerVariants = {
    hidden: { opacity: 1 },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: 'easeInOut' as const,
      },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
      variants={containerVariants}
      initial="hidden"
      animate={isComplete ? 'exit' : 'hidden'}
    >
      <div className="text-center space-y-6">
        {/* First Name */}
        <div className="flex justify-center space-x-2 md:space-x-4">
          {firstName.split('').map((letter, i) => (
            <motion.span
              key={`first-${i}`}
              custom={i}
              variants={letterVariants}
              initial="hidden"
              animate={['visible', 'glow']}
              className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-br from-violet-400 via-purple-300 to-indigo-400"
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontWeight: 700,
                letterSpacing: '0.05em',
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Last Name */}
        <div className="flex justify-center space-x-2 md:space-x-4">
          {lastName.split('').map((letter, i) => (
            <motion.span
              key={`last-${i}`}
              custom={i + firstName.length}
              variants={letterVariants}
              initial="hidden"
              animate={['visible', 'glow']}
              className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-br from-violet-400 via-purple-300 to-indigo-400"
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontWeight: 700,
                letterSpacing: '0.05em',
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Subtle animated line underneath */}
        <motion.div
          className="h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto"
          initial={{ width: 0, opacity: 0 }}
          animate={{
            width: '80%',
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            width: { delay: 1.5, duration: 1.2, ease: 'easeOut' },
            opacity: { delay: 1.5, duration: 2, times: [0, 0.3, 0.7, 1] },
          }}
        />
      </div>
    </motion.div>
  );
}
