'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Card } from '@/components/ui/card';

const features = [
  {
    title: 'Beyond Websites',
    description: 'I don\'t just build websites. I connect artificial intelligence with your systems to transform how you communicate with clients.',
  },
  {
    title: 'Real Service',
    description: 'Your AI agent doesn\'t redirect to FAQs—it provides valuable service, resolves questions, and even handles objections before you meet.',
  },
  {
    title: 'Instant Quotes',
    description: 'Make immediate, accurate quotes automatically. Your AI understands your business and responds in real-time.',
  },
  {
    title: 'Smart Notifications',
    description: 'Get notified when something needs your attention. Your AI knows what matters and when to involve you.',
  },
];

export default function AIFirstVision() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center py-32"
      style={{ scrollSnapAlign: 'start' }}
    >
      <motion.div style={{ opacity, y }} className="max-w-7xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            This is <span className="text-blue-400">not</span> about adding a chatbot
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            It's about fundamentally transforming how your business operates and communicates
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/50 border-white/10 p-8 h-full hover:border-blue-500/30 transition-all duration-300 group">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-2xl md:text-3xl text-white/90 max-w-4xl mx-auto leading-relaxed">
            Sales increase. User satisfaction soars. Your business processes become{' '}
            <span className="text-blue-400 font-semibold">automated magic</span>.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
