"use client";

import { motion } from "framer-motion";

export default function ProblemsSection() {
  return (
    <section className="relative min-h-screen px-6 py-32 bg-black">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-32"
        >
          {/* One clear message */}
          <div className="text-center space-y-8">
            <h2 className="text-4xl md:text-6xl font-light text-white leading-tight tracking-tight">
              Your competitors are already moving
            </h2>
            <p className="text-xl md:text-2xl text-white/50 font-light max-w-3xl mx-auto leading-relaxed">
              AI isn't the future. It's the present. Companies that integrate now will dominate their markets. Those that wait will be replaced.
            </p>
          </div>

          {/* Simple divider */}
          <div className="w-full h-px bg-white/10"></div>

          {/* Direct statement - no gimmicks */}
          <div className="space-y-16 max-w-3xl mx-auto">
            <div>
              <p className="text-2xl md:text-3xl font-light text-white/90 leading-relaxed">
                Manual processes cost you time.
              </p>
              <p className="text-lg md:text-xl text-white/40 font-light mt-4 leading-relaxed">
                Automation delivers precision at scale.
              </p>
            </div>

            <div>
              <p className="text-2xl md:text-3xl font-light text-white/90 leading-relaxed">
                Delayed decisions cost you opportunities.
              </p>
              <p className="text-lg md:text-xl text-white/40 font-light mt-4 leading-relaxed">
                Real-time intelligence accelerates growth.
              </p>
            </div>

            <div>
              <p className="text-2xl md:text-3xl font-light text-white/90 leading-relaxed">
                Generic solutions cost you competitive advantage.
              </p>
              <p className="text-lg md:text-xl text-white/40 font-light mt-4 leading-relaxed">
                Custom AI systems built for your market ensure you lead.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
