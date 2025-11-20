"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ProblemsSection() {
  const problems = [
    {
      situation: "Manual Data Entry & Processing",
      problem: "Your team spends hours each day manually entering data, processing forms, and transferring information between systems.",
      implication: "This doesn't just waste time—it creates bottlenecks, increases errors, and prevents your team from focusing on growth. Meanwhile, your AI-enabled competitors are processing 10x more volume with half the staff.",
      solution: "AI automation can handle these tasks in seconds, with 99.9% accuracy, 24/7."
    },
    {
      situation: "Customer Support Overwhelm",
      problem: "Your support team is drowning in repetitive questions, long response times are frustrating customers, and scaling support means hiring more people.",
      implication: "Poor customer experience leads to churn. In the AI era, customers expect instant, accurate responses. Companies using AI chatbots are delivering superior service at a fraction of the cost—and winning your customers.",
      solution: "AI-powered support systems provide instant, accurate responses while your team handles complex issues that truly need human touch."
    },
    {
      situation: "Slow Decision Making",
      problem: "You're making critical business decisions based on outdated reports, gut feeling, or waiting days for analysis from your team.",
      implication: "By the time you act, the opportunity is gone. AI-first competitors are making data-driven decisions in real-time, adapting to market changes instantly, and capturing opportunities you don't even see yet.",
      solution: "AI analytics provide real-time insights and predictive recommendations, enabling you to make informed decisions instantly."
    },
    {
      situation: "Inefficient Sales & Marketing",
      problem: "Your team is manually qualifying leads, sending generic messages, and struggling to personalize at scale.",
      implication: "You're leaving money on the table. AI-powered competitors are personalizing every interaction, predicting customer needs before they ask, and closing deals faster than you can send a follow-up email.",
      solution: "AI-driven sales and marketing automation personalizes every touchpoint, identifies high-value opportunities, and accelerates your revenue pipeline."
    },
    {
      situation: "Document & Contract Processing",
      problem: "Legal, HR, and finance teams spend countless hours reviewing contracts, extracting information, and ensuring compliance.",
      implication: "This creates massive operational drag. Errors slip through, processing takes weeks instead of hours, and costs pile up. AI-enabled competitors are processing these documents instantly with higher accuracy.",
      solution: "AI document processing extracts, analyzes, and validates information in seconds, ensuring compliance and freeing your team for strategic work."
    }
  ];

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section className="relative min-h-screen px-6 py-24 bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Does This Sound Familiar?
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Every day without AI, you're not just falling behind—you're giving your competitors the advantage they need to overtake you.
          </p>
        </motion.div>

        <div className="space-y-6">
          {problems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300"
            >
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="w-full text-left p-8 focus:outline-none group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-white/90 transition-colors">
                      {item.situation}
                    </h3>
                    <p className="text-white/60 text-lg">{item.problem}</p>
                  </div>
                  <div className="ml-4 text-white/40 text-2xl transform transition-transform duration-300" style={{ transform: expandedIndex === index ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    ↓
                  </div>
                </div>
              </button>

              {expandedIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-8 pb-8"
                >
                  <div className="border-l-4 border-red-500 pl-6 mb-6">
                    <h4 className="text-lg font-bold text-red-400 mb-2">The Real Cost:</h4>
                    <p className="text-white/70 leading-relaxed">{item.implication}</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-6">
                    <h4 className="text-lg font-bold text-green-400 mb-2">Our Solution:</h4>
                    <p className="text-white/70 leading-relaxed">{item.solution}</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-red-950/50 via-slate-900/50 to-red-950/50 border border-red-500/30 rounded-2xl p-10">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Here's the Truth:
            </h3>
            <p className="text-xl text-white/80 leading-relaxed max-w-4xl mx-auto">
              In the era of AI, not adapting doesn't just mean slow growth—it means getting crushed.
              Your competitors are already using AI to work faster, smarter, and cheaper.
              Every day you wait is a day they get further ahead.
            </p>
            <p className="text-2xl text-white font-bold mt-8">
              We're here to make sure that doesn't happen to you.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
