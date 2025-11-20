'use client';

import { motion } from 'framer-motion';

const automationExamples = [
  'Send analysis reports in minutes instead of days',
  'Trigger automations on purchase confirmation',
  'Handle customer objections intelligently',
  'Integrate with your CRM automatically',
  'Process leads while you sleep',
  'Reduce response time from hours to seconds',
];

export default function AIFirstValue() {

  return (
    <section className="px-6 py-32 bg-black" style={{ scrollSnapAlign: 'start' }}>
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-6"
        >
          <h2 className="text-3xl md:text-5xl font-light text-white">
            Imagine the possibilities
          </h2>
          <p className="text-lg md:text-xl text-white/50 font-light leading-relaxed max-w-3xl mx-auto">
            What if you could automate everything that doesn't need human touch?
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {automationExamples.map((example, index) => (
            <motion.div
              key={example}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="flex items-start gap-3 p-6 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-white/40" />
                <p className="text-white/50 group-hover:text-white/70 font-light transition-colors text-sm">
                  {example}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="relative p-12 rounded-lg bg-white/5 border border-white/10"
        >
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-light text-white mb-3">
              Save 50% of your time
            </p>
            <p className="text-lg md:text-xl text-white/70 font-light mb-6">
              Save hundreds of thousands in costs
            </p>
            <p className="text-white/50 font-light text-sm">
              These aren't promises. They're results from businesses already using AI-first solutions.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
