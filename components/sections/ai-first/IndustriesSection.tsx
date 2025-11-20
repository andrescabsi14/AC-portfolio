'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

const industries = [
  {
    name: 'Lawn Care',
    slug: 'lawn-care',
    icon: '🌱',
    description: 'Automate estimates, schedule services, and handle customer inquiries 24/7',
    benefits: ['Instant quotes', 'Automated scheduling', 'Weather-based notifications'],
    color: 'from-green-500/20 to-emerald-500/20',
    borderColor: 'border-green-500/30',
  },
  {
    name: 'Law Offices',
    slug: 'law-offices',
    icon: '⚖️',
    description: 'Qualify leads, schedule consultations, and manage case intake automatically',
    benefits: ['Lead qualification', 'Case intake automation', 'Client communication'],
    color: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-500/30',
  },
  {
    name: 'Medical Practices',
    slug: 'medical-practices',
    icon: '🏥',
    description: 'Patient scheduling, insurance verification, and pre-visit questionnaires',
    benefits: ['Appointment booking', 'Insurance checks', 'Patient reminders'],
    color: 'from-red-500/20 to-pink-500/20',
    borderColor: 'border-red-500/30',
  },
  {
    name: 'Dental Practices',
    slug: 'dental-practices',
    icon: '🦷',
    description: 'Streamline appointments, treatment plans, and follow-up communications',
    benefits: ['Smart scheduling', 'Treatment explanations', 'Follow-up automation'],
    color: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'border-purple-500/30',
  },
  {
    name: 'Insurance Offices',
    slug: 'insurance-offices',
    icon: '🛡️',
    description: 'Quote generation, policy questions, and claims status updates',
    benefits: ['Instant quotes', 'Policy assistance', 'Claims tracking'],
    color: 'from-yellow-500/20 to-orange-500/20',
    borderColor: 'border-yellow-500/30',
  },
  {
    name: 'Labs & Research',
    slug: 'labs',
    icon: '🔬',
    description: 'Sample tracking, results delivery, and research coordination',
    benefits: ['Sample management', 'Results automation', 'Research coordination'],
    color: 'from-teal-500/20 to-cyan-500/20',
    borderColor: 'border-teal-500/30',
  },
  {
    name: 'Pharma',
    slug: 'pharma',
    icon: '💊',
    description: 'Drug information, prescription management, and patient education',
    benefits: ['Drug information', 'Prescription tracking', 'Patient education'],
    color: 'from-indigo-500/20 to-blue-500/20',
    borderColor: 'border-indigo-500/30',
  },
  {
    name: 'HR & Recruitment',
    slug: 'hr',
    icon: '👥',
    description: 'Candidate screening, interview scheduling, and onboarding automation',
    benefits: ['Resume screening', 'Interview coordination', 'Onboarding flows'],
    color: 'from-pink-500/20 to-rose-500/20',
    borderColor: 'border-pink-500/30',
  },
  {
    name: 'Document Management',
    slug: 'paperwork',
    icon: '📄',
    description: 'Eliminate paper nightmares with intelligent document processing',
    benefits: ['OCR & extraction', 'Smart filing', 'Search & retrieval'],
    color: 'from-gray-500/20 to-slate-500/20',
    borderColor: 'border-gray-500/30',
  },
];

export default function IndustriesSection() {
  return (
    <section
      className="relative min-h-screen py-32"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Your Industry, <span className="text-blue-400">AI-Powered</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            We specialize in small businesses with high-impact, low-hanging-fruit solutions.
            Click any industry to see what's possible.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.slug}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <Link href={`/ai-first/${industry.slug}`}>
                <Card
                  className={`group h-full p-8 bg-gradient-to-br ${industry.color} ${industry.borderColor} border hover:scale-105 transition-all duration-300 cursor-pointer`}
                >
                  <div className="text-5xl mb-4">{industry.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {industry.name}
                  </h3>
                  <p className="text-white/70 mb-4 leading-relaxed">
                    {industry.description}
                  </p>
                  <div className="space-y-2">
                    {industry.benefits.map((benefit) => (
                      <div key={benefit} className="flex items-center gap-2 text-sm text-white/60">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-blue-400 text-sm font-medium group-hover:gap-3 transition-all">
                    <span>See success stories</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-block p-8 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30">
            <p className="text-2xl text-white mb-3">
              Don't see your industry?
            </p>
            <p className="text-white/70 mb-6 max-w-2xl">
              We work with businesses across all sectors. Our AI solutions adapt to your specific needs,
              processes, and goals. Let's discuss how we can transform your business.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('ai-chat')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
            >
              Talk to Our AI Assistant
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
