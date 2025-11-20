'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Industry } from '@/lib/industry-data';

interface IndustryProblemProps {
  industry: Industry;
}

export default function IndustryProblem({ industry }: IndustryProblemProps) {
  return (
    <section
      className="relative min-h-screen flex items-center py-32"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className="max-w-7xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Sound <span className="text-red-400">familiar?</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            These challenges are costing you time, money, and opportunities every single day.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {industry.problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-red-900/20 to-slate-900/50 border-red-500/20 p-8 h-full group hover:border-red-500/40 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                      {problem.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed">
                      {problem.description}
                    </p>
                  </div>
                </div>
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
          <p className="text-2xl text-white/80 max-w-3xl mx-auto">
            But what if there was a better way?
          </p>
        </motion.div>
      </div>
    </section>
  );
}
