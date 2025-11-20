'use client';

import { motion } from 'framer-motion';
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
            This is not about adding a chatbot
          </h2>
          <p className="text-lg md:text-xl text-white/50 font-light leading-relaxed max-w-3xl mx-auto">
            It's about fundamentally transforming how your business operates and communicates
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 border border-white/10 p-8 h-full hover:border-white/20 hover:bg-white/10 transition-all duration-300 group">
                <h3 className="text-xl font-light text-white mb-3 group-hover:text-white/80 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-white/50 font-light leading-relaxed text-sm">
                  {feature.description}
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
            Sales increase. User satisfaction soars. Your business processes become automated.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
