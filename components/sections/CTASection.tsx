"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center px-6 py-24 bg-gradient-to-b from-slate-950 via-black to-black">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
            Ready to Stay Ahead of the Competition?
          </h2>

          <p className="text-xl md:text-2xl text-white/70 mb-12 leading-relaxed">
            Don't let your competitors crush you with AI. Let's transform your business together.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link
              href="/contact"
              className="bg-white text-black font-bold text-lg px-12 py-5 rounded-full hover:bg-white/90 transition-all duration-300 shadow-2xl hover:shadow-white/20 hover:scale-105"
            >
              Get Started Now
            </Link>

            <Link
              href="/ai-first"
              className="bg-transparent border-2 border-white text-white font-bold text-lg px-12 py-5 rounded-full hover:bg-white hover:text-black transition-all duration-300 shadow-xl hover:scale-105"
            >
              Learn More
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="border-t border-white/10 pt-12 mt-12"
          >
            <p className="text-white/50 text-sm mb-6">
              Trusted by businesses across
            </p>
            <div className="flex justify-center items-center gap-8 flex-wrap text-white/70 font-semibold text-lg">
              <span>🇺🇸 United States</span>
              <span>•</span>
              <span>🇨🇦 Canada</span>
              <span>•</span>
              <span>🇪🇺 Europe</span>
              <span>•</span>
              <span>🌏 Asia</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
