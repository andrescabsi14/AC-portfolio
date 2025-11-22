"use client";

import { motion } from "framer-motion";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import SmartContactSection from "@/components/sections/SmartContactSection";
import { useEffect } from "react";

export default function AIFirstPage() {
  useEffect(() => {
    document.documentElement.style.scrollSnapType = "y proximity";
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollSnapType = "";
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return (
    <>
      <Header showAnimation={false} />
      <main className="relative bg-black overflow-x-hidden">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-black to-black" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
          </div>

          <div className="max-w-5xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8"
            >
              <p className="text-sm md:text-base font-medium tracking-[0.3em] text-blue-400 uppercase">
                The New Standard
              </p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-white tracking-tight leading-tight">
                AI-First <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">
                  Architecture
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/60 font-light leading-relaxed max-w-3xl mx-auto">
                It's not about using AI everywhere. It's about integrating intelligence strategically—where it delivers the most value.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Core Philosophy - Minimalist Grid */}
        <section className="px-6 py-32 bg-black border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  title: "Foundation",
                  description: "AI isn't an add-on. It's the bedrock of modern systems, enabling predictive capabilities from day one."
                },
                {
                  title: "Scale",
                  description: "Moving from linear growth to exponential capability through automated intelligence and agentic workflows."
                },
                {
                  title: "Experience",
                  description: "Creating interfaces that adapt, learn, and anticipate user needs before they are expressed."
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl font-light text-white">{item.title}</h3>
                  <p className="text-white/50 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Strategic Value */}
        <section className="px-6 py-32 bg-black relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <h2 className="text-4xl md:text-5xl font-light text-white leading-tight">
                From Manual Operations to <br />
                <span className="text-blue-500 font-semibold">Intelligent Systems</span>
              </h2>
              <p className="text-lg text-white/60 leading-relaxed">
                We help organizations transition from reactive, human-dependent workflows to proactive, AI-augmented operations.
                This isn't just automation—it's a fundamental shift in how value is created.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Smart Contact Section */}
        <SmartContactSection />

      </main>
      <Footer />
    </>
  );
}
