"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import InteractiveChatSection from "@/components/sections/ai-first/InteractiveChatSection";
import IndustriesSection from "@/components/sections/ai-first/IndustriesSection";
import AIFirstValue from "@/components/sections/ai-first/AIFirstValue";
import DataSovereigntySection from "@/components/sections/ai-first/DataSovereigntySection";
import AIFirstVision from "@/components/sections/ai-first/AIFirstVision";
import { useEffect } from "react";

export default function AIFirstPage() {
    // Add smooth snap scrolling
  useEffect(() => {
    document.documentElement.style.scrollSnapType = 'y proximity';
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      document.documentElement.style.scrollSnapType = '';
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);
  return (
    <>
      <Header />
      <main className="relative bg-black overflow-x-hidden">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6 py-32">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-12"
            >
              <h1 className="text-5xl md:text-7xl font-light leading-tight tracking-tight">
                What it means to be AI-first
              </h1>
              <p className="text-xl md:text-2xl text-white/50 font-light leading-relaxed max-w-3xl mx-auto">
                It's not about using AI everywhere. It's about integrating intelligence strategically—where it delivers the most value.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Definition */}
        <section className="px-6 py-32 bg-black">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="space-y-16"
            >
              <div className="space-y-8">
                <h2 className="text-3xl md:text-5xl font-light text-white">The AI-first approach</h2>
                <div className="space-y-6 text-lg md:text-xl text-white/50 font-light leading-relaxed">
                  <p>
                    When designing a process, your first question becomes: "How can AI make this better?"
                  </p>
                  <p>
                    Not as an afterthought. As a foundation.
                  </p>
                </div>
              </div>

              <div className="w-full h-px bg-white/10"></div>

              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <p className="text-white/30 text-sm tracking-wider mb-4">Traditional</p>
                    <p className="text-white/50 font-light">Manual processes. Human-dependent workflows. Reactive decision-making. Scale by hiring.</p>
                  </div>
                  <div>
                    <p className="text-white/30 text-sm tracking-wider mb-4">AI-First</p>
                    <p className="text-white font-light">Automated intelligence. AI-augmented teams. Predictive insights. Scale through systems.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits - Simple grid */}
        <section className="px-6 py-32 bg-black">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="space-y-16"
            >
              <h2 className="text-3xl md:text-5xl font-light text-white text-center">The outcome</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
                <div className="bg-black p-12">
                  <h3 className="text-xl font-light text-white mb-3">Speed</h3>
                  <p className="text-white/50 font-light text-sm leading-relaxed">
                    Operations that took days now take minutes.
                  </p>
                </div>
                <div className="bg-black p-12">
                  <h3 className="text-xl font-light text-white mb-3">Efficiency</h3>
                  <p className="text-white/50 font-light text-sm leading-relaxed">
                    40-60% cost reduction while improving output quality.
                  </p>
                </div>
                <div className="bg-black p-12">
                  <h3 className="text-xl font-light text-white mb-3">Intelligence</h3>
                  <p className="text-white/50 font-light text-sm leading-relaxed">
                    Real-time insights drive every decision.
                  </p>
                </div>
                <div className="bg-black p-12">
                  <h3 className="text-xl font-light text-white mb-3">Scale</h3>
                  <p className="text-white/50 font-light text-sm leading-relaxed">
                    Growth without proportional increase in headcount.
                  </p>
                </div>
                <div className="bg-black p-12">
                  <h3 className="text-xl font-light text-white mb-3">Experience</h3>
                  <p className="text-white/50 font-light text-sm leading-relaxed">
                    Faster, more personalized customer service.
                  </p>
                </div>
                <div className="bg-black p-12">
                  <h3 className="text-xl font-light text-white mb-3">Advantage</h3>
                  <p className="text-white/50 font-light text-sm leading-relaxed">
                    Market leadership through technological edge.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* The Process - Simplified */}
        <section className="px-6 py-32 bg-black">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="space-y-20"
            >
              <h2 className="text-3xl md:text-5xl font-light text-white text-center">The transformation</h2>

              <div className="space-y-16">
                <div className="space-y-4">
                  <p className="text-white/30 text-xs tracking-wider">01</p>
                  <h3 className="text-2xl md:text-3xl font-light text-white">Assess</h3>
                  <p className="text-white/50 font-light leading-relaxed">
                    We analyze your operations, identify opportunities, and prioritize impact areas.
                  </p>
                </div>

                <div className="w-full h-px bg-white/10"></div>

                <div className="space-y-4">
                  <p className="text-white/30 text-xs tracking-wider">02</p>
                  <h3 className="text-2xl md:text-3xl font-light text-white">Design</h3>
                  <p className="text-white/50 font-light leading-relaxed">
                    Custom strategy. Tailored systems. Built for your specific market and needs.
                  </p>
                </div>

                <div className="w-full h-px bg-white/10"></div>

                <div className="space-y-4">
                  <p className="text-white/30 text-xs tracking-wider">03</p>
                  <h3 className="text-2xl md:text-3xl font-light text-white">Integrate</h3>
                  <p className="text-white/50 font-light leading-relaxed">
                    Seamless deployment into existing systems. Minimal disruption. Maximum impact.
                  </p>
                </div>

                <div className="w-full h-px bg-white/10"></div>

                <div className="space-y-4">
                  <p className="text-white/30 text-xs tracking-wider">04</p>
                  <h3 className="text-2xl md:text-3xl font-light text-white">Optimize</h3>
                  <p className="text-white/50 font-light leading-relaxed">
                    Continuous improvement. Performance monitoring. Scale what works.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Simple statement about complexity */}
        <section className="px-6 py-32 bg-black">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <h2 className="text-3xl md:text-5xl font-light text-white">
                We handle the complexity
              </h2>
              <p className="text-xl text-white/50 font-light leading-relaxed">
                You focus on your business. We deliver the systems.
              </p>
            </motion.div>
          </div>
        </section>

        {/* AI First Vision Section */}
        <AIFirstVision />

        {/* AI First Value Section */}
        <AIFirstValue />

        {/* Data Sovereignty Section */}
        <DataSovereigntySection />

        {/* Interactive Chat Section */}
        <InteractiveChatSection />

        {/* Industries Section */}
        <IndustriesSection />

        {/* CTA */}
        <section className="px-6 py-32 bg-black">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <h2 className="text-4xl md:text-6xl font-light text-white">
                Start the transformation
              </h2>
              <div className="flex gap-12 justify-center items-center text-sm">
                <Link
                  href="/contact"
                  className="inline-block tracking-widest uppercase text-white/70 hover:text-white transition-colors duration-300 border-b border-white/30 hover:border-white pb-1"
                >
                  Schedule consultation →
                </Link>
                <Link
                  href="/"
                  className="inline-block tracking-widest uppercase text-white/40 hover:text-white/70 transition-colors duration-300"
                >
                  ← Back
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}