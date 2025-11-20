"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ServicesOverviewSection() {
  return (
    <section id="services" className="relative min-h-screen flex items-center justify-center px-6 py-32 bg-black">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="text-center space-y-20"
        >
          {/* Main Message */}
          <div className="space-y-8">
            <h2 className="text-5xl md:text-7xl font-light text-white leading-tight tracking-tight">
              AI integration for<br />global enterprises
            </h2>
            <p className="text-xl md:text-2xl text-white/50 font-light max-w-3xl mx-auto leading-relaxed">
              Operating across North America, Europe, and Asia. Building systems that give you competitive advantage.
            </p>
          </div>

          {/* Simple Value Props - No icons, just elegant typography */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10 max-w-4xl mx-auto">
            <div className="bg-black p-12 md:p-16">
              <h3 className="text-2xl md:text-3xl font-light text-white mb-4">Efficiency</h3>
              <p className="text-white/60 font-light leading-relaxed">
                Reduce operational costs. Automate processes. Free your team for strategic work.
              </p>
            </div>
            <div className="bg-black p-12 md:p-16">
              <h3 className="text-2xl md:text-3xl font-light text-white mb-4">Growth</h3>
              <p className="text-white/60 font-light leading-relaxed">
                Increase revenue. Accelerate sales cycles. Identify opportunities faster than competitors.
              </p>
            </div>
            <div className="bg-black p-12 md:p-16">
              <h3 className="text-2xl md:text-3xl font-light text-white mb-4">Intelligence</h3>
              <p className="text-white/60 font-light leading-relaxed">
                Real-time insights. Predictive analytics. Data-driven decisions at every level.
              </p>
            </div>
            <div className="bg-black p-12 md:p-16">
              <h3 className="text-2xl md:text-3xl font-light text-white mb-4">Advantage</h3>
              <p className="text-white/60 font-light leading-relaxed">
                Custom solutions. Market-specific deployment. Stay ahead of your competition.
              </p>
            </div>
          </div>

          {/* Single CTA */}
          <div className="pt-12">
            <Link
              href="/ai-first"
              className="inline-block text-sm tracking-widest uppercase text-white/70 hover:text-white transition-colors duration-300 border-b border-white/30 hover:border-white pb-1"
            >
              Learn more about AI-first transformation →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
