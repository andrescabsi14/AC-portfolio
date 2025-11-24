"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const sectionConfig = {
  title: "AI integration for global enterprises",
  subtitle: "Operating across North America, Europe, and Asia. Building systems that give you competitive advantage."
};

const servicesData = [
  {
    title: "Efficiency",
    description: "Reduce operational costs. Automate processes. Free your team for strategic work.",
    color: "#3B82F6"
  },
  {
    title: "Growth",
    description: "Increase revenue. Accelerate sales cycles. Identify opportunities faster than competitors.",
    color: "#10B981"
  },
  {
    title: "Intelligence",
    description: "Real-time insights. Predictive analytics. Data-driven decisions at every level.",
    color: "#55d9f7ff"
  },
  {
    title: "Advantage",
    description: "Custom solutions. Market-specific deployment. Stay ahead of your competition.",
    color: "#F59E0B"
  }
];

export default function ServicesOverviewSection() {
  return (
    <section id="services" className="relative min-h-screen flex items-center justify-center px-6 py-32 bg-black">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center space-y-20"
        >
          {/* Main Message */}
          <div className="space-y-8">
            <h2 className="text-5xl md:text-7xl font-light text-white leading-tight tracking-tight">
              {sectionConfig.title.split(" for").length > 1 ? (
                <>
                  {sectionConfig.title.split(" for")[0]}
                  <br />
                  for{sectionConfig.title.split(" for")[1]}
                </>
              ) : (
                sectionConfig.title
              )}
            </h2>
            <p className="text-xl md:text-2xl text-white/50 font-light max-w-3xl mx-auto leading-relaxed">
              {sectionConfig.subtitle}
            </p>
          </div>

          {/* Simple Value Props - No icons, just elegant typography */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10 max-w-4xl mx-auto">
            {servicesData.map((service) => (
              <div key={service.title} className="bg-black p-12 md:p-16">
                <h3 className="text-2xl md:text-3xl font-light mb-4" style={{ color: service.color }}>
                  {service.title}
                </h3>
                <p className="text-white/60 font-light leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
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
