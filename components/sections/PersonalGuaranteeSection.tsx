"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function PersonalGuaranteeSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as any }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as any }
    }
  };

  return (
    <section className="relative min-h-screen px-6 py-32 bg-black flex items-center justify-center">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={containerVariants}
          className="grid gap-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] items-center"
        >
          {/* Main statement - direct and confident */}
          <div className="space-y-10 text-left">
            <div className="space-y-8">
              <motion.h2
                variants={itemVariants}
                className="text-4xl md:text-6xl font-light text-white leading-tight tracking-tight"
              >
                Enterprise execution.<br />Mid-market agility.
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl font-light max-w-3xl leading-relaxed"
              >
                I've built systems for Fortune 500s across New York, Silicon Valley, and Europe. Now I bring that same world-class execution to ambitious mid-market companies ready to compete at the highest level.
              </motion.p>
            </div>

            <div className="space-y-6 font-light text-lg max-w-2xl">
              <motion.p variants={itemVariants}>
                <span className="aifirst">AI-First</span> isn't theory. It's battle-tested frameworks refined through years of solving complex problems at scale.
              </motion.p>
              <motion.p variants={itemVariants}>
                You get enterprise-grade systems without enterprise bureaucracy. Strategic transformation without the consultant overhead.
              </motion.p>
            </div>

            <motion.div variants={itemVariants} className="pt-10">
              <h4 className="text-sm tracking-wider">ANDRÉS CABRERA</h4>
              <h5 className="text-xs mt-2 tracking-wider"><span className="aifirst">AI-First</span> Author</h5>
            </motion.div>
          </div>

          {/* Portrait with subtle vignette */}
          <motion.div
            className="relative rounded-[32px] overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.65)]"
            style={{ aspectRatio: 1 }}
            variants={imageVariants}
          >
            {/* Actual portrait image */}
            <Image
              src="/portrait/portrait_andres.png"
              alt="Andrés Cabrera portrait"
              width={900}
              height={900}
              className="w-full h-full object-cover"
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
