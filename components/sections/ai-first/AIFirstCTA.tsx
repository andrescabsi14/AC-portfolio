'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function AIFirstCTA() {
  const scrollToChat = () => {
    const chatSection = document.querySelector('[data-chat-section]');
    if (chatSection) {
      chatSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback: scroll to interactive section
      window.scrollTo({ top: document.body.scrollHeight * 0.6, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="ai-first-cta"
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
            Ready to Transform Your Business?
          </h2>

          <div className="space-y-6 mb-12 max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed">
              Get access to <span className="text-white font-semibold">Fortune 500-level talent</span> and an international elite team.
            </p>
            <p className="text-xl text-white/70 leading-relaxed">
              We've engineered a program to give select small and medium businesses access to the kind of expertise
              that normally only works with Google, Amazon, and leading tech companies.
            </p>
            <p className="text-xl text-blue-400 font-semibold">
              The window won't stay open forever. Your competitors are moving now.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="inline-block p-8 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/40 backdrop-blur-sm">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Your Complimentary Strategy Session Includes
              </h3>
              <div className="space-y-4 text-left max-w-2xl">
                {[
                  'Deep-dive analysis by elite engineers (not junior staff)',
                  'Custom AI roadmap designed for YOUR business specifically',
                  'Data ownership strategy to protect your competitive moat',
                  'ROI projections based on real implementations',
                  'Everything you need to implement—even with another provider',
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
          >
            <Button
              onClick={scrollToChat}
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-12 py-6 text-lg rounded-xl font-semibold shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/70 transition-all duration-300"
            >
              Start Your Free Analysis Now
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-8 text-white/50 text-sm"
          >
            Available 24/7 • No credit card required • Instant response
          </motion.p>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
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
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
                  {item.stat}
                </div>
                <div className="text-white/70">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <p className="text-xl text-white/60 italic">
            "This is a once-in-a-lifetime opportunity to move forward, to progress into
            a highly efficient and highly prosperous business."
          </p>
          <p className="text-white/80 mt-4 font-medium">— Andrés Cabrera</p>
          <p className="text-white/50 text-sm">
            Presidential Recognition by Barack Obama • YLAI Fellow • AI Pioneer Since 2016
          </p>
        </motion.div>
      </div>
    </section>
  );
}
