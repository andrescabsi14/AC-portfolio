'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Industry } from '@/lib/industry-data';

interface IndustrySolutionProps {
  industry: Industry;
}

export default function IndustrySolution({ industry }: IndustrySolutionProps) {
  return (
    <section
      className="relative min-h-screen py-32"
      style={{ scrollSnapAlign: 'start' }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/20 to-black" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            AI-Powered <span className="text-blue-400">Solutions</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Transform your business with intelligent automation designed specifically for {industry.name.toLowerCase()}.
          </p>
        </motion.div>

        <div className="space-y-12">
          {industry.solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className={`bg-gradient-to-br ${industry.color} ${industry.borderColor} border p-10 group hover:scale-[1.02] transition-all duration-300`}>
                <div className="grid lg:grid-cols-2 gap-8 items-start">
                  <div>
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-blue-500/20 mb-6">
                      <span className="text-3xl font-bold text-blue-400">{index + 1}</span>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                      {solution.title}
                    </h3>
                    <p className="text-xl text-white/80 leading-relaxed">
                      {solution.description}
                    </p>
                  </div>
                  <div className="space-y-3">
                    {solution.features.map((feature) => (
                      <motion.div
                        key={feature}
                        whileHover={{ x: 10 }}
                        className="flex items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all"
                      >
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/30 flex items-center justify-center">
                          <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-white/90">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
