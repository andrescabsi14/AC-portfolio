"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const articleCategories = [
  {
    title: 'Customer Care',
    articles: [
      {
        title: 'Reduce Response Time by 70% in 30 Days',
        href: '/articles/reduce-response-time-30-days',
        problem: 'Slow response times'
      },
      {
        title: 'Scale Support Without Hiring in 90 Days',
        href: '/articles/scale-support-90-days',
        problem: 'Limited resources'
      },
    ]
  },
  {
    title: 'Sales & Growth',
    articles: [
      {
        title: 'Automate Lead Qualification in 2 Weeks',
        href: '/articles/automate-lead-qualification-2-weeks',
        problem: 'Unqualified leads'
      },
      {
        title: 'Increase Conversion Rates by 40% in 60 Days',
        href: '/articles/increase-conversions-60-days',
        problem: 'Low conversions'
      },
    ]
  },
  {
    title: 'Operations',
    articles: [
      {
        title: 'Eliminate Repetitive Tasks in 14 Days',
        href: '/articles/eliminate-repetitive-tasks-14-days',
        problem: 'Manual work'
      },
      {
        title: 'Cut Operational Costs by 50% in 3 Months',
        href: '/articles/cut-costs-3-months',
        problem: 'High costs'
      },
    ]
  },
  {
    title: 'Marketing',
    articles: [
      {
        title: 'Personalize at Scale in 45 Days',
        href: '/articles/personalize-at-scale-45-days',
        problem: 'Generic experiences'
      },
      {
        title: 'Generate Content 10x Faster in 21 Days',
        href: '/articles/content-generation-21-days',
        problem: 'Content bottlenecks'
      },
    ]
  },
  {
    title: 'Data & Insights',
    articles: [
      {
        title: 'Transform Data into Insights in 7 Days',
        href: '/articles/data-insights-7-days',
        problem: 'Data overload'
      },
      {
        title: 'Predict Customer Behavior in 30 Days',
        href: '/articles/predict-behavior-30-days',
        problem: 'Reactive decisions'
      },
    ]
  },
];

export default function AIReadySection() {
  return (
    <section id="ai-ready" className="relative min-h-screen px-6 py-32 bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="space-y-32"
        >
          {/* Header */}
          <div className="text-center space-y-8">
            <h2 className="text-5xl md:text-7xl font-light text-white leading-tight tracking-tight">
              Become AI-ready
            </h2>
            <p className="text-xl md:text-2xl text-white/50 font-light max-w-3xl mx-auto leading-relaxed">
              Practical guides to solve common business challenges with AI. Time-bound results. Industry-specific solutions.
            </p>
          </div>

          {/* Simple divider */}
          <div className="w-full h-px bg-white/10"></div>

          {/* Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {articleCategories.map((category) => (
              <div key={category.title} className="bg-black p-8 md:p-12">
                <h3 className="text-sm uppercase tracking-widest text-white/40 mb-8">
                  {category.title}
                </h3>
                <div className="space-y-6">
                  {category.articles.map((article) => (
                    <Link
                      key={article.href}
                      href={article.href}
                      className="block group"
                    >
                      <p className="text-base font-light text-white/90 group-hover:text-white transition-colors leading-relaxed mb-2">
                        {article.title}
                      </p>
                      <p className="text-xs text-white/30 font-light">
                        {article.problem}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl font-light text-white/60 leading-relaxed">
              Ready to build your AI solution?
            </p>
            <Link
              href="#ai-chat"
              className="inline-block text-sm tracking-widest uppercase text-white/70 hover:text-white transition-colors duration-300 border-b border-white/30 hover:border-white pb-1"
            >
              Start the conversation →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
