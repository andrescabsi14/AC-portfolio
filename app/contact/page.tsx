"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend/email service
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Header />
      <main className="bg-black text-white min-h-screen pt-24">
        <section className="px-6 py-24">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Let's Talk About Your AI Future</h1>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Ready to transform your business? Schedule a consultation and let's discuss how AI can give you the competitive edge.
              </p>
            </motion.div>

            {!submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-12"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors"
                      placeholder="john@company.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-white/80 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors"
                      placeholder="Your Company Inc."
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                      Tell us about your needs *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors resize-none"
                      placeholder="Tell us about your business challenges and how you'd like AI to help..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-white text-black font-bold text-lg px-12 py-4 rounded-full hover:bg-white/90 transition-all duration-300 shadow-2xl hover:shadow-white/20 hover:scale-105"
                  >
                    Send Message
                  </button>
                </form>

                <div className="mt-12 pt-8 border-t border-white/10">
                  <p className="text-center text-white/60 mb-6">Or reach out directly:</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a
                      href="mailto:hello@andrescabrera.com"
                      className="text-white hover:text-white/80 transition-colors flex items-center gap-2"
                    >
                      <span>📧</span>
                      <span>hello@andrescabrera.com</span>
                    </a>
                    <span className="hidden sm:block text-white/30">|</span>
                    <a
                      href="https://linkedin.com/in/andrescabrera"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-white/80 transition-colors flex items-center gap-2"
                    >
                      <span>💼</span>
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-12 text-center"
              >
                <div className="text-6xl mb-6">✅</div>
                <h2 className="text-3xl font-bold mb-4">Message Sent!</h2>
                <p className="text-xl text-white/70 mb-8">
                  Thank you for reaching out. I'll get back to you within 24 hours to discuss how we can transform your business with AI.
                </p>
                <Link
                  href="/"
                  className="inline-block bg-white text-black font-bold text-lg px-10 py-4 rounded-full hover:bg-white/90 transition-all duration-300 shadow-xl hover:scale-105"
                >
                  Back to Home
                </Link>
              </motion.div>
            )}
          </div>
        </section>

        <section className="px-6 py-24 bg-gradient-to-b from-black to-slate-950">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-8">What Happens Next?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="text-4xl mb-4">1️⃣</div>
                  <h3 className="text-xl font-bold mb-2">We Connect</h3>
                  <p className="text-white/70">I'll reach out within 24 hours to schedule a consultation call.</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-4">2️⃣</div>
                  <h3 className="text-xl font-bold mb-2">We Analyze</h3>
                  <p className="text-white/70">Together, we'll identify your biggest opportunities for AI integration.</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-4">3️⃣</div>
                  <h3 className="text-xl font-bold mb-2">We Transform</h3>
                  <p className="text-white/70">I'll create a custom roadmap to make your business AI-first.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
