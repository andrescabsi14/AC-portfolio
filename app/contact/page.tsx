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
      <Header showAnimation={false} />
      <main className="bg-black text-white min-h-screen pt-24">
        <section className="px-6 py-32">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-center mb-20"
            >
              <h1 className="text-5xl md:text-7xl font-light mb-8 leading-tight tracking-tight">
                Let's talk
              </h1>
              <p className="text-xl text-white/50 font-light">
                Schedule a consultation to discuss AI integration for your business.
              </p>
            </motion.div>

            {!submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              >
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-3">
                    <label htmlFor="name" className="block text-xs tracking-wider text-white/30 uppercase">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-0 py-3 bg-transparent border-0 border-b border-white/10 text-white font-light focus:outline-none focus:border-white/30 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="email" className="block text-xs tracking-wider text-white/30 uppercase">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-0 py-3 bg-transparent border-0 border-b border-white/10 text-white font-light focus:outline-none focus:border-white/30 transition-colors"
                      placeholder="john@company.com"
                    />
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="company" className="block text-xs tracking-wider text-white/30 uppercase">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-0 py-3 bg-transparent border-0 border-b border-white/10 text-white font-light focus:outline-none focus:border-white/30 transition-colors"
                      placeholder="Your Company Inc."
                    />
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="message" className="block text-xs tracking-wider text-white/30 uppercase">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-0 py-3 bg-transparent border-0 border-b border-white/10 text-white font-light focus:outline-none focus:border-white/30 transition-colors resize-none"
                      placeholder="Tell us about your business needs..."
                    />
                  </div>

                  <div className="pt-8">
                    <button
                      type="submit"
                      className="text-sm tracking-widest uppercase text-white/70 hover:text-white transition-colors duration-300 border-b border-white/30 hover:border-white pb-1"
                    >
                      Send message →
                    </button>
                  </div>
                </form>

                <div className="mt-20 pt-12 border-t border-white/10">
                  <p className="text-xs tracking-wider text-white/30 uppercase mb-8">Or reach out directly</p>
                  <div className="flex flex-col gap-4 text-white/50 font-light">
                    <a
                      href="mailto:hello@andrescabrera.com"
                      className="hover:text-white transition-colors"
                    >
                      hello@andrescabrera.com
                    </a>
                    <a
                      href="https://linkedin.com/in/andrescabrera"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-center py-20"
              >
                <div className="space-y-8">
                  <div className="w-16 h-px bg-white/30 mx-auto"></div>
                  <h2 className="text-3xl md:text-5xl font-light">Message sent</h2>
                  <p className="text-xl text-white/50 font-light">
                    I'll get back to you within 24 hours.
                  </p>
                  <div className="pt-8">
                    <Link
                      href="/"
                      className="inline-block text-sm tracking-widest uppercase text-white/40 hover:text-white/70 transition-colors duration-300"
                    >
                      ← Back to home
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
