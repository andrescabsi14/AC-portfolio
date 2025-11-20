'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageSquare, Calendar, Sparkles } from 'lucide-react';

interface ContactSectionProps {
  /**
   * Optional custom heading text
   * @default "Let's Start a Conversation"
   */
  heading?: string;
  /**
   * Optional custom subheading
   * @default "AI-Powered Client Engagement"
   */
  subheading?: string;
  /**
   * Callback function when user clicks to start conversation
   * If not provided, opens a default chat interface
   */
  onStartConversation?: () => void;
  /**
   * Optional custom CTA button text
   * @default "Start Conversation with AI Assistant"
   */
  ctaText?: string;
  /**
   * Optional CSS class name for additional styling
   */
  className?: string;
}

/**
 * Reusable Contact Section Component
 *
 * A pre-footer section that introduces visitors to Andrés's AI assistant
 * and encourages them to start an initial conversation.
 *
 * @example
 * ```tsx
 * <ContactSection />
 * ```
 *
 * @example With custom props
 * ```tsx
 * <ContactSection
 *   heading="Get in Touch"
 *   onStartConversation={() => openChatModal()}
 * />
 * ```
 */
export default function ContactSection({
  heading = "Let's Start a Conversation",
  subheading = "AI-Powered Client Engagement",
  onStartConversation,
  ctaText = "Start Conversation with AI Assistant",
  className = '',
}: ContactSectionProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleStartConversation = () => {
    if (onStartConversation) {
      onStartConversation();
    } else {
      // Default behavior: scroll to chat section or open chat modal
      // This can be customized based on your implementation
      const chatSection = document.getElementById('ai-chat');
      if (chatSection) {
        chatSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleInputClick = () => {
    handleStartConversation();
  };

  return (
    <section
      id="contact"
      className={`relative w-full min-h-screen flex items-center justify-center px-6 py-20 ${className}`}
    >
      <div className="max-w-5xl w-full mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-light mb-4 tracking-tight">
            {heading}
          </h2>
          <p className="text-white/60 text-lg font-light tracking-wide">
            {subheading}
          </p>
        </motion.div>

        {/* Main Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Card className="bg-slate-900/80 backdrop-blur-sm border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(2,6,23,0.8)] overflow-hidden">
            <div className="p-8 md:p-12">
              {/* Introduction */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="w-6 h-6 text-nyc-broadway" />
                  <h3 className="text-2xl font-light text-white">
                    Meet My AI Assistant
                  </h3>
                </div>

                <div className="space-y-4 text-white/80 font-light leading-relaxed">
                  <p>
                    As you may imagine, Andrés is a busy professional working daily with
                    different types of businesses. That's why he has delegated to his AI assistant
                    the responsibility of initiating the first interactions with clients.
                  </p>

                  <p>
                    He's so confident in these solutions that he's relying on critical parts of
                    his business—such as getting in touch with clients and managing initial
                    conversations—through these tools. He does this because he understands the
                    importance of businesses and their people adapting to these kinds of
                    interactions, which will become increasingly human-like over time.
                  </p>

                  <p>
                    This doesn't mean Andrés won't be in touch with you or involved in your
                    business journey. It's actually quite the opposite.
                  </p>
                </div>
              </div>

              {/* Benefits Grid */}
              <div className="grid md:grid-cols-3 gap-6 mb-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-white/5 rounded-xl p-6 border border-white/5"
                >
                  <MessageSquare className="w-8 h-8 text-nyc-broadway mb-4" />
                  <h4 className="text-lg font-light mb-2">Immediate Response</h4>
                  <p className="text-sm text-white/60 font-light leading-relaxed">
                    Start sharing your challenges and goals right away. No waiting for
                    scheduling or availability.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-white/5 rounded-xl p-6 border border-white/5"
                >
                  <Sparkles className="w-8 h-8 text-nyc-broadway mb-4" />
                  <h4 className="text-lg font-light mb-2">World-Class Advisory</h4>
                  <p className="text-sm text-white/60 font-light leading-relaxed">
                    Trained and coached by Andrés, the assistant provides expert guidance
                    tailored to your specific situation.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="bg-white/5 rounded-xl p-6 border border-white/5"
                >
                  <Calendar className="w-8 h-8 text-nyc-broadway mb-4" />
                  <h4 className="text-lg font-light mb-2">Better Preparation</h4>
                  <p className="text-sm text-white/60 font-light leading-relaxed">
                    When you meet Andrés, he'll have the full picture—saving time and
                    enabling deeper strategic conversations.
                  </p>
                </motion.div>
              </div>

              {/* How It Works */}
              <div className="mb-8 p-6 bg-white/5 rounded-xl border border-white/10">
                <h4 className="text-xl font-light mb-4 text-white">How It Works</h4>
                <div className="space-y-3 text-white/70 font-light leading-relaxed">
                  <p className="flex items-start gap-3">
                    <span className="text-nyc-broadway font-normal flex-shrink-0">1.</span>
                    <span>
                      Share your business challenges, goals, and situation with the AI assistant
                    </span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-nyc-broadway font-normal flex-shrink-0">2.</span>
                    <span>
                      Together, outline a preliminary plan that addresses your needs
                    </span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-nyc-broadway font-normal flex-shrink-0">3.</span>
                    <span>
                      Andrés reviews everything to ensure it's right and doable
                    </span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-nyc-broadway font-normal flex-shrink-0">4.</span>
                    <span>
                      Schedule a call with Andrés—he'll already understand your full story
                    </span>
                  </p>
                </div>
              </div>

              {/* Value Proposition */}
              <div className="mb-8">
                <p className="text-white/80 font-light leading-relaxed italic border-l-2 border-nyc-broadway pl-6">
                  "You're no longer limited by my time. The AI assistant listens carefully
                  to your needs and helps me understand the whole picture of you and your
                  business in minutes—allowing us to make the most of our time together."
                </p>
                <p className="text-right text-white/60 text-sm mt-2 font-light">
                  — Andrés Cabrera
                </p>
              </div>

              {/* Interactive Input with Glowing Line */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-8"
              >
                <div className="max-w-3xl mx-auto">
                  <p className="text-center text-white/60 text-sm mb-6 font-light">
                    What would you like to discuss?
                  </p>

                  <div
                    className="relative cursor-text"
                    onClick={handleInputClick}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    {/* Input Container */}
                    <div className="relative py-4 px-2">
                      {/* Placeholder/Cursor */}
                      <div className="flex items-center min-h-[2rem]">
                        {!inputValue && (
                          <>
                            <span className="text-white/40 font-light text-lg mr-2">
                              Type your message here
                            </span>
                            {/* Blinking Cursor */}
                            <span
                              className="inline-block w-0.5 h-6 bg-white/70 animate-pulse"
                              style={{
                                animation: 'blink 1s step-end infinite',
                              }}
                            />
                          </>
                        )}
                      </div>

                      {/* Bottom Line with Glow */}
                      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/20 transition-all duration-300">
                        {/* Glow Effect on Hover */}
                        <div
                          className={`absolute inset-0 transition-all duration-500 ${
                            isHovered
                              ? 'shadow-[0_0_20px_rgba(255,215,0,0.8),0_0_40px_rgba(255,215,0,0.4)] bg-nyc-broadway'
                              : ''
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  <p className="text-center text-white/40 text-xs mt-4 font-light italic">
                    Click to start your conversation with the AI assistant
                  </p>
                </div>
              </motion.div>

              {/* Add CSS for blinking cursor animation */}
              <style jsx>{`
                @keyframes blink {
                  0%, 50% {
                    opacity: 1;
                  }
                  51%, 100% {
                    opacity: 0;
                  }
                }
              `}</style>
            </div>
          </Card>
        </motion.div>

        {/* Optional: Alternative Contact Methods */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 text-center"
        >
          <p className="text-white/40 text-sm font-light mb-4">
            Prefer traditional contact methods?
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              className="border-white/20 text-white/70 hover:bg-white/5"
              asChild
            >
              <a href="mailto:contact@andrescabrera.com">Email</a>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-white/20 text-white/70 hover:bg-white/5"
              asChild
            >
              <a
                href="https://www.linkedin.com/in/andrescabsi"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
