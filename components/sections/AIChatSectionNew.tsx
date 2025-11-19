'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

type UserType = 'small-business' | 'enterprise' | 'big-brand' | null;

export default function AIChatSectionNew() {
  const [showButton, setShowButton] = useState(true);
  const [showValidation, setShowValidation] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userType, setUserType] = useState<UserType>(null);
  const [typewriterText, setTypewriterText] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Typewriter effect for initial greeting
  useEffect(() => {
    if (!showButton) return;

    const text = "Let's create something extraordinary together.";
    let index = 0;

    const timer = setInterval(() => {
      if (index < text.length) {
        setTypewriterText((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [showButton]);

  // Typewriter effect for assistant messages
  const typeMessage = async (text: string) => {
    setIsTyping(true);
    let displayText = '';

    for (let i = 0; i < text.length; i++) {
      displayText += text[i];
      setMessages((prev) => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length - 1];
        if (lastMessage && lastMessage.role === 'assistant') {
          newMessages[newMessages.length - 1] = {
            ...lastMessage,
            content: displayText,
          };
        }
        return newMessages;
      });
      await new Promise((resolve) => setTimeout(resolve, 30));
    }

    setIsTyping(false);
  };

  // Scroll to bottom when new messages appear
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleStartConversation = () => {
    setShowButton(false);
    setTypewriterText('');
    setTimeout(() => {
      setShowValidation(true);
    }, 500);
  };

  const handleValidation = async (isWorkRelated: boolean) => {
    setShowValidation(false);

    if (isWorkRelated) {
      setShowChat(true);
      // Add initial greeting
      const greeting = "Hello! I'd be happy to help. Are you representing a small business, an enterprise, or a big brand?";
      setMessages([{ role: 'assistant', content: '' }]);
      await typeMessage(greeting);
    } else {
      setShowContactForm(true);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');

    // Add user message
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);

    // Detect user type if not set
    if (!userType) {
      const lowerMessage = userMessage.toLowerCase();
      let detectedType: UserType = null;
      let response = '';

      if (lowerMessage.includes('small') || lowerMessage.includes('startup')) {
        detectedType = 'small-business';
        response = "Excellent! As a small business, agility and innovation are your strengths. I specialize in creating AI-first experiences that help small businesses scale efficiently. What specific challenge are you looking to solve?";
      } else if (lowerMessage.includes('enterprise')) {
        detectedType = 'enterprise';
        response = "Perfect! Enterprises need robust, scalable solutions. I have extensive experience building enterprise-grade AI systems that integrate seamlessly with existing infrastructure. What's your primary objective?";
      } else if (lowerMessage.includes('brand') || lowerMessage.includes('big brand')) {
        detectedType = 'big-brand';
        response = "Wonderful! Big brands require sophisticated, high-impact solutions. I've worked with major brands to create cutting-edge AI experiences that drive engagement. How can I help elevate your brand?";
      } else {
        response = "Could you clarify whether you're with a small business, an enterprise, or a big brand? This will help me tailor my approach to your specific needs.";
      }

      if (detectedType) {
        setUserType(detectedType);
      }

      // Add assistant response
      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);
      await typeMessage(response);
    } else {
      // Handle conversation based on user type
      let response = '';

      switch (userType) {
        case 'small-business':
          response = "For small businesses, I recommend starting with an AI-powered solution that can grow with you. Let's discuss your specific needs and build something impactful.";
          break;
        case 'enterprise':
          response = "I can help design and implement enterprise-scale AI solutions. Let's explore how we can integrate AI into your operations for maximum efficiency.";
          break;
        case 'big-brand':
          response = "For a brand of your caliber, we should focus on innovative AI experiences that set you apart. Let's create something remarkable together.";
          break;
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);
      await typeMessage(response);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Show last 3-4 messages
  const visibleMessages = messages.slice(-4);

  return (
    <section id="ai-chat" className="relative h-screen w-full overflow-hidden bg-black snap-start">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black z-10" />
        {/* Placeholder for video */}
        <div className="w-full h-full bg-gradient-to-br from-gray-900 via-black to-blue-950" />
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-6">
        <div className="max-w-3xl w-full">
          {/* Initial State - Typewriter greeting + Button */}
          <AnimatePresence>
            {showButton && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center space-y-8"
              >
                <div className="h-24 flex items-center justify-center">
                  <p className="text-3xl md:text-4xl font-light text-white">
                    {typewriterText}
                    <span className="animate-pulse">|</span>
                  </p>
                </div>

                {typewriterText.length > 40 && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleStartConversation}
                    className="px-8 py-4 bg-white text-black font-medium rounded-md text-lg hover:bg-gray-100 transition-all"
                  >
                    Let&apos;s start a conversation
                  </motion.button>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Validation Question */}
          <AnimatePresence>
            {showValidation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center space-y-6"
              >
                <p className="text-2xl md:text-3xl font-light text-white mb-8">
                  Is this related to work or a project?
                </p>
                <div className="flex gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleValidation(true)}
                    className="px-8 py-3 bg-white text-black font-medium rounded-md hover:bg-gray-100 transition-all"
                  >
                    Yes
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleValidation(false)}
                    className="px-8 py-3 bg-white/10 text-white font-medium rounded-md hover:bg-white/20 transition-all border border-white/20"
                  >
                    No
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chat Interface */}
          <AnimatePresence>
            {showChat && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* Messages */}
                <div className="space-y-4 mb-6">
                  {visibleMessages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[80%] px-4 py-3 rounded-lg ${
                          message.role === 'user'
                            ? 'bg-white text-black'
                            : 'bg-white/10 text-white border border-white/20'
                        }`}
                      >
                        <p className="text-sm md:text-base">{message.content}</p>
                      </div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <motion.div
                  animate={{
                    opacity: isTyping ? 0.6 : 1,
                  }}
                  className="relative"
                >
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    onFocus={(e) => {
                      e.target.parentElement?.classList.add('ring-2', 'ring-white/40');
                    }}
                    onBlur={(e) => {
                      e.target.parentElement?.classList.remove('ring-2', 'ring-white/40');
                    }}
                    placeholder="Type your message..."
                    disabled={isTyping}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 resize-none focus:outline-none transition-all"
                    rows={3}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!input.trim() || isTyping}
                    className="absolute bottom-3 right-3 px-4 py-2 bg-white text-black rounded-md text-sm font-medium hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Send
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Contact Form */}
          <AnimatePresence>
            {showContactForm && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-light text-white text-center mb-8">
                  Get in Touch
                </h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
                  />
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-8 py-3 bg-white text-black font-medium rounded-md hover:bg-gray-100 transition-all"
                  >
                    Send Message
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
