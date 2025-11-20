'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function AIFirstExperience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center py-32"
      style={{ scrollSnapAlign: 'start' }}
    >
      <motion.div style={{ opacity }} className="max-w-7xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            Why am I <span className="text-blue-400">different?</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed">
            I care about your <span className="text-white font-semibold">why</span>.
            I care about your business, why you started it, and keeping that identity and culture.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/50 border-blue-500/20 p-10 h-full">
              <h3 className="text-3xl font-bold text-white mb-6">
                Proven Experience
              </h3>
              <div className="space-y-6 text-white/80">
                <p className="text-lg leading-relaxed">
                  <span className="font-semibold text-white">12+ years</span> working with high-tech companies,
                  including some of the most important companies on the planet.
                </p>
                <p className="text-lg leading-relaxed">
                  Started working with AI in <span className="font-semibold text-white">2016</span>, pioneering
                  predictive medicine using artificial intelligence.
                </p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="pt-6 border-t border-white/10"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-white">Presidential Recognition</p>
                      <p className="text-sm text-white/60">Young Leaders of the Americas Initiative</p>
                    </div>
                  </div>
                  <p className="text-base text-white/70 leading-relaxed">
                    Recognized by <span className="font-semibold text-white">President Barack Obama</span> for
                    pioneering work using AI to treat patients and envision predictive medicine.
                  </p>
                </motion.div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/50 border-purple-500/20 p-10 h-full">
              <h3 className="text-3xl font-bold text-white mb-6">
                My Commitment to You
              </h3>
              <div className="space-y-4">
                {[
                  'Not just a contractor—a long-term technology partner',
                  'Results-based work available—that\'s how confident I am',
                  'Money-back guarantee if you\'re not satisfied',
                  'We care about long-term transformation, not quick sales',
                  'Step-by-step implementation at your pace',
                  'We handle the complexity, you enjoy simplicity',
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-white/80">{item}</p>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex flex-wrap gap-3 justify-center mb-8">
            {['Enterprise Experience', 'AI Pioneer Since 2016', 'Presidential Recognition', 'Small Business Focus'].map(
              (badge) => (
                <Badge
                  key={badge}
                  className="bg-blue-500/10 border-blue-500/30 text-blue-400 px-4 py-2 text-sm"
                >
                  {badge}
                </Badge>
              )
            )}
          </div>
          <p className="text-2xl text-white/70 max-w-3xl mx-auto">
            You don't have to be a huge corporation to access world-class AI technology.
            <br />
            <span className="text-white font-semibold">You just need the courage to take the first step.</span>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
