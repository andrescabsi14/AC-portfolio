"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function PersonalGuaranteeSection() {
  return (
    <section className="relative min-h-screen px-6 py-32 bg-black flex items-center justify-center">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="grid gap-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] items-center"
        >
          {/* Main statement - direct and confident */}
          <div className="space-y-10 text-left">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-6xl font-light text-white leading-tight tracking-tight">
                Built on reputation
              </h2>
              <p className="text-lg md:text-xl text-white/50 font-light max-w-3xl leading-relaxed">
                This company operates under my name. That means every implementation, every system, every result carries my personal commitment.
              </p>
            </div>

            <div className="space-y-6 text-white/40 font-light text-lg max-w-2xl">
              <p>
                In an industry full of promises, I stake my name on delivery.
              </p>
              <p>
                Your success is my reputation.
              </p>
            </div>

            <div className="pt-10">
              <p className="text-white/30 text-sm tracking-wider">ANDRÉS CABRERA</p>
              <p className="text-white/20 text-xs mt-2 tracking-wider">Founder</p>
            </div>
          </div>

          {/* Portrait with subtle vignette */}
          <div className="relative rounded-[32px] overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.65)]">
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent pointer-events-none"></div>
            <Image
              src="/closeup.jpeg"
              alt="Andrés Cabrera portrait"
              width={900}
              height={900}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
