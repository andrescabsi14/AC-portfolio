'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Card } from '@/components/ui/card';

export default function DataSovereigntySection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.9]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center py-32 overflow-hidden"
      style={{ scrollSnapAlign: 'start' }}
    >
      {/* Dramatic background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/30 to-black" />
        <motion.div
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"
        />
      </div>

      <motion.div style={{ opacity, scale }} className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <div className="px-6 py-3 rounded-full bg-purple-500/10 border border-purple-500/30">
              <p className="text-purple-400 font-semibold tracking-wider uppercase text-sm">
                The Future of Business
              </p>
            </div>
          </motion.div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            Your Data Will Be
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
              Your Most Valuable Asset
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed">
            In 10 years, companies will be valued by their proprietary data, not their revenue.
            <br />
            <span className="text-white font-semibold">You have a choice to make today.</span>
          </p>
        </motion.div>

        {/* Two contrasting cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* The Wrong Way */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-red-900/30 to-slate-900/50 border-red-500/30 p-10 h-full relative overflow-hidden">
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/50">
                <p className="text-red-400 text-xs font-bold uppercase tracking-wider">The Wrong Way</p>
              </div>
              <div className="space-y-6 mt-8">
                <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  Give Your Data Away
                </h3>
                <div className="space-y-4 text-white/70">
                  <p className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">×</span>
                    <span>Send all your customer conversations to OpenAI or Google</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">×</span>
                    <span>Let them train their AI on YOUR proprietary knowledge</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">×</span>
                    <span>Build dependencies you can't control or own</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">×</span>
                    <span>Watch competitors use better AI because they started earlier</span>
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* The Right Way */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-green-900/30 to-slate-900/50 border-green-500/30 p-10 h-full relative overflow-hidden">
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(34, 197, 94, 0.3)',
                    '0 0 40px rgba(34, 197, 94, 0.5)',
                    '0 0 20px rgba(34, 197, 94, 0.3)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="absolute top-4 right-4 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/50"
              >
                <p className="text-green-400 text-xs font-bold uppercase tracking-wider">Our Way</p>
              </motion.div>
              <div className="space-y-6 mt-8">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  Own Your Intelligence
                </h3>
                <div className="space-y-4 text-white/70">
                  <p className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Keep 100% ownership of your data and knowledge</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Build AI that learns from YOUR business, not everyone else's</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Create an asset that grows more valuable every day</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Establish competitive moats years before your competition</span>
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Bottom emphasis */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-block p-10 rounded-2xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-red-500/10 border border-purple-500/30">
            <p className="text-2xl md:text-3xl text-white font-bold mb-4">
              This isn't about AI. It's about ownership.
            </p>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              We teach you to capture, structure, and own your business intelligence.
              <br />
              <span className="text-white font-semibold">
                That knowledge becomes an asset worth more than your revenue in 10 years.
              </span>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
