"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const sectionConfig = {
  title: `What <span className="aifirst">AI-First</span> means for your business`,
  subtitle: `Not buzzwords. Not theory. Real systems that solve real problems and deliver measurable results.`
};

const servicesData = [
  {
    title: "Get time back",
    description: "Your team stops wasting hours on repetitive work. Automation handles the routine stuff so your people can focus on what actually grows the business.",
    color: "#3B82F6"
  },
  {
    title: "Close deals faster",
    description: "Your sales team has the right information at the right time. You respond to opportunities before competitors even know they exist.",
    color: "#10B981"
  },
  {
    title: "Make better decisions",
    description: "You see what's working and what's not in real-time. No more guessing. No more waiting for reports. Just clear data when you need it.",
    color: "#55d9f7ff"
  },
  {
    title: "Stay ahead",
    description: "You build advantages that are hard to copy. Custom systems designed for your market, your customers, your way of doing business.",
    color: "#F59E0B"
  }
];

export default function ServicesOverviewSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const gridVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] as any }
    }
  };

  return (
    <section id="services" className="relative min-h-screen flex items-center justify-center px-6 py-32 bg-black">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={containerVariants}
          className="text-center space-y-20"
        >
          {/* Main Message */}
          <div className="space-y-8">
            <motion.h2
              variants={itemVariants}
              className="text-5xl md:text-7xl font-light text-white leading-tight tracking-tight"
              dangerouslySetInnerHTML={{ __html: sectionConfig.title }}
            />
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed"
            >
              {sectionConfig.subtitle}
            </motion.p>
          </div>

          {/* Simple Value Props - No icons, just elegant typography */}
          <motion.div
            variants={gridVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10 max-w-4xl mx-auto"
          >
            {servicesData.map((service) => (
              <motion.div
                key={service.title}
                variants={cardVariants}
                className="bg-black p-12 md:p-16"
              >
                <h3 className="text-2xl md:text-3xl font-light mb-4" style={{ color: service.color }}>
                  {service.title}
                </h3>
                <p className="font-light leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Single CTA */}
          <motion.div variants={itemVariants} className="pt-12">
            <Link
              href="/ai-first"
              className="inline-block text-sm tracking-widest uppercase text-white/70 hover:text-white transition-colors duration-300 border-b border-white/30 hover:border-white pb-1"
            >
              Learn more about <span className="aifirst">AI-First</span> transformation →
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
