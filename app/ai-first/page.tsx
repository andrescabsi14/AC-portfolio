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

const aiFirstCopy = {
  hero: {
    title: "What it means to be AI-first",
    description:
      "It's not about using AI everywhere. It's about integrating intelligence strategically—where it delivers the most value.",
  },
  definition: {
    title: "The AI-first approach",
    paragraphs: [
      'When designing a process, your first question becomes: "How can AI make this better?"',
      "Not as an afterthought. As a foundation.",
    ],
    comparisons: [
      {
        label: "Traditional",
        text: "Manual processes. Human-dependent workflows. Reactive decision-making. Scale by hiring.",
      },
      {
        label: "AI-First",
        text: "Automated intelligence. AI-augmented teams. Predictive insights. Scale through systems.",
      },
    ],
  },
  benefits: {
    title: "The outcome",
    highlightColor: "#4f809bff",
    underlineColor: "#fff",
    items: [
      { title: "Speed", highlight: "Operations", detail: "that took days now take minutes." },
      {
        title: "Efficiency",
        highlight: "40-60% cost reduction",
        detail: "while improving output quality.",
      },
      {
        title: "Intelligence",
        highlight: "Real-time insights",
        detail: "drive every decision.",
      },
      {
        title: "Scale",
        highlight: "Growth",
        detail: "without proportional increase in headcount.",
      },
      {
        title: "Experience",
        highlight: "Faster, more personalized",
        detail: "customer service.",
      },
      {
        title: "Advantage",
        highlight: "Market leadership",
        detail: "through technological edge.",
      },
    ],
  },
  complexity: {
    title: "We handle the complexity",
    description: "You focus on your business. We deliver the systems.",
    button: { label: "Schedule a conversation", href: "/contact" },
  },
  process: {
    title: "The transformation",
    steps: [
      {
        order: "01",
        title: "Assess",
        description:
          "We analyze your operations, identify opportunities, and prioritize impact areas.",
      },
      {
        order: "02",
        title: "Design",
        description: "Custom strategy. Tailored systems. Built for your specific market and needs.",
      },
      {
        order: "03",
        title: "Integrate",
        description: "Seamless deployment into existing systems. Minimal disruption. Maximum impact.",
      },
      {
        order: "04",
        title: "Optimize",
        description: "Continuous improvement. Performance monitoring. Scale what works.",
      },
    ],
  },
  finalCta: {
    title: "Start the transformation",
    contact: { label: "Schedule consultation →", href: "/contact" },
    back: { label: "← Back", href: "/" },
  },
};

export default function AIFirstPage() {
  // Add smooth snap scrolling
  useEffect(() => {
    document.documentElement.style.scrollSnapType = "y proximity";
    document.documentElement.style.scrollBehavior = "smooth";

    return () => {
      document.documentElement.style.scrollSnapType = "";
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);
  const { hero, definition, benefits, complexity, process, finalCta } = aiFirstCopy;
  const highlightColor = benefits.highlightColor;
  const underlineColor = benefits.underlineColor;
  const benefitBorderColor = "#ffffff34";
  const benefitBgColor = `${highlightColor}28`;
  const paragraphColor = "#ffffffaa";
  const benefitColumns = 3;
  const benefitRows = Math.ceil(benefits.items.length / benefitColumns);
  const getBenefitCellClasses = (index: number) => {
    const classes = ["border border-transparent"];
    if (index % benefitColumns === 0) classes.push("border-l-0");
    if ((index + 1) % benefitColumns === 0) classes.push("border-r-0");
    if (index < benefitColumns) classes.push("border-t-0");
    if (index >= benefitColumns * (benefitRows - 1)) classes.push("border-b-0");
    return classes.join(" ");
  };
  const framerEasing = [0.22, 1, 0.36, 1] as const;
  const benefitsContainerVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.12, delayChildren: 0.2, ease: framerEasing },
    },
  };
  const benefitItemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: framerEasing } },
  };
  return (
    <>
      <Header showAnimation={false} />
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
              <h1 className="text-5xl md:text-7xl font-light leading-tight tracking-tight">{hero.title}</h1>
              <p className="text-xl md:text-2xl text-white/50 font-light leading-relaxed max-w-3xl mx-auto">
                {hero.description}
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
                <h2 className="text-3xl md:text-5xl font-light text-white">{definition.title}</h2>
                <div className="space-y-6 text-lg md:text-xl text-white/50 font-light leading-relaxed">
                  {definition.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="w-full h-px bg-white/10"></div>

              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {definition.comparisons.map((comparison) => (
                    <div key={comparison.label}>
                      <p className="text-white/30 text-sm tracking-wider mb-4">{comparison.label}</p>
                      <p className="text-white/50 font-light">{comparison.text}</p>
                    </div>
                  ))}
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
              <h2
                className="text-3xl md:text-5xl font-light text-center decoration-2"
                style={{ color: underlineColor, textDecorationColor: underlineColor }}
              >
                {benefits.title}
              </h2>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-px p-0"
                style={{ backgroundColor: benefitBgColor }}
                variants={benefitsContainerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
              >
                {benefits.items.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    className={`bg-black p-12 ${getBenefitCellClasses(index)}`}
                    style={{ borderColor: benefitBorderColor }}
                    variants={benefitItemVariants}
                  >
                    <h3
                      className="text-xl font-medium mb-3 decoration-2"
                      style={{ color: underlineColor, textDecorationColor: underlineColor }}
                    >
                      {benefit.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed decoration-1"
                      style={{
                        color: paragraphColor,
                        textDecorationColor: underlineColor,
                      }}
                    >
                      <span
                        className="underline decoration-2"
                        style={{
                          color: underlineColor,
                          textDecorationColor: underlineColor,
                        }}
                      >
                        {benefit.highlight}
                      </span>{" "}
                      {benefit.detail}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
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
              <h2 className="text-3xl md:text-5xl font-light text-white text-center">{process.title}</h2>

              <div className="space-y-16">
                {process.steps.map((step, index) => (
                  <div key={step.title}>
                    <div className="space-y-4">
                      <p className="text-white/30 text-xs tracking-wider">{step.order}</p>
                      <h3 className="text-2xl md:text-3xl font-light text-white">{step.title}</h3>
                      <p className="text-white/50 font-light leading-relaxed">{step.description}</p>
                    </div>
                    {index < process.steps.length - 1 && <div className="w-full h-px bg-white/10"></div>}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Simple statement about complexity */}
        <section
          className="px-6 py-32 relative min-h-screen bg-black overflow-hidden"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent opacity-60"
            animate={{ y: [0, -50, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-3xl md:text-5xl font-light text-white">{complexity.title}</h2>
              <p className="text-xl text-white/50 font-light leading-relaxed">{complexity.description}</p>
              <Link
                href={complexity.button.href}
                className="inline-flex items-center justify-center rounded-full border border-white/60 px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {complexity.button.label}
              </Link>
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
              <h2 className="text-4xl md:text-6xl font-light text-white">{finalCta.title}</h2>
              <div className="flex gap-12 justify-center items-center text-sm">
                <Link
                  href={finalCta.contact.href}
                  className="inline-block tracking-widest uppercase text-white/70 hover:text-white transition-colors duration-300 border-b border-white/30 hover:border-white pb-1"
                >
                  {finalCta.contact.label}
                </Link>
                <Link
                  href={finalCta.back.href}
                  className="inline-block tracking-widest uppercase text-white/40 hover:text-white/70 transition-colors duration-300"
                >
                  {finalCta.back.label}
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
