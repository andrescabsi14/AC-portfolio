"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import RecruiterChat from "@/components/contact/RecruiterChat";
import StandardForm from "@/components/contact/StandardForm";

type Step = 'initial' | 'work_type' | 'recruiter_check' | 'media_check' | 'recruiter_chat' | 'general_form' | 'media_form';

export default function ContactPage() {
  const [step, setStep] = useState<Step>('initial');

  const handleInitialChoice = (isWork: boolean) => {
    if (isWork) {
      setStep('recruiter_check');
    } else {
      setStep('media_check');
    }
  };

  const handleRecruiterCheck = (isRecruiter: boolean) => {
    if (isRecruiter) {
      setStep('recruiter_chat');
    } else {
      setStep('general_form');
    }
  };

  const handleMediaCheck = (isMedia: boolean) => {
    if (isMedia) {
      setStep('media_form');
    } else {
      setStep('general_form');
    }
  };

  return (
    <>
      <Header showAnimation={false} />
      <main className="bg-black text-white min-h-screen pt-24">
        <section className="px-6 py-32">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-center mb-12"
            >
              <h1 className="text-5xl md:text-7xl font-light mb-8 leading-tight tracking-tight">
                Let's talk
              </h1>
              {step !== 'recruiter_chat' && (
                <p className="text-xl text-white/50 font-light">
                  Help me direct your inquiry to the right place.
                </p>
              )}
            </motion.div>

            <AnimatePresence mode="wait">
              {step === 'initial' && (
                <motion.div
                  key="initial"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col md:flex-row gap-6 justify-center"
                >
                  <button
                    onClick={() => handleInitialChoice(true)}
                    className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all text-left group"
                  >
                    <h3 className="text-2xl font-light mb-2 group-hover:text-blue-400 transition-colors">Work & Projects</h3>
                    <p className="text-white/50">I have a project or business opportunity.</p>
                  </button>
                  <button
                    onClick={() => handleInitialChoice(false)}
                    className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all text-left group"
                  >
                    <h3 className="text-2xl font-light mb-2 group-hover:text-purple-400 transition-colors">Other Inquiries</h3>
                    <p className="text-white/50">Speaking, media, or general questions.</p>
                  </button>
                </motion.div>
              )}

              {step === 'recruiter_check' && (
                <motion.div
                  key="recruiter_check"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center space-y-8"
                >
                  <h3 className="text-2xl font-light">Are you a recruiter?</h3>
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={() => handleRecruiterCheck(true)}
                      className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => handleRecruiterCheck(false)}
                      className="px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                    >
                      No
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 'media_check' && (
                <motion.div
                  key="media_check"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center space-y-8"
                >
                  <h3 className="text-2xl font-light">Is this a media or speaking opportunity?</h3>
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={() => handleMediaCheck(true)}
                      className="px-8 py-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white transition-colors"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => handleMediaCheck(false)}
                      className="px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                    >
                      No
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 'recruiter_chat' && (
                <motion.div
                  key="recruiter_chat"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <RecruiterChat />
                </motion.div>
              )}

              {step === 'general_form' && (
                <motion.div
                  key="general_form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="max-w-2xl mx-auto"
                >
                  <StandardForm type="general" />
                </motion.div>
              )}

              {step === 'media_form' && (
                <motion.div
                  key="media_form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="max-w-2xl mx-auto"
                >
                  <StandardForm type="media" />
                </motion.div>
              )}
            </AnimatePresence>

            {step !== 'initial' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-12 text-center"
              >
                <button
                  onClick={() => setStep('initial')}
                  className="text-sm text-white/30 hover:text-white transition-colors uppercase tracking-widest"
                >
                  Start Over
                </button>
              </motion.div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
