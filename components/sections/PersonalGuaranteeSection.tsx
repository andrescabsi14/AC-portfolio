"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function PersonalGuaranteeSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-24 bg-gradient-to-b from-black via-slate-950 to-black">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              My Personal Guarantee
            </h2>
            <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-sm border border-white/20 rounded-3xl p-12 shadow-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <p className="text-2xl md:text-3xl text-white/90 leading-relaxed mb-8 italic">
                "You'll notice something unusual about this company—it operates under my name."
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-6 text-lg text-white/80 leading-relaxed"
            >
              <p>
                In an era where you can fake anything—where faceless corporations make empty promises
                and disappear behind legal entities—I've chosen a different path.
              </p>

              <p className="text-xl text-white font-semibold">
                I'm so confident in these results that I've put my name as a guarantee.
              </p>

              <p>
                This isn't just a business decision. It's a personal commitment. When you work with us,
                you're not working with some anonymous company. You're working with <strong className="text-white">Andrés Cabrera</strong>—and
                I'm putting my name, my reputation, and my credibility on the line.
              </p>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mt-8">
                <p className="text-xl text-white mb-4">
                  <strong>That means:</strong>
                </p>
                <ul className="text-left space-y-4 max-w-2xl mx-auto">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-3 text-2xl">✓</span>
                    <span>Your success is my success—and my reputation depends on it</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-3 text-2xl">✓</span>
                    <span>I'm personally invested in making sure you become AI-first</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-3 text-2xl">✓</span>
                    <span>I won't hide behind corporate speak—you get direct, honest guidance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-3 text-2xl">✓</span>
                    <span>I'm committed to your progress and competitive advantage</span>
                  </li>
                </ul>
              </div>

              <p className="text-2xl text-white font-bold mt-10">
                I'm not just building systems. I'm building my legacy—and your success is part of it.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="mt-12 pt-8 border-t border-white/10"
            >
              <p className="text-white/60 text-sm">
                — Andrés Cabrera
              </p>
              <p className="text-white/50 text-sm mt-1">
                Founder & AI Integration Specialist
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
