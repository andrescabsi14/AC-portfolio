"use client";

import { motion } from "framer-motion";

export default function PersonalGuaranteeSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-32 bg-black">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="text-center space-y-16"
        >
          {/* Main statement - direct and confident */}
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-light text-white leading-tight tracking-tight">
              Built on reputation
            </h2>
            <p className="text-xl md:text-2xl text-white/50 font-light max-w-3xl mx-auto leading-relaxed">
              This company operates under my name. That means every implementation, every system, every result carries my personal commitment.
            </p>
          </div>

          {/* Simple divider */}
          <div className="w-24 h-px bg-white/20 mx-auto"></div>

          {/* Understated but powerful */}
          <div className="space-y-6 text-white/40 font-light text-lg max-w-2xl mx-auto">
            <p>
              In an industry full of promises, I stake my name on delivery.
            </p>
            <p>
              Your success is my reputation.
            </p>
          </div>

          {/* Signature */}
          <div className="pt-12">
            <p className="text-white/30 text-sm tracking-wider">ANDRÉS CABRERA</p>
            <p className="text-white/20 text-xs mt-2 tracking-wider">Founder</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
