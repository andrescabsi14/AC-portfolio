'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Stage {
  id: string;
  title: string;
  description: string;
  backgroundPosition: string;
  buildingColor: string;
  accentColor: string;
}

const stages: Stage[] = [
  {
    id: 'stage1',
    title: 'Arrival in New York',
    description: 'The city that never sleeps welcomed me with endless possibilities. From the streets of DUMBO to the skyline of Manhattan, every corner held a new opportunity.',
    backgroundPosition: 'left',
    buildingColor: 'from-blue-900 to-blue-600',
    accentColor: 'from-cyan-400 to-blue-500',
  },
  {
    id: 'stage2',
    title: 'Building the Future',
    description: 'In the heart of the financial district, I helped build the technologies that would shape tomorrow. Each line of code was a step toward revolutionizing how we think about money and trust.',
    backgroundPosition: 'center',
    buildingColor: 'from-purple-900 to-purple-600',
    accentColor: 'from-purple-400 to-pink-500',
  },
  {
    id: 'stage3',
    title: 'Innovation & Leadership',
    description: 'Leading teams, mentoring developers, and pushing the boundaries of what\'s possible. New York taught me that with determination and the right mindset, there are no limits.',
    backgroundPosition: 'right',
    buildingColor: 'from-orange-900 to-orange-600',
    accentColor: 'from-orange-400 to-red-500',
  },
];

export default function NYCParallaxScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Divide scroll into 3 stages
  // Stage 1: 0-0.33, Stage 2: 0.33-0.66, Stage 3: 0.66-1.0
  const currentStage = useTransform(scrollYProgress, (latest) => {
    if (latest < 0.33) return 0;
    if (latest < 0.66) return 1;
    return 2;
  });

  // Cloud parallax (slowest)
  const cloudY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const cloudOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 0.6, 0.6, 0.3]);

  // Background buildings (slow)
  const bgBuildingsY = useTransform(scrollYProgress, [0, 1], [0, 400]);

  // Middle buildings (medium speed)
  const midBuildingsY = useTransform(scrollYProgress, [0, 1], [0, 600]);

  // Foreground buildings (fast)
  const fgBuildingsY = useTransform(scrollYProgress, [0, 1], [0, 800]);

  // Stage transitions
  const stage1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.25, 0.33], [1, 1, 0.3, 0]);
  const stage2Opacity = useTransform(scrollYProgress, [0.25, 0.33, 0.58, 0.66], [0, 1, 1, 0]);
  const stage3Opacity = useTransform(scrollYProgress, [0.58, 0.66, 1], [0, 1, 1]);

  // Color transitions
  const skyColor = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    ['#0a0e27', '#1a0a2e', '#2d1b00', '#0a0e27']
  );

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-black">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Animated Sky Background */}
        <motion.div
          style={{ backgroundColor: skyColor }}
          className="absolute inset-0 transition-colors duration-1000"
        />

        {/* Layer 1: Clouds (Background) */}
        <motion.div
          style={{
            y: cloudY,
            opacity: cloudOpacity,
          }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="relative w-full h-full">
            <motion.div
              animate={{ x: [0, 100, 0] }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              className="absolute top-20 left-10 w-64 h-32 bg-white/5 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ x: [0, -80, 0] }}
              transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
              className="absolute top-40 right-20 w-96 h-40 bg-white/5 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ x: [0, 60, 0] }}
              transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
              className="absolute top-60 left-1/3 w-80 h-36 bg-white/5 rounded-full blur-3xl"
            />
          </div>
        </motion.div>

        {/* Layer 2: Background Buildings */}
        <motion.div
          style={{ y: bgBuildingsY }}
          className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none"
        >
          <div className="relative w-full h-full flex items-end justify-center gap-4 px-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={`bg-${i}`}
                className="bg-gradient-to-t from-blue-900/40 to-blue-800/20 rounded-t-lg backdrop-blur-sm"
                style={{
                  width: `${60 + Math.random() * 40}px`,
                  height: `${30 + Math.random() * 40}%`,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Layer 3: Middle Buildings */}
        <motion.div
          style={{ y: midBuildingsY }}
          className="absolute bottom-0 left-0 right-0 h-2/3 pointer-events-none"
        >
          <div className="relative w-full h-full flex items-end justify-center gap-6 px-12">
            {[...Array(6)].map((_, i) => (
              <div
                key={`mid-${i}`}
                className="bg-gradient-to-t from-purple-900/50 to-purple-800/30 rounded-t-lg backdrop-blur-sm border-t border-purple-500/20"
                style={{
                  width: `${80 + Math.random() * 60}px`,
                  height: `${40 + Math.random() * 50}%`,
                }}
              >
                {/* Windows */}
                <div className="grid grid-cols-3 gap-1 p-2 pt-4">
                  {[...Array(12)].map((_, j) => (
                    <div
                      key={j}
                      className="w-2 h-2 bg-yellow-200/30 rounded-sm"
                      style={{
                        opacity: Math.random() > 0.3 ? 0.6 : 0.2,
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Layer 4: Foreground Buildings & Landmarks */}
        <motion.div
          style={{ y: fgBuildingsY }}
          className="absolute bottom-0 left-0 right-0 h-3/4 pointer-events-none"
        >
          <div className="relative w-full h-full flex items-end justify-center gap-8 px-16">
            {/* DUMBO Bridge representation */}
            <div className="absolute bottom-1/4 left-1/4 w-64 h-1 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />

            {/* Foreground buildings */}
            {[...Array(5)].map((_, i) => (
              <div
                key={`fg-${i}`}
                className="bg-gradient-to-t from-gray-900 to-gray-800 rounded-t-lg border-t-2 border-orange-500/30"
                style={{
                  width: `${100 + Math.random() * 80}px`,
                  height: `${50 + Math.random() * 60}%`,
                }}
              >
                {/* Detailed windows */}
                <div className="grid grid-cols-4 gap-1 p-3 pt-6">
                  {[...Array(32)].map((_, j) => (
                    <div
                      key={j}
                      className="w-3 h-3 bg-yellow-300/40 rounded-sm"
                      style={{
                        opacity: Math.random() > 0.2 ? 0.8 : 0.1,
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stage Content Overlays */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Stage 1 */}
          <motion.div
            style={{ opacity: stage1Opacity }}
            className="absolute inset-0 flex items-center justify-center px-8"
          >
            <div className="max-w-4xl text-center">
              <h2 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-8">
                {stages[0].title}
              </h2>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                {stages[0].description}
              </p>
            </div>
          </motion.div>

          {/* Stage 2 */}
          <motion.div
            style={{ opacity: stage2Opacity }}
            className="absolute inset-0 flex items-center justify-center px-8"
          >
            <div className="max-w-4xl text-center">
              <h2 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-8">
                {stages[1].title}
              </h2>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                {stages[1].description}
              </p>
            </div>
          </motion.div>

          {/* Stage 3 */}
          <motion.div
            style={{ opacity: stage3Opacity }}
            className="absolute inset-0 flex items-center justify-center px-8"
          >
            <div className="max-w-4xl text-center">
              <h2 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 mb-8">
                {stages[2].title}
              </h2>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                {stages[2].description}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Scroll Progress Indicator */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 pointer-events-none">
          {stages.map((stage, index) => (
            <motion.div
              key={stage.id}
              className="w-2 h-16 bg-white/20 rounded-full overflow-hidden"
            >
              <motion.div
                style={{
                  height: useTransform(
                    scrollYProgress,
                    [index * 0.33, (index + 1) * 0.33],
                    ['0%', '100%']
                  ),
                }}
                className="w-full bg-gradient-to-b from-cyan-400 to-purple-500"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
