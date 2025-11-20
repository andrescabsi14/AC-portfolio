'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Industry } from '@/lib/industry-data';
import Link from 'next/link';

interface IndustryCTAProps {
  industry: Industry;
}

export default function IndustryCTA({ industry }: IndustryCTAProps) {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center py-32"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
            Transform Your <span className="text-blue-400">{industry.name}</span> Business
          </h2>

          <div className="space-y-6 mb-12 max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed">
              Get access to an <span className="text-white font-semibold">international elite team</span> that built systems
              for Fortune 500 companies—now available to select {industry.name.toLowerCase()} businesses.
            </p>
            <p className="text-xl text-blue-400 font-semibold">
              Your competitors are moving. Don't get left behind.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="inline-block p-8 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/40 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-6">
                Your Strategy Session Includes:
              </h3>
              <div className="space-y-4 text-left max-w-2xl">
                {[
                  `Deep analysis by engineers who've solved this for ${industry.name.toLowerCase()} at scale`,
                  'Custom AI roadmap with data ownership strategy',
                  'ROI projections based on real implementations',
                  'Competitive advantages specific to your market',
                  'Everything you need—even if you work with someone else',
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/30 flex items-center justify-center mt-1">
                      <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-white/90 text-lg">{item}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Link href="/ai-first#ai-first-cta">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-12 py-6 text-lg rounded-xl font-semibold shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/70 transition-all duration-300"
              >
                Get Your Free Analysis Now
              </Button>
            </Link>

            <p className="text-white/50 text-sm">
              24/7 AI Assistant • No credit card required • Immediate response
            </p>
          </motion.div>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 pt-12 border-t border-white/10"
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { stat: 'Fortune 500', label: 'Level Talent' },
              { stat: 'International', label: 'Elite Team' },
              { stat: 'Since 2016', label: 'AI Pioneer' },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl font-bold text-blue-400 mb-2">
                  {item.stat}
                </div>
                <div className="text-white/70">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
