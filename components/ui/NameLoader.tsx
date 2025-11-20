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
  "Code with purpose, design with intention.",
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

    // Complete the animation after 5 seconds
    const timer = setTimeout(() => {
      setIsComplete(true);
      // Call the callback after fade out animation
      setTimeout(() => {
        onLoadingComplete();
      }, 800);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.04,
        duration: 0.4,
        ease: 'easeOut' as const,
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
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900"
      variants={containerVariants}
      initial="hidden"
      animate={isComplete ? 'exit' : 'hidden'}
    >
      <div className="text-center space-y-6">
        {/* First Name */}
        <div className="flex justify-center">
          {firstName.split('').map((letter, i) => (
            <motion.span
              key={`first-${i}`}
              custom={i}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              className="text-6xl md:text-8xl lg:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400"
              style={{
                letterSpacing: '-0.02em',
                textShadow: '0 0 80px rgba(255,255,255,0.1)',
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Last Name */}
        <div className="flex justify-center">
          {lastName.split('').map((letter, i) => (
            <motion.span
              key={`last-${i}`}
              custom={i + firstName.length}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              className="text-6xl md:text-8xl lg:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400"
              style={{
                letterSpacing: '-0.02em',
                textShadow: '0 0 80px rgba(255,255,255,0.1)',
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
          className="text-2xl md:text-3xl lg:text-4xl text-gray-400 font-light max-w-2xl mx-auto px-8 mt-8"
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
