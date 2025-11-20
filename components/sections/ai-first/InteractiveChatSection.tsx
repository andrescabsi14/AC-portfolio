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
      className="relative min-h-screen flex items-center justify-center py-32 overflow-hidden"
      style={{ scrollSnapAlign: 'start' }}
    >
      {/* Ambient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/20 to-black" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Discover what we can do for you
          </h2>
          <p className="text-2xl md:text-3xl text-white/70 mb-3">
            ...in <span className="text-blue-400 font-semibold">seconds</span>
          </p>
          <p className="text-lg text-white/50">
            You don't believe me? Try it:
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
                        ? 'bg-blue-500/10 ml-12 text-right'
                        : 'bg-white/5 mr-12'
                    }`}
                  >
                    <p className="text-white/70 text-sm">{msg.message}</p>
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
                        ? 'bg-blue-500/20 ml-12 text-right'
                        : 'bg-white/10 mr-12'
                    }`}
                  >
                    <p className="text-white text-base">{msg.message}</p>
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
                        className="w-2 h-2 rounded-full bg-blue-400"
                      />
                    ))}
                  </div>
                  <span className="text-white/50 text-sm">Analyzing your process...</span>
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
                <motion.div
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(59, 130, 246, 0.3)',
                      '0 0 40px rgba(59, 130, 246, 0.5)',
                      '0 0 20px rgba(59, 130, 246, 0.3)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="relative p-5 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300"
                >
                  <p className="text-white/40 text-lg group-hover:text-white/60 transition-colors">
                    Click here to start...
                  </p>
                  {/* Pulsing glow indicator */}
                  <motion.div
                    animate={{
                      opacity: [0.5, 1, 0.5],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5"
                  />
                </motion.div>
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
                    className="w-full p-6 pr-32 rounded-xl bg-white/5 border border-blue-500/30 text-white placeholder-white/40 text-lg focus:outline-none focus:border-blue-400/50 focus:bg-white/10 transition-all"
                  />
                  <Button
                    type="submit"
                    disabled={!userInput.trim() || isThinking}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
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
                      className="mt-3 text-center text-blue-400 text-sm"
                    >
                      You don't have anything to lose. Try it—you'll be amazed! ✨
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
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-white/50 text-sm max-w-2xl mx-auto leading-relaxed">
            This replaces the traditional "Contact Us" form. Our AI agent will ask a few questions
            and send you personalized recommendations—free of charge. You can implement them with
            anyone, but we know what we do, and this is just the surface. We work hand in hand
            with you to achieve extraordinary results.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
