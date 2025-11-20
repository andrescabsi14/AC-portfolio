"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ServicesOverviewSection() {
  const services = [
    {
      title: "Save Time & Money",
      description: "Automate repetitive tasks and streamline operations to dramatically reduce operational costs and free up your team for strategic work.",
      icon: "⏱️"
    },
    {
      title: "Increase Sales",
      description: "Leverage AI-powered insights and automation to identify opportunities, personalize customer experiences, and close deals faster.",
      icon: "📈"
    },
    {
      title: "Process Optimization",
      description: "Drastically reduce time to process requirements and optimize workflows with intelligent automation tailored to your business.",
      icon: "⚡"
    },
    {
      title: "Competitive Advantage",
      description: "Stay ahead of the competition with custom AI solutions designed specifically for your market and business needs.",
      icon: "🎯"
    }
  ];

  return (
    <section id="services" className="relative min-h-screen flex items-center justify-center px-6 py-24 bg-gradient-to-b from-black via-slate-950 to-black">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Transform Your Business with AI
          </h2>
          <p className="text-xl md:text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed">
            We are an AI integration company providing services for businesses in the{" "}
            <span className="text-white font-semibold">US, Canada, Europe, and Asia</span> to become AI-first.
          </p>
          <p className="text-lg md:text-xl text-white/60 max-w-4xl mx-auto mt-6 leading-relaxed">
            Adopt revolutionary AI technologies into your current systems and channels.
            Solutions specially designed for you to get competitive advantage in your market and stay ahead of the competition.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300"
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-white/70 text-lg leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/ai-first"
            className="inline-block bg-white text-black font-bold text-lg px-10 py-4 rounded-full hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Learn How to Become AI-First →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
