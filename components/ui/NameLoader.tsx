'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface NameLoaderProps {
  onLoadingComplete: () => void;
}

const quotes = [
  "Building technology that empowers people and transforms lives.",
  "Innovation is not just about code, it's about impact.",
  "Every line of code is an opportunity to make the world better.",
  "Solving complex problems with elegant, simple solutions.",
  "Technology is the bridge between vision and reality.",
  "Creating experiences that inspire, engage, and empower.",
  "From self-taught to founder—driven by curiosity and purpose.",
  "Building the future, one commit at a time.",
  "Code with purpose, design with intention, ship with pride.",
  "Turning ideas into products that matter.",
];

export default function NameLoader({ onLoadingComplete }: NameLoaderProps) {
  const [isComplete, setIsComplete] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState(quotes[0]);

  const firstName = 'ANDRES';
  const lastName = 'CABRERA';

  useEffect(() => {
    // Set random quote on client-side only
    setSelectedQuote(quotes[Math.floor(Math.random() * quotes.length)]);

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
        '0 0 20px rgba(8, 145, 178, 0.3)',
        '0 0 40px rgba(8, 145, 178, 0.6)',
        '0 0 60px rgba(8, 145, 178, 0.4)',
        '0 0 40px rgba(8, 145, 178, 0.6)',
        '0 0 20px rgba(8, 145, 178, 0.3)',
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
      suppressHydrationWarning
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
              className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 via-cyan-500 to-cyan-600"
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
              className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 via-cyan-500 to-cyan-600"
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
          className="h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto"
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

        {/* Inspiring Quote */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1, ease: 'easeOut' }}
          className="text-sm md:text-base lg:text-lg text-gray-400 font-light max-w-2xl mx-auto px-8 mt-8"
          style={{
            fontWeight: 300,
            letterSpacing: '0.02em',
          }}
        >
          {selectedQuote}
        </motion.p>
      </div>
    </motion.div>
  );
}
