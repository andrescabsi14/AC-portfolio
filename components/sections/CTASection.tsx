"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-32 bg-black">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="space-y-16"
        >
          {/* One clear message */}
          <div className="space-y-8">
            <h2 className="text-5xl md:text-7xl font-light text-white leading-tight tracking-tight">
              Start the conversation
            </h2>
            <p className="text-xl md:text-2xl text-white/50 font-light leading-relaxed">
              Transform your business. Gain competitive advantage.
            </p>
          </div>

          {/* Single, clear CTA */}
          <div>
            <Link
              href="/contact"
              className="inline-block text-sm tracking-widest uppercase text-white/70 hover:text-white transition-colors duration-300 border-b border-white/30 hover:border-white pb-1"
            >
              Schedule a consultation →
            </Link>
          </div>

          {/* Minimal footer info */}
          <div className="pt-20">
            <p className="text-white/20 text-xs tracking-wider">
              North America · Europe · Asia
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
