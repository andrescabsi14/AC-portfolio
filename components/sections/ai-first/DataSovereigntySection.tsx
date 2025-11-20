'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

const dataPoints = [
  {
    title: 'Own Your Data',
    description: 'Keep 100% ownership of your data and knowledge. Don\'t hand it to OpenAI or Google—build AI that learns from YOUR business.',
  },
  {
    title: 'Build Your Moat',
    description: 'Create an asset that grows more valuable every day. Establish competitive advantages years before your competition.',
  },
  {
    title: 'Future-Proof Value',
    description: 'In 10 years, companies will be valued by their proprietary data, not just revenue. Start capturing that value today.',
  },
  {
    title: 'Strategic Independence',
    description: 'Build dependencies you control. Your knowledge becomes your most valuable asset, not someone else\'s training data.',
  },
];

export default function DataSovereigntySection() {
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
            Your Data is Your Future
          </h2>
          <p className="text-lg md:text-xl text-white/50 font-light leading-relaxed max-w-3xl mx-auto">
            In 10 years, companies will be valued by their proprietary data, not their revenue. We teach you to own your intelligence, not give it away.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {dataPoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 border border-white/10 p-8 h-full hover:border-white/20 hover:bg-white/10 transition-all duration-300 group">
                <h3 className="text-xl font-light text-white mb-3 group-hover:text-white/80 transition-colors">
                  {point.title}
                </h3>
                <p className="text-white/50 font-light leading-relaxed text-sm">
                  {point.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-lg md:text-xl text-white/50 font-light leading-relaxed max-w-4xl mx-auto">
            First-mover advantage: Capture value years before your competitors.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
