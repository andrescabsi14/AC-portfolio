'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Industry } from '@/lib/industry-data';

interface IndustryResultsProps {
  industry: Industry;
}

export default function IndustryResults({ industry }: IndustryResultsProps) {
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
            Real <span className="text-green-400">Results</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            These aren't promises. These are actual metrics from businesses using AI-First solutions.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {industry.results.map((result, index) => (
            <motion.div
              key={result.metric}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-green-900/20 to-slate-900/50 border-green-500/20 p-8 text-center h-full hover:border-green-500/40 transition-all duration-300 group">
                <div className="text-5xl font-bold text-green-400 mb-4 group-hover:scale-110 transition-transform">
                  {result.value}
                </div>
                <div className="text-xl font-semibold text-white mb-2">
                  {result.metric}
                </div>
                <div className="text-sm text-white/60">
                  {result.description}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Success Story */}
        {industry.successStory && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className={`bg-gradient-to-br ${industry.color} ${industry.borderColor} border p-12`}>
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-white/60 uppercase tracking-wider">Success Story</div>
                    <div className="text-xl font-semibold text-white">{industry.successStory.company}</div>
                  </div>
                </div>

                <blockquote className="text-2xl md:text-3xl text-white/90 italic mb-8 leading-relaxed">
                  "{industry.successStory.quote}"
                </blockquote>

                <div className="grid md:grid-cols-3 gap-6">
                  {industry.successStory.results.map((result, index) => (
                    <motion.div
                      key={result}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3"
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/30 flex items-center justify-center mt-1">
                        <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-white/80">{result}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </section>
  );
}
