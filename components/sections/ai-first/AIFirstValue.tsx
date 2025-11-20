'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const automationExamples = [
  'Send analysis reports in minutes instead of days',
  'Trigger automations on purchase confirmation',
  'Handle customer objections intelligently',
  'Integrate with your CRM automatically',
  'Process leads while you sleep',
  'Reduce response time from hours to seconds',
];

export default function AIFirstValue() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center py-32 overflow-hidden"
      style={{ scrollSnapAlign: 'start' }}
    >
      {/* Parallax background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-purple-900/10 to-black"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Imagine the possibilities
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            What if you could automate everything that doesn't need human touch?
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {automationExamples.map((example, index) => (
            <motion.div
              key={example}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="flex items-start gap-3 p-6 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all duration-300">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-blue-400"
                />
                <p className="text-white/80 group-hover:text-white transition-colors">
                  {example}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative p-12 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 overflow-hidden"
        >
          {/* Animated glow effect */}
          <motion.div
            animate={{
              opacity: [0.5, 0.8, 0.5],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl"
          />

          <div className="relative z-10 text-center">
            <p className="text-3xl md:text-4xl font-bold text-white mb-4">
              Save 50% of your time
            </p>
            <p className="text-2xl md:text-3xl text-blue-400 mb-6">
              Save hundreds of thousands in costs
            </p>
            <p className="text-xl text-white/70">
              These aren't promises. They're results from businesses already using AI-first solutions.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
