'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

export default function InteractiveChatSection() {
  const [isActive, setIsActive] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [showEncouragement, setShowEncouragement] = useState(false);
  const [conversation, setConversation] = useState<{ role: 'user' | 'assistant'; message: string }[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const encouragementTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive && !userInput) {
      // Show encouragement after 1 minute of inactivity
      encouragementTimer.current = setTimeout(() => {
        setShowEncouragement(true);
      }, 60000);
    } else {
      setShowEncouragement(false);
      if (encouragementTimer.current) {
        clearTimeout(encouragementTimer.current);
      }
    }

    return () => {
      if (encouragementTimer.current) {
        clearTimeout(encouragementTimer.current);
      }
    };
  }, [isActive, userInput]);

  const handleActivate = () => {
    setIsActive(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMessage = userInput;
    setConversation((prev) => [...prev, { role: 'user', message: userMessage }]);
    setUserInput('');
    setIsThinking(true);

    // Simulate AI response
    setTimeout(() => {
      setIsThinking(false);
      setConversation((prev) => [
        ...prev,
        {
          role: 'assistant',
          message: `Thank you for sharing that! Based on "${userMessage}", I can already see opportunities to streamline your process and save you significant time. I'll prepare a personalized recommendation for you—completely free, no strings attached. This will show you exactly how AI can transform this specific challenge in your business. You can implement it with us or any provider, but we guarantee this is just the surface of what's possible when we work together.`,
        },
      ]);
    }, 2000);
  };

  return (
    <section
      className="px-6 py-32 bg-black"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-8"
        >
          <h2 className="text-3xl md:text-5xl font-light text-white">
            Discover what we can do for you
          </h2>
          <p className="text-lg md:text-xl text-white/50 font-light leading-relaxed">
            Describe your biggest operational challenge, and we'll show you exactly how AI can transform it. Personalized recommendations in minutes.
          </p>
        </motion.div>

        {/* Chat Interface */}
        <div className="relative">
          {/* Previous conversation (with opacity) */}
          <AnimatePresence>
            {conversation.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 0.4, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 space-y-3 max-h-60 overflow-y-auto"
              >
                {conversation.slice(0, -1).map((msg, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg ${
                      msg.role === 'user'
                        ? 'bg-white/5 ml-12 text-right'
                        : 'bg-white/5 mr-12'
                    }`}
                  >
                    <p className="text-white/50 text-sm font-light">{msg.message}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Current/Last message */}
          <AnimatePresence>
            {conversation.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                {conversation.slice(-1).map((msg, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg ${
                      msg.role === 'user'
                        ? 'bg-white/10 ml-12 text-right'
                        : 'bg-white/10 mr-12'
                    }`}
                  >
                    <p className="text-white text-base font-light">{msg.message}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Thinking indicator */}
          <AnimatePresence>
            {isThinking && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 rounded-lg bg-white/5 mr-12"
              >
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                        className="w-2 h-2 rounded-full bg-white/50"
                      />
                    ))}
                  </div>
                  <span className="text-white/50 text-sm font-light">Analyzing your process...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input Area */}
          <AnimatePresence mode="wait">
            {!isActive ? (
              <motion.button
                key="inactive"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={handleActivate}
                className="w-full group"
              >
                <div className="relative p-8 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300">
                  <p className="text-white/50 text-lg font-light group-hover:text-white/70 transition-colors">
                    Tell us about your biggest operational challenge
                  </p>
                </div>
              </motion.button>
            ) : (
              <motion.form
                key="active"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit}
                className="relative"
              >
                <div className="relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="What is your biggest problematic process right now?"
                    className="w-full p-6 pr-32 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 text-lg font-light focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                  />
                  <Button
                    type="submit"
                    disabled={!userInput.trim() || isThinking}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-black hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed font-light"
                  >
                    Send
                  </Button>
                </div>

                {/* Encouragement message */}
                <AnimatePresence>
                  {showEncouragement && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-3 text-center text-white/50 text-sm font-light"
                    >
                      Share your challenge and we'll provide personalized recommendations
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Info text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="max-w-3xl mx-auto">
            <p className="text-white/50 text-sm font-light leading-relaxed">
              No high-pressure sales pitch. No forms that lead to follow-up calls. Just intelligent analysis and concrete recommendations you can implement immediately.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
