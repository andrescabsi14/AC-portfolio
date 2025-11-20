"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

export default function AIFirstPage() {
  const steps = [
    {
      number: "01",
      title: "Assess Your Current State",
      description: "Understand where you are now. We'll analyze your current processes, identify bottlenecks, and discover where AI can make the biggest impact.",
      details: [
        "Process audit and mapping",
        "Identify automation opportunities",
        "Calculate potential ROI",
        "Prioritize high-impact areas"
      ]
    },
    {
      number: "02",
      title: "Design Your AI Strategy",
      description: "Create a custom roadmap tailored to your business. Not every company needs the same AI—we design solutions that fit your unique needs and goals.",
      details: [
        "Custom AI integration plan",
        "Technology stack selection",
        "Implementation timeline",
        "Risk mitigation strategies"
      ]
    },
    {
      number: "03",
      title: "Implement & Integrate",
      description: "Deploy AI solutions seamlessly into your existing systems. We handle the technical complexity so you don't have to.",
      details: [
        "Smooth integration with current tools",
        "Minimal disruption to operations",
        "Team training and onboarding",
        "Quality assurance and testing"
      ]
    },
    {
      number: "04",
      title: "Optimize & Scale",
      description: "Continuously improve and expand your AI capabilities. We monitor performance, gather insights, and help you scale what works.",
      details: [
        "Performance monitoring and analytics",
        "Continuous optimization",
        "Scale successful implementations",
        "Ongoing support and evolution"
      ]
    }
  ];

  const benefits = [
    {
      icon: "🚀",
      title: "Faster Operations",
      description: "Reduce processing time from days to minutes with intelligent automation"
    },
    {
      icon: "💰",
      title: "Cost Reduction",
      description: "Cut operational costs by 40-60% while improving quality and output"
    },
    {
      icon: "📊",
      title: "Data-Driven Decisions",
      description: "Make better decisions faster with real-time insights and predictive analytics"
    },
    {
      icon: "🎯",
      title: "Competitive Edge",
      description: "Stay ahead of competitors still using traditional methods"
    },
    {
      icon: "🔄",
      title: "Scalability",
      description: "Grow without proportionally increasing headcount or costs"
    },
    {
      icon: "😊",
      title: "Better Customer Experience",
      description: "Deliver faster, more personalized service that delights customers"
    }
  ];

  return (
    <>
      <Header />
      <main className="bg-black text-white">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6 py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-black to-black"></div>
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
                What Does It Mean to Be{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  AI-First?
                </span>
              </h1>
              <p className="text-2xl text-white/70 leading-relaxed mb-12">
                It's not about using AI for everything. It's about strategically integrating AI into your business
                to work smarter, faster, and more efficiently than ever before.
              </p>
              <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto"></div>
            </motion.div>
          </div>
        </section>

        {/* What is AI-First Section */}
        <section className="px-6 py-24 bg-gradient-to-b from-black to-slate-950">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8">The AI-First Mindset</h2>
              <div className="space-y-6 text-lg text-white/80 leading-relaxed">
                <p>
                  Being AI-first means that whenever you're designing a process, solving a problem, or planning growth,
                  your first question is: <strong className="text-white">"How can AI make this better?"</strong>
                </p>
                <p>
                  It's a fundamental shift from "We have these processes, let's maybe add some AI" to
                  "Let's build our processes with AI at the core."
                </p>
                <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-8 my-8">
                  <h3 className="text-2xl font-bold mb-4 text-blue-400">Traditional Business vs. AI-First Business</h3>
                  <div className="space-y-6">
                    <div>
                      <p className="text-white/60 mb-2">❌ Traditional: Manual data entry, human-dependent processes, reactive decision-making</p>
                      <p className="text-white/90">✅ AI-First: Automated data processing, AI-augmented workflows, predictive insights</p>
                    </div>
                    <div>
                      <p className="text-white/60 mb-2">❌ Traditional: Scale by hiring more people</p>
                      <p className="text-white/90">✅ AI-First: Scale by optimizing AI systems</p>
                    </div>
                    <div>
                      <p className="text-white/60 mb-2">❌ Traditional: Wait for reports to make decisions</p>
                      <p className="text-white/90">✅ AI-First: Real-time insights drive instant action</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="px-6 py-24 bg-slate-950">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Become AI-First?</h2>
              <p className="text-xl text-white/70">
                The benefits go far beyond just automation
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-slate-900/50 border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300"
                >
                  <div className="text-5xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-white/70 leading-relaxed">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="px-6 py-24 bg-gradient-to-b from-slate-950 to-black">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                How to Become AI-First in 4 Simple Steps
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                We've made the transition easy. Here's exactly how we'll guide you through it.
              </p>
            </motion.div>

            <div className="space-y-12">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="flex flex-col md:flex-row gap-8 bg-slate-900/30 border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                        <span className="text-3xl font-bold">{step.number}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-3xl font-bold mb-4">{step.title}</h3>
                      <p className="text-xl text-white/80 mb-6 leading-relaxed">{step.description}</p>
                      <ul className="space-y-2">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start text-white/70">
                            <span className="text-blue-400 mr-3">▹</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute left-10 top-full w-0.5 h-12 bg-gradient-to-b from-white/20 to-transparent"></div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Complexity Section */}
        <section className="px-6 py-24 bg-black">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-slate-900 to-slate-950 border border-white/20 rounded-3xl p-12 text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                We Handle the Complexity
              </h2>
              <p className="text-xl text-white/80 leading-relaxed mb-8">
                You don't need to understand machine learning, neural networks, or API integrations.
                That's our job. Your job is to focus on your business while we transform it with AI.
              </p>
              <div className="inline-flex flex-col sm:flex-row gap-4">
                <span className="text-white/60">You focus on:</span>
                <div className="flex flex-wrap gap-3 justify-center">
                  <span className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm">Your Vision</span>
                  <span className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm">Your Goals</span>
                  <span className="bg-green-500/20 text-green-300 px-4 py-2 rounded-full text-sm">Your Growth</span>
                </div>
              </div>
              <div className="inline-flex flex-col sm:flex-row gap-4 mt-6">
                <span className="text-white/60">We handle:</span>
                <div className="flex flex-wrap gap-3 justify-center">
                  <span className="bg-slate-700 text-white/70 px-4 py-2 rounded-full text-sm">The Tech</span>
                  <span className="bg-slate-700 text-white/70 px-4 py-2 rounded-full text-sm">The Integration</span>
                  <span className="bg-slate-700 text-white/70 px-4 py-2 rounded-full text-sm">The Complexity</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-24 bg-gradient-to-b from-black to-slate-950">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-8">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-white/70 mb-12 leading-relaxed">
                Let's build your AI-first future together. The sooner you start, the bigger your advantage.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="/contact"
                  className="bg-white text-black font-bold text-lg px-12 py-5 rounded-full hover:bg-white/90 transition-all duration-300 shadow-2xl hover:shadow-white/20 hover:scale-105"
                >
                  Schedule a Consultation
                </Link>
                <Link
                  href="/"
                  className="bg-transparent border-2 border-white text-white font-bold text-lg px-12 py-5 rounded-full hover:bg-white hover:text-black transition-all duration-300 hover:scale-105"
                >
                  ← Back to Home
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
