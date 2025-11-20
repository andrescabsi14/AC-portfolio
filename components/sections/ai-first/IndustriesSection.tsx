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
    <section className="px-6 py-32 bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="text-center mb-20 space-y-6"
        >
          <h2 className="text-3xl md:text-5xl font-light text-white">
            Transformation across industries
          </h2>
          <p className="text-lg md:text-xl text-white/50 font-light leading-relaxed max-w-3xl mx-auto">
            Whether you're in healthcare, legal services, or skilled trades—AI operates the same way. We've refined our approach across industries.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10 mb-16">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.slug}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <Link href={`/ai-first/${industry.slug}`}>
                <Card className="group h-full overflow-hidden bg-black border-0 hover:bg-white/5 transition-all duration-300 cursor-pointer flex flex-col">
                  {/* Background image area with gradient overlay */}
                  <div className="relative h-40 bg-white/5 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-xl font-light text-white mb-3 group-hover:text-white/80 transition-colors">
                      {industry.name}
                    </h3>
                    <p className="text-white/50 mb-6 font-light leading-relaxed text-sm">
                      {industry.description}
                    </p>
                    <div className="space-y-2 mb-6">
                      {industry.benefits.map((benefit) => (
                        <div key={benefit} className="flex items-center gap-2 text-xs text-white/40">
                          <div className="w-1 h-1 rounded-full bg-white/40" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-auto flex items-center gap-1 text-white/50 text-xs font-light group-hover:text-white/70 transition-all">
                      <span>Learn more</span>
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Card>
              </Link>
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
          <div className="max-w-3xl mx-auto p-12 rounded-lg bg-white/5 border border-white/10">
            <h3 className="text-2xl md:text-3xl font-light text-white mb-4">
              Don't see your industry?
            </h3>
            <p className="text-white/50 font-light leading-relaxed mb-6">
              Our approach works across all sectors. If your industry isn't listed, we can still help you leverage AI for operational transformation.
            </p>
            <Link
              href="/contact"
              className="inline-block tracking-widest uppercase text-white/70 hover:text-white transition-colors duration-300 border-b border-white/30 hover:border-white pb-1 text-sm"
            >
              Schedule consultation
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
