'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';

interface Message {
    id: string;
    role: 'agent' | 'user';
    content: string;
    timestamp: Date;
    sessionId: number; // Track which conversation session this belongs to
}

export default function RecruiterChat() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'agent',
            content: 'Hello. I am the AI Agent for Andrés Cabrera. I can help you determine if your opportunity is a good fit. To start, could you please provide your email address? This will help me remember our conversation if we continue it later.',
            timestamp: new Date(),
            sessionId: 0
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [threadId, setThreadId] = useState<string | null>(null);
    const [emailCollected, setEmailCollected] = useState(false);
    const [currentSessionId, setCurrentSessionId] = useState(0);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Check for existing session in localStorage
    useEffect(() => {
        const savedThreadId = localStorage.getItem('recruiter_thread_id');
        const savedSessionId = localStorage.getItem('recruiter_session_id');

        if (savedThreadId) {
            setThreadId(savedThreadId);
            setEmailCollected(true);

            // Increment session ID for returning users
            const newSessionId = savedSessionId ? parseInt(savedSessionId) + 1 : 1;
            setCurrentSessionId(newSessionId);
            localStorage.setItem('recruiter_session_id', newSessionId.toString());

            // Update first message to acknowledge returning user
            setMessages([{
                id: '1',
                role: 'agent',
                content: 'Welcome back! I remember our previous conversation. How can I help you today?',
                timestamp: new Date(),
                sessionId: newSessionId
            }]);
        }
    }, []);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date(),
            sessionId: currentSessionId
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // If this is the first message and no threadId, use email as threadId
        let currentThreadId = threadId;
        if (!emailCollected && !threadId) {
            // Assume first message is email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(input.trim())) {
                currentThreadId = input.trim().toLowerCase();
                setThreadId(currentThreadId);
                setEmailCollected(true);
                localStorage.setItem('recruiter_thread_id', currentThreadId);
                localStorage.setItem('recruiter_session_id', currentSessionId.toString());
            }
        }

        try {
            const response = await fetch('/api/mastra', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: input,
                    threadId: currentThreadId
                }),
            });

            if (!response.ok) throw new Error('Failed to get response');

            const data = await response.json();

            const agentResponse: Message = {
                id: (Date.now() + 1).toString(),
                role: 'agent',
                content: data.response || "I'm having trouble connecting to my brain. Please try again.",
                timestamp: new Date(),
                sessionId: currentSessionId
            };
            setMessages(prev => [...prev, agentResponse]);
        } catch (error) {
            console.error(error);
            const errorResponse: Message = {
                id: (Date.now() + 1).toString(),
                role: 'agent',
                content: "System Error: Unable to reach the agent. Please try again later.",
                timestamp: new Date(),
                sessionId: currentSessionId
            };
            setMessages(prev => [...prev, errorResponse]);
        } finally {
            setIsTyping(false);
        }
    };

    // Helper to check if this is the last message in a session
    const isLastMessageInSession = (index: number) => {
        if (index === messages.length - 1) return true;
        return messages[index].sessionId !== messages[index + 1]?.sessionId;
    };

    // Helper to get opacity for session
    const getSessionOpacity = (sessionId: number) => {
        // Odd sessions (0, 2, 4...) = full opacity
        // Even sessions (1, 3, 5...) = 0.85 opacity
        return sessionId % 2 === 0 ? 1 : 0.85;
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-black border border-white/10 rounded-xl overflow-hidden shadow-2xl h-[600px] flex flex-col font-mono text-sm">
            {/* Terminal Header */}
            <div className="bg-white/5 border-b border-white/10 p-4 flex items-center gap-2 flex-shrink-0">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                <span className="ml-4 text-white/40 text-xs">agent@bx-infrastructure:~</span>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-scroll p-6 space-y-6 min-h-0" style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(255, 255, 255, 0.1) transparent'
            }}>
                {messages.map((msg, index) => {
                    const opacity = getSessionOpacity(msg.sessionId);
                    const isLastInSession = isLastMessageInSession(index);

                    return (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: opacity, y: 0 }}
                            style={{ opacity }}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className="flex flex-col gap-1 max-w-[80%]">
                                <div
                                    className={`p-4 rounded-lg ${msg.role === 'user'
                                        ? 'bg-white/10 text-white border border-white/20'
                                        : 'bg-blue-500/10 text-blue-200 border border-blue-500/20'
                                        }`}
                                >
                                    <div className="leading-relaxed prose prose-invert prose-sm max-w-none">
                                        <ReactMarkdown
                                            components={{
                                                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                                                ul: ({ children }) => <ul className="list-disc list-inside mb-2">{children}</ul>,
                                                ol: ({ children }) => <ol className="list-decimal list-inside mb-2">{children}</ol>,
                                                li: ({ children }) => <li className="mb-1">{children}</li>,
                                                strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
                                                em: ({ children }) => <em className="italic">{children}</em>,
                                                code: ({ children }) => <code className="bg-white/10 px-1 py-0.5 rounded text-xs">{children}</code>,
                                                pre: ({ children }) => <pre className="bg-white/5 p-2 rounded overflow-x-auto text-xs mb-2">{children}</pre>,
                                            }}
                                        >
                                            {msg.content}
                                        </ReactMarkdown>
                                    </div>
                                    <span className="text-[10px] opacity-50 mt-2 block">
                                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                                {isLastInSession && (
                                    <div className="text-[9px] opacity-40 px-2 text-right">
                                        {msg.timestamp.toLocaleDateString([], {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                    >
                        <div className="bg-blue-500/5 text-blue-200 border border-blue-500/10 p-4 rounded-lg flex gap-2 items-center">
                            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-white/5 flex-shrink-0">
                <div className="flex gap-4">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type your message..."
                        className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder-white/30 font-mono"
                        autoFocus
                    />
                    <Button
                        onClick={handleSend}
                        disabled={!input.trim() || isTyping}
                        className="bg-white/10 hover:bg-white/20 text-white border border-white/10"
                    >
                        SEND
                    </Button>
                </div>
            </div>
        </div>
    );
}
